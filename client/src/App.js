import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [hello, setHello] = useState('No data')

  const callAPI = () => {
    fetch('http://localhost:9000/newroute')
    .then(r => r.text())
    .then(resp => {
      setHello(resp)
    });
  }

  useEffect(() => {
    callAPI()
  }, []) 

  return (
    <div>
      {hello}
    </div>
  );
}

export default App;
