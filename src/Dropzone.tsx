import React, {useCallback, useState} from "react";

// Import the useDropzone hooks from react-dropzone
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

  function sendRequestCheckAccounts(fileAsArrays) {
    const API = '/api/search/bank-account/';
    let DATE = '?date=2019-11-14&_=1573750564191';
    // create array
    fileAsArrays = fileAsArrays.split('\n')

    // delete first element in array
    fileAsArrays.shift();
    fileAsArrays.pop();

    // delete unnedeeded data for every row
    for(let i = 0; i < fileAsArrays.length; ++i){
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
        
        let textToFrontNew = singleRow[0] + ' ' + singleRow[1] + ' ' + singleRow[2] + ' ' + response.statusText + '\n';
        // console.log('test', textToFront)
        generalOutput = generalOutput + textToFrontNew;
        setTextToFront(`${generalOutput}${textToFrontNew}`);


        response.blob().then(function(myBlob){
          let obj = URL.createObjectURL(myBlob);
          console.log('obj', obj);
        })
      })

      console.log(singleRow);
    };
  }

  const { getRootProps, getInputProps } = useDropzone({onDrop})

  return (

    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drop some files here, or click to select files</p>
      <textarea className="App-textarea" value={generalOutput}></textarea>
    </div>

  )
}

export default Dropzone;