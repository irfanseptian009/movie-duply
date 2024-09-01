import React from "react";
import "../style/Footer.scss"; // Import your SCSS file for styling
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons"; // You'll need to install and configure FontAwesome

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {" "}
        <div className="footer-content">
          <div className="footer-links">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="https://portofolio-irfan-septian.vercel.app/">About Us</a>
              </li>
              <li>
                <a href="/favorites">Movies</a>
              </li>
              <li>
                <a href="https://wa.me/6285156747376">Contact</a>
              </li>
            </ul>
          </div>
          <div className="social-media">
            <a
              href="https://github.com/irfanseptian009"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://twitter.com/irvan_seftian"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://www.instagram.com/irfan_septian__/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
          <div className="copyright">
            <p>&copy; {new Date().getFullYear()} Movie Duly. Develop by irfan septian.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
