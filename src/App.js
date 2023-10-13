import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import WhoWeArePage from './pages/WhoWeArePage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import ApplyForSchoolPage from './pages/ApplyForSchoolPage';
import DashboardPage from './pages/DashboardPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';
import { AuthGuardAdmin, AuthGuardUser } from './guards/AuthGuard';
import ViewUsersPage from './pages/AdminPages/ViewUsersPage';
import { Role } from './components/Model/Role';
import CreateBlogPage from './pages/AdminPages/CreateBlogPage';
import ChangeRole from './AdminComponent/ChangeRole/ChangeRole';
import SingleBlogPage from './pages/SingleBlogPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SuccessMailSent from './components/ForgotPassword/SuccessMailSent';
import ApplyForFundingPage from './pages/ApplyForFundingPage';
import FilePage from './pages/FilePage';
import AllApplicantPage from "./pages/AdminPages/AllApplicantPage";
import ViewAllFilesPage from './pages/AdminPages/ViewAllFilesPage';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/whoWeAre" element={<WhoWeArePage />} />
          <Route path="/contactUs" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/apply" element={<ApplyForSchoolPage />} />
          <Route path="/successMailSent" element={<SuccessMailSent />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/blogPost/:id" element={<SingleBlogPage />} />
          <Route
            path="/apply"
            element={
              <AuthGuardUser>
                <ApplyForSchoolPage />
              </AuthGuardUser>
            }
          />
          <Route
            path="/funding"
            element={
              <AuthGuardUser>
                <ApplyForFundingPage />
              </AuthGuardUser>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthGuardUser>
                <DashboardPage />
              </AuthGuardUser>
            }
          />
          <Route
            path="/files"
            element={
              <AuthGuardUser>
                <FilePage />
              </AuthGuardUser>
            }
          />
          <Route
            path="/allApplicant"
            element={
              <AuthGuardAdmin roles={[Role.ADMIN]}>
                <AllApplicantPage />
              </AuthGuardAdmin>
            }
          />
          <Route
            path="/viewFiles"
            element={
              <AuthGuardAdmin roles={[Role.ADMIN]}>
                <ViewAllFilesPage />
              </AuthGuardAdmin>
            }
          />
          <Route
            path="/users"
            element={
              <AuthGuardAdmin roles={[Role.ADMIN]}>
                <ViewUsersPage />
              </AuthGuardAdmin>
            }
          />
          <Route
            path="/createBlog"
            element={
              <AuthGuardAdmin roles={[Role.ADMIN]}>
                <CreateBlogPage />
              </AuthGuardAdmin>
            }
          />
          <Route
            path="/role/:id"
            element={
              <AuthGuardAdmin roles={[Role.ADMIN]}>
                <ChangeRole />
              </AuthGuardAdmin>
            }
          />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="/401" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
