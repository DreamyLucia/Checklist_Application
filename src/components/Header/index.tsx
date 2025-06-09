import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { themes } from '@src/styles';
import { useTheme } from '@src/hooks/useTheme';

const Header: React.FC = () => {
  const { isDarkMode } = useTheme();
  const theme = themes[isDarkMode ? 'dark' : 'light'];

  // 将样式移到组件内部以便访问 theme
  const styles = StyleSheet.create({
    header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 4,
      paddingTop: 16,
      backgroundColor: theme.bodyBg,
      borderBottomColor: theme.borderColor,
      borderBottomWidth: 4,
    },
    headerText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: theme.primaryText,
    },
    themeToggle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 'auto',
      height: 36,
      padding: 8,
    },
  });

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>待办事项</Text>
    </View>
  );
};

export default Header;
