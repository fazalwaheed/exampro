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
import RouteGate from "./components/RouteGate";

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
    element: <RouteGate allow="student"><StudentDashboard /></RouteGate>,
  },
  {
    path: "/exam/:examId",
    Component: ExamInterface,
  },
  {
    path: "/results/:resultId",
    element: <RouteGate allow="student"><ResultsPage /></RouteGate>,
  },
  {
    path: "/admin",
    element: <RouteGate allow="admin"><AdminDashboard /></RouteGate>,
  },
  {
    path: "/admin/mcqs",
    element: <RouteGate allow="admin"><ManageMCQs /></RouteGate>,
  },
  {
    path: "/admin/tests",
    element: <RouteGate allow="admin"><ManageTests /></RouteGate>,
  },
  {
    path: "/admin/students",
    element: <RouteGate allow="admin"><ManageStudents /></RouteGate>,
  },
  {
    path: "/admin/analytics",
    element: <RouteGate allow="admin"><AdminAnalytics /></RouteGate>,
  },
]);
