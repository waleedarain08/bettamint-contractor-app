import { View, Text, StatusBar, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import MainNavigation from "./src/navigation/MainNavigation";
import { Colors } from "./src/utils/Colors";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { enableLatestRenderer } from "react-native-maps";
import Toast from "react-native-toast-message";

enableLatestRenderer();

const persistor = persistStore(store);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaView />
      <StatusBar backgroundColor={Colors.Primary} />
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
        <Toast />
      </PersistGate>
    </Provider>
  );
};

export default App;
