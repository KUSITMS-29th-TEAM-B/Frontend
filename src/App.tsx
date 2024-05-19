import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Navbar from "./components/common/Navbar";
import JDEditPage from "./pages/JDEditPage";
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

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<InfoPage />} />
        <Route element={<PrivateRoute />} path="/">
          <Route path="/jd" element={<JDListPage />} />
        </Route>
        <Route element={<PrivateRoute />} path="/">
          <Route path="/jd/detail/:id" element={<JDDetailPage />} />
        </Route>
        <Route element={<PrivateRoute />} path="/">
          <Route path="/jd/edit/:jdId" element={<JDEditPage />} />
        </Route>
        <Route element={<PrivateRoute />} path="/">
          <Route path="/jd/post" element={<JDPlusPage />} />
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
