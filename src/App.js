import { useState, useEffect } from 'react';
import './App.css';
import "./style.scss";
import "./media-query.css";
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Todo from './pages/Todo'
import AllClass from './pages/AllClass'
import Class from './pages/Class'
import AllWork from './pages/AllWork'
import Work from './pages/Work'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import { auth } from './firebase'
import { signOut } from 'firebase/auth'

function App() {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    });
  };

  return (
    <div className="App">
      <Header
        setActive={setActive}
        active={active}
        user={user}
        handleLogout={handleLogout}
      />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home setActive={setActive} user={user} />} />
        <Route path="/dashboard" element={user?.uid ? <Dashboard user={user} /> : <Navigate to="/auth" />} />
        <Route path="/todo" element={user?.uid ? <Todo user={user} /> : <Navigate to="/auth" />} />
        <Route path="/allclass" element={user?.uid ? <AllClass user={user} /> : <Navigate to="/auth" />} />
        <Route path="/class" element={user?.uid ? <Class setActive={setActive} user={user} /> : <Navigate to="/auth" />} />
        <Route path="/editclass/:id" element={user?.uid ? <Class setActive={setActive} user={user} /> : <Navigate to="/auth" />} />
        <Route path="/allwork" element={user?.uid ? <AllWork user={user} /> : <Navigate to="/auth" />} />
        <Route path="/work" element={user?.uid ? <Work setActive={setActive} user={user} /> : <Navigate to="/auth" />} />
        <Route path="/editwork/:id" element={user?.uid ? <Work setActive={setActive} user={user} /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth setActive={setActive} setUser={setUser} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
