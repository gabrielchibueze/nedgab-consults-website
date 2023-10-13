import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BASE_URL from "../../services/Constant";
import "./SingleBlog.css";
import moment from "moment";

const SingleBlog = () => {
  const [blog, setBlog] = useState([]);
  const [getAllBlog, setGetAllBlog] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/blogs/${id}`)
      .then((resp) => {
        setBlog(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/blogs?pageNo=0&pageSize=10`)
      .then((resp) => {
        setGetAllBlog(resp.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(getAllBlog);

  return (
    <div className="singleBlog mt-4">
      <div className="singleBlog__wrapper container">
        <div className="singleBlog__left col-8">
          <header>
            <span>{moment(blog.createdTime?.slice(0, 2)).format("LL")}</span>
            <h1>{blog.title}</h1>
          </header>

          <div className="img__wrapper">
            <img src={blog.link} alt="" />
          </div>
          <div className="text__wrapper">
            <p>{blog.body}</p>
          </div>
        </div>
        <div className="singleBlog__right col-4">
          <h2>Trending Articles</h2>
          <ul>
            {getAllBlog.slice(0, 3 ? 3 : getAllBlog.length).map((item) => (
              <li className="mb-3" key={item.id}>
                <div className="div">
                  <div className="singleBlog__right-left">
                    <Link to={`/blogPost/${item.id}`}>{item.title}</Link>
                    <p>{moment(item.createdTime?.slice(0, 2)).format("LL")}</p>
                  </div>
                  <div className="singleBlog__right-right">
                    <img src={item.link} alt="blog_photo" />
                  </div>
                </div>
                <div class="text-success">
                  <hr />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
