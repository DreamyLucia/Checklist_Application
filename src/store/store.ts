import { configureStore } from '@reduxjs/toolkit';
import themeReducer, { initializeTheme } from '@src/store/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

// 初始化主题
initializeTheme().then((action) => {
  store.dispatch(action);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
