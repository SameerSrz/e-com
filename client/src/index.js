import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Store from "./redux/Store";

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

// const rootElem = document.getElementById('root');
// const root = ReactDOM.createRoot(rootElem);
// root.render(
//   <Provider Store={Store}>
//   {/* //<React.StrictMode> */}
//     <App />
//   {/* //</React.StrictMode> */}
//   </Provider>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
