import React, {useCallback} from 'react';
import './App.css';
import Dropzone from "./Dropzone";
// import * as XLSX from 'xlsx';


const App: React.FC = () => {

  const onDrop = useCallback(acceptedFiles => {
    // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')

    reader.onload = () => {
      console.log(acceptedFiles)
      const binaryString = reader.result
      console.log(binaryString);
    }

    acceptedFiles.forEach(file => reader.readAsArrayBuffer(file))

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <Dropzone onDrop={onDrop} accept={"*/*"} />
      </header>
    </div>
  );
}

export default App;
