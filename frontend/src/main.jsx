import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import App from "./App";

import "./index.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>

    <AuthProvider>

      <BrowserRouter>

        <App />

        <ToastContainer
          position="top-right"
          autoClose={2500}
          theme="dark"
          newestOnTop
          pauseOnHover
        />

      </BrowserRouter>

    </AuthProvider>

  </React.StrictMode>
);