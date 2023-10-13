import axios from "axios";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Modal } from "react-bootstrap";
import { authHeader } from "../../services/BaseService";
import BASE_URL from "../../services/Constant";

const ChangeRole = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("");
  const [successfulMessage, setSuccessfulMessage] = useState("");


  useImperativeHandle(ref, () => ({
    showRoleModal() {
      setTimeout(() => {
        setShow(true);
      }, 0);
    },
  }));

    useEffect(() => {
      setRole(props.roles);
    }, [props.roles]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setRole((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    };
  

  const changeUserRole = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/person/change_role/${props.roles.id}`, role, {
        headers: authHeader(),
      })
      .then((resp) => {
        console.log(resp);
            setTimeout(() => {
              if (resp.status === 200) {
                setSuccessfulMessage("Role Changed Successfully");
              }
            }, 2000);
            setTimeout(() => {
              if (resp.status === 200) {
                setShow(false);
     window.location.reload();

              }
            }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal show={show}>
      <form onSubmit={(e) => changeUserRole(e)}>
        <div className="modal-header">
          <h5 className="modal-title">
            {" "}
            Change The Role of <b>{props.roles.firstName}</b>
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShow(false)}
          ></button>
        </div>
        <div className="modal-body">
          {successfulMessage && (
            <div className="alert alert-success">{successfulMessage}</div>
          )}
          <div className="form-group mb-3">
            <select
              class="form-select form-select-md mb-3"
              aria-label=".form-select-lg example"
              required
              value={role.role}
              name="role"
              onChange={(e) => handleChange(e)}
            >
              <option value="ADMIN">ADMIN</option>
              <option value="USER">USER</option>
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

export default ChangeRole;
