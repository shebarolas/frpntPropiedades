import {configureStore} from '@reduxjs/toolkit';
import sessionSlice from './slices/session-slice';
export const store = configureStore({
    reducer: {
        session : sessionSlice
    },
    devTools: true,
  });