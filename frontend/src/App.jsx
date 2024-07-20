import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  const { user={} } = useSelector((state) => {
    console.log("this is state",state);
    return state.user});
  console.log("yahahahahha",user);
  const { token=""} = user;
  console.log("eheheheheh",token);
  //  const {user}=useSelector((state)=>({...state}))
   console.log("user",user);
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              token ? <Home  /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!token ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
    // <>
    // hello</>
  );
}

export default App;
