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
      <p className={"subheader"}>With OonMoon,
        you’re in control.Your personal information belongs to you and no one else!
        So we keep you safe. Access your personalized health insights,how your cycle affects your body and well being
        You can also find here an overview of your monthly log.
      </p>
      <Container />
    </div>
  );
}


