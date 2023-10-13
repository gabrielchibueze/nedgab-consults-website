import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Modal } from "react-bootstrap";
import User from "../Model/User";
import axios from "axios";
import BASE_URL from "../../services/Constant";
import { authHeader } from "../../services/BaseService";

const EditAccount = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(new User("", "", "", ""));

  useImperativeHandle(ref, () => ({
    showAccountModal() {
      setTimeout(() => {
        setShow(true);
      }, 0);
    },
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);


  const editUser = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!user.firstName || !user.lastName || !user.email || !user.gender) {
      return;
    }

    axios
      .patch(`${BASE_URL}/person`, user, {
        headers: authHeader(),
      })
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Modal show={show}>
      <form
        onSubmit={(e) => editUser(e)}
        noValidate
        className={submitted ? "was-validated" : ""}
      >
        <div className="modal-header">
          <h5 className="modal-title">User Details</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShow(false)}
          >
            {" "}
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group mb-3">
            <input
              type="text"
              name="firstName"
              placeholder="FirstName"
              className="form-control"
              required
              value={user.firstName}
              onChange={(e) => handleChange(e)}
            />
            <div className="invalid-feedback">Firstname is required.</div>
          </div>

          <div className="form-group mb-3">
            <input
              type="text"
              name="lastName"
              placeholder="LastName"
              className="form-control"
              required
              value={user.lastName}
              onChange={(e) => handleChange(e)}
            />
            <div className="invalid-feedback">Lastname is required.</div>
          </div>

          <div className="form-group mb-3">
            <input
              type="email"
              name="email"
              placeholder="Product Price"
              className="form-control"
              required
              value={user.email}
              onChange={(e) => handleChange(e)}
            />
            <div className="invalid-feedback">Email is required.</div>
          </div>

          <div className="form-group mb-3">
            <select
              className="form-select form-select-md mb-3"
              aria-label=".form-select-lg example"
              required
              value={user.gender}
              name="gender"
              onChange={(e) => handleChange(e)}
            >
              <option selected disabled>
                Gender
              </option>
              <option value="MALE">Male</option>
              <option value="Female">Female</option>
            </select>
            <div className="invalid-feedback">Gender is required.</div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShow(false)}
          >
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
});

export default EditAccount;
