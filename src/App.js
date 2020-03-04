import React from 'react';
import './App.css';
import config from "./config";
import MasterPage from './components/MasterPage';
import Firebase from "firebase";

function App() {
  Firebase.initializeApp(config);
  return (
    <div className="App">
      <MasterPage />
    </div>
  );
}

export default App;