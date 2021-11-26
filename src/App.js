import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="brand">
          <h1>Image Compresser</h1>
          <p>Save your disk space with the same picture quality!</p> 
        </div>
      </header>
        <div className="choice">
        <label>Compress using :</label>
        <div className="choice-item">
          <button className="active">Upload file</button>
          <button>Url</button>
        </div>
        </div>
    </div>
  );
}

export default App;
