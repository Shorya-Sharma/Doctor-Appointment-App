/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Onboarding from './src/screens/Onboarding/Onboarding';
import Navigation from './Navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from './src/store/store';
import AppProvider from './src/context/AppProvider';

const queryClient = new QueryClient();
function App(): React.JSX.Element {

  const [values,setValues] = useState({isDoctor:false});
 

  return (
    <View style={{flex:1}}>
    <SafeAreaView style={{flex:0,backgroundColor:'#0B3DA9'}}/>
    <SafeAreaView style={styles.container}>
      
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AppProvider values={{values,setValues}}>
          <Navigation />
          </AppProvider>
        </Provider>
      </QueryClientProvider>
    </SafeAreaView>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
});

export default App;
