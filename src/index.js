import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.css"
import GlobalStore from "./store/GlobalStore";
export const Context = createContext(null)
//console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root'));
window["locked"] = false
root.render(
  //USE <REACT.STRICTMODE> wrapp FOR DOUBLE INVOKING
    <Context.Provider value={{
        //report: new ReportStore(),
        global: new GlobalStore()}}>
       <App/>
    </Context.Provider>
);

