// import fileDownload from "js-file-download";
import BASE_URL from "../../services/Constant";
// import axios from "axios";
import { FaDownload } from "react-icons/fa"
const Download = (props) => {
  return (
    <div className="download">
      <a href={`${BASE_URL}/downloadFile/download/${props.fileId}`} target="blank" ><FaDownload /></a>
    </div>
  );
};
export default Download;
