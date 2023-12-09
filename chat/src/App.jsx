import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import { Layout, ConfigProvider, theme, Switch } from 'antd';
import { ChatContextProvider } from './context/ChatContext';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import { auth } from "./firebase";
import './style.less';
import "./style.scss";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    try {
      const newDarkModeValue = !isDarkMode;
      setIsDarkMode(newDarkModeValue);
      localStorage.setItem('darkMode', JSON.stringify(newDarkModeValue));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      // Consider fallback logic or default state
    }
  };

  useEffect(() => {
    try {
      const savedThemePreference = JSON.parse(localStorage.getItem('darkMode'));
      setIsDarkMode(savedThemePreference ?? false);
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // Consider fallback logic or default state
    }
  }, []);

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? theme.darkAlgorithm : undefined }}>
      <Router>
        <AuthContextProvider>
          <ChatContextProvider>
            <Layout style={{ minHeight: '100vh' }}>
              <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
                <Switch 
                  checked={isDarkMode} 
                  onChange={toggleTheme} 
                  checkedChildren="Dark" 
                  unCheckedChildren="Light" 
                />
              </div>
              <Routes>
                <Route path="/" element={<PrivateRoute />}/>
                <Route path="/login" element={<PublicRoute />}/>
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          </ChatContextProvider>
        </AuthContextProvider>
      </Router>
    </ConfigProvider>
  );
}

function PrivateRoute() {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? <Home /> : <Navigate to="/login" replace />;
}
function PublicRoute() {
  const { currentUser } = useContext(AuthContext);
  return !currentUser ? <Login /> : <Navigate to="/" replace />;
}
export default App;
