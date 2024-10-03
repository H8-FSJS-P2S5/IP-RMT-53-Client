import { configureStore } from '@reduxjs/toolkit';
import animeReducer from './features/anitrackrSlice.js';

const store = configureStore({
  reducer: {
    anime: animeReducer,
  },
});

export default store;
