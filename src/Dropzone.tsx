import React, {useCallback} from "react";

// Import the useDropzone hooks from react-dropzone
import { useDropzone } from "react-dropzone";

function Dropzone() {
  const onDrop = useCallback(acceptedFiles => {
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
    for(let i = 0; i < fileAsArrays.length - 1; ++i){
      let singleRow = fileAsArrays[i].split('|')
      singleRow.splice(0,1)
      singleRow.splice(0,1)
      singleRow.splice(0,1)
      singleRow.splice(3,5)
      
      fetch(API + singleRow[2] + DATE, {
        headers: new Headers({
          
        })
      })
      .then(response => console.log(response))

      console.log(singleRow);
    };
  }

  const { getRootProps, getInputProps } = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}

export default Dropzone;