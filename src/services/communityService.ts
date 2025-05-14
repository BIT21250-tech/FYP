import axios from 'axios';
import { Post } from '../redux/features/community/communitySlice';
import { getAuthToken } from '../utils/authToken';

const API_URL = 'http://localhost:5000/api';

const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

const getPostById = async (id: string) => {
  const response = await axios.get(`${API_URL}/posts/${id}`);
  return response.data;
};

const createPost = async (postData: { title: string; content: string; tags?: string[] }) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No auth token found');
  }
  
  const response = await axios.post(`${API_URL}/posts`, postData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

const addComment = async (postId: string, content: string) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No auth token found');
  }
  
  const response = await axios.post(`${API_URL}/posts/${postId}/comments`, { content }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

const likePost = async (postId: string) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No auth token found');
  }
  
  const response = await axios.put(`${API_URL}/posts/${postId}/like`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};

const communityService = {
  getPosts,
  getPostById,
  createPost,
  addComment,
  likePost
};

export default communityService;