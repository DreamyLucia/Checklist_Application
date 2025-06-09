import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@src/store/store';
import Home from '@src/pages/Home/Home';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Home />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
