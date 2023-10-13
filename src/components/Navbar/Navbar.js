import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaTimes, FaBars } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from "../../store/actions/user";
import logo from "../../asset/logo2.png";


const Navbar = () => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const currentUser = useSelector((state) => state.user);

  const logout = () => {
    dispatch(clearCurrentUser());
    navigate("/login");
  };


  const handleClick = () => {
    setClick(!click);
  };

  const data = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "Who We Are",
      link: "/whoWeAre",
    },
    {
      title: "Blog",
      link: "/blog",
    },
    {
      title: "Contact Us",
      link: "/contactUs",
    },
    {
      title: "Dashboard",
      link: "/dashboard",
    },
  ];
  return (
    <>
      <div className="navbar_up container">
        <NavLink to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </NavLink>

        <div className="navbar_up_right">
          <div className="navbar_up_right-content">
            <MdLocationOn className="icon" />
            <div className="navbar_up-text">
              <p>Location</p>
              <p>Abakaliki, Nigeria.</p>
            </div>
          </div>
          <div className="navbar_up_right-content">
            <AiOutlineMail className="icon" />
            <div className="navbar_up-text">
              <p>Email</p>
              <p>nedgabconsults@gmail.com</p>
            </div>
          </div>
          <div className="navbar_up_right-content">
            <BsFillTelephoneFill className="icon" />
            <div className="navbar_up-text">
              <p>Phone</p>
              <p>+234 708 777 3304</p>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar">
        <div className="navbar_wrapper container">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className={click ? "navbar__right active" : "navbar__right"}>
            <ul className="nav-links">
              {data.map(({ title, link }) => (
                <li>
                  <NavLink to={link}>{title}</NavLink>
                </li>
              ))}
            </ul>
            {currentUser ? (
              <div className="btn-wrapper mobile">
                <p>
                  Hello <span>{currentUser.firstName}</span>
                </p>
                <NavLink className="currentUser_logout" to="/" onClick={logout}>
                  <span>Logout</span>
                </NavLink>
              </div>
            ) : (
              <div className="btn-wrapper">
                <NavLink to="/signUp">
                  <button className="btn btn-signUp">Signup</button>
                </NavLink>
                <NavLink to="/login">
                  <button className="btn btn-logIn">Login</button>
                </NavLink>
              </div>
            )}
          </div>
          <div className="menu-icon" onClick={handleClick}>
            {click ? (
              <FaTimes className="icons" />
            ) : (
              <FaBars className="icons" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
