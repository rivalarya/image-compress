import './App.css';
import UseFile from './components/Main/useFile/main';
import UseUrl from './components/Main/useUrl/main';

function App() {
  return (
    <>
      <div className="choice">
        <label>Compress using :</label>
        <div className="choice-item">
          <button onClick={UseFile}>Upload file</button>
          <button onClick={UseUrl}>Url</button>
        </div>
      </div>
    </>
  );
}

export default App;