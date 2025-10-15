import { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home'
import SignUp from './pages/Signup'
import Login from './pages/Login'

function App() {

  const [user, setUser] = useState(null);
  const location = useLocation(); // To detect route changes

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]); // Re-run this on route change
  // You can also use a custom event or context for more precise control

  return (
    <>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Navigate to="/login" />}/>
        <Route path='/signup' element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
