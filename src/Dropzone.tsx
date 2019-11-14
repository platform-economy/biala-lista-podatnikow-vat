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

  function sendRequestCheckAccounts(bankAccounts) {
    // create array
    bankAccounts = bankAccounts.split('\n')

    // delete first element in array
    bankAccounts.shift();
    bankAccounts.pop();

    console.log('test', bankAccounts)
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