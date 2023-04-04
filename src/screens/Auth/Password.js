import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	Image,
	Pressable,
} from "react-native";
import React from "react";
import Vector from "../../assets/images/bgvector.png";
import Profile from "../../assets/icons/Profile.png";
import Lock from "../../assets/icons/Lock.png";
import Spacer from "../../components/Spacer";
import { Colors } from "../../utils/Colors";
const Login = ({ navigation }) => {
	return (
		<ImageBackground source={Vector} style={styles.container}>
			<View style={{ padding: 40 }}>
				<View>
					<Text style={styles.headingText}>Password</Text>
					<Text style={styles.text}>Enter your Password to login</Text>
					<View style={styles.inputField}>
						<Image source={Lock} style={{ paddingRight: 15 }} />
						<TextInput
							style={{ flex: 1 }}
							placeholder="Password"
							placeholderTextColor={Colors.Gray}
						/>
					</View>
					<Text style={styles.forgotText}>Forgotten password?</Text>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate("Otp")}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Pressable
				style={styles.bottomView}
				onPress={() => navigation.navigate("Signup")}
			>
				<Text style={styles.forgotText}>Not a member? Sign Up Now</Text>
			</Pressable>
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
		fontSize: 13,
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
	bottomView: {
		width: "100%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute", //Here is the trick
		bottom: 20, //Here is the trick
	},
});
