import { Facebook, Linkedin, Twitter } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#351D5B] text-white py-8 px-5 md:px-20">
      <div className="md:flex md:justify-between md:items-start">
        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p>Geoffrey Kithuku </p>
          <p> Nairobi, Kenya</p>
          <p>Phone: +254 759892639 </p>
          <p>
            Email:{' '}
            <a
              href="mailto:mutembeikithuku12@gmail.com"
              className="text-[#9FC315]"
            >
              mutembeikithuku12@gmail.com
            </a>
          </p>
        </div>

        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <NavLink to="/" className="hover:text-[#9FC315]">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-[#9FC315]">
                About
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="mb-6 md:mb-0">
          <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9FC315]"
            >
              <Facebook />
              Facebook
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9FC315]"
            >
              <Linkedin /> LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#9FC315]"
            >
              <Twitter /> Twitter
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-500 mt-8 pt-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Savannah Informatics. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
