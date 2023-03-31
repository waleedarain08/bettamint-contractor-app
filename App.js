import { View, Text, StatusBar, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import Navigation from "./src/navigation/StackNavigation";
import MainNavigation from "./src/navigation/MainNavigation";
import { Colors } from "./src/utils/Colors";
import SplashScreen from "react-native-splash-screen";
const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);
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
