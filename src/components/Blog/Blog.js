import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../services/Constant";
import "./Blog.css";
import { useSelector } from "react-redux";
import { Role } from "../Model/Role";
import { MdDelete } from "react-icons/md";
import { authHeader } from "../../services/BaseService";
import DeleteBlog from "../../AdminComponent/DeleteBlog/DeleteBlog";
import Back from "../Back/Back";
import img1 from "../../asset/about.jpg"

const Blog = () => {
  const [getAllBlog, setGetAllBlog] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [paginate, setPaginate] = useState({});

  const currentUser = useSelector((state) => state.user);
  const deleteComponent = useRef();


  useEffect(() => {
    axios
      .get(`${BASE_URL}/blogs?pageNo=${pageCount}&pageSize=9`)
      .then((resp) => {
        setGetAllBlog(resp.data.content);
        setPaginate(resp.data);

      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageCount]);

  console.log(getAllBlog);

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

    const truncate = (string, n) => {
      return string?.length > n ? string.substr(0, n - 1) + "..." : string;
    };
  
     const deleteProductRequest = (product) => {
       setSelectedBlog(product);
       deleteComponent.current?.showDeleteModal();
     };

     const deleteBlog = () => {
       axios
         .delete(`${BASE_URL}/blogs/${selectedBlog.id}`, {
           headers: authHeader(),
         })
         .then(() => {
           setGetAllBlog(
             getAllBlog.filter((del) => del.id !== selectedBlog.id)
           )
         }).catch((error) => {
           console.log(error);
         })
     };

  return (
    <>
      <Back name="Blog" title="Blog Grid - Our Blogs" cover={img1} />
      {getAllBlog.length > 0 ? (
        <>
          <div className="blog">
            <div className="blog__wrapper container">
              <h1>MY BLOG</h1>
              <div className="blogContent_wrapper">
                {getAllBlog.map((item) => (
                  <div key={item.id}>
                    <div className="blogContent">
                      <img src={item.link} alt="blog_photo" />
                      <div className="blogContent__text">
                        <h5>{truncate(item.title, 30)}</h5>
                        <p className="flex-end">
                          {new Date(
                            item.createdTime.slice(0, 2)
                          ).toDateString()}
                        </p>
                        <p>{truncate(item.body, 100)}</p>
                        <div className="blogContent__bottom-wrapper">
                          <Link to={`/blogPost/${item.id}`} className="btn">
                            Read More
                          </Link>
                          {currentUser
                            ? currentUser.role === Role.ADMIN && (
                                <MdDelete
                                  className="deletIcon"
                                  onClick={() => deleteProductRequest(item)}
                                />
                              )
                            : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
          <h2>No Blog is available yet</h2>
        </div>
      )}

      <DeleteBlog
        text="blog"
        ref={deleteComponent}
        onConfirmed={() => deleteBlog()}
      />
    </>
  );
};

export default Blog;



