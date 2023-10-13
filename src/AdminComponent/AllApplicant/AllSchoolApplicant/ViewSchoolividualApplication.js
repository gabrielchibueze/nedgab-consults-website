import axios from 'axios';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { authHeader } from '../../../services/BaseService';
import BASE_URL from '../../../services/Constant';
import { Modal } from "react-bootstrap";


const ViewSchoolividualApplication = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);
    const [viewSchool, setViewSchool] = useState([]);


  useImperativeHandle(ref, () => ({
    showFullApplication() {
      setTimeout(() => {
        setShow(true);
      }, 0);
    },
  }));
    
     useEffect(() => {
       axios
         .get(`${BASE_URL}/application/school/${props.viewSchool.id}`, {
           headers: authHeader(),
         })
         .then((resp) => {
           setViewSchool(resp.data);
         })
         .catch((error) => {
           console.log(error);
         });
     }, [props.viewSchool.id]);
    
    
  return (
    <Modal show={show}>
      <form>
        <div className="modal-header">
          <h5 className="modal-title">
            {" "}
            View School Details of <b>{props.viewSchool.firstName}</b>
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
                value={viewSchool.firstName + " " + viewSchool.lastName}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                value={viewSchool.email}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Mobile Number:</label>
              <input
                type="text"
                className="form-control"
                value={viewSchool.phone}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Country of Residence:</label>
              <input
                type="text"
                className="form-control"
                value={viewSchool.countryOfResidence}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>City of Residence:</label>
              <input
                type="text"
                className="form-control"
                value={viewSchool.stateOfResidence}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Zip Code :</label>
              <input
                type="text"
                className="form-control"
                value={viewSchool.zipCode}
                disabled={true}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label>Country of School:</label>
              <input
                type="text"
                className="form-control"
                value={viewSchool.country}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>City of School:</label>
              <input
                type="text"
                className="form-control"
                value={viewSchool.city}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Name of School:</label>
              <input
                type="text"
                className="form-control"
                value={viewSchool.schoolName}
                disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Course:</label>
              <input
                type="text"
                className="form-control"
                value={viewSchool.course}
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

export default ViewSchoolividualApplication