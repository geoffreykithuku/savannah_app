import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import Landing from './pages/Landing';
import Footer from './components/Footer';
import Signin from './components/Signin';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';
import UserDetails from './pages/User';
import Albums from './pages/MyAlbums';
import AlbumDetails from './pages/Album';
import PhotoDetails from './pages/Photo';

const App = () => {
  const { user } = useAuth();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Landing />} />
          <Route element={<PrivateRoute />}>
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/:id" element={<AlbumDetails />} />
            <Route path="/photos/:id" element={<PhotoDetails />} />
          </Route>
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<Landing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
