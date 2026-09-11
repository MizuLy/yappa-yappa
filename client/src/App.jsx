import { Routes, Route, Navigate } from "react-router-dom";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./components/layout/AuthLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MainLayout from "./components/layout/MainLayout";

// Page Imports
import Feed from "./pages/feed/Feed";
import Search from "./pages/Search";
import Chat from "./pages/Chat";
import Friend from "./pages/Friend";
import History from "./pages/History";
import Trending from "./pages/Trending";

export default function App() {
  return (
    <Routes>
      {/* Public / Guest Routes */}
      <Route
        element={
          <GuestRoute>
            <AuthLayout />
          </GuestRoute>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected App Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        {/* Default route redirects / to /home */}
        <Route index element={<Navigate to="/home" replace />} />

        {/* Sidebar Nav Links */}
        <Route path="home" element={<Feed />} />
        <Route path="search" element={<Search />} />
        <Route path="chat" element={<Chat />} />
        <Route path="friend" element={<Friend />} />
        <Route path="history" element={<History />} />
        <Route path="trend" element={<Trending />} />
      </Route>
    </Routes>
  );
}
