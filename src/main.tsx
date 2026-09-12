import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { GlobalController } from "./GlobalController.tsx";
import TimeProvider from "./context/TimeContext";
import ErrorBoundary from "./components/ErrorBoundary";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TimeProvider>
      <ErrorBoundary>
        <GlobalController>
          <App />
        </GlobalController>
      </ErrorBoundary>
    </TimeProvider>
  </StrictMode>
);
