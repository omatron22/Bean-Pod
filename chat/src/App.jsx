// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import { Home } from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { useEffect, useState } from 'react';
// import { auth } from './firebase';

// function App() {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     auth.onAuthStateChanged(user => {
//       setCurrentUser(user);
//     });
//   }, []);

//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route path="/login" component={Login} />
//         <Route path="/register" component={Register} />
//         <Redirect to="/" />
//       </Switch>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import "./style.scss"

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return unsubscribe; // Unsubscribe on unmount
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to={currentUser ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;


