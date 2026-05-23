import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import OTPVerificationPage from "./pages/OTPVerificationPage";
import StudentDashboard from "./pages/StudentDashboard";
import ExamInterface from "./pages/ExamInterface";
import ResultsPage from "./pages/ResultsPage";
import AdminDashboard from "./pages/AdminDashboard";
import ManageMCQs from "./pages/admin/ManageMCQs";
import ManageTests from "./pages/admin/ManageTests";
import ManageStudents from "./pages/admin/ManageStudents";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/forgot-password",
    Component: ForgotPasswordPage,
  },
  {
    path: "/verify-otp",
    Component: OTPVerificationPage,
  },
  {
    path: "/dashboard",
    Component: StudentDashboard,
  },
  {
    path: "/exam/:examId",
    Component: ExamInterface,
  },
  {
    path: "/results/:resultId",
    Component: ResultsPage,
  },
  {
    path: "/admin",
    Component: AdminDashboard,
  },
  {
    path: "/admin/mcqs",
    Component: ManageMCQs,
  },
  {
    path: "/admin/tests",
    Component: ManageTests,
  },
  {
    path: "/admin/students",
    Component: ManageStudents,
  },
  {
    path: "/admin/analytics",
    Component: AdminAnalytics,
  },
]);
