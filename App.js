import { View, Text, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import Navigation from "./src/navigation/StackNavigation";
import MainNavigation from "./src/navigation/MainNavigation";
import { Colors } from "react-native/Libraries/NewAppScreen";

const App = () => {
  return (
    // <Navigation/>
    <>
      <SafeAreaView />
      <StatusBar backgroundColor={Colors.Primary} />
      <MainNavigation />
    </>
  );
};

export default App;
