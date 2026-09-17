import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { GlobalController } from "./GlobalController";
import ErrorBoundary from "./components/ErrorBoundary";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <GlobalController>
        <App />
      </GlobalController>
    </ErrorBoundary>
  </StrictMode>
);
