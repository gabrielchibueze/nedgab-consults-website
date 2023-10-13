import React, { useState } from "react";
import "./WhoWeAre.css";
import img1 from "../../asset/a.png";
import img2 from "../../asset/grad1.jpeg";
import img3 from "../../asset/grad2.jpeg";
import img4 from "../../asset/grad3.jpeg";
import img5 from "../../asset/aboutus2-min.jpeg";
import ReachOut from "../ReachOut/ReachOut";
import Back from "../Back/Back";
import { motion } from "framer-motion";
import { useEffect } from "react";

const WhoWeAre = () => {
  const [whatWeDo, setWhatWeDo] = useState(() => {
    const saved = localStorage.getItem("whatWeDo");
    const initialValue = JSON.parse(saved);
    return initialValue === false ? initialValue : true;
  });
  const [counselling, setCounselling] = useState(() => {
    const saved = localStorage.getItem("counselling");
    const initialValue = JSON.parse(saved);
    return initialValue ? initialValue : false;
  });
  const [benefit, setBenefit] = useState(() => {
    const saved = localStorage.getItem("benefit");
    const initialValue = JSON.parse(saved);
    return initialValue ? initialValue : false;
  });

  const handleWhatWeDo = () => {
    setWhatWeDo(true);
    setCounselling(false);
    setBenefit(false);
  };

  const handleCounselling = () => {
    setCounselling(true);
    setWhatWeDo(false);
    setBenefit(false);
  };

  const handleBenefit = () => {
    setBenefit(true);
    setWhatWeDo(false);
    setCounselling(false);
  };

  useEffect(() => {
    localStorage.setItem("whatWeDo", JSON.stringify(whatWeDo));
    localStorage.setItem("counselling", JSON.stringify(counselling));
    localStorage.setItem("benefit", JSON.stringify(benefit));
  });

  return (
    <>
      <Back name="About Us" title="About Us - Who We Are?" cover={img5} />
      <div className="whoWeAre">
        <div className="whoWeAre__wrapper container">
          <div className="whoWeAre__left">
            <img src={img1} alt="" />
          </div>
          <div className="whoWeAre__right">
            <h1>Who We Are.</h1>
            <p>
              We are an education consultant company based in Nigeria who
              provide professional education consulting services to students of
              Nigeria who would like to study at High Schools, Colleges, and
              Universities in Canada, Turkey, UK, RSA, Australia, USA and other
              parts of the world.
            </p>
            <p>
              We are working closely with our partner institutes to promote
              their courses and facilities to the international market to
              recruit potential students.
            </p>
            <p>
              We have a motivated and qualified consultant team with experience
              and skills, who are delighted to help the students for their
              higher education to take right decision for prospective future by
              choosing right institution and the right course.
            </p>
          </div>
        </div>
      </div>
      <section className="swipper">
        <div className="swipper__wrapper container">
          <h1>How We Can Help You</h1>
          <p>
            Find out what we do, how we do it and how you can be part of making
            the future in Africa.
          </p>
          <div className="btn__wrapper">
            <button
              className={whatWeDo ? "details__btn active" : "details__btn"}
              onClick={handleWhatWeDo}
            >
              What we do
            </button>
            <button
              className={counselling ? "details__btn active" : "details__btn"}
              onClick={handleCounselling}
            >
              Counselling
            </button>
            <button
              className={benefit ? "details__btn active" : "details__btn"}
              onClick={handleBenefit}
            >
              Benefits
            </button>
          </div>
          <div className="details__body container">
            {whatWeDo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="details__text"
              >
                <h3>Visa Packaging, IELTS and Appointment</h3>
                <p>
                  IELTS, the International English Language Testing System, is
                  the world’s, & Nigeria’s, most popular high stakes English
                  language test designed to assess the language ability of
                  people who need to work, study, or live abroad. If you are
                  intending to do any of this, then taking an IELTS test can
                  help you make that dream come true.
                </p>
                <p>
                  The British Council offers IELTS tests in 11 locations across
                  Nigeria. Select your test date and book IELTS today. Book your
                  test at an official IELTS test centre. NedGab Consults counsel
                  and prepare you for the challenges ahead.
                </p>
              </motion.div>
            )}

            {counselling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="details__text"
              >
                <h3>Education Counselling</h3>
                <p>
                  Worldwide there are many degree programs you can follow after
                  graduating from high-school. If you are looking for a suitable
                  course orprogram and you want to make sense of all the
                  information about possible study destinations, universities,
                  courses and programs you can contact a student counselor.
                </p>
                <p>
                  It is important to get in touch with a student counselor who
                  has a good understanding of all the important facets of
                  choosing a study. They can guide you in the decision making
                  process. The student counselor might apply a test to identify
                  your interests, aptitudes and abilities.
                </p>
                <p>
                  In the next step they help you to select appropriate courses,
                  schedule subjects and choose educational programs. After the
                  selection process they help in the process of applying for the
                  university, including the motivational letter, attending open
                  days at the chosen university, preparing for entrance tests
                  etc.
                </p>
              </motion.div>
            )}

            {benefit && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.5 } }}
                className="details__text"
              >
                <h3>Services Benefits for Students</h3>
                <p>
                  Expert information on Tips for Career development
                  /Scholarships/ New opportunities / International Internships/
                  placements or Study options.
                </p>
                <p>
                  Simply Register and fill these essential details about your
                  interest areas, based on which our team will send you
                  information and connect you to an expert who will assist you
                  further.
                </p>
              </motion.div>
            )}
            <div className="img__right">
              {whatWeDo && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  src={img2}
                  alt="grad"
                />
              )}
              {counselling && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  src={img3}
                  alt="grad"
                />
              )}
              {benefit && (
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  src={img4}
                  alt="grad"
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="reach">
        <div className="reach__wrapper container">
          <div className="reach__header">
            <h2>Reach out to our team</h2>
            <p>
              We are readily available to guide you through every step of your
              journey.
            </p>
          </div>
          <div className="reach__body">
            <ReachOut
              position="Managing Partner, Nedgab"
              name="Gabriel Egwu"
              text=", is a graduate Mechanical Engineer who has over the years focused on global diversification of assets, entrepreneurship, counseling and supporting scholars. Gabriel Egwu is currently undergoing an MSc. program in Engineering management in the prestigious Northumbria University of Newcastle, United Kingdom."
            />
            <ReachOut
              position="Interim Director, Nedgab"
              name="Chinedu Egwu"
              text=", is the interim director of NedGab. He has over 7 years experience in higher education as a lecturer, human capacity developer, and mentor to so many scholars in Africa, Europe and the Americas. He has a PhD from the Federal University of Toulouse III France."
            />
            <ReachOut
              position="Public Relations and Liaison officer, Nedgab"
              name="Nwite Felix"
              text=", has a background in office organization, hospitality and offering top notch customer relationship and consolidation. To help our clients achieve their dream goals and objectives, Nwite Felix has the empathetic skill required to listen, understand, and proffer solutions to the complaints and enquiries of our clients."
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default WhoWeAre;
