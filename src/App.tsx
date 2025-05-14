import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Layout components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProfilePage from './pages/profile/ProfilePage';
import WorkoutPlansPage from './pages/workouts/WorkoutPlansPage';
import WorkoutPlanDetailPage from './pages/workouts/WorkoutPlanDetailPage';
import ExerciseLibraryPage from './pages/exercises/ExerciseLibraryPage';
import ExerciseDetailPage from './pages/exercises/ExerciseDetailPage';
import ProgressTrackerPage from './pages/progress/ProgressTrackerPage';
import CommunityPage from './pages/community/CommunityPage';
import PostDetailPage from './pages/community/PostDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// Redux actions
import { checkAuthStatus } from './redux/features/auth/authSlice';
import { AppDispatch } from './redux/store';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="workout-plans" element={<WorkoutPlansPage />} />
          <Route path="workout-plans/:id" element={<WorkoutPlanDetailPage />} />
          <Route path="exercises" element={<ExerciseLibraryPage />} />
          <Route path="exercises/:id" element={<ExerciseDetailPage />} />
          <Route path="progress" element={<ProgressTrackerPage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="community/posts/:id" element={<PostDetailPage />} />
        </Route>
        
        {/* 404 page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;