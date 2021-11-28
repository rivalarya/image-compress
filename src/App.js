import './App.css';
import ReactDOM from 'react-dom';
import UseFile from './components/Main/useFile/main';
import UseUrl from './components/Main/useUrl/main';

function callUrl() {
  return ReactDOM.render( <UseUrl /> , document.getElementsByTagName('main')[0])
}

function App() {
  return (
    <>
      <div className="choice">
        <label>Compress using :</label>
        <div className="choice-item">
          <button onClick={UseFile}>Upload Image</button>
          <button onClick={callUrl}>Url</button>
        </div>
      </div>
    </>
  );
}

export default App;