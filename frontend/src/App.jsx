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
  const { user } = useSelector((state) => state.user);
  const { token } = user;
   
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              token ? <Home socket={socket} /> : <Navigate to="/login" />
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
  );
}

export default App;
