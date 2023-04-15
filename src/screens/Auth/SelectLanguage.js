import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	Image,
} from "react-native";
import React from "react";
import Vector from "../../assets/images/bgvector.png";
import Logo from "../../assets/images/logo.png";
import { Colors } from "../../utils/Colors";
const SelectLanguage = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View
				style={{ padding: 40, justifyContent: "center", alignItems: "center" }}
			>
				<View>
					<Image
						source={Logo}
						style={{ width: 300, height: 50, resizeMode: "contain" }}
					/>
					<Text style={styles.headingText}>easy reliable betta!</Text>
					<Text style={styles.text}>Select Language</Text>
					<View>
						<TouchableOpacity
							style={styles.button}
							onPress={() => navigation.navigate("Login")}
						>
							<Text style={styles.buttonText}>English</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button, { backgroundColor: Colors.Secondary }]}
							onPress={() => navigation.navigate("Login")}
						>
							<Text style={styles.buttonText}>हिंदी</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export default SelectLanguage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.Primary,
		justifyContent: "center",
	},
	headingText: {
		fontFamily: "Lexend-Medium",
		fontSize: 20,
		fontWeight: 500,
		textAlign: "center",
		color: Colors.White,
		fontWeight: "medium",
		marginTop: 15,
	},
	text: {
		fontFamily: "Lexend-Regular",
		fontSize: 18,
		textAlign: "center",
		color: Colors.White,
		fontWeight: "medium",
		marginTop: 35,
	},
	inputField: {
		height: 50,
		borderColor: "#C4C4C4",
		borderWidth: 1,
		borderRadius: 4,
		marginTop: 15,
		backgroundColor: Colors.White,
		padding: 10,
	},
	forgotText: {
		fontFamily: "Lexend-Regular",
		fontSize: 16,
		textAlign: "right",
		color: Colors.White,
		marginTop: 15,
	},
	buttonText: {
		fontFamily: "Lexend-Regular",
		fontSize: 14,
		textAlign: "center",
		color: Colors.White,
		fontWeight: "bold",
	},
	button: {
		backgroundColor: "#B9D696",
		// opacity: 0.5,
		padding: 15,
		borderRadius: 4,
		marginTop: 15,
	},
});
