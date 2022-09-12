import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
/* A hook that allows you to navigate to a different route. */
// import { useNavigate } from "react-router-dom";
import "./index.css"
import Home from "./components/Home/Home";
import Navbar from "./components/NavBar/NavBar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { GoogleOAuthProvider } from "@react-oauth/google"
function App() {

  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <GoogleOAuthProvider clientId="1098638947980-v20v8326tcd9ctdrcjhr9r5nj62408fa.apps.googleusercontent.com ">
      <Router>
        <Container maxWidth="xl " >
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate replace to="/posts" />} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auth" element={() => (!user ? <Auth /> : <Navigate to="/posts" />)} />
          </Routes>
        </Container >
      </Router>
    </GoogleOAuthProvider>
  );
}
export default App;
