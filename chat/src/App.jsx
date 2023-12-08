import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from "./pages/Home";
import Login from "./pages/Login";
//import 'antd/dist/antd.css'; // Import Ant Design CSS
import { Layout } from 'antd'; // Import Layout component from Ant Design
import { ChatContextProvider } from './context/ChatContext';
import { AuthContextProvider, AuthContext } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <ChatContextProvider>
          <Layout style={{ minHeight: '100vh' }}> {/* Use Ant Design Layout */}
            <Routes>
              <Route path="/" element={<PrivateRoute />}/>
              <Route path="/login" element={<PublicRoute />}/>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
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



