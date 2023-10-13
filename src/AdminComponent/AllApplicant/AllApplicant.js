import React, { useState } from 'react'
import { Dropdown, DropdownButton } from "react-bootstrap";
import AllFundsApplicant from './AllFundApplicant/AllFundsApplicant';
import AllSchoolApplicant from './AllSchoolApplicant/AllSchoolApplicant';


const AllApplicant = () => {
    const [schoolApplication, setSchoolApplication] = useState(true);
    const [fundApplication, setFundApplication] = useState(false);

      const handleSchoolApplication = () => {
        setSchoolApplication(true);
        setFundApplication(false);
      };

      const handleFundApplication = () => {
        setFundApplication(true);
        setSchoolApplication(false);
      };
    
     const data = [
       {
         title: "View School Application",
         func: handleSchoolApplication,
       },
       {
         title: "View Fund Application",
         func: handleFundApplication,
       },
     ];
  return (
    <>
      {" "}
      <div className="dashboard">
        <div className="dashboard__wrapper container">
          <div className="dashboard__btn-wrapper">
            {schoolApplication && (
              <DropdownButton
                className="btn mt-5"
                id="dropdown-basic-button"
                title={"View School Application"}
              >
                {data.map(({ title, func }) => (
                  <>
                    <Dropdown.Item onClick={func}>{title}</Dropdown.Item>
                  </>
                ))}
              </DropdownButton>
            )}
            {fundApplication && (
              <DropdownButton
                className="btn mt-5"
                id="dropdown-basic-button"
                title={"View Fund Application"}
              >
                {data.map(({ title, func }) => (
                  <>
                    <Dropdown.Item onClick={func}>{title}</Dropdown.Item>
                  </>
                ))}
              </DropdownButton>
            )}
          </div>
          {schoolApplication && <AllSchoolApplicant />}
          {fundApplication && <AllFundsApplicant />}
        </div>
      </div>
    </>
  );
}

export default AllApplicant