import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from '@ant-design/react-native';
import { themes } from '@src/styles';
import Icon from '@react-native-vector-icons/evil-icons';
import { useTheme } from '@src/hooks/useTheme';

interface Props {
  search: string;
  setSearch: (val: string) => void;
  onAdd: () => void;
}

const SearchContainer: React.FC<Props> = ({ search, setSearch, onAdd }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const theme = themes[isDarkMode ? 'dark' : 'light'];

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      marginTop: 12,
      padding: 8,
    },
    searchContainer: {
      flex: 1,
      height: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 9999,
      backgroundColor: theme.boxBg,
      paddingHorizontal: 8,
    },
    searchIcon: {
      transform: [{ translateY: -2 }],
      color: theme.secondaryText,
    },
    searchInput: {
      flex: 1,
      alignItems: 'center',
      color: theme.secondaryText,
    },
    searcnInputText: {
      color: theme.primaryText,
    },
    addButton: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
    },
    addIcon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      margin: 0,
      color: theme.primary,
    },
    themeToggle: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
    },
    spinnerIcon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      margin: 0,
      color: theme.primaryText,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} style={styles.searchIcon}/>
        <Input
          style={styles.searchInput}
          inputStyle={styles.searcnInputText}
          value={search}
          onChangeText={setSearch}
          placeholder="搜索事件"
        />
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={onAdd}
      >
        <Icon
          name="plus"
          size={36}
          style={styles.addIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.themeToggle}
        onPress={toggleTheme}
      >
        <Icon
          name="spinner"
          size={36}
          style={styles.spinnerIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchContainer;
