import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TestPage from "./pages/TestPage";
import Profile from "./pages/Profile"; 
import AdminPanel from "./pages/AdminPanel";
import CreateTest from "./pages/CreateTest";
import MyTests from "./pages/MyTests";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test/:id" element={<TestPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path="/create" element={<CreateTest />} />
        <Route path="/mytests" element={<MyTests />} />
      </Routes>
    </Router>
  );
}