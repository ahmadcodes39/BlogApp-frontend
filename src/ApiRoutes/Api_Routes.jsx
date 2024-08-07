import axios from "axios";
import toast from "react-hot-toast";
axios.defaults.baseURL = "http://localhost:9090";
axios.defaults.withCredentials = true;

export const UserLogin = async (formData, setUserInfo, navigate) => {
  const { email, password } = formData;

  try {
    const response = await axios.post("/auth/login", { email, password });

    if (response.status === 200) {
      const userInfo = response.data;
      setUserInfo(userInfo);
      navigate("/");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    toast.error("Login Failed: " + errorMessage);
    navigate("/login");
  }
};

export const UserRegister = async (formData, navigate) => {
  const { name, email, password } = formData;

  try {
    const response = await axios.post("/auth/register", {
      name,
      email,
      password,
    });

    if (response.status === 200) {
      navigate("/");
      toast.success("Account registered successfully");
    } else if (response.status === 400) {
      toast.error("Registration failed, please enter valid credentials");
    } else if (response.status === 401) {
      toast.error("Registration failed, user with this email already exists");
    }
  } catch (error) {
    if (error.response) {
      // Handle error response from the server
      const { status } = error.response;
      if (status === 400) {
        toast.error("Registration failed, please enter valid credentials");
      } else if (status === 401) {
        toast.error("Registration failed, user with this email already exists");
      } else {
        toast.error("An unexpected error occurred");
      }
    } else {
      // Handle network or other errors
      toast.error("An unexpected error occurred");
    }
    navigate("/register");
  }
};


export const ForgotPass = async (email, navigate) => {
  try {
    toast
      .promise(axios.post("/auth/forgotPassword", { email }), {
        loading: "Processing...",
        success: <p>Please check your email for the reset password link</p>,
        error: <p>User with this email not exist</p>,
      })
      .then(() => navigate("/login"));
  } catch (error) {
    toast.error("Internal server error, try again later");
  }
};

export const ResetPassword = async (password, id, token, navigate) => {
  try {
    const response = await axios.post(`/auth/resetPassword/${id}/${token}`, {
      password,
    });
    if (response.status === 200) {
      toast.success("Password Reset Successfully");
      navigate("/login");
    } else {
      toast.error("Password not reset please try again later");
    }
  } catch (error) {
    toast.error("Internal server error try again later");
  }
};
export const logoutUser = async (navigate, setUserInfo) => {
  try {
    const response = axios.post("/auth/logout");
    if (response) {
      setUserInfo(null);
      toast.success("Logout Successfully");
      navigate("/login");
    } else {
      navigate("/");
      toast.error("Logout Failed Try again");
    }
  } catch (error) {
    toast.error("Internal server error try again later");
  }
};

export const CreateNewUserPost = async (formData, navigate) => {
  try {
    const response = await axios.post("/api/createPost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      navigate("/");
      toast.success("Post created Successfully");
    } else {
      navigate("/createPost");
      toast.error("Enter valid Cradentionals");
    }
  } catch (error) {
    toast.error("An error occur try again ");
  }
};

export const getAllPosts = async (setPostData) => {
  try {
    const response = await axios.get("/api/createPost");
    if (response.status === 200) {
      setPostData(response.data);
    }
  } catch (error) {
    // console.log(
    //   "Error at route /api/createPost: " + error.response
    //     ? error.response.data
    //     : error.message
    // );
    toast.error("Server response error try later");
  }
};

export const displayPostData = async (setPostInfo, id) => {
  try {
    const response = await axios.get(`/api/blogPost/${id}`);
    if (response) {
      setPostInfo(response.data);
    } else {
      toast.error("Server response error try later");
    }
  } catch (error) {
    toast.error("Server response error try later");
  }
};

export const UpdatePost = async (id, formData, navigate) => {
  try {
    const response = await axios.put(`/api/blogPost/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      toast.success("Post Updated Successfully");
      navigate(`/post/${id}`);
    } else {
      toast.error("Post not updated ");
    }
  } catch (error) {
    toast.error("Server response error try later");
  }
};

export const deletePost = async (navigate, id) => {
  try {
    const response = await axios.delete(`/api/blogPost/${id}`);

    if (response.status === 200) {
      toast.success("Post deleted successfully");
      navigate("/");
    } else {
      toast.error("Post could not be deleted");
      navigate(`/blogPost/${id}`);
    }
  } catch (error) {
    toast.error("Server response error try later");
  }
};
