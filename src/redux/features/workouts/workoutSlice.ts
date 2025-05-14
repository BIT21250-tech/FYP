import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import workoutService from '../../../services/workoutService';

// Types
export interface Exercise {
  _id: string;
  name: string;
  sets: number;
  reps: number;
  rest: number;
  exerciseId: string;
}

export interface WorkoutPlan {
  _id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  exercises: Exercise[];
  createdBy: string;
  isPublic: boolean;
}

interface WorkoutState {
  workoutPlans: WorkoutPlan[];
  currentWorkoutPlan: WorkoutPlan | null;
  loading: boolean;
  error: string | null;
}

const initialState: WorkoutState = {
  workoutPlans: [],
  currentWorkoutPlan: null,
  loading: false,
  error: null,
};

// Async thunks
export const getWorkoutPlans = createAsyncThunk(
  'workouts/getAll',
  async (_, { rejectWithValue }) => {
    try {
      return await workoutService.getWorkoutPlans();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch workout plans');
    }
  }
);

export const getWorkoutPlanById = createAsyncThunk(
  'workouts/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await workoutService.getWorkoutPlanById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch workout plan');
    }
  }
);

export const createWorkoutPlan = createAsyncThunk(
  'workouts/create',
  async (workoutData: Omit<WorkoutPlan, '_id'>, { rejectWithValue }) => {
    try {
      return await workoutService.createWorkoutPlan(workoutData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create workout plan');
    }
  }
);

export const updateWorkoutPlan = createAsyncThunk(
  'workouts/update',
  async ({ id, workoutData }: { id: string; workoutData: Partial<WorkoutPlan> }, { rejectWithValue }) => {
    try {
      return await workoutService.updateWorkoutPlan(id, workoutData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update workout plan');
    }
  }
);

export const deleteWorkoutPlan = createAsyncThunk(
  'workouts/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await workoutService.deleteWorkoutPlan(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete workout plan');
    }
  }
);

// Slice
const workoutSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    clearCurrentWorkout: (state) => {
      state.currentWorkoutPlan = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all workout plans
      .addCase(getWorkoutPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkoutPlans.fulfilled, (state, action: PayloadAction<WorkoutPlan[]>) => {
        state.workoutPlans = action.payload;
        state.loading = false;
      })
      .addCase(getWorkoutPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get workout plan by ID
      .addCase(getWorkoutPlanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWorkoutPlanById.fulfilled, (state, action: PayloadAction<WorkoutPlan>) => {
        state.currentWorkoutPlan = action.payload;
        state.loading = false;
      })
      .addCase(getWorkoutPlanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create workout plan
      .addCase(createWorkoutPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWorkoutPlan.fulfilled, (state, action: PayloadAction<WorkoutPlan>) => {
        state.workoutPlans.push(action.payload);
        state.currentWorkoutPlan = action.payload;
        state.loading = false;
      })
      .addCase(createWorkoutPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update workout plan
      .addCase(updateWorkoutPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWorkoutPlan.fulfilled, (state, action: PayloadAction<WorkoutPlan>) => {
        state.workoutPlans = state.workoutPlans.map(plan => 
          plan._id === action.payload._id ? action.payload : plan
        );
        state.currentWorkoutPlan = action.payload;
        state.loading = false;
      })
      .addCase(updateWorkoutPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete workout plan
      .addCase(deleteWorkoutPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteWorkoutPlan.fulfilled, (state, action: PayloadAction<string>) => {
        state.workoutPlans = state.workoutPlans.filter(plan => plan._id !== action.payload);
        state.loading = false;
        if (state.currentWorkoutPlan && state.currentWorkoutPlan._id === action.payload) {
          state.currentWorkoutPlan = null;
        }
      })
      .addCase(deleteWorkoutPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentWorkout, clearError } = workoutSlice.actions;
export default workoutSlice.reducer;