import React, { useState } from "react";
import "./ReachOut.css";
import { FaFacebookSquare, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const ReachOut = ({ position, name, text }) => {
  const [isFront, setIsFront] = useState(true);
  const [isBack, setIsBack] = useState(false);

  const handleHoverOn = () => {
    setIsFront(false);
    setIsBack(true);
  };

  const handleHoverOut = () => {
    setIsFront(true);
    setIsBack(false);
  };

  return (
    <div>
      <div
        className="card"
        onMouseOver={handleHoverOn}
        onMouseOut={handleHoverOut}
      >
        {isFront && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: .0, duration: .0 } }}
            className="card__front"
          >
            <span>{position}</span>
            <h5>{name}</h5>
            <div className="social__links">
              <Link to="#">
                <FaFacebookSquare />
              </Link>
              <Link to="#">
                <FaTwitter />
              </Link>
              <Link to="#">
                <FaLinkedin />
              </Link>
            </div>
          </motion.div>
        )}
        {isBack && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: .0,duration: .0 } }}
            className="card__back"
          >
            <p>
              <span>{name}</span>
              {text}
            </p>
            <div className="social__links">
              <Link to="#">
                <FaFacebookSquare />
              </Link>
              <Link to="#">
                <FaTwitter />
              </Link>
              <Link to="#">
                <FaLinkedin />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ReachOut;
