import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { StateProvider } from "./store/store.js";
// import { debugContextDevtool } from "react-context-devtool";

const container = document.getElementById("root");

ReactDOM.render(
  <Router>
    <StateProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StateProvider>
  </Router>,
  container
);

// Attach root container
// debugContextDevtool(container);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
