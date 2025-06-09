import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@src/store/store';
import { toggleTheme, setTheme } from '@src/store/themeSlice';

export const useTheme = () => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  return {
    isDarkMode,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (value: boolean) => dispatch(setTheme(value)),
  };
};
