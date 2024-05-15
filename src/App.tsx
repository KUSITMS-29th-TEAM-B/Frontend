import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import Navbar from "./components/common/Navbar";
import JDEditPage from "./pages/JDEditPage";
import JDDetailPage from "./pages/JDDetailPage";
import JDPlusPage from "./pages/JDPlusPage";
import JDListPage from "./pages/JDListPage";
import ExperiencePage from "./pages/ExperiencePage";
import SignupPage from "./pages/SignupPage";
import ExperienceWritePage from "./pages/ExperienceWritePage";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/jd" element={<JDListPage />} />
        <Route path="/jd/detail/:id" element={<JDDetailPage />} />
        <Route path="/jd/edit/:id" element={<JDEditPage />} />
        <Route path="/jd/post" element={<JDPlusPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/experience/write" element={<ExperienceWritePage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </>
  );
};

export default App;
