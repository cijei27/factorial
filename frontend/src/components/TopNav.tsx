import React from "react";
import { Link } from "react-router-dom";
import "./../index.css";

const TopNav: React.FC = () => {
  return (
    <header className="foundation-nav">
      {/* Logo / Marca */}
      <div className="foundation-brand">
        <Link to="/" className="logo-link">
          <img src="/factorial.webp" alt="Logo" className="logo-img" />
        </Link>
      </div>
      <nav className="foundation-menu-container">
        <ul className="foundation-menu">
          <li>
            <Link to="/customers" className="menu-link">
              Clientes
            </Link>
          </li>
          <li>
            <Link to="/credit" className="menu-link">
              Créditos
            </Link>
          </li>
          <li>
            <Link to="/customers/new" className="menu-link">
              Nuevo Cliente
            </Link>
          </li>
          <li>
            <Link to="/customers/search" className="menu-link">
              Buscar Cliente
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TopNav;
