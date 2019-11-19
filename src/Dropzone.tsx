import React, {useCallback, useState} from "react";
import { useDropzone } from "react-dropzone";

function Dropzone() {

  let [generalOutput, setTextToFront] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    //clear text area on-drop
    generalOutput = '';
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      console.log('File describtion: ', acceptedFiles)
      const fileAsString = reader.result
      sendRequestCheckAccounts(fileAsString)
    }

    acceptedFiles.forEach(file => reader.readAsText(file))
  }, [])

  // https://stackoverflow.com/questions/37764665/typescript-sleep/50797405
  function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async function sendRequestCheckAccounts(fileAsArrays) {
    let currentTimestamp = Date.now();
    let dateAsDays = new Date().toISOString().slice(0,10);
    const API = '/api/search/bank-account/';
    let DATE = '?date=' + dateAsDays +'&_=' + currentTimestamp;
    // create array
    fileAsArrays = fileAsArrays.split('\n')
    let isOnVatList = '';
    // delete first element in array
    fileAsArrays.shift();
    fileAsArrays.pop();
    
    // delete unnedeeded data for every row
    for(let i = 0; i < fileAsArrays.length; ++i){
      await delay(700);
      let singleRow = fileAsArrays[i].split('|')
      singleRow.splice(0,1)
      singleRow.splice(0,1)
      singleRow.splice(0,1)
      singleRow.splice(3,5)

      fetch(API + singleRow[2] + DATE, {
        headers: new Headers({
          "Access-Control-Allow-Origin":"https://wl-api.mf.gov.pl/api/"
        })
      })
      .then(response => {console.log('response', response)
        
        response.json().then(body => {

          console.log('body', body)
          let isGiverMoney = ''

          if(body.result.subjects.length === 0){
            isGiverMoney = 'Rachunek nie figuruje na wykazie';
          }else{
            isGiverMoney = 'Figuruje w rejestrze VAT';
          }

          let textToFrontNew = singleRow[0] + ' ' + singleRow[1] + ' ' + singleRow[2] + ' ' + isGiverMoney + '\n';

          generalOutput = generalOutput + textToFrontNew;
          if(generalOutput === textToFrontNew){
            textToFrontNew = '';
          }
          setTextToFront(generalOutput);

        })
      });

      console.log(singleRow);

    };
  }

  const { getRootProps, getInputProps } = useDropzone({onDrop})

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drop proper file HERE, or click to select file.</p>
      </div>
      <textarea className="App-textarea" value={generalOutput}></textarea>
    </>
  )
}

export default Dropzone;