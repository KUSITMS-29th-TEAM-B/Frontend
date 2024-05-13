import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ExperiencePage from "./pages/ExperiencePage";
import MyPage from "./pages/MyPage";
import Navbar from "./components/common/Navbar";
import JDEditPage from "./pages/JDEditPage";
import JDMainPage from "./pages/JDMainPage";
import JDDetailPage from "./pages/JDDetailPage";
import ExperienceNewPage from "./pages/Experience_new";
import JDPlusPage from "./pages/JDPlusPage";
import JDListPage from "./pages/JDListPage";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/experience" element={<ExperienceNewPage />} />
        <Route path="/jd" element={<JDListPage />} />
        <Route path="/jd/detail/:id" element={<JDDetailPage />} />
        <Route path="/jd/edit/:id" element={<JDEditPage />} />
        <Route path="/jd/post" element={<JDPlusPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
};

export default App;
