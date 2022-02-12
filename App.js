import React from 'react';
import { StyleSheet, } from 'react-native';
import MainStack from './routes/MainStack';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import storePersistor from './redux/index';
const {store, persistor} = storePersistor;

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStack />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
