import "./App.css";
import Layout from "./Components/Layout";
import IndexPage from "./Components/Pages/IndexPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Pages/LoginPage";
import SignupPage from "./Components/Pages/SignupPage";
import ForgotPage from "./Components/Pages/ForgotPage";
import ResetPage from "./Components/Pages/ResetPage";
import { UserContextProvider } from "./UserContext/userContext.jsx";
import CreateNewPost from "./Components/CreateNewPost.jsx";
import PostPage from "./Components/Pages/PostPage.jsx";
import EditPage from "./Components/Pages/EditPage.jsx";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    
  <Toaster position="top-right" />
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/forgotPassword" element={<ForgotPage />} />
            <Route path="/createPost" element={<CreateNewPost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Route>
          <Route path="/resetPassword/:id/:token" element={<ResetPage />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
    </>
  );
}

export default App;
