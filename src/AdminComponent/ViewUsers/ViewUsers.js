import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import BASE_URL from "../../services/Constant";
import { authHeader } from "../../services/BaseService";
import "./ViewUsers.css";
import { useRef } from "react";
import ChangeRole from "../ChangeRole/ChangeRole";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [paginate, setPaginate] = useState({});

  const changeRoleComponent = useRef();
  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/person/getAllPersons?pageNo=${pageCount}&pageSize=10&sortBy=firstName&sortDir=asc`,
        {
          headers: authHeader(),
        }
      )
      .then((resp) => {
        setUsers(resp.data.content);
        setPaginate(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageCount]);

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

  const changeRole = (item) => {
    setRole(item);
    changeRoleComponent.current?.showRoleModal();
  };

  return (
    <>
      {users.length > 0 ? (
        <>
          <div className="viewUsers">
            <div className="viewUsers__wrapper container">
              <div className="card mt-4">
                <div className="card-header d-flex justify-content-between p-4">
                  <div className="col-6">
                    <h3>All Users</h3>
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
                        <th scope="col">FirstName</th>
                        <th scope="col">LastName</th>
                        <th scope="col">Email</th>
                        <th scope="col">UserId</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users
                        .filter((val) =>
                          val.email.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((item, index) => (
                          <tr key={item.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.id}</td>
                            <td>{item.gender}</td>
                            <td
                              className="role"
                              onClick={() => changeRole(item)}
                            >
                              {item.role}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
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
          <h2>No User yet</h2>
        </div>
      )}

      <ChangeRole roles={role} ref={changeRoleComponent} />
    </>
  );
};

export default ViewUsers;
