import { NavLink } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-[#351D5B] border-t border-b">
      <div className="text-center">
        <h1 className="text-8xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-lg mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <NavLink
          to="/"
          className="px-6 py-3 bg-[#9FC315] text-[#351D5B] font-semibold rounded-lg shadow-md hover:bg-white hover:text-[#351D5B] transition-all duration-300"
        >
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
