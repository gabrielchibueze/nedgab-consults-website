import React, { useEffect, useState } from "react";
import "./Login.css";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import User from "../Model/User";
import BASE_URL from "../../services/Constant";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BiMailSend } from "react-icons/bi";
import { setCurrentUser } from "../../store/actions/user";
import logo from "../../asset/logo2.png";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
  const [user, setUser] = useState(new User("", "", "", "", "", ""));
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser?.userId) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  const togglePasswordView = () => {
    setTogglePassword(!togglePassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setPending(true);

    if (!user.email || !user.password) {
      setMessage("Please fill out all input");
      return;
    }
    axios
      .post(`${BASE_URL}/acc/login`, user)
      .then((resp) => {
        dispatch(setCurrentUser(resp.data));
        setTimeout(() => {
          if (resp.status === 200) {
            toast.success("Login Successful.", {
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
          navigate("/dashboard");
        }, 4000);
      })
      .catch((error) => {
        setPending(true);
        if (error.response.status === 401) {
          toast.error("Email or password incorrect.", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else if (error.response.status === 400) {
          toast.error("Incorrect Password", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.error("Unexpected Error.", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        console.error(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (message || pending) {
        setPending(false);
        setMessage("");
      }
    }, 5000);
  }, [message, pending]);

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
      <div className="login__wrapper container">
        <form onSubmit={(e) => handleLogin(e)}>
          {message && <div className="alert alert-danger">{message + "!"}</div>}
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <h1>Please sign in</h1>
          <div className="form-float first_child">
            <BiMailSend />
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={user.email}
              name="email"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-float second_child">
            <div onClick={togglePasswordView} style={{ cursor: "pointer" }}>
              {togglePassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
            </div>
            <input
              type={togglePassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              value={user.password}
              name="password"
              required
              onChange={(e) => handleChange(e)}
            />
          </div>
          <Link to="/forgotPassword" className="forgot_password">
            Forgot Password
          </Link>
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
                  <span className="sr-only">SignIn</span>
                </>
              )}
            </button>
          </div>
          <Link to="/signup">
            <p>I don't have an account</p>
          </Link>
          <p className="p">&copy; {new Date().getFullYear()}</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
