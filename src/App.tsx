import React, {useCallback} from 'react';
import logo from './logo.svg';
import './App.css';
import Dropzone from "./Dropzone";


const App: React.FC = () => {

  const onDrop = useCallback(acceptedFiles => {
    // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
    console.log(acceptedFiles);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        </a>
        <Dropzone onDrop={onDrop} accept={"image/*"} />
      </header>
    </div>
  );
}

export default App;
