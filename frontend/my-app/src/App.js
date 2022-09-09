import { Container } from "@material-ui/core";
// import Form from "./components/Form/Form";
// import Post from "./components/Posts/Posts";
// import useStyles from "./styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css"
// import { getPosts } from "./actions/post";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
import Home from "./components/Home/Home";
// import Navbar from "../components/NavBar/NavBar.js";
import Navbar from "./components/NavBar/NavBar";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google"
function App() {

  return (
    <GoogleOAuthProvider clientId="1098638947980-v20v8326tcd9ctdrcjhr9r5nj62408fa.apps.googleusercontent.com ">
      <Router>
        <Container maxWidth="lg" >
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Container >
      </Router>
    </GoogleOAuthProvider>
  );
}
export default App;
