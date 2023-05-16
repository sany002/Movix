import { configureStore } from '@reduxjs/toolkit';
import homeReduces from './homeSlice';
export const store = configureStore({
  reducer: {
    home: homeReduces,
  },
});
