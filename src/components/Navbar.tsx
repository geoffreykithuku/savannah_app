import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { user, authToken, setUser, setAuthToken } = useAuth();

  //  toggle the menu state
  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  // clear user and auth token
  const handleLogout = () => {
    // remove user and token from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    // set user and token to null
    setUser(null);
    setAuthToken(null);
  };

  return (
    <div className="bg-[#351D5B] text-white px-5 sm:px-10 md:px-20 flex w-full items-center justify-between py-6 relative ">
      <h2 className="flex-shrink-0 z-10">
        <NavLink to="/" className="text-xl font-bold">
          SIL APP
        </NavLink>
      </h2>

      <div className="w-full mx-auto">
        <ul
          className={`${
            isOpen
              ? 'flex flex-col justify-center items-center absolute w-full mx-auto gap-3 bg-[#351D5B] py-20 z-0 top-0 left-0 rounded'
              : 'hidden md:flex gap-4 lg:gap-10 md:justify-end items-center ml-auto w-full'
          }`}
        >
          <li>
            <NavLink
              className="hover:text-[#9FC315]"
              style={({ isActive }: { isActive: boolean }) => {
                return isActive ? { color: '#9FC315' } : {};
              }}
              to="/"
            >
              Home
            </NavLink>
          </li>
          {user !== null ? (
            <>
              <li>
                <NavLink
                  className="hover:text-[#9FC315]"
                  style={({ isActive }: { isActive: boolean }) => {
                    return isActive ? { color: '#9FC315' } : {};
                  }}
                  to="/users"
                >
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-[#9FC315]"
                  style={({ isActive }: { isActive: boolean }) => {
                    return isActive ? { color: '#9FC315' } : {};
                  }}
                  to="/albums"
                >
                  Albums
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-[#9FC315]"
                  style={({ isActive }: { isActive: boolean }) => {
                    return isActive ? { color: '#9FC315' } : {};
                  }}
                  to="/photos"
                >
                  Photos
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-[#9FC315]"
                  style={({ isActive }: { isActive: boolean }) => {
                    return isActive ? { color: '#9FC315' } : {};
                  }}
                  to="/photos"
                >
                  Photos
                </NavLink>
              </li>
              <li onClick={handleLogout} className="hover:text-[#9FC315]">
                Logout {user?.username}
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  className="hover:text-[#9FC315]"
                  style={({ isActive }: { isActive: boolean }) => {
                    return isActive ? { color: '#9FC315' } : {};
                  }}
                  to="/login"
                >
                  Login
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="hover:text-[#9FC315]"
                  style={({ isActive }: { isActive: boolean }) => {
                    return isActive ? { color: '#9FC315' } : {};
                  }}
                  to="/signup"
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <button className="md:hidden z-10" onClick={toggleMenu}>
        {isOpen ? <X color="#9FC315" /> : <Menu color="#9FC315" />}
      </button>
    </div>
  );
};

export default Navbar;
