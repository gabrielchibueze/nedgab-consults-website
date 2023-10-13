import { useState } from "react";
import style from "./style.module.css";
import axios from "axios";
import { authHeader } from "../../services/BaseService";
import BASE_URL from "../../services/Constant";

const NewFile = (props) => {
  const [fileName, setFileName] = useState("birth_Cert");
  const [file, setFile] = useState();
  const [isClosed, setIsClosed] = useState(true);

  const handleChange = (evt) => {
    setFileName(evt.target.value);
  };
  const fileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: authHeader().authorization,
      },
    };

    const url = `${BASE_URL}/files/${fileName}`;

    axios.post(url, formData, config).then((response) => {
      if (response.status === 200) {
        props.onGetMsg(response.data.fileDocName);
      } else {
        props.onGetMsg(500);
      }
      setIsClosed(true);
    });
  };

  return (
    <div>
      {!isClosed && (
        <form className={style.main} onSubmit={handleSubmit}>
          <div>
            <div className={style.form__group}>
              <div className={style.left}>
                <label>Document Name</label>
              </div>

              <div className={style.right}>
                <select
                  name="fileName"
                  onChange={handleChange}
                  required
                  value={fileName}
                  type="text"
                >
                  <option value="non">--select--</option>
                  <option value="birth_cert">Birth Cert</option>
                  <option value="transcript">Transcript</option>
                  <option value="nysc">NYSC</option>
                  <option value="original_result">Original Result</option>
                  <option value="passport">Passport</option>
                </select>
              </div>
            </div>

            <div className={style.form__group}>
              <div className={style.left}>
                <label>Choose File</label>
              </div>

              <div className={style.right}>
                <input
                  type="file"
                  name="file"
                  required
                  onChange={fileHandler}
                  accept=".doc, .docx, .pdf"
                />
              </div>
            </div>
          </div>

          <div className={style.form__group}>
            <div className={style.space}>
              <button
                onClick={() => {
                  setIsClosed(!isClosed);
                }}
                className="btn btn-danger"
              >
                Close{" "}
              </button>
              <button type="submit" className="btn btn-success">
                Apply
              </button>
            </div>
          </div>
        </form>
      )}
      {isClosed && (
        <div>
          <button
            onClick={() => {
              setIsClosed(!isClosed);
            }}
            className="btn btn-success"
          >
            Upload Documents
          </button>
        </div>
      )}
    </div>
  );
};
export default NewFile;
