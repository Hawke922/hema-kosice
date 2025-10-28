import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import { TranslationsProvider } from "./contexts/TranslationContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TranslationsProvider>
      <App />
    </TranslationsProvider>
  </StrictMode>
);
