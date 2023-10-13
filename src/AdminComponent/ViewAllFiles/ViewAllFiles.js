import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Download from "../../components/UserFiles/Download";
import { authHeader } from "../../services/BaseService";
import BASE_URL from "../../services/Constant";
import "./ViewAllFiles.css";

const ViewAllFiles = () => {
  const [doc, setDoc] = useState([]);
  const [search, setSearch] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [paginate, setPaginate] = useState({});

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

  //To fill the table on page load
  const fatchFile = () => {
    axios
      .get(
        `${BASE_URL}/files/all?email=${search}&pageNo=${pageCount}&pageSize=10`,
        {
          headers: authHeader(),
        }
      )
      .then((resp) => {
        setDoc(resp.data.content);
        setPaginate(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(
        `${BASE_URL}/files/all?email=${search}&pageNo=${pageCount}&pageSize=10`,
        {
          headers: authHeader(),
        }
      )
      .then((resp) => {
        setDoc(resp.data.content);
        setPaginate(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {doc.length > 0 ? (
        <>
          <div className="viewAllFiles">
            <div className="viewAllFiles__wrapper container">
              <div className="card mt-4">
                <div className="card-header d-flex justify-content-between p-4">
                  <div className="col-6">
                    <h3>All Files</h3>
                  </div>
                  <div className="col-4 text-end d-flex gap-2">
                    <input
                      type="text"
                      placeholder="Search by mail"
                      className="form-control"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn" onClick={fatchFile}>
                      Search
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">File Type</th>
                        <th scope="col">File Document Name</th>
                        <th scope="col">Download</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doc
                        .filter((val) =>
                          val.email.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{`${item.firstName} ${item.lastName}`}</td>
                            <td>{item.email}</td>
                            <td className="fileName">
                              {item.fileName.replace("_", " ")}
                            </td>
                            <td>{item.fileDocName}</td>
                            <td className="download">
                              <Download fileId={item.fileId} />
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
          <h2>No File Uploaded by user yet</h2>
        </div>
      )}
    </>
  );
};

export default ViewAllFiles;
