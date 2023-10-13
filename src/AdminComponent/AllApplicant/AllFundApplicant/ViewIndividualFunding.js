import axios from 'axios';
import React, { useEffect, useImperativeHandle, useState } from 'react'
import { forwardRef } from 'react'
import { Modal } from 'react-bootstrap';
import { authHeader } from '../../../services/BaseService';
import BASE_URL from '../../../services/Constant';

const ViewIndividualFunding = forwardRef((props, ref) => {
      const [show, setShow] = useState(false);
      const [viewFund, setViewFund] = useState([]);

     useImperativeHandle(ref, () => ({
       showIndividualFunding() {
         setTimeout(() => {
           setShow(true);
         }, 0);
       },
     }));
    
    useEffect(() => {
      axios
        .get(`${BASE_URL}/funding/each/${props.viewFund.fundingId}`, {
          headers: authHeader(),
        })
        .then((resp) => {
          setViewFund(resp.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [props.viewFund.fundingId]);
    
  return (
    <Modal show={show}>
      <form>
        <div className="modal-header">
          <h5 className="modal-title">
            {" "}
            {/* View School Details of <b>{props.viewApp.firstName}</b> */}
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
              <label>First Name:</label>
              <input
                type="text"
                className="form-control"
                value={viewFund.firstName}
                // disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Last Name:</label>
              <input
                type="text"
                className="form-control"
                value={viewFund.lastName}
                // disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                value={viewFund.email}
                // disabled={true}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Currency</label>
              <input
                type="text"
                className="form-control"
                value={viewFund.currency}
                // disabled={true}
                required
              >
              </input>
            </div>
            <div className="form-group mb-3">
              <label>Amount:</label>
              <input
                type="text"
                className="form-control"
                value={viewFund.amount}
                // disabled={true}
                required
              >

              </input>
            </div>
            <div class="form-group">
              <label for="floatingTextarea2">Reason</label>

              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="floatingTextarea2"
                value={viewFund.reason}
                name="body"
                required
                style={{ height: "200px" }}
              ></textarea>
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

export default ViewIndividualFunding