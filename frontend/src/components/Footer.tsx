import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./../index.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-social">
        <a
          href="https://www.facebook.com"
          className="footer-icon"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.twitter.com"
          className="footer-icon"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://www.instagram.com"
          className="footer-icon"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com"
          className="footer-icon"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedinIn />
        </a>
      </div>
      <div className="footer-copy">
        <p>
          © {new Date().getFullYear()} Factorial Pulse. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
