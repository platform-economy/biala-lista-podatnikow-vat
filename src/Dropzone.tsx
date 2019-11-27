import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const API_BASE = '/api/search/bank-accounts/';

const FETCH_CONFIG = {
  headers: new Headers({
    "Access-Control-Allow-Origin": "https://wl-api.mf.gov.pl/api/",
  }),
}

type AccountNumber = string;
type CompanyData = {
  name: string,
  account: string,
  address: string,
};

function Dropzone() {
  const [generalOutput, setGeneralOutput] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    // clear text area on-drop
    setGeneralOutput('')
    const reader = new FileReader()

    reader.onabort = () => console.warn('file reading was aborted')
    reader.onerror = () => console.error('file reading has failed')
    reader.onload = () => {
      const fileAsString = reader.result
      sendRequestCheckAccounts(fileAsString)
    }

    acceptedFiles.forEach(file => reader.readAsText(file))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  async function sendRequestCheckAccounts(fileAsString) {
    const now = new Date();
    const currentTimestamp = now.getTime();
    const dateAsDays = now.toISOString().split('T')[0]; // YYYY-MM-DD

    // Prepare data
    const fileAsArrays = fileAsString.split(/\n/);
    fileAsArrays.shift(); // required because of format of downloaded file

    // Hold info about all companies
    const allCompanies: Map<AccountNumber, CompanyData> = new Map();

    // Max 30 companies per request
    // https://wl-api.mf.gov.pl/#bankAccounts?date
    const companiesInParts: AccountNumber[][] = [];

    let companies: AccountNumber[] = [];
    for (let i = 0; i < fileAsArrays.length; ++i) {
      const line = fileAsArrays[i]
      const [, , , name, address, account] = line.split('|')
      if (!name || !address || !account) {
        console.error(`Wrong format of line: ${i} - ${line}`);
        continue
      }

      allCompanies.set(account, { name, address, account });

      if (companies.length === 30) {
        companiesInParts.push(companies);
        companies = [];
      }

      companies.push(account);
    };

    if (companies.length) {
      companiesInParts.push(companies);
    }

    if (companiesInParts.length === 0) {
      console.warn(`Couldn't find any company in provided file.`);
      return
    }

    // Set of all account numbers returned in response from api
    const foundAccNumbers: Set<string> = new Set();

    await Promise.all(companiesInParts.map(accounts => {
      return fetch(`${API_BASE}${accounts}?date=${dateAsDays}&_=${currentTimestamp}`, FETCH_CONFIG)
        .then(response => {
          response.json().then(body => {
            body.result.subjects.forEach(data => {
              data.accountNumbers.forEach(acc => foundAccNumbers.add(acc.toString()));
            });
          });
        });
    }));

    for (const { account, address, name } of Array.from(allCompanies.values())) {
      let result = '››› NIE ››› figuruje na wykazie';

      if (foundAccNumbers.has(account)) {
        result = 'FIGURUJE w rejestrze VAT';
      }

      setGeneralOutput(generalOutput =>
        generalOutput += `${result} ${account} ${address} ${name}'\n'`);
    }
  }

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drop proper file HERE, or click to select file.</p>
      </div>
      <textarea className="App-textarea" value={generalOutput} readOnly={true} />
    </>
  )
}

export default Dropzone;
