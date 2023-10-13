import React, { useEffect, useState } from "react";
import "./ApplyForFunding.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "../../services/Constant";
import { authHeader } from "../../services/BaseService";

const ApplyForFunding = () => {
  const currentUser = useSelector((state) => state.user);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const [apply, setApply] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    amount: "",
    currency: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setApply((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const applyFunding = (e) => {
    e.preventDefault();
    setPending(true);

    axios
      .post(`${BASE_URL}/funding/apply`, apply, {
        headers: authHeader(),
      })
      .then(() => {
        setSuccessStatus(true);
        setTimeout(() => {
          toast.success("Applied Successfully", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }, 2000);
      })
      .catch((error) => {
        setErrorStatus(true);
        toast.error("Unexpected Error", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error(error);
      });
  };
    
      useEffect(() => {
        setTimeout(() => {
          if (successStatus) {
            setApply({
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
              email: currentUser.email,
              amount: "",
              currency: "",
              reason: "",
            });
            setSubmitted(false);
            setSuccessStatus(false);
          }
          setErrorStatus(false);
        }, 5000);
        // eslint-disable-next-line
      }, [successStatus, errorStatus]);
    
      useEffect(() => {
        setTimeout(() => {
          if (pending) {
            setPending(false);
          }
        }, 4000);
      }, [pending]);
    
  return (
    <div className="applyForSchool">
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
      <div className="applyForFunding__wrapper container">
        <div className="applyForFunding__content funding">
          <h1>Apply For Funding</h1>
          <form
            onSubmit={(e) => applyFunding(e)}
            className={submitted ? "was-validated" : ""}
          >
            <div className="form__wrapper">
              <div className="form__group">
                <label>First Name:</label>
                <input
                  type="text"
                  placeholder="Enter your firstname"
                  className="form-control"
                  value={apply.firstName}
                  name="firstName"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form__group">
                <label>Last Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your lastname"
                  value={apply.lastName}
                  name="lastName"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form__group">
                <label>Email:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={apply.email}
                  name="email"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form__group">
                <label>Currency:</label>
                <select
                  required
                  className="form-control"
                  value={apply.currency}
                  name="currency"
                  onChange={(e) => handleChange(e)}
                >
                  <option>--Select Currency--</option>
                  <option value="NAIRA">NAIRA</option>
                  <option value="DOLLAR">USD</option>
                  <option value="POUNDS">POUNDS</option>
                  <option value="EURO">EURO</option>
                </select>
              </div>
            </div>
            <div className="form__group textarea_wrapper">
              <label>Amount:</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your amount"
                value={apply.amount}
                name="amount"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-group textarea_wrapper">
              <label>Reason:</label>
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                value={apply.reason}
                name="reason"
                required
                onChange={(e) => handleChange(e)}
                style={{ height: "200px" }}
              ></textarea>
            </div>
            <button type="submit">
              {pending ? (
                <div
                  className="spinner-border text-white spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                <>
                  <span className="sr-only">Apply</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyForFunding;
