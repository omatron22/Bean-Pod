import React, { useContext } from 'react'; // Import useContext here
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import "./style.scss";
import { ChatContextProvider } from './context/ChatContext';
import { AuthContextProvider, AuthContext } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <ChatContextProvider>
          <Routes>
            <Route path="/" element={<PrivateRoute />}/>
            <Route path="/login" element={<PublicRoute />}/>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ChatContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

// Private route component
function PrivateRoute() {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Home /> : <Navigate to="/login" replace />;
}

// Public route component
function PublicRoute() {
  const { currentUser } = useContext(AuthContext);
  return !currentUser ? <Login /> : <Navigate to="/" replace />;
}

export default App;



