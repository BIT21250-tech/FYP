import axios from 'axios';
import { WorkoutLog } from '../redux/features/progress/progressSlice';
import { getAuthToken } from '../utils/authToken';

const API_URL = 'http://localhost:5000/api';

const getWorkoutLogs = async () => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No auth token found');
  }
  
  const response = await axios.get(`${API_URL}/workout-logs`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

const addWorkoutLog = async (logData: Omit<WorkoutLog, '_id' | 'userId'>) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No auth token found');
  }
  
  const response = await axios.post(`${API_URL}/workout-logs`, logData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

const deleteWorkoutLog = async (id: string) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No auth token found');
  }
  
  await axios.delete(`${API_URL}/workout-logs/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return id;
};

const getProgressStats = async () => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No auth token found');
  }
  
  const response = await axios.get(`${API_URL}/workout-logs/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

const progressService = {
  getWorkoutLogs,
  addWorkoutLog,
  deleteWorkoutLog,
  getProgressStats
};

export default progressService;