import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from 'react-router-dom';
import { displayPostData } from "../../ApiRoutes/Api_Routes";
import { UpdatePost } from "../../ApiRoutes/Api_Routes";

const EditPage = () => {
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

  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const displayingPost = async () => {
    await displayPostData(setPostInfo, id);
  };

  useEffect(() => {
    displayingPost();
  }, [id]);

  useEffect(() => {
    if (postInfo) {
      setContent(postInfo.content); 
    }
  }, [postInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('title', postInfo.title);
    formData.set('summary', postInfo.summary);
    formData.set('content', content);
    // formData.set('id', id);
    if (file) {
      formData.set('file', file[0]);
    }
    await UpdatePost(id, formData, navigate);
  };
  
  
  if (!postInfo) {
    return <div>Loading...</div>; 
  }

  return (
    <form className="newPostContainer" onSubmit={handleSubmit}>
      <h1>Edit Post</h1>
      <div className="field">
        <label htmlFor="Title">
          Title<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={postInfo.title}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="Summary">
          Summary<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="summary"
          placeholder="Summary"
          onChange={handleChange}
          value={postInfo.summary}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="file">
          Upload An Image<span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="file"
          name="file"
          id="fileUploader"
          onChange={(e) => setFile(e.target.files)}
        />
      </div>
      <label htmlFor="content" className="contentLable">
        Blog Content<span style={{ color: "red" }}>*</span>
      </label>
      <ReactQuill
        modules={modules}
        formats={formats}
        value={content}
        theme="snow"
        onChange={setContent}
        className="react-quill"
        required
      />
      <div className="postBtn">
        <button type="submit">Update post</button>
      </div>
    </form>
  );
};

export default EditPage;


