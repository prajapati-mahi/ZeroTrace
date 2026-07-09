import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Checker from "./pages/Checker";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PDFChecker from "./pages/PDFChecker";
import ReportDetails from "./pages/ReportDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import History from "./pages/History";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/checker"
        element={<Checker />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

      <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/history"
  element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
/>

      <Route
        path="/pdf-checker"
        element={<PDFChecker />}
      />

      <Route
  path="/report/:id"
  element={
    <ProtectedRoute>
      <ReportDetails />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;