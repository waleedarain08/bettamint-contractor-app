import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import React from "react";
import Vector from "../assets/images/bgvector.png";
import Profile from "../assets/icons/Profile.png";
import Lock from "../assets/icons/Lock.png";
import { Colors } from "../utils/Colors";
const Dashboard = ({ navigation }) => {
	return (
		<ImageBackground source={Vector} style={styles.container}>
			<View style={styles.upperContainer}></View>
			<ScrollView style={styles.bottomContainer}>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
				</Text>
			</ScrollView>
		</ImageBackground>
	);
};

export default Dashboard;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.Primary,
		justifyContent: "center",
	},
	upperContainer: {
		flex: 1,
		backgroundColor: Colors.Primary,
		justifyContent: "center",
	},
	bottomContainer: {
		flex: 2,
		backgroundColor: Colors.White,
	},
	headingText: {
		fontFamily: "Lexend-Medium",
		fontSize: 27,
		textAlign: "left",
		color: Colors.White,
	},
	text: {
		fontFamily: "Lexend-Regular",
		fontSize: 14,
		textAlign: "left",
		color: Colors.White,
	},
	inputField: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		fontFamily: "Lexend-Regular",
		height: 50,
		borderColor: "#C4C4C4",
		borderWidth: 1,
		borderRadius: 4,
		marginTop: 15,
		backgroundColor: Colors.White,
		paddingLeft: 10,
	},
	forgotText: {
		fontFamily: "Lexend-Regular",
		fontSize: 16,
		textAlign: "right",
		color: Colors.White,
		marginTop: 15,
	},
	button: {
		backgroundColor: Colors.Secondary,
		padding: 15,
		borderRadius: 4,
		marginTop: 15,
	},
	buttonText: {
		fontFamily: "Lexend-Regular",
		fontSize: 15,
		textAlign: "center",
		color: "white",
	},
});
