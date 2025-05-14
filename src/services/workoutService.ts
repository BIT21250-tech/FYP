import axios from 'axios';
import { WorkoutPlan } from '../redux/features/workouts/workoutSlice';
import { getAuthToken } from '../utils/authToken';

const API_URL = 'http://localhost:5000/api';

const getWorkoutPlans = async () => {
  const token = getAuthToken();
  
  const config = token ? {
    headers: { Authorization: `Bearer ${token}` }
  } : {};
  
  const response = await axios.get(`${API_URL}/workout-plans`, config);
  return response.data;
};

const getWorkoutPlanById = async (id: string) => {
  const token = getAuthToken();
  
  const config = token ? {
    headers: { Authorization: `Bearer ${token}` }
  } : {};
  
  const response = await axios.get(`${API_URL}/workout-plans/${id}`, config);
  return response.data;
};

const createWorkoutPlan = async (workoutData: Omit<WorkoutPlan, '_id'>) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No auth token found');
  }
  
  const response = await axios.post(`${API_URL}/workout-plans`, workoutData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

const updateWorkoutPlan = async (id: string, workoutData: Partial<WorkoutPlan>) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No auth token found');
  }
  
  const response = await axios.put(`${API_URL}/workout-plans/${id}`, workoutData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

const deleteWorkoutPlan = async (id: string) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No auth token found');
  }
  
  await axios.delete(`${API_URL}/workout-plans/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return id;
};

const workoutService = {
  getWorkoutPlans,
  getWorkoutPlanById,
  createWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan
};

export default workoutService;