import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { ProSidebarProvider } from "react-pro-sidebar";
import { Provider } from "react-redux";
import store from "./store";
import { ProSidebarProvider } from "react-pro-sidebar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </Provider>
);
