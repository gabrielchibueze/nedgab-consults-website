import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { authHeader } from "../../../services/BaseService";
import BASE_URL from "../../../services/Constant";
import "./AllFundsApplicant.css";
import ViewIndividualFunding from "./ViewIndividualFunding";
import { motion } from "framer-motion";


const AllFundsApplicant = () => {
  const [search, setSearch] = useState("");
  const [allFunding, setAllFunding] = useState([]);
  const [pageCount, setPageCount] = useState(0);
    const [paginate, setPaginate] = useState({});
    const [viewFund, setViewFund] = useState("");

      const viewIndividualFundingComponent = useRef();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/funding/all?pageNo=${pageCount}&pageSize=10`, {
        headers: authHeader(),
      })
      .then((resp) => {
        setAllFunding(resp.data.content);
        setPaginate(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageCount]);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };
    
      const viewIndividualFunding = (item) => {
        setViewFund(item);
        viewIndividualFundingComponent.current?.showIndividualFunding();
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
      {allFunding.length > 0 ? (
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
                        {/* <th scope="col">LastName</th> */}
                        <th scope="col">Email</th>
                        <th scope="col">UserId</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allFunding
                        .filter((val) =>
                          val.email
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                        .map((item, index) => (
                          <tr
                            key={item.id}
                            onClick={() => viewIndividualFunding(item)}
                          >
                            <th scope="row">{index + 1}</th>
                            <td>{item.firstName + " " + item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.personId}</td>
                            <td>{item.currency}</td>
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
      <ViewIndividualFunding
        viewFund={viewFund}
        ref={viewIndividualFundingComponent}
      />
    </>
  );
};

export default AllFundsApplicant;
