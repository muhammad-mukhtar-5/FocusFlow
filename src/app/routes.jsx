import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Layout from "../Layout/Layout";
import Timer from "../Pages/Timer"
import Stopwatch from "../Pages/Stopwatch"
import Task from "../Pages/Task"
import History from "../Pages/History"

export default function AppRoutes() {
  const { user } = useContext(AuthContext);  
  return (
    <Routes>
      <Routes
        element={user ? <Layout /> : <Navigate to="/login" />}   
      />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
        <Route path="/task" element={<Task />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}