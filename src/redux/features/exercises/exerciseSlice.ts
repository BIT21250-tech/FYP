import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import exerciseService from '../../../services/exerciseService';

// Types
export interface Exercise {
  _id: string;
  name: string;
  description: string;
  videoUrl: string;
  instructions: string[];
  muscleGroup: string;
  equipment: string;
  difficulty: string;
  thumbnailUrl?: string;
}

interface ExerciseState {
  exercises: Exercise[];
  currentExercise: Exercise | null;
  loading: boolean;
  error: string | null;
}

const initialState: ExerciseState = {
  exercises: [],
  currentExercise: null,
  loading: false,
  error: null,
};

// Async thunks
export const getExercises = createAsyncThunk(
  'exercises/getAll',
  async (filters?: { muscleGroup?: string; difficulty?: string; equipment?: string }, { rejectWithValue }) => {
    try {
      return await exerciseService.getExercises(filters);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch exercises');
    }
  }
);

export const getExerciseById = createAsyncThunk(
  'exercises/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await exerciseService.getExerciseById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch exercise');
    }
  }
);

// Slice
const exerciseSlice = createSlice({
  name: 'exercises',
  initialState,
  reducers: {
    clearCurrentExercise: (state) => {
      state.currentExercise = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all exercises
      .addCase(getExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExercises.fulfilled, (state, action: PayloadAction<Exercise[]>) => {
        state.exercises = action.payload;
        state.loading = false;
      })
      .addCase(getExercises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get exercise by ID
      .addCase(getExerciseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExerciseById.fulfilled, (state, action: PayloadAction<Exercise>) => {
        state.currentExercise = action.payload;
        state.loading = false;
      })
      .addCase(getExerciseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentExercise, clearError } = exerciseSlice.actions;
export default exerciseSlice.reducer;