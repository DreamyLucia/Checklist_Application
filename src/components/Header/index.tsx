import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { themes } from '@src/styles';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4,
    paddingTop: 16,
    backgroundColor: themes.dark.bodyBg,
    borderBottomColor: themes.dark.borderColor,
    borderBottomWidth: 4,
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: themes.dark.primaryText,
  },
});

const Header: React.FC = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>待办事项</Text>
  </View>
);

export default Header;
