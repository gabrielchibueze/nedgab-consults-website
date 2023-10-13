import React, { useImperativeHandle, useState } from 'react'
import { forwardRef } from 'react'
import { Modal } from 'react-bootstrap';
import "./DeleteBlog.css";

const DeleteBlog = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);

        useImperativeHandle(ref, () => ({
          showDeleteModal() {
            setShow(true);
          },
        }));

        const deleteProduct = () => {
          props.onConfirmed();
          setShow(false);
        };

  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title">Confirmation</h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => setShow(false)}
        ></button>
      </div>
      <div className="modal-body delete_blog_text">
        Are you sure you want to <b>Delete</b> this {props.text}?
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setShow(false)}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteProduct()}
        >
          I'm sure
        </button>
      </div>
    </Modal>
  );
});

export default DeleteBlog