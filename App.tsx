import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Home from '@src/pages/Home/Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
};

export default App;
