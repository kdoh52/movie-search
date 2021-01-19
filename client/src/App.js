import './App.css';
import Jumbotron from './components/Jumbotron';
import Searchbar from './components/Searchbar';
import Saved from './components/Saved';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Jumbotron />
      <Saved />
      <Searchbar />
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
