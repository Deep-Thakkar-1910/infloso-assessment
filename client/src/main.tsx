import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <main className="overflow-x-hidden">
    <App />
  </main>
);
