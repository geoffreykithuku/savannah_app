import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';


const Navbar: React.FC = () => {
  // State for controlling the menu toggle (open/close)
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Function to toggle the menu state
  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#351D5B] text-white px-5 sm:px-10 md:px-20 flex w-full items-center justify-between py-6 relative">
      <h2>SIL APP</h2>

      <div className="w-full mx-auto">
        <ul
          className={`${
            isOpen
              ? 'flex flex-col justify-center items-center absolute w-full mx-auto gap-3 bg-[#351D5B] py-5 top-20 left-0 rounded'
              : 'hidden md:flex gap-4 lg:gap-10 md:justify-end items-center ml-auto w-full'
          }`}
        >
          <li>
            <NavLink
              style={({ isActive }: { isActive: boolean }) => {
                return isActive ? { color: '#9FC315' } : {};
              }}
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }: { isActive: boolean }) => {
                return isActive ? { color: '#9FC315' } : {};
              }}
              to="/unsplash"
            >
              
            </NavLink>
          </li>
          <li>
            <NavLink
              style={({ isActive }: { isActive: boolean }) => {
                return isActive ? { color: '#9FC315' } : {};
              }}
              to="/rick-morty"
            >
              Rick & Morty API
            </NavLink>
          </li>
        </ul>
      </div>
      <button className="md:hidden" onClick={toggleMenu}>
        {isOpen ? <X color="#9FC315" /> : <Menu color="#9FC315" />}
      </button>
    </div>
  );
};

export default Navbar;
