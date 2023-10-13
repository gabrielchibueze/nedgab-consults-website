import axios from "axios";
import "./File.css";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { authHeader } from "../../services/BaseService";
import BASE_URL from "../../services/Constant";
import { useSelector } from "react-redux";
import Download from "./Download";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import DeleteBlog from "../../AdminComponent/DeleteBlog/DeleteBlog";
import { motion } from "framer-motion";

const File = () => {
  const [docs, setDocs] = useState([]);
  const [selectedFile, setSelectedFile] = useState("");
  const [showUploadFile, setShowUploadFile] = useState(false);
  const [flag, setFlag] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileDoc, setFileDoc] = useState("");

  const deleteComponent = useRef();

  const [pending, setPending] = useState(false);

  const currentUser = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFileName(e.target.value);
  };

  const fileHandler = (e) => {
    setFileDoc(e.target.files[0]);
  };

  const showUpload = () => {
    setShowUploadFile(!showUploadFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPending(true);

    const formData = new FormData();
    formData.append("file", fileDoc);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: authHeader().authorization,
      },
    };

    if (!fileName) {
      toast.error("Select Type of Document", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return "";
    }

    const url = `${BASE_URL}/files/${fileName}`;

    axios
      .post(url, formData, config)
      .then((resp) => {
        setTimeout(() => {
          if (resp.status === 200) {
            toast.success("Login Successful.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }, 2000);
        //Clear the select and input field
        setTimeout((e) => {
          setFlag(!flag);
          setFileName("");
          document.getElementById("myFile").value = "";
        }, 4000);
      })
      .catch((error) => {
        toast.error("Unexpected Error", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/files/${currentUser.id}`, {
        headers: authHeader(),
      })
      .then((resp) => {
        setDocs(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, [flag]);

  const deleteFileRequest = (item) => {
    setSelectedFile(item);
    deleteComponent.current?.showDeleteModal();
  };

  const deleteFile = (item) => {
    axios
      .delete(`${BASE_URL}/files/${selectedFile.fileId}`, {
        headers: authHeader(),
      })
      .then(() => {
        setDocs(docs.filter((del) => del.fileId !== selectedFile.fileId));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (pending) {
        setPending(false);
      }
    }, 3000);
  }, [pending]);

  return (
    <>
      <div className="file">
        <ToastContainer
          theme="colored"
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Bounce}
        />
        <div className="file__wrapper container">
          <button className="btn mt-5 mb-3" onClick={showUpload}>
            Upload Document
          </button>

          {showUploadFile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
            >
              <form className="file__content" onSubmit={(e) => handleSubmit(e)}>
                <select
                  className="form-select"
                  onChange={handleChange}
                  required
                  value={fileName}
                >
                  <option>--select--</option>
                  <option value="birth certificate">Birth Certificate</option>
                  <option value="waec neco">Waec/Neco Result</option>
                  <option value="waec neco scratch card">
                    Waec/Neco Result Checker (Scratch card)
                  </option>
                  <option value="1st degree result">1st Degree Result</option>
                  <option value="1st degree transcript">
                    1st Degree Transcript
                  </option>
                  <option value="2nd degree result">
                    2nd Degree Result (if applicable)
                  </option>
                  <option value="2nd degree transcript">
                    2nd Degree Transcript (if applicable)
                  </option>
                  <option value="international passport">
                    International Passport
                  </option>
                  <option value="statement of purpose">
                    Statement of Purpose (if any)
                  </option>
                  <option value="1st reference letter">
                    1st Reference Letter
                  </option>
                  <option value="2nd reference letter">
                    2nd Reference Letter (if applicable)
                  </option>
                  <option value="applicant CV">
                    Applicant CV (Restructuring can be needed)
                  </option>
                  <option value="proof of work experience">
                    Proof of Work Experience (if any)
                  </option>
                  <option value="proof of address">
                    Proof of Address (if applicable)
                  </option>
                  <option value="applicant visa">
                    Applicant Visa (if required)
                  </option>
                  <option value="bank account statement">
                    Bank Account Statement
                  </option>
                  <option value="Confirmation of acceptance of study">
                    CAS-Confirmation of acceptance of study (if offered
                    admission)
                  </option>
                  <option value="ATAS">ATAS (if applicable)</option>
                  <option value="english language proficiency">
                    IELTs or any other English Language Proficiency (if
                    applicable)
                  </option>
                  <option value="professional certificate">
                    Professional Certificate (if applicable)
                  </option>
                  <option value="others">Others</option>
                </select>
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    id="myFile"
                    required
                    onChange={fileHandler}
                    accept=".doc, .docx, .pdf, .jpeg, .png"
                  />
                </div>
                <button type="submit" className="btn">
                  {pending ? (
                    <div
                      className="spinner-border text-white spinner-border-sm"
                      role="status"
                    ></div>
                  ) : (
                    <>
                      <span className="sr-only">Upload</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          )}
          {docs.length > 0 ? (
            <div className="fecthAllFile__wrapper">
              <div className="card mt-4 mb-4">
                <div className="card-header d-flex justify-content-between p-4">
                  <div className="col-6">
                    <h3>Document Uploaded</h3>
                  </div>
                </div>
                <div className="card-body">
                  <table className="table table-striped col-md:table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">File Type</th>
                        <th scope="col">File Document Name</th>
                        <th scope="col">Download</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docs.map((item, index) => (
                        <tr key={item.id}>
                          <th scope="row">{index + 1}</th>
                          <td className="text-capitalize">
                            {item.fileName.replace("_", " ")}
                          </td>
                          <td>{item.fileDocName}</td>
                          <td>
                            <Download
                              fileId={item.fileId}
                              name={item.fileDocName}
                            />
                          </td>
                          <td onClick={() => deleteFileRequest(item)}>
                            <MdDelete className="no" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="container applicationZero">
              <h2>You have not uploaded any file</h2>
            </div>
          )}
        </div>
      </div>
      <DeleteBlog
        text="file"
        ref={deleteComponent}
        onConfirmed={() => deleteFile()}
      />
    </>
  );
};

export default File;
