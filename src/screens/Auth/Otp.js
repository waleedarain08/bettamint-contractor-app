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
import OTPInputView from "@twotalltotems/react-native-otp-input";
const Login = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={{ padding: 40 }}>
				<View>
					<Text style={styles.headingText}>Verify</Text>
					<Text style={styles.text}>
						We have send you the verification code on your Phone Enter the OTP
						Code to verify your account.
					</Text>
					<OTPInputView
						style={{ width: "80%", height: 200 }}
						pinCount={4}
						// code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
						// onCodeChanged = {code => { this.setState({code})}}
						autoFocusOnLoad
						codeInputFieldStyle={styles.inputField}
						codeInputHighlightStyle={styles.underlineStyleHighLighted}
						onCodeFilled={(code) => {
							console.log(`Code is ${code}, you are good to go!`);
						}}
					/>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate("Main")}
					>
						<Text style={styles.buttonText}>Verify</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Pressable
				style={styles.bottomView}
				onPress={() => navigation.navigate("Signup")}
			>
				<Text style={styles.forgotText}>Not a member? Sign Up Now</Text>
			</Pressable>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.Primary,
		justifyContent: "center",
		alignItems: "center",
	},
	headingText: {
		fontFamily: "Lexend-Medium",
		fontSize: 27,
		textAlign: "left",
		color: Colors.White,
	},
	underlineStyleHighLighted: {
		borderColor: "#03DAC6",
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
		width: 70,
		borderColor: "#C4C4C4",
		borderWidth: 1,
		borderRadius: 4,
		marginTop: 15,
		backgroundColor: Colors.White,
		paddingLeft: 10,
		margin: 6,
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
