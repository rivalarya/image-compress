import './App.css';
import ReactDOM from 'react-dom';
import UseFile from './components/Main/useFile/main';
import UseUrl from './components/Main/useUrl/main';

function callUrl() {
  return ReactDOM.render( <UseUrl /> , document.querySelector('main'));
}
function callFile() {
  return ReactDOM.render( <UseFile /> , document.querySelector('main'));
}

function App() {
  
  return (
    <>
      <div className="choice">
        <label>Compress using :</label>
        <div className="choice-item">
          <button onClick={callFile}>Upload Image</button>
          <button onClick={callUrl}>Url</button>
        </div>
      </div>
    </>
  );
  
}

export default App;