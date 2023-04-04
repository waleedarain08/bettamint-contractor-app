import { View, Text, StatusBar, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import Navigation from "./src/navigation/StackNavigation";
import MainNavigation from "./src/navigation/MainNavigation";
import { Colors } from "./src/utils/Colors";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
	}, []);
	return (
		// <Navigation/>
		<Provider store={store}>
			<SafeAreaView />
			<StatusBar backgroundColor={Colors.Primary} />
			<MainNavigation />
		</Provider>
	);
};

export default App;
