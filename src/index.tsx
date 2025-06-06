import React from "react";
import { createRoot } from "react-dom/client";
import TagManager from "react-gtm-module";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.sass";
import { reportWebVitals } from "./reportWebVitals";

TagManager.initialize({ gtmId: "GTM-57TRFSCL" });

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
