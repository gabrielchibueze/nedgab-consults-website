import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { authHeader } from "../../../services/BaseService";
import BASE_URL from "../../../services/Constant";
import ViewSchoolividualApplication from "./ViewSchoolividualApplication";
import { motion } from "framer-motion";


const AllSchoolApplicant = () => {
  const [search, setSearch] = useState("");
  const [allSchoolApplicant, setSchoolApplicant] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [paginate, setPaginate] = useState({});
  const [viewSchool, setViewSchool] = useState("");

  const viewFullApplicationComponent = useRef();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/application/all?pageNo=${pageCount}&pageSize=10`, {
        headers: authHeader(),
      })
      .then((resp) => {
        setSchoolApplicant(resp.data.content);
        setPaginate(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageCount]);

  const viewFullApplication = (item) => {
    setViewSchool(item);
    viewFullApplicationComponent.current?.showFullApplication();
  };

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const increasePage = () => {
    if (paginate.last) {
      setPageCount((prevState) => {
        return prevState;
      });
    } else {
      setPageCount((prevState) => {
        return prevState + 1;
      });
    }
  };

  const decreasePage = () => {
    if (pageCount === 0) {
      setPageCount((prevState) => {
        return prevState;
      });
    } else {
      setPageCount((prevState) => {
        return prevState - 1;
      });
    }
  };
  return (
    <>
      {allSchoolApplicant.length > 0 ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1000 } }}
            className="viewUsers"
          >
            <div className="viewUsers__wrapper container">
              <div className="card mt-4">
                <div className="card-header d-flex justify-content-between p-4">
                  <div className="col-6">
                    <h3>All Funding Request</h3>
                  </div>
                  <div className="col-4 text-end">
                    <input
                      type="text"
                      placeholder="Search by mail"
                      className="form-control"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Country of School</th>
                        <th scope="col">City of School</th>
                        <th scope="col">School Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allSchoolApplicant
                        .filter((val) =>
                          val.email.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((item, index) => (
                          <tr
                            key={item.id}
                            onClick={() => viewFullApplication(item)}
                          >
                            <th scope="row">{index + 1}</th>
                            <td>{item.firstName + " " + item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.country}</td>
                            <td>{item.city}</td>
                            <td>{item.schoolName}</td>
                            <td>
                              <CurrencyFormat
                                renderText={(value) => <b>{value}</b>}
                                decimalScale={2}
                                value={item.amount}
                                displayType={"text"}
                                thousandSeparator={true}
                              />
                            </td>
                            <td>{truncate(item.reason, 10)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
          <nav className="container d-flex justify-content-end mt-3 ">
            <ul className="pagination">
              <li className="page-item">
                <div onClick={decreasePage} className="page-link">
                  <span aria-hidden="true">&laquo;</span>
                </div>
              </li>
              <li className="page-item">
                <div className="page-link">
                  {pageCount + 1 + " "}
                  of
                  {" " + paginate.totalPages}
                </div>
              </li>
              <li className="page-item">
                <div onClick={increasePage} className="page-link">
                  <span aria-hidden="true">&raquo;</span>
                </div>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <div className="container applicationZero">
          <h2>No Fund Applicant</h2>
        </div>
      )}
      <ViewSchoolividualApplication
        viewSchool={viewSchool}
        ref={viewFullApplicationComponent}
      />
    </>
  );
};

export default AllSchoolApplicant;
