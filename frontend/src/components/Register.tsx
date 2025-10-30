import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth';

interface RegisterResponse {
  token: string;
  user: Record<string, any>;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Expect authService.register to return { token, user }
      const response = (await authService.register(
        formData.email,
        formData.password,
        formData.name
      )) as RegisterResponse;

      if (!response?.token) {
        throw new Error('Invalid response from server');
      }

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard');
    } catch (err: any) {
      // handle Axios-like errors and generic errors
      const message =
        err?.response?.data?.message ?? err?.message ?? 'Registration failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>

        {error && (
          <div
            role="alert"
            className="mb-4 text-sm text-red-700 bg-red-100 px-3 py-2 rounded"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              minLength={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white ${
              loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
