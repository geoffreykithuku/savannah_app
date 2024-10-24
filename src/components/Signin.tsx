import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
const backend_url = import.meta.env.VITE_BACKEND_URL as string;

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { setUser, setAuthToken } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //  API call to signin the user
      const response = await fetch(`${backend_url}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { user, token } = await response.json();
        setUser(user);
        setAuthToken(token);
        // save user and token to local storage
        localStorage.setItem('user', JSON.stringify(user));

        localStorage.setItem('authToken', token);
        toast.success('Signin successful');
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.msg || 'Signin failed');
        toast.error(errorData.msg || 'Signin failed');
      }
    } catch (err) {
      setError('Network error');
      console.log(err);
      toast.error('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-[#351D5B]">
      <div className="w-full max-w-md p-8 space-y-4 bg-white text-black rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-[#351D5B]">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600">{error}</p>}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#9FC315] hover:bg-[#8DB40F] rounded text-white font-bold"
          >
            Sign In
          </button>
        </form>
        <p className="text-center">
          Don’t have an account?{' '}
          <NavLink to="/signup" className="text-[#9FC315]">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signin;
