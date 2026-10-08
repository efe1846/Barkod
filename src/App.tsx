import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import Logs from "./pages/Logs";
import CartProvider from "./pages/CartContext";
import "./App.css";

export default function App() {
  return (
    <CartProvider>
      <div className="layout">
        <Sidebar />
        <div className="icerik">
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Logs" element={<Logs />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
}
