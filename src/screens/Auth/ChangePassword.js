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
import React, { useState } from "react";
import Vector from "../../assets/images/bgvector.png";
import Lock from "../../assets/icons/Lock.png";
import Spacer from "../../components/Spacer";
import { Colors } from "../../utils/Colors";
import { Switch } from "react-native-paper";
import Toast from "react-native-toast-message";
const ChangePassword = ({ navigation }) => {
	const [password, setPassword] = useState("");
	const handleButtonPress = () => {
		if (username.trim() === "") {
			Toast.show({
				type: "error",
				text1: "Error",
				text2: "Please enter your email address!",
				topOffset: 10,
				position: "top",
				visibilityTime: 3000,
			});
			return;
		}
	};
	return (
		<View style={styles.container}>
			<View style={{ padding: 40 }}>
				<View>
					<Text style={styles.headingText}>Change Password</Text>
					<Text style={[styles.text, { paddingTop: 10 }]}>Old Password</Text>
					<View style={styles.inputField}>
						<Image source={Lock} style={{ paddingRight: 15 }} />
						<TextInput
							style={{
								flex: 1,
								fontFamily: "Lexend-Regular",
								fontSize: 13,
								color: Colors.Black,
							}}
							placeholder="Old Password"
							placeholderTextColor={Colors.Gray}
							value={password}
							onChangeText={(e) => setPassword(e)}
							secureTextEntry={true}
						/>
					</View>
					<Text style={[styles.text, { paddingTop: 10 }]}>New Password</Text>
					<View style={styles.inputField}>
						<Image source={Lock} style={{ paddingRight: 15 }} />
						<TextInput
							style={{
								flex: 1,
								fontFamily: "Lexend-Regular",
								fontSize: 13,
								color: Colors.Black,
							}}
							placeholder={"New Password"}
							placeholderTextColor={Colors.Gray}
							mode="outlined"
							secureTextEntry={true}
						/>
					</View>
					<Text style={[styles.text, { paddingTop: 10 }]}>
						Confirm Password
					</Text>
					<View style={styles.inputField}>
						<Image source={Lock} style={{ paddingRight: 15 }} />
						<TextInput
							style={{
								flex: 1,
								fontFamily: "Lexend-Regular",
								fontSize: 13,
								color: Colors.Black,
							}}
							placeholder={"Confirm Password"}
							placeholderTextColor={Colors.Gray}
							mode="outlined"
							secureTextEntry={true}
						/>
					</View>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							// handleButtonPress();
							navigation.navigate("ChangePassword");
						}}
					>
						<Text style={styles.buttonText}>Submit</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ChangePassword;

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
		marginTop: 10,
		backgroundColor: Colors.White,
		paddingLeft: 10,
	},
	forgotText: {
		fontFamily: "Lexend-Regular",
		fontSize: 13,
		position: "absolute",
		bottom: 0,
		textAlign: "center",
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
