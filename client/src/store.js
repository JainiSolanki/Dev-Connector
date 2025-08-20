// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,      // same as rootReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(),  // includes thunk by default
  devTools: true             // dev tools enabled automatically
});

export default store;