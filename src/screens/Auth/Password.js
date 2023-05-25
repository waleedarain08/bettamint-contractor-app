import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	Image,
	Pressable,
	ActivityIndicator,
	PermissionsAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import Vector from "../../assets/images/bgvector.png";
import Profile from "../../assets/icons/Profile.png";
import Lock from "../../assets/icons/Lock.png";
import Spacer from "../../components/Spacer";
import { Colors } from "../../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
	authToken,
	loading,
	userLoginAction,
} from "../../redux/slices/authSlice";
import Toast from "react-native-toast-message";
// import messaging from "@react-native-firebase/messaging";

const Password = ({ navigation, route }) => {
	const [password, setPassword] = useState("");
	const loadingState = useSelector(loading);
	const dispatch = useDispatch();

	useEffect(() => {
		getLocationPermission();
	}, []);

	const getLocationPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
				{
					title: "Enable Notifications",
					message: "Bettamint needs to allow notifications",
					buttonPositive: "OK",
				}
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log("You can use the notification");
				requestUserPermission();
			} else {
				console.log("permission denied");
			}
		} catch (err) {
			console.warn(err);
		}
	};
	async function requestUserPermission() {
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (enabled) {
			console.log("Authorization status:", authStatus);
			// fcmToken()
		}
	}
	const handleLogin = async () => {
		const res = await dispatch(
			userLoginAction(route?.params?.username, password)
		);
		// console.log("response", res);
		if (res?.status === 200) {
			navigation.navigate("Main");
		} else {
			// alert("Error");
			Toast.show({
				type: "error",
				text1: "Error",
				text2: "Incorrect username & password!",
				topOffset: 10,
				position: "top",
				visibilityTime: 3000,
			});
		}
	};
	return (
		<View style={styles.container}>
			<Toast />
			<View style={{ padding: 40 }}>
				<View>
					<Text style={styles.headingText}>Password</Text>
					<Text style={styles.text}>Enter your Password to login</Text>
					<View style={styles.inputField}>
						<Image source={Lock} style={{ paddingRight: 15 }} />
						<TextInput
							style={{
								flex: 1,
								fontFamily: "Lexend-Regular",
								fontSize: 13,
								color: Colors.Black,
							}}
							placeholder="Password"
							placeholderTextColor={Colors.Gray}
							value={password}
							onChangeText={(e) => setPassword(e)}
							secureTextEntry={true}
						/>
					</View>
					{/* <Text style={styles.forgotText}>Forgotten password?</Text> */}
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							handleLogin();
							//   navigation.navigate("Main");
						}}
					>
						{loadingState ? (
							<ActivityIndicator size={"small"} color={Colors.White} />
						) : (
							<Text style={styles.buttonText}>Login</Text>
						)}
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

export default Password;

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
