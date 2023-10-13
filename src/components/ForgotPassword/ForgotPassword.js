import React, { useEffect } from "react";
import "./ForgotPassword.css";
import logo from "../../asset/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "../../services/Constant";
import { BiMailSend } from "react-icons/bi";

const ForgotPassword = () => {
  const [sendMail, setSendEmail] = useState({
    email: "",
  });
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSendEmail((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setPending(true);

    axios
      .post(`${BASE_URL}/person/forgot_password`, sendMail)
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          navigate("/successMailSent");
        }
      })
      .catch((error) => {
        console.error(error);
        setTimeout(() => {
          if (error.response.status === 500) {
            toast.error("Email Not In Database.", {
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

        toast.error("Unexpected Error.", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (pending) {
        setPending(false);
      }
    }, 9000);
  }, [pending]);

  return (
    // <div className="forgotPassword">
    //   <div className="forgotPassword__wrapper container">
    //     <div className="forgetPassword__content">
    //       <Link to="/">
    //         <img src={logo} alt="logo" />
    //       </Link>
    //       <h2></h2>
    //       <form >
    //
    //         <button className="btn">
    //           {pending ? (
    //             <div className="spinner-border text-white" role="status"></div>
    //           ) : (
    //             <>
    //               <span className="sr-only">Submit</span>
    //             </>
    //           )}
    //         </button>
    //       </form>

    //     </div>
    //   </div>

    // </div>

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
        <form onSubmit={(e) => handleForgotPassword(e)}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <h1>Forgot Password</h1>

          <div className="form-float first_child ">
            <BiMailSend />
            <input
              type="email"
              required
              placeholder="Email"
              className="form-control"
              value={sendMail.email}
              name="email"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div>
            <button
              className="w-100 btn btn-lg btn-primary f-button"
              disabled={pending}
              type="submit"
            >
              {pending ? (
                <div className="spinner-border text-white" role="status"></div>
              ) : (
                <>
                  <span className="sr-only">Submit</span>
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

export default ForgotPassword;
