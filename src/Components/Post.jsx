import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({_id, title, summary, content, coverImage, createdAt, author }) => {
  if (!author) {
    return <div>Loading ...</div>
  }
  return (
    <div className="posts">
      <div className="pst-Img">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:9090/" + coverImage} alt="" />
        </Link>
      </div>
      <div className="pst-Content">
        <Link to={`/post/${_id}`} style={{textDecoration:'none'}}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author" href="#">
            <i>{author.name?author.name:'hello'}</i>
          </a>
          <time>{format(new Date(createdAt), "MMM d,yyyy HH:m ")}</time>
        </p>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default Post;
