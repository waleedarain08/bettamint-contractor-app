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
import Spacer from "../../components/Spacer";
import { Colors } from "../../utils/Colors";
import {
	CardText,
	Phone,
	Email,
	TypeIcon,
	PersonIcon,
	EditIcon,
} from "../../icons";
const Signup = ({ navigation }) => {
	return (
		<ImageBackground source={Vector} style={styles.container}>
			<View style={{ padding: 40 }}>
				<View>
					<Text style={styles.headingText}>Sign Up Now</Text>
					<Text style={styles.text}>Register for a Free Account</Text>
					<View style={styles.inputField}>
						<Image source={Profile} style={{ paddingRight: 15 }} />
						<TextInput
							style={{
								flex: 1,
								fontFamily: "Lexend-Regular",
								fontSize: 13,
								paddingLeft: 10,
								color: Colors.Black,
							}}
							placeholder="First Name"
							placeholderTextColor={Colors.Gray}
						/>
					</View>
					<View style={styles.inputField}>
						<Image source={Profile} style={{ paddingRight: 15 }} />
						<TextInput
							style={{
								flex: 1,
								fontFamily: "Lexend-Regular",
								fontSize: 13,
								color: Colors.Black,
								paddingLeft: 10,
							}}
							placeholder="Last Name"
							placeholderTextColor={Colors.Gray}
						/>
					</View>
					<View style={styles.inputField}>
						<TypeIcon size={20} color={Colors.LightGray} />
						<TextInput
							style={{
								flex: 1,
								fontFamily: "Lexend-Regular",
								fontSize: 13,
								color: Colors.Black,
								paddingLeft: 10,
							}}
							placeholder="Account Type"
							placeholderTextColor={Colors.Gray}
						/>
					</View>
					<View style={styles.inputField}>
						<CardText size={20} color={Colors.LightGray} />
						<TextInput
							style={{
								flex: 1,
								fontFamily: "Lexend-Regular",
								fontSize: 13,
								color: Colors.Black,
								paddingLeft: 10,
							}}
							placeholder="Company Name"
							placeholderTextColor={Colors.Gray}
						/>
					</View>
					<View style={styles.inputField}>
						<Email size={20} color={Colors.LightGray} />
						<TextInput
							style={{
								flex: 1,
								fontFamily: "Lexend-Regular",
								fontSize: 13,
								color: Colors.Black,
								paddingLeft: 10,
							}}
							placeholder="Email Address"
							placeholderTextColor={Colors.Gray}
						/>
					</View>
					<View style={styles.inputField}>
						<Phone size={20} color={Colors.LightGray} />
						<TextInput
							style={{
								flex: 1,
								fontFamily: "Lexend-Regular",
								fontSize: 13,
								color: Colors.Black,
								paddingLeft: 10,
							}}
							placeholder="Phone Number"
							placeholderTextColor={Colors.Gray}
						/>
					</View>
					<TouchableOpacity
						style={styles.button}
						onPress={() => navigation.navigate("Login")}
					>
						<Text style={styles.buttonText}>Sign Up Now</Text>
					</TouchableOpacity>
					<View style={{ padding: 20 }}>
						<Text style={[styles.text, { fontSize: 11, textAlign: "center" }]}>
							No monthly fees, no credit card needed. Create your free account
							and digitize your frontline construction workforce employment
							ecosystem*
						</Text>
					</View>
				</View>
			</View>
			<Pressable
				style={styles.bottomView}
				onPress={() => navigation.navigate("Login")}
			>
				<Text style={styles.forgotText}>Have an Account? Login Here</Text>
			</Pressable>
		</ImageBackground>
	);
};

export default Signup;

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
