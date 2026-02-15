import React, {useState, useEffect, useCallback} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/store';
import Routes from './src/routes';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font'; 

SplashScreen.preventAutoHideAsync();

const fetchFont = () => {
    return Font.loadAsync({
        "PoppinsBold":require('./assets/fonts/Poppins-Bold.ttf'),
        "PoppinsMedium":require('./assets/fonts/Poppins-Medium.ttf'),
        "PoppinsRegular":require('./assets/fonts/Poppins-Regular.ttf'),
    })
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    fetchFont()
      .then(() => setFontsLoaded(true))
      .catch(() => console.log("ERRO"));
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded){
      return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} onBeforeLift={onLayoutRootView}>
        <Routes/>
      </PersistGate>
    </Provider>
  );
}