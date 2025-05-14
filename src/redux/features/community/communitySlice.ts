import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import communityService from '../../../services/communityService';

// Types
export interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
  };
  comments: Comment[];
  likes: string[];
  createdAt: string;
  tags: string[];
}

interface CommunityState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: CommunityState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

// Async thunks
export const getPosts = createAsyncThunk(
  'community/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      return await communityService.getPosts();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
    }
  }
);

export const getPostById = createAsyncThunk(
  'community/getPostById',
  async (id: string, { rejectWithValue }) => {
    try {
      return await communityService.getPostById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch post');
    }
  }
);

export const createPost = createAsyncThunk(
  'community/createPost',
  async (postData: { title: string; content: string; tags?: string[] }, { rejectWithValue }) => {
    try {
      return await communityService.createPost(postData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create post');
    }
  }
);

export const addComment = createAsyncThunk(
  'community/addComment',
  async ({ postId, content }: { postId: string; content: string }, { rejectWithValue }) => {
    try {
      return await communityService.addComment(postId, content);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);

export const likePost = createAsyncThunk(
  'community/likePost',
  async (postId: string, { rejectWithValue }) => {
    try {
      return await communityService.likePost(postId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to like post');
    }
  }
);

// Slice
const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all posts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Get post by ID
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.currentPost = action.payload;
        state.loading = false;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.unshift(action.payload);
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add comment
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Post>) => {
        state.currentPost = action.payload;
        
        // Update the post in the posts array as well
        const postIndex = state.posts.findIndex(post => post._id === action.payload._id);
        if (postIndex !== -1) {
          state.posts[postIndex] = action.payload;
        }
        
        state.loading = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Like post
      .addCase(likePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action: PayloadAction<Post>) => {
        // Update current post if it's the one being liked
        if (state.currentPost && state.currentPost._id === action.payload._id) {
          state.currentPost = action.payload;
        }
        
        // Update the post in the posts array
        const postIndex = state.posts.findIndex(post => post._id === action.payload._id);
        if (postIndex !== -1) {
          state.posts[postIndex] = action.payload;
        }
        
        state.loading = false;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentPost, clearError } = communitySlice.actions;
export default communitySlice.reducer;