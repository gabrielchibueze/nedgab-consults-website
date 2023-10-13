import React, { useEffect, useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { FaGgCircle } from "react-icons/fa";
import { BiMailSend, BiUserCircle } from "react-icons/bi";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import User from "../Model/User";
import BASE_URL from "../../services/Constant";
import logo from "../../asset/logo2.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [user, setUser] = useState(new User("", "", "", "", "", ""));
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [togglePasswordConfirm, setTogglePasswordConfirm] = useState(false);
  const navigate = useNavigate();

  const togglePasswordView = () => {
    setTogglePassword(!togglePassword);
  };

  const toggleConfirmPasswordView = () => {
    setTogglePasswordConfirm(!togglePasswordConfirm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setPending(true);

    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.gender ||
      !user.password
    ) {
      toast.error("Please fill out all input", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (user.password !== confirmPassword) {
      toast.error("Please reconfirm your password", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (user.password.length < 8) {
      toast.error("Password should not be less than 8 characters", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    axios
      .post(`${BASE_URL}/person`, user)
      .then((resp) => {
        setTimeout(() => {
          if (resp.status === 200) {
            toast.success("Signup Successful.", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }, 2000);

        setTimeout(() => {
          navigate("/login");
        }, 4000);
      })
      .catch((error) => {
        // setMessage(error.response.data);
        toast.error(error.response.data, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        if (error.response.status === 500) {
          toast.error("Email already exist.", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (pending) {
        setPending(false);
      }
    }, 5000);
  }, [pending]);

  return (
    <div className="login">
      <ToastContainer
        theme="colored"
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
      <div className="login__wrapper signUp__right  container">
        <form onSubmit={(e) => handleRegister(e)}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <h1>Sign up</h1>
          <div className="form-group">
            <BiUserCircle />
            <input
              type="text"
              placeholder="Firstname"
              value={user.firstName}
              name="firstName"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <BiUserCircle />
            <input
              type="text"
              required
              placeholder="Lastname"
              value={user.lastName}
              name="lastName"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <BiMailSend />
            <input
              type="email"
              required
              placeholder="Email"
              value={user.email}
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <FaGgCircle />
            <select
              required
              value={user.gender}
              name="gender"
              onChange={(e) => handleChange(e)}
            >
              <option>--Select Gender--</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div className="form-group">
            <div onClick={togglePasswordView} style={{ cursor: "pointer" }}>
              {togglePassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
            </div>
            <input
              required
              type={togglePassword ? "text" : "password"}
              placeholder="Password"
              value={user.password}
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <div
              onClick={toggleConfirmPasswordView}
              style={{ cursor: "pointer" }}
            >
              {togglePasswordConfirm ? (
                <BsFillEyeFill />
              ) : (
                <BsFillEyeSlashFill />
              )}
            </div>
            <input
              required
              type={togglePasswordConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
            />
          </div>
          <div>
            <button
              className="w-100 btn btn-lg btn-primary"
              disabled={pending}
              type="submit"
            >
              {pending ? (
                <div
                  className="spinner-border text-white spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                <>
                  <span className="sr-only">Sign Up</span>
                </>
              )}
            </button>
            <Link to="/login">
              <p>I already have an account</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
