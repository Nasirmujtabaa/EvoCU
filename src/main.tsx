
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

// Function to check if user is logged in
const checkUserSession = () => {
  // On app startup, check if we have a saved login state
  // This is for demo purposes - in a real app, you'd use proper auth
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  // If there's no valid session but there are stored credentials,
  // clear them to avoid potential issues
  if (!isLoggedIn) {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
  }
  
  return isLoggedIn;
};

// Init authentication check
checkUserSession();

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
