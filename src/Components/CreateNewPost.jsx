import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { CreateNewUserPost } from "../ApiRoutes/Api_Routes";
import {useNavigate} from 'react-router-dom'

const CreateNewPost = () => {

  // console.log(file)
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const [content, setContent] = useState("");
  const [blogMainData, setBlogMainData] = useState({
    title: "",
    summary: "",
  });
  const [file, setFile] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogMainData((preV) => ({
      ...preV,
      [name]: value,
    }));
  };
  const navigate  = useNavigate();
  
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.set('title',blogMainData.title)
    formData.set('summary',blogMainData.summary)
    formData.set('content',content)
    if (file) {
      formData.set('file',file[0])
      console.log(file[0])
    }
    await CreateNewUserPost(formData,navigate)
  }
  return (
    <form className="newPostContainer" onSubmit={handleSubmit}>
      <h1>Make New Post</h1>
      <div className="field">
        <label htmlFor="Title">
          Title <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={blogMainData.title}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="Title">
          Summary <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="summary"
          placeholder="Summary"
          onChange={handleChange}
          value={blogMainData.summary}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="Title">
          Upload An Image <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="file"
          name="file"
          id="fileUploader"
          required
          onChange={(e) => setFile(e.target.files)}
        />
      </div>
      <label htmlFor="content" className="contentLable">
        Blog Content <span style={{ color: "red" }}>*</span>
      </label>
      <ReactQuill
        modules={modules}
        formats={formats}
        value={content}
        onChange={(newValue) => setContent(newValue)}
        className="react-quill"
        required
      />
      <div className="postBtn">
        <button type="submit">Create a post</button>
      </div>
    </form>
  );
};

export default CreateNewPost;
