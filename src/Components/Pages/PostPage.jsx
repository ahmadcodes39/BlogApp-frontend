import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { displayPostData } from "../../ApiRoutes/Api_Routes";
import { format } from "date-fns";
import { userContext } from "../../UserContext/userContext";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { deletePost } from "../../ApiRoutes/Api_Routes";

const PostPage = () => {
  const { userInfo } = useContext(userContext);
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const navigate = useNavigate();
  const displayingPost = async () => {
    await displayPostData(setPostInfo, id);
  };

  useEffect(() => {
    displayingPost();
  }, []);

  const capitalize = (txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  };
  const deleteUserPost = async () => {
    await deletePost(navigate, id);
  };


  if (!postInfo) {
    return <div>Loading...</div>;
  }
  console.log("User Info ID:", userInfo.id);
  console.log("Post Author ID:", postInfo.author._id);

  return (
    <div className="postContainer">
      <h1>{postInfo.title}</h1>
      <h4 className="authorInfo">
        <mark>By @{capitalize(postInfo.author?.name || "Unknown")}</mark> &nbsp;
        <span className="authorSpan">
          {format(new Date(postInfo.createdAt), "MMM d, yyyy HH:mm")}
        </span>
      </h4>
      {userInfo?.id === postInfo.author?._id ? (
        <dic className="Action-Btns">
          <div className="edit-row">
            <Link to={`/edit/${postInfo._id}`} className="edit-btn">
              <FaRegEdit /> Edit Post
            </Link>
          </div>
          <div className="edit-row">
            <a className="delete-btn" onClick={deleteUserPost}>
              <RiDeleteBinLine /> Delete Post
            </a>
          </div>
        </dic>
      ):'hello'}
      <div className="image">
        <img src={`http://localhost:9090/${postInfo.coverImage}`} alt="" />
      </div>
      <div
        className="postContent"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostPage;
