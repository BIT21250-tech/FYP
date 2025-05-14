import axios from 'axios';
import { Exercise } from '../redux/features/exercises/exerciseSlice';
import { getAuthToken } from '../utils/authToken';

const API_URL = 'http://localhost:5000/api';

const getExercises = async (filters?: { muscleGroup?: string; difficulty?: string; equipment?: string }) => {
  const token = getAuthToken();
  
  const config = token ? {
    headers: { Authorization: `Bearer ${token}` },
    params: filters
  } : { params: filters };
  
  const response = await axios.get(`${API_URL}/exercises`, config);
  return response.data;
};

const getExerciseById = async (id: string) => {
  const token = getAuthToken();
  
  const config = token ? {
    headers: { Authorization: `Bearer ${token}` }
  } : {};
  
  const response = await axios.get(`${API_URL}/exercises/${id}`, config);
  return response.data;
};

const exerciseService = {
  getExercises,
  getExerciseById
};

export default exerciseService;