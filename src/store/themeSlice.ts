import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@app_theme';

interface ThemeState {
  isDarkMode: boolean;
}

// 异步加载保存的主题
const loadTheme = async (): Promise<boolean> => {
  try {
    const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    return savedTheme !== null ? JSON.parse(savedTheme) : true; // 默认暗色模式
  } catch (error) {
    console.error('加载主题失败:', error);
    return true; // 失败时回退到默认值
  }
};

// 初始化状态
export const initialState: ThemeState = {
  isDarkMode: true, // 临时默认值，实际在 store 初始化时会覆盖
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newMode = !state.isDarkMode;
      state.isDarkMode = newMode;
      // 异步保存到本地存储
      AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newMode)).catch(console.error);
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
      AsyncStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(action.payload)).catch(console.error);
    },
  },
});

export const initializeTheme = async () => {
  const savedTheme = await loadTheme();
  return setTheme(savedTheme);
};

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
