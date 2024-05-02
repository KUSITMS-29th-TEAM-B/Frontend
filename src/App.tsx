import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ExperiencePage from "./pages/ExperiencePage";
import MyPage from "./pages/MyPage";
import Navbar from "./components/common/Navbar";
import JDPage from "./pages/JDPage";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/jd" element={<JDPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </>
  );
};

export default App;
