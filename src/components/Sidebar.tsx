import { useState } from "react";
import { NavLink } from "react-router-dom";
import { VscChevronRightCompact } from "react-icons/vsc";
import { FiHome, FiBox, FiFileText, FiSettings } from "react-icons/fi";
import ebIcon from "../assets/ebicon.png";
import ebLogo from "../assets/eblogo.png";

export default function Sidebar() {
  const [menuAcik, setMenuAcik] = useState(false);

  return (
    <div className={`sidebar ${menuAcik ? "acik" : ""}`}>
      <img
        src={menuAcik ? ebLogo : ebIcon}
        className="eblogo"
        alt="EB Logo"
        style={{ transition: "opacity 0.3s ease" }}
      />

      <nav className="menu">
        <NavLink
          to="/Dashboard"
          className={({ isActive }) => `menu-item${isActive ? " aktif" : ""}`}
        >
          <div className="icon">
            <FiHome size={22} />
          </div>
          {menuAcik && <span className="text">Ana Sayfa</span>}
        </NavLink>
        <NavLink
          to="/Products"
          className={({ isActive }) => `menu-item${isActive ? " aktif" : ""}`}
        >
          <div className="icon">
            <FiBox size={22} />
          </div>
          {menuAcik && <span className="text">Ürünler</span>}
        </NavLink>
        <NavLink
          to="/Logs"
          className={({ isActive }) => `menu-item${isActive ? " aktif" : ""}`}
        >
          <div className="icon">
            <FiFileText size={22} />
          </div>
          {menuAcik && <span className="text">Raportlar</span>}{" "}
        </NavLink>
        <NavLink
          to="/Settings"
          className={({ isActive }) => `menu-item${isActive ? " aktif" : ""}`}
        >
          <div className="icon">
            <FiSettings size={22} />
          </div>
          {menuAcik && <span className="text">Ayarlar</span>}{" "}
        </NavLink>
      </nav>

      <VscChevronRightCompact
        className={`toggle-btn ${menuAcik ? "donmus" : ""}`}
        onClick={() => setMenuAcik((prev) => !prev)}
      />
    </div>
  );
}
