import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { authHeader } from "../../services/BaseService";
import BASE_URL from "../../services/Constant";
import ViewFullIndividualApplication from "./ViewFullIndividualApplication/ViewFullIndividualApplication";
import { motion } from "framer-motion";


const AllMySchool = () => {
  const [search, setSearch] = useState("");
  const [application, setAppliation] = useState([]);
  const [viewApp, setViewApp] = useState("");

  const currentUser = useSelector((state) => state.user);

  const viewFullApplicationComponent = useRef();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/application/${currentUser.id}`, {
        headers: authHeader(),
      })
      .then((resp) => {
        setAppliation(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  const viewFullApplication = (item) => {
    setViewApp(item);
    viewFullApplicationComponent.current?.showFullApplication();
  };
  return (
    <>
      {application.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1000 } }}
          className="card mt-4 viewUsers"
        >
          <div className="card-header d-flex justify-content-between p-4">
            <div className="col-6">
              <h3>View All Your Appliation</h3>
            </div>
            <div className="col-4 text-end">
              <input
                type="text"
                placeholder="Search School"
                className="form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="card-body">
            <table className="table table-striped col-md:table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  {/* <th scope="col">Date Applied</th> */}
                  <th scope="col">Name</th>
                  <th scope="col">Country of Residence</th>
                  <th scope="col">State of Residence</th>
                  <th scope="col">Zip Code</th>
                  <th scope="col">Country of School</th>
                  <th scope="col">City of School</th>
                  <th scope="col">School Name</th>
                </tr>
              </thead>
              <tbody>
                {application
                  .filter((val) =>
                    val.schoolName.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item, index) => (
                    <tr key={item.id} onClick={() => viewFullApplication(item)}>
                      <th scope="row">{index + 1}</th>
                      <td>{`${item.firstName} ${item.lastName}`}</td>
                      <td>{item.countryOfResidence}</td>
                      <td>{item.stateOfResidence}</td>
                      <td>{item.zipCode}</td>
                      <td>{item.country}</td>
                      <td>{item.city}</td>
                      <td>{item.schoolName}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : (
        <div className="container applicationZero">
          <h2>You don't have any school Application yet</h2>
        </div>
      )}

      <ViewFullIndividualApplication
        viewApp={viewApp}
        ref={viewFullApplicationComponent}
      />
    </>
  );
};

export default AllMySchool;
