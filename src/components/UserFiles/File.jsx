import axios from "axios";
// import "./Dashboard.css"
import React, { useState } from "react";
import { useEffect } from "react";
import { authHeader } from "../../services/BaseService";
import BASE_URL from "../../services/Constant";
import { useSelector } from "react-redux";
import NewFile from "./NewFile";

import Download from "./Download";
const File = () => {

  const [docs, setDocs] = useState([])
  const [message, setMessage] = useState();
  const currentUser = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/files/${1}`, {
        headers: authHeader(),
      })
      .then((resp) => {
        console.log(resp)
        setDocs(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [message, currentUser.id])

  const recieveMessage = (info) => {
    if (info !== 500) {
      setMessage(info);
    }
  }

  return (
    <>
      <div className="dashboard">
        <div className="dashboard__wrapper container">
          <div className="card mt-4">
            <div className="card-header d-flex justify-content-between p-4">
              <div className="col-6">
                <h3>View All Your Files</h3>
              </div>
              <div className="col-4 text-end">
                <NewFile onGetMsg={recieveMessage} />
              </div>
            </div>

            <div className="card-body">
              <table className="table table-striped col-md:table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Document Name</th>
                    <th scope="col">Download</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <th>
                        {item.fileName}
                      </th>
                      <td><Download
                        fileId={item.fileId}
                        name={item.fileDocName}
                      /></td>
                      <td>{"Edit"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default File;
