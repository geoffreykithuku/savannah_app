import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const backend_url = import.meta.env.VITE_BACKEND_URL as string;

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
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
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    try {
      // API call to signup the user here
      const response = await axios.post(
        `${backend_url}/users/signup`,
        formData
      );
      if (response.status === 201) {
        const { user, token } = response.data;
        setUser(user);
        setAuthToken(token);
        // save user and token to local storage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', token);
        toast.success('Signup successful');
        navigate('/');
      } else {
        const errorData = response.data;
        setError(errorData.msg || 'Signup failed');
        toast.error(errorData.msg || 'Signup failed');
      }
    } catch (err) {
      setError('Network error');
      toast.error('Network error');
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-[#351D5B]">
      <div className="w-full max-w-md p-8 space-y-4 bg-white text-black rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-[#351D5B]">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600">{error}</p>}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full px-3 py-2 border rounded"
          />
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
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#9FC315] hover:bg-[#8DB40F] rounded text-white font-bold"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center">
          Already have an account?{' '}
          <NavLink to="/login" className="text-[#9FC315]">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
