import React, { useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiFillHome, AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { TbListDetails } from "react-icons/tb";
import { IoIosPaper } from "react-icons/io";
import { GiReceiveMoney, GiFiles } from "react-icons/gi";
import { FiSettings } from "react-icons/fi";
import { RiAdminFill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";
import { TbWriting } from "react-icons/tb";
import { motion } from "framer-motion";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  // MdOutlineSupervisorAccount,
} from "react-icons/md";
import { clearCurrentUser } from "../../store/actions/user";
import { Role } from "../Model/Role";
import User from "../Model/User";
import EditAccount from "../AccountSettings/EditAccount";
import { BsFillEyeSlashFill } from "react-icons/bs";
import Password from "../Model/Password";
import ChangePassword from "../AccountSettings/ChangePassword";
import { useEffect } from "react";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [toggleAdmin, setToggleAdmin] = useState(() => {
    const saved = localStorage.getItem("adminState");
    const initialValue = JSON.parse(saved);
    return initialValue ? initialValue : false;
  });
  const [toggleAccount, setToggleAccount] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(
    new User("", "", "", "")
  );
  const [selectPassword, setSeletPassword] = useState(new Password("", "", ""));

  const currentUser = useSelector((state) => state.user);
  const editComponent = useRef();
  const changePasswordComponent = useRef();

  const editAccountRequest = () => {
    setSelectedAccount(
      new User(
        currentUser.firstName,
        currentUser.lastName,
        currentUser.email,
        currentUser.gender
      )
    );
    editComponent.current?.showAccountModal();
  };

  const updatePasswordRequest = () => {
    setSeletPassword(new Password("", "", ""));
    changePasswordComponent.current?.showAccountModal();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showSidebar = () => setSidebar(!sidebar);

  const showAdmin = () => setToggleAdmin(!toggleAdmin);
  const showAccount = () => setToggleAccount(!toggleAccount);

  const logout = () => {
    dispatch(clearCurrentUser());
    navigate("/login");
  };


  useEffect(() => {
    localStorage.setItem("adminState", JSON.stringify(toggleAdmin));
  }, [toggleAdmin]);

  const SidebarData = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboard />,
      cName: "nav-text",
    },
    {
      title: "Application",
      path: "/apply",
      icon: <AiFillHome />,
      cName: "nav-text",
    },
    {
      title: "Files",
      path: "/files",
      icon: <IoIosPaper />,
      cName: "nav-text",
    },
    {
      title: "Funding",
      path: "/funding",
      icon: <GiReceiveMoney />,
      cName: "nav-text",
    },
  ];

  const accountMenu = [
    {
      title: "Change Details",
      icon: <TbListDetails />,
      cName: "nav-text nav-text-admin",
      func: editAccountRequest,
    },
    {
      title: "Change Password",
      icon: <BsFillEyeSlashFill />,
      cName: "nav-text nav-text-admin",
      func: updatePasswordRequest,
    },
  ];

  const adminMenu = [
    {
      title: "Users",
      path: "/users",
      icon: <HiUsers />,
      cName: "nav-text nav-text-admin",
    },
    {
      title: "Create Blog",
      path: "/createBlog",
      icon: <TbWriting />,
      cName: "nav-text nav-text-admin",
    },
    {
      title: "View All Files",
      path: "/viewFiles",
      icon: <GiFiles />,
      cName: "nav-text nav-text-admin",
    },
    {
      title: "All Applicant",
      path: "/allApplicant",
      icon: <GiReceiveMoney />,
      cName: "nav-text nav-text-admin",
    },
  ];
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="sidebar-bg">
          <div className="sidebar container">
            <div className="sidebar-nav_left">
              <Link to="#" className="menu-bars">
                <FaBars onClick={showSidebar} />
              </Link>
            </div>
            <div className="btn-wrapper">
              <NavLink to="/">
                <p>
                  <span>Home</span>
                </p>
              </NavLink>
              <p>
                Hello, <span>{currentUser.firstName}</span>
              </p>
              <NavLink className="currentUser_logout" to="/" onClick={logout}>
                <span>Logout</span>
              </NavLink>
            </div>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="sidebar-toggle" onClick={showSidebar}>
              <Link to="#" className="menu-bars">
                <AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={showSidebar}>
                  <NavLink to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
                </li>
              );
            })}

            <li className="nav-text">
              <div className="admin" onClick={showAccount}>
                <FiSettings />
                <span>Account</span>
                {toggleAccount ? (
                  <MdKeyboardArrowUp className="admin__icon" />
                ) : (
                  <MdKeyboardArrowDown className="admin__icon" />
                )}
              </div>
            </li>

            {toggleAccount &&
              accountMenu.map((item, index) => {
                return (
                  <motion.li
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    key={index}
                    className={item.cName}
                  >
                    <div className="admin-link" onClick={() => item.func()}>
                      {item.icon}
                      <span>{item.title}</span>
                    </div>
                  </motion.li>
                );
              })}

            {currentUser?.role === Role.ADMIN && (
              <>
                <hr />
                <li className="nav-text">
                  <div className="admin" onClick={showAdmin}>
                    <RiAdminFill />
                    <span>Admin</span>
                    {toggleAdmin ? (
                      <MdKeyboardArrowUp className="admin__icon" />
                    ) : (
                      <MdKeyboardArrowDown className="admin__icon" />
                    )}
                  </div>
                </li>

                {toggleAdmin &&
                  adminMenu.map((item, index) => {
                    return (
                      <motion.li
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        key={index}
                        className={item.cName}
                      >
                        <NavLink className="admin-link" to={item.path}>
                          {item.icon}
                          <span>{item.title}</span>
                        </NavLink>
                      </motion.li>
                    );
                  })}
              </>
            )}
          </ul>
        </nav>
        <EditAccount user={selectedAccount} ref={editComponent} />
        <ChangePassword
          password={selectPassword}
          ref={changePasswordComponent}
        />
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
