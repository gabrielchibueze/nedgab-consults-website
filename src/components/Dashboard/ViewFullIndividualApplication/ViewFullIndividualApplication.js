import axios from "axios";
import React, { useEffect, useImperativeHandle, useState } from "react";
import { forwardRef } from "react";
import { Modal } from "react-bootstrap";
import { authHeader } from "../../../services/BaseService";
import BASE_URL from "../../../services/Constant";

const ViewFullIndividualApplication = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [viewApp, setViewApp] = useState([]);

  useImperativeHandle(ref, () => ({
    showFullApplication() {
      setTimeout(() => {
        setShow(true);
      }, 0);
    },
  }));

  useEffect(() => {
    axios
      .get(`${BASE_URL}/application/school/${props.viewApp.id}`, {
        headers: authHeader(),
      })
      .then((resp) => {
        setViewApp(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.viewApp.id]);
  return (
    <Modal show={show}>
      <form>
        <div className="modal-header">
          <h5 className="modal-title">
            {" "}
            View School Details of <b>{props.viewApp.firstName}</b>
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShow(false)}
          ></button>
        </div>
        <div className="modal-body">
          <>
            <div className="form-group mb-3">
              <label>Name:</label>
              <input
                type="text"
                className="form-control"
                value={viewApp.firstName + " " + viewApp.lastName}
                disabled={true}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                value={viewApp.email}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Mobile Number:</label>
              <input
                type="text"
                className="form-control"
                value={viewApp.phone}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Country of Residence:</label>
              <input
                type="text"
                className="form-control"
                value={viewApp.countryOfResidence}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>City of Residence:</label>
              <input
                type="text"
                className="form-control"
                value={viewApp.stateOfResidence}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Zip Code :</label>
              <input
                type="text"
                className="form-control"
                value={viewApp.zipCode}
                disabled={true}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Country of School:</label>
              <input
                type="text"
                className="form-control"
                value={viewApp.country}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>City of School:</label>
              <input
                type="text"
                className="form-control"
                value={viewApp.city}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Name of School:</label>
              <input
                type="text"
                className="form-control"
                value={viewApp.schoolName}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Course:</label>
              <input
                type="text"
                className="form-control"
                value={viewApp.course}
                disabled={true}
                required
              />
            </div>
          </>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShow(false)}
          >
            Close
          </button>
        </div>
      </form>
    </Modal>
  );
});

export default ViewFullIndividualApplication;
