// // import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// // import { Home } from "./pages/Home";
// // import Login from "./pages/Login";
// // import { useEffect, useState } from 'react';
// // import { auth } from './firebase';
// // import "./style.scss"

// // function App() {
// //   const [currentUser, setCurrentUser] = useState(null);

// //   useEffect(() => {
// //     const unsubscribe = auth.onAuthStateChanged(user => {
// //       setCurrentUser(user);
// //     });
// //     return unsubscribe; // Unsubscribe on unmount
// //   }, []);

// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" replace />} />
// //         <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" replace />} />
// //         <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { Home } from "./pages/Home";
// import Login from "./pages/Login";
// import { useEffect, useState } from 'react';
// import { auth } from './firebase';
// import "./style.scss";
// import { ChatContextProvider } from './context/ChatContext'; // Import ChatContextProvider
// import { AuthContextProvider } from './context/AuthContext';

// function App() {
//   // const [currentUser, setCurrentUser] = useState(null);

//   // useEffect(() => {
//   //   const unsubscribe = auth.onAuthStateChanged(user => {
//   //     setCurrentUser(user);
//   //   });
//   //   return unsubscribe; // Unsubscribe on unmount
//   // }, []);

//   const { currentUser } = useContext(AuthContext);

//   return (
//     <Router>
//       <AuthContextProvider>
//         <ChatContextProvider> {/* Wrap Routes with ChatContextProvider */}
//           <Routes>
//             <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" replace />} />
//             <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" replace />} />
//             <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
//           </Routes>
//         </ChatContextProvider>
//       </AuthContextProvider>
//     </Router>
//   );
// }

// export default App;

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



