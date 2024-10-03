// src/redux/animeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jikan from '../utils/jikan';

export const fetchPopularAnime = createAsyncThunk(
  'anime/fetchPopularAnime',
  async (page) => {
    const response = await jikan({
      method: 'get',
      url: `/top/anime?page=${page}`,
    });
    return response.data.data;
  }
);

const animeSlice = createSlice({
  name: 'anime',
  initialState: {
    popularAnime: [],
    loading: false,
    hasMore: true,
  },
  reducers: {
    resetAnime: (state) => {
      state.popularAnime = [];
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularAnime.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularAnime.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.hasMore = false;
        } else {
          state.popularAnime.push(...action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchPopularAnime.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetAnime } = animeSlice.actions;

export default animeSlice.reducer;
