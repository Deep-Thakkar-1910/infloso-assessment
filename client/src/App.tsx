import { Toaster } from "sonner";
import { ModeToggle } from "./components/ui/Theme-Toggler";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import { ProtectedRoute } from "./ProtectedRoute";
import { ThemeProvider } from "./providers";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider storageKey="melody-verse-theme">
      <BrowserRouter>
        <div className="absolute right-2 top-2 md:right-4 md:top-4">
          <ModeToggle />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        <Toaster
          duration={5000}
          richColors
          closeButton
          position="bottom-right"
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
