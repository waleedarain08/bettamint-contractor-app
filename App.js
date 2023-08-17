import { View, Text, StatusBar, SafeAreaView, ScrollView, BackHandler, Linking, Alert } from "react-native";
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
import VersionCheck from 'react-native-version-check';

enableLatestRenderer();

const persistor = persistStore(store);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    checkUpdateNeeded()
  }, []);

  const checkUpdateNeeded = async () => {
    try {
      let updateNeeded = await VersionCheck.needUpdate();
      if (updateNeeded && updateNeeded.isNeeded) {
        Alert.alert(
          'Please Update App',
          'You will have to update your app to the latest version to continue using Bettamint - Contractor.',
          [
            {
              text: 'Update',
              onPress: () => {
                BackHandler.exitApp();
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.bettamintcontractor',
                );
              },
            },
          ],
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
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
