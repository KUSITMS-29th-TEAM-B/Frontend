import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import Navbar from "./components/common/Navbar";
import JDEditPage from "./pages/JDEditPage";
import JDMainPage from "./pages/JDMainPage";
import JDDetailPage from "./pages/JDDetailPage";
import ExperiencePage from "./pages/ExperiencePage";
import SignupPage from "./pages/SignupPage";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/jd" element={<JDMainPage />} />
        <Route path="/jd/detail" element={<JDDetailPage />} />
        <Route path="/jd/edit" element={<JDEditPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </>
  );
};

export default App;
