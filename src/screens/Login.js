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
import Vector from "../assets/images/bgvector.png";
import Profile from "../assets/icons/Profile.png";
import Lock from "../assets/icons/Lock.png";
import { Colors } from "../utils/Colors";
const Login = ({ navigation }) => {
	return (
		<ImageBackground source={Vector} style={styles.container}>
			<View style={{ padding: 40 }}>
				<View>
					<Text style={styles.headingText}>Get Started</Text>
					<Text style={styles.text}>Enter you Email and Password</Text>
					<View style={styles.inputField}>
						<Image source={Profile} style={{ paddingRight: 15 }} />
						<TextInput
							style={{ flex: 1 }}
							placeholder="Email"
							placeholderTextColor={Colors.Gray}
						/>
					</View>
					<View style={styles.inputField}>
						<Image source={Lock} />
						<TextInput
							style={{ flex: 1 }}
							placeholder="Password"
							placeholderTextColor={Colors.Gray}
						/>
					</View>
					<Text style={styles.forgotText}>Forgot Password</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate("Main")}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ImageBackground>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.Primary,
		justifyContent: "center",
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
