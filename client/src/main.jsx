import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// 🔥 Safety check (IMPORTANT)
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key. Add VITE_CLERK_PUBLISHABLE_KEY in .env file");
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        elements: {
          formButtonPrimary: "bg-black hover:bg-black/90 text-white",
        },
      }}
      afterSignOutUrl="/"
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);