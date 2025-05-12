
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure we have a valid root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
  console.warn("Root element was not found, created one dynamically.");
}

createRoot(document.getElementById("root")!).render(<App />);
