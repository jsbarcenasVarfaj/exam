/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import CustomFlatList from './src/screens/custom-flat-list/CustomFlatList';
import AppContext from './src/context/AppContext';

const App = () => {
  return (
    <React.Fragment>
      <AppContext>
        <SafeAreaView style={styles.container}>
          <CustomFlatList />
        </SafeAreaView>
      </AppContext>
    </React.Fragment>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {flex: 1},
});
