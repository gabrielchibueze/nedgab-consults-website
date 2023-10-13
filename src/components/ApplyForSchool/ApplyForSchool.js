import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Apply from "../Model/Apply";
import "./ApplyForSchool.css";
import { useSelector } from "react-redux";
import BASE_URL from "../../services/Constant";
import { authHeader } from "../../services/BaseService";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplyForSchool = () => {
  const currentUser = useSelector((state) => state.user);
  const [apply, setApply] = useState(
    new Apply(
      currentUser.firstName,
      currentUser.lastName,
      currentUser.email,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    )
  );
  const [disabledSchoolState, setDisabledSchoolState] = useState(true);
  const [disabledResidenceState, setDisabledResidenceState] = useState(true);
  const [country, setCountry] = useState([]);
  const [stateCountry, setStateCountry] = useState([]);
  const [countryOfResidence, setCountryOfResidence] = useState([]);
  const [stateCountryOfResidence, setStateCountryOfResidence] = useState([]);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);
  const schoolCountry = apply.country;
  const residenceCountry = apply.countryOfResidence;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setApply((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  //To fatch the country of school
  useEffect(() => {
    axios
      .get(`https://countriesnow.space/api/v0.1/countries`)
      .then((resp) => {
        setCountry(resp?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //To fatch the state of school
  useEffect(() => {
    axios
      .post(`https://countriesnow.space/api/v0.1/countries/states`, {
        country: schoolCountry,
      })
      .then((resp) => {
        setStateCountry(resp?.data?.data?.states);
        setDisabledSchoolState(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [schoolCountry]);

  //To fatch the country of residence
  useEffect(() => {
    axios
      .get(`https://countriesnow.space/api/v0.1/countries`)
      .then((resp) => {
        setCountryOfResidence(resp?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //To fatch the state of residence
  useEffect(() => {
    axios
      .post(`https://countriesnow.space/api/v0.1/countries/states`, {
        country: residenceCountry,
      })
      .then((resp) => {
        setStateCountryOfResidence(resp?.data?.data?.states);
        setDisabledResidenceState(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [residenceCountry]);

  const schoolApply = (e) => {
    e.preventDefault();
    setPending(true);
    axios
      .post(`${BASE_URL}/application/apply`, apply, {
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
        setApply(
          new Apply(
            currentUser.firstName,
            currentUser.lastName,
            currentUser.email,
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
          )
        );
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
      <div className="applyForSchhol__wrapper container">
        <div className="applyForSchhol__content">
          <h1>Apply Now</h1>
          <form
            onSubmit={(e) => schoolApply(e)}
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
            </div>

            <div className="form__wrapper">
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
                <label>Phone Number:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your number"
                  value={apply.phone}
                  name="phone"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="form__wrapper">
              <div className="form__group">
                <label>Country Of Residence:</label>
                <select
                  required
                  className="form-control"
                  name="countryOfResidence"
                  value={apply.countryOfResidence}
                  onChange={(e) => handleChange(e)}
                >
                  <option>--Country of Residence--</option>
                  {countryOfResidence?.map(({ country }, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form__group">
                <label>City of Residence:</label>
                <select
                  required
                  className="form-control"
                  name="stateOfResidence"
                  value={apply.stateOfResidence}
                  onChange={(e) => handleChange(e)}
                  disabled={disabledResidenceState}
                >
                  <option>--City of Residence--</option>
                  {stateCountryOfResidence?.map(({ name }, index) => (
                    <option value={name} key={index}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form__wrapper">
              <div className="form__group">
                <label>Zip Code:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your number"
                  value={apply.zipCode}
                  name="zipCode"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form__group">
                <label>Country of School:</label>
                <select
                  required
                  className="form-control"
                  name="country"
                  value={apply.country}
                  onChange={(e) => handleChange(e)}
                >
                  <option>--Select Country--</option>
                  {country?.map(({ country }, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form__wrapper">
              <div className="form__group">
                <label>City of School:</label>
                <select
                  required
                  className="form-control"
                  name="city"
                  value={apply.city}
                  onChange={(e) => handleChange(e)}
                  disabled={disabledSchoolState}
                >
                  <option>--Select City--</option>
                  {stateCountry?.map(({ name }, index) => (
                    <option value={name} key={index}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form__group">
                <label>Course of Study:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your course of study"
                  value={apply.course}
                  name="course"
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="form__group">
              <label>School Name:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your school"
                value={apply.schoolName}
                name="schoolName"
                required
                onChange={(e) => handleChange(e)}
              />
            </div>

            <button disabled={pending} type="submit">
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

export default ApplyForSchool;
