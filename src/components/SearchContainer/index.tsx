import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from '@ant-design/react-native';
import { themes } from '@src/styles';
import Icon from '@react-native-vector-icons/evil-icons';

interface Props {
  search: string;
  setSearch: (val: string) => void;
  onAdd: () => void;
}

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
    backgroundColor: themes.dark.boxBg,
    paddingHorizontal: 8,
  },
  searchIcon: {
    transform: [{ translateY: -2 }],
    color: themes.dark.secondaryText,
  },
  searchInput: {
    flex: 1,
    alignItems: 'center',
    color: themes.dark.secondaryText,
  },
  searcnInputText: {
    color: themes.dark.primaryText,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  addIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 0,
    color: themes.dark.primary,
  },
});

const SearchContainer: React.FC<Props> = ({ search, setSearch, onAdd }) => (
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
    <TouchableOpacity style={styles.addButton} onPress={onAdd}>
      <Icon name="plus" size={36} style={styles.addIcon}/>
    </TouchableOpacity>
  </View>
);

export default SearchContainer;
