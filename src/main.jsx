import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ReduxProvider from "./redux/AuthProvider.jsx";
import "mapbox-gl/dist/mapbox-gl.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);
