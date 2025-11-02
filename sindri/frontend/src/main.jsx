import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

console.log("[main.jsx] script loaded");
console.log("[main.jsx] document.readyState:", document.readyState);
console.log("[main.jsx] Looking for #react-analytics-root");

function mount() {
  const container = document.getElementById("react-analytics-root");
  console.log("[main.jsx] Container search result:", container);
  
  if (container) {
    console.log("[main.jsx] ✅ Container found! Mounting React...");
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    return true;
  }
  console.log("[main.jsx] ❌ Container not found");
  return false;
}

// Multiple strategies to ensure mounting
function tryMount() {
  if (mount()) {
    console.log("[main.jsx] Successfully mounted!");
    return;
  }
  
  console.warn("[main.jsx] Mount failed, will retry...");
  
  // Strategy 1: DOMContentLoaded
  if (document.readyState === 'loading') {
    console.log("[main.jsx] Waiting for DOMContentLoaded...");
    document.addEventListener("DOMContentLoaded", () => {
      console.log("[main.jsx] DOMContentLoaded fired");
      if (!mount()) {
        // Strategy 2: Small delay after DOMContentLoaded
        setTimeout(() => {
          console.log("[main.jsx] Trying after 100ms delay...");
          mount();
        }, 100);
      }
    });
  } else {
    // DOM already loaded
    console.log("[main.jsx] DOM already loaded, trying with delay...");
    setTimeout(() => {
      console.log("[main.jsx] Trying after 50ms delay...");
      mount();
    }, 50);
  }
}

tryMount();