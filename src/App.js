import React from 'react';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css'
import Header from "./components/Header";
import "./index.css"
import Container from "./components/Container";




export default function App() {

  return (
    <div className="App">
      <Header />
      <div className={"subheader"}>
        <p className={"subheader"}>This is going to be a great description of whatever we are doing!
          This is going to be a great description of whatever we are doing!
          This is going to be a great description of whatever we are doing!
          This is going to be a great description of whatever we are doing!
          This is going to be a great description of whatever we are doing!
          This is going to be a great description of whatever we are doing!
        </p>

      </div>
      <Container />
    </div>
  );
}


