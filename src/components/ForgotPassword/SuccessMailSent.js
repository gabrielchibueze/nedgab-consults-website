import React from 'react'
import { Link } from 'react-router-dom';
import {IoMdCheckmarkCircle} from "react-icons/io"

const SuccessMailSent = () => {
    return (
      //NOTE THAT I REUSED THE STYLYING FOR FORGOT PASSWORD
      <div className="forgotPassword">
        <div className="forgotPassword__wrapper container">
          <div className="forgetPassword__content successMail">
            <div>
              <IoMdCheckmarkCircle />
            </div>
            <p>Check your mail for your new Password</p>
            <div className="forgetPassword__text ">
              <Link to="/login">Back to login page</Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SuccessMailSent