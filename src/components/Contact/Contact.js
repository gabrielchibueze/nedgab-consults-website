import React, { useEffect, useState } from "react";
import Back from "../Back/Back";
import "./Contact.css";
import img from "../../asset/pricing.jpg";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";

const Contact = () => {
  const [pending, setPending] = useState(false);

  const sendMail = (e) => {
    e.preventDefault();
    setPending(true);

    emailjs
      .sendForm(
        "service_94y9fxt",
        "template_82tmapo",
        e.target,
        "p_7iZrCxkQZF0Bm-G"
      )
      .then(
        (result) => {
          console.log(result.text);
          setTimeout(() => {
            toast.success("Message Sent Successfully.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }, 2000);
          setTimeout(() => {
            e.target.reset();
          }, 3000);
        },
        (error) => {
          console.log(error.text);
          setTimeout(() => {
            toast.error("Unexpected Error.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }, 2000);
        }
      );
  };

  useEffect(() => {
    setTimeout(() => {
      if (pending) {
        setPending(false);
      }
    }, 4000);
  }, [pending]);

  return (
    <>
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
      <Back
        name="Contact Us"
        title="Get Help & Friendly Support"
        cover={img}
      />
      <div className="contact container">
        <form className="contact__shadow" onSubmit={(e) => sendMail(e)}>
          <h4>Contact Us</h4> <br />
          <div>
            <input type="text" placeholder="Full Name" name="name" required />
            <input type="text" placeholder="Email" name="email" required />
          </div>
          <input
            type="text"
            placeholder="Subject of Your Message"
            name="subject"
            required
          />
          <textarea
            placeholder="Type Message"
            cols="30"
            rows="10"
            name="message"
            required
          ></textarea>
          <button type="submit">
            {" "}
            {pending ? (
              <div className="spinner-border text-white" role="status"></div>
            ) : (
              <span className="sr-only"> Submit</span>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
