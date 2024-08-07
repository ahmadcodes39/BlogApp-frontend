import React, { useEffect, useState } from "react";
import Post from "../Post";
import { getAllPosts } from "../../ApiRoutes/Api_Routes";

const IndexPage = () => {

  const [postData,setPostData] = useState([])


  const getdata = async () => {
    await getAllPosts(setPostData);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <>
     {postData.length>0&&postData.map((item,index)=>(
      <Post key={index} {...item}/>
     ))}
    </>
  );
};

export default IndexPage;
