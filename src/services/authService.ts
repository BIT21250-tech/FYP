import axios from 'axios';
import { User } from '../redux/features/auth/authSlice';
import { getAuthToken } from '../utils/authToken';

const API_URL = 'http://localhost:5000/api';

const register = async (userData: { name: string; email: string; password: string; fitnessGoals?: string }) => {
  const response = await axios.post(`${API_URL}/users/register`, userData);
  return response.data;
};

const login = async (userData: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  
  // Save token to localStorage
  localStorage.setItem('token', response.data.token);
  
  return response.data;
};

const getCurrentUser = async () => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No auth token found');
  }
  
  const response = await axios.get(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

const updateProfile = async (userData: Partial<User>) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No auth token found');
  }
  
  const response = await axios.put(`${API_URL}/users/profile`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

const authService = {
  register,
  login,
  getCurrentUser,
  updateProfile
};

export default authService;