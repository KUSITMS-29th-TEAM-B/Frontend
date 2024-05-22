import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import JDDetailPage from "./pages/JDDetailPage";
import JDPlusPage from "./pages/JDPlusPage";
import JDListPage from "./pages/JDListPage";
import ExperiencePage from "./pages/ExperiencePage";
import SignupPage from "./pages/SignupPage";
import ExperienceWritePage from "./pages/ExperienceWritePage";
import ExperienceDetailPage from "./pages/ExperienceDetailPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import PrivateRoute from "./services/router/PrivateRoute";
import InfoPage from "./pages/InfoPage";
import ApplyEditPage from "./pages/ApplyEditPage";
import ApplyPage from "./pages/ApplyPage";
import JDEditPage from "./pages/JDEditPage";
import ExperienceEditPage from "./pages/ExperienceEditPage";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<InfoPage />} />
        <Route element={<PrivateRoute />} path="/">
          <Route path="/jd" element={<JDListPage />} />
        </Route>
        {/* 공고 등록 JDPlusPage */}
        <Route element={<PrivateRoute />} path="/">
          <Route path="/jd/post" element={<JDPlusPage />} />
        </Route>
        {/* 공고 상세  / JDDetailPage */}
        <Route element={<PrivateRoute />} path="/">
          <Route path="/jd/:jdId" element={<JDDetailPage />} />
        </Route>
        {/* 공고 수정  / JDEditPage*/}
        <Route element={<PrivateRoute />} path="/">
          <Route path="/jd/edit/:jdId" element={<JDEditPage />} />
        </Route>
        {/* 자기소개서 - 수정 / ApplyEditPage*/}
        <Route element={<PrivateRoute />} path="/">
          <Route path="/jd/apply/edit/:jdId" element={<ApplyEditPage />} />
        </Route>
        {/* 자기소개서 - 등록 / ApplyPage*/}
        <Route element={<PrivateRoute />} path="/">
          <Route path="/jd/apply/:jdId" element={<ApplyPage />} />
        </Route>
        <Route element={<PrivateRoute />} path="/">
          <Route path="/experience" element={<ExperiencePage />} />
        </Route>
        <Route element={<PrivateRoute />} path="/">
          <Route path="/experience/write" element={<ExperienceWritePage />} />
        </Route>
        <Route element={<PrivateRoute />} path="/">
          <Route
            path="/experience/detail/:id"
            element={<ExperienceDetailPage />}
          />
        </Route>
        <Route element={<PrivateRoute />} path="/">
          <Route
            path="/experience/detail/:id/edit"
            element={<ExperienceEditPage />}
          />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route element={<PrivateRoute />} path="/">
          <Route path="/sign-up" element={<SignupPage />} />
        </Route>
        <Route element={<PrivateRoute />} path="/">
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route element={<PrivateRoute />} path="/">
          <Route path="/profile/edit" element={<ProfileEditPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
