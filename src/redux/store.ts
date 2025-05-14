import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import workoutReducer from './features/workouts/workoutSlice';
import exerciseReducer from './features/exercises/exerciseSlice';
import progressReducer from './features/progress/progressSlice';
import communityReducer from './features/community/communitySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workouts: workoutReducer,
    exercises: exerciseReducer,
    progress: progressReducer,
    community: communityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;