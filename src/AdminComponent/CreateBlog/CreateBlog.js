import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Blog from "../../components/Model/Blog";
import { authHeader } from "../../services/BaseService";
import BASE_URL from "../../services/Constant";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CreateBlog.css";

const CreateBlog = () => {
  const [blogPost, setBlogPost] = useState(new Blog("", "", ""));
  const [pending, setPending] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBlogPost((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const sendBlog = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setPending(true);
    if (!blogPost.link || !blogPost.title || !blogPost.body) {
      return;
    }
    axios
      .post(`${BASE_URL}/blogs`, blogPost, {
        headers: authHeader(),
      })
      .then((resp) => {
        setSuccessStatus(true);
        setTimeout(() => {
          if (resp.status === 200) {
            toast.success("Blog Posted Successfully!", {
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
      })
      .catch((error) => {
        setErrorStatus(true);
              toast.error("Unexpected Error.", {
                position: "top-right",
                autoClose: 4000,
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
          setBlogPost(new Blog("", "", ""));
          setSubmitted(false)
          setSuccessStatus(false);
      }
      setErrorStatus(false);
    }, 4000);
  }, [successStatus, errorStatus]);

   useEffect(() => {
     setTimeout(() => {
       if (pending) {
         setPending(false);
       }
     }, 4000);
   }, [pending]);
    
  return (
    <div className="createBlog">
      <div className="createBlog__wrapper container">
        <h1>Write a blog</h1>

        <form
          onSubmit={(e) => sendBlog(e)}
          className={submitted ? "was-validated" : ""}
        >
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
          <div className="form-floating mb-3 has-validation">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="link"
              required
              value={blogPost.link}
              onChange={(e) => handleChange(e)}
              placeholder="Enter image link"
            />
            <label for="floatingInput">Enter image link</label>
            <div class="invalid-feedback">Please choose a username.</div>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              value={blogPost.title}
              name="title"
              required
              onChange={(e) => handleChange(e)}
              placeholder="Enter Blog Title"
            />
            <label for="floatingInput">Enter Blog Title</label>
            <div class="invalid-feedback">Please choose a username.</div>
          </div>
          <div class="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              value={blogPost.body}
              name="body"
              required
              onChange={(e) => handleChange(e)}
              style={{ height: "500px" }}
            ></textarea>
            <label for="floatingTextarea2">Content</label>
          </div>

          <button className="btn" disabled={pending} type="submit">
            {pending ? (
              <div
                className="spinner-border text-white spinner-border-sm"
                role="status"
              ></div>
            ) : (
              <>
                <span className="sr-only">Submit</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
