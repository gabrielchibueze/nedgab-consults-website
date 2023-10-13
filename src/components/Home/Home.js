import React from "react";
import "./Home.css";
import { MdSchool } from "react-icons/md";
import { SiYourtraveldottv } from "react-icons/si";
import { MdPeople } from "react-icons/md";
import img1 from "../../asset/image2-min.jpeg";
import img2 from "../../asset/Union.png"
import { Link } from "react-router-dom";


const Home = () => {
   const mobile = window.innerWidth >= 789 ? true : false;
  return (
    <>
      <div className="home">
        <div className="home_wrapper containers container">
          <h1>Get Your Journey Started With Professionals </h1>
          <p>
            Quality education assured through better consultation. At Nedgab
            consults, we ensure that you achieve your potentials through quality
            education abroad and locally.
          </p>
          <div className="home_button-wrapper">
            <button>
              <Link to="/whoWeAre">Learn More</Link>
            </button>
            <button>
              <Link to="/dashboard">Dashboard</Link>
            </button>
          </div>
        </div>
      </div>
      <div className="home_about container">
        <div className="home_about-content">
          <MdSchool className="icon" />
          <h4>Admission Guide</h4>
          <p>
            Applications are still presently being processed by Universities and
            Colleges in Ireland and UK. The duration for masters in both UK and
            Ireland is one year.
          </p>
        </div>
        <div className="home_about-content">
          <SiYourtraveldottv className="icon" />
          <h4>Visa Guide</h4>
          <p>
            Applications are still presently being processed by Universities and
            Colleges in Ireland and UK. The duration for masters in both UK and
            Ireland is one year.
          </p>
        </div>
        <div className="home_about-content">
          <MdPeople className="icon" />
          <h4>Consultation</h4>
          <p>
            At NedGab consults, counselors are highly trained and experienced, and
            are standing by to help you through this difficult decision. Your
            counselor will talk to you and gain a full understanding of your
            needs and motivations for study as well as your ultimate goals.
          </p>
        </div>
      </div>
      <section>
        <div className="sectionTwo container">
          <div className="sectionTwo_left ">
            <img src={img1} alt="student" />
          </div>
          <div className="sectionTwo_right">
            <h4>Why Nedgab Consult?</h4>
            <div className="sectionTwo_flex">
              <div className="flex">
                <h5>Country Selection</h5>
                <p>
                  Nedgab Consult makes all the difference to you here. We will
                  provide you with unbiased information on all the countries
                  that we provide services and steer you in the right direction
                  – North for USA, West for UK!
                </p>
              </div>
              <div className="flex">
                <h5>Career Counseling</h5>
                <p>
                  Obviously, the main purpose of education is to achieve career
                  goals. Unless the ‘career’ is carefully charted, education’s
                  value is lost. At Nedgab Consult, we not only guide students
                  to plan their education but also direct their ideas towards
                  career planning.
                </p>
              </div>
              <div className="flex">
                <h5>Scholarship Assistance</h5>
                <p>
                  Scholarships and financial aid are given to meritorious
                  International students, by the respective colleges or
                  universities. There are several foundations which also
                  consider some form of aid award based on the academic
                  performance.
                </p>
              </div>
              <div className="flex">
                <h5>Travel Services</h5>
                <p>
                  Nedgab Consult has a well co-coordinated Travel Desk that
                  offers the Following services to students. Nedgab Consult
                  staffs are eager to help you with information and assistance
                  in obtaining temporary accommodation.
                </p>
              </div>
            </div>
            <div className="sectionTwo_right-bottom">
              <h4>
                Most university offer post-graduate scholarships for masters
                degrees.
              </h4>
              <p>
                while some also offer undergraduate Scholarships for foundations
                courses and bachelor degrees. Each university has different
                schoolarship, so make sure you consider your options arefully
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="sectionThree">
        <div className="sectionThree-wrapper container">
          <h4>Trusted by over 1,500 Students</h4>
          <Link to="/dashboard">
            <button>Get Started</button>
          </Link>
        </div>
      </section>
      <section className="sectionFour container">
        <div className="sectionFour-wrapper ">
          <div className="sectionFour-wrapper-text">
            <h4>
              Ready for your own
              {mobile && <br />} Adventure?
            </h4>
            <p>
              Apply and get your dream come true. Quality Education Assured
              Through Better Consultation At Nedgab Consults, We Ensure That You
              Achieve Your Potentials Through Quality Education Abroad And
              Locally.
            </p>
            <Link to="/dashboard">
              <button>Get Started</button>
            </Link>
          </div>
          <div className="sectionFour-wrapperImg ">
            <img src={img2} alt="friends" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
