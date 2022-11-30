import { configureStore } from '@reduxjs/toolkit'
import costsSlice from './costsSlice';

export  const store = configureStore({
  reducer: {
    costs:costsSlice,
  },
});