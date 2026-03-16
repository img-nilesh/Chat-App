import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";

const App = () => {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />

        {/* Protected route */}
        <Route
          path="/"
          element={token ? <ChatPage /> : <Navigate to="/login" />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;