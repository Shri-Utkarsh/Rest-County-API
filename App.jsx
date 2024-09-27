
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";


const App = () => {
  
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
};

export default App;
