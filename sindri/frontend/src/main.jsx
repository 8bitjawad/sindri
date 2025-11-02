import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

console.log("[main.jsx] script loaded");
function mount() {
  const container = document.getElementById("react-analytics-root");
  if (container) {
    console.log("[main.jsx] container found, mounting React");
    const root = createRoot(container);
    root.render(<App />);
    return true;
  }
  return false;
}

if (!mount()) {
  console.warn("[main.jsx] container not found yet. Waiting for DOMContentLoaded...");
  document.addEventListener("DOMContentLoaded", () => {
    if (!mount()) {
      console.error("[main.jsx] container #react-analytics-root still not found after DOMContentLoaded");
    }
  });
}
