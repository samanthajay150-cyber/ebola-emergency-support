import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// Import sonner for toast notifications
import { Toaster } from "sonner";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
      <Toaster position="top-right" richColors closeButton />
    </React.StrictMode>
  );
}
