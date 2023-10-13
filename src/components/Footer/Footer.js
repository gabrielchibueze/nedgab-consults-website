import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__wrapper container">
        <div>
          <h4>Our Services</h4>
          <ul>
            <Link to="/apply">
              <li>Study with us</li>
            </Link>
            <Link to="/contactUs">
              <li>Contact us</li>
            </Link>
            <li>Visa Packaging</li>
            <li>IELTS</li>
            <li>Appointment</li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <Link to="/whoWeAre">
              <li>About us</li>
            </Link>
            <Link to="/contactUs">
              <li>Ask a qestions</li>
            </Link>
            <Link to="/blog">
              <li>News</li>
            </Link>
            <li>Policies</li>

            <li>Terms of service</li>
          </ul>
        </div>
        <div>
          <h4>Our Office</h4>
          <ul>
            <li>NewCastle Uk</li>
            <li>Abakaliki, Nigeria.</li>
            <li>
              <div className="link">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/profile.php?id=100085929498613&sk=about"
                >
                  <FaFacebookSquare />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://twitter.com/nedgab"
                >
                  <FaTwitterSquare />
                </a>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/nedgabconsults?r=nametag"
                >
                  <FaInstagramSquare />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
