import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import progressService from '../../../services/progressService';

// Types
export interface WorkoutLog {
  _id: string;
  date: string;
  workoutPlanId: string;
  workoutPlanTitle: string;
  exercises: {
    exerciseId: string;
    exerciseName: string;
    sets: {
      weight: number;
      reps: number;
    }[];
  }[];
  duration: number;
  notes: string;
  userId: string;
}

interface ProgressState {
  workoutLogs: WorkoutLog[];
  stats: {
    totalWorkouts: number;
    totalDuration: number;
    mostUsedMuscleGroup: string;
    weeklyWorkouts: { date: string; count: number }[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  workoutLogs: [],
  stats: {
    totalWorkouts: 0,
    totalDuration: 0,
    mostUsedMuscleGroup: '',
    weeklyWorkouts: [],
  },
  loading: false,
  error: null,
};

// Async thunks
export const getWorkoutLogs = createAsyncThunk(
  'progress/getLogs',
  async (_, { rejectWithValue }) => {
    try {
      return await progressService.getWorkoutLogs();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch workout logs');
    }
  }
);

export const addWorkoutLog = createAsyncThunk(
  'progress/addLog',
  async (logData: Omit<WorkoutLog, '_id' | 'userId'>, { rejectWithValue }) => {
    try {
      return await progressService.addWorkoutLog(logData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add workout log');
    }
  }
);

export const deleteWorkoutLog = createAsyncThunk(
  'progress/deleteLog',
  async (id: string, { rejectWithValue }) => {
    try {
      await progressService.deleteWorkoutLog(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete workout log');
    }
  }
);

export const getProgressStats = createAsyncThunk(
  'progress/getStats',
  async (_, { rejectWithValue }) => {
    try {
      return await progressService.getProgressStats();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch progress stats');
    }
  }
);

// Slice
const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get workout logs
      .addCase(getWorkoutLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkoutLogs.fulfilled, (state, action: PayloadAction<WorkoutLog[]>) => {
        state.workoutLogs = action.payload;
        state.loading = false;
      })
      .addCase(getWorkoutLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add workout log
      .addCase(addWorkoutLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addWorkoutLog.fulfilled, (state, action: PayloadAction<WorkoutLog>) => {
        state.workoutLogs.unshift(action.payload);
        state.loading = false;
      })
      .addCase(addWorkoutLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete workout log
      .addCase(deleteWorkoutLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkoutLog.fulfilled, (state, action: PayloadAction<string>) => {
        state.workoutLogs = state.workoutLogs.filter(log => log._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteWorkoutLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get progress stats
      .addCase(getProgressStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgressStats.fulfilled, (state, action: PayloadAction<ProgressState['stats']>) => {
        state.stats = action.payload;
        state.loading = false;
      })
      .addCase(getProgressStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = progressSlice.actions;
export default progressSlice.reducer;