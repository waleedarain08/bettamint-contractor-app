import {
	StyleSheet,
	Text,
	View,
	ImageBackground,
	TextInput,
	TouchableOpacity,
	Image,
	LogBox,
	ScrollView,
} from "react-native";
import React from "react";
import Vector from "../../assets/images/bgvector.png";
// import ProfileIcon from "../assets/icons/Profile.png";
// import Lock from "../assets/icons/Lock.png";
import { Colors } from "../../utils/Colors";
LogBox.ignoreAllLogs();
import {
	CardText,
	Phone,
	Email,
	TypeIcon,
	PersonIcon,
	EditIcon,
} from "../../icons";
import Spacer from "../../components/Spacer";
const img =
	"https://images.pexels.com/photos/417273/pexels-photo-417273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const Profile = ({ navigation }) => {
	return (
		// <ImageBackground source={Vector} style={styles.container}>
		<View style={styles.container}>
			<View style={styles.header} />
			<ScrollView style={styles.graph}>
				<Spacer top={10} />
				<View
					style={{
						flexDirection: "row",
						width: "100%",
						padding: 10,
					}}
				>
					<View style={{ width: "30%" }}>
						<Image
							style={{ width: 80, height: 80, borderRadius: 10 }}
							source={{ uri: img }}
						/>
					</View>

					<View style={{ width: "65%", justifyContent: "center" }}>
						<Text style={styles.title}>Pyramid Builders</Text>
						<Spacer top={10} />
						<Text style={[styles.typeText, { color: Colors.Secondary }]}>
							Role: Super Admin
						</Text>
						<Spacer top={5} />
						<Text style={styles.typeText}>Username: Preet-kumar</Text>
					</View>
					<View>
						<EditIcon size={20} color={Colors.Secondary} />
					</View>
				</View>
				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<View
						style={{
							backgroundColor: Colors.White,
							width: "100%",
							height: "100%",
							marginTop: 20,
							borderRadius: 35,
							padding: 20,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderBottomColor: Colors.WhiteGray,
								borderBottomWidth: 1,
								paddingBottom: 15,
								marginBottom: 15,
							}}
						>
							<PersonIcon size={20} color={Colors.Secondary} />
							<View style={{ paddingLeft: 15 }}>
								<Text style={styles.headingText}>First Name</Text>
								<Text style={styles.text}>Hredhaan</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderBottomColor: Colors.WhiteGray,
								borderBottomWidth: 1,
								paddingBottom: 15,
								marginBottom: 15,
							}}
						>
							<PersonIcon size={20} color={Colors.Secondary} />
							<View style={{ paddingLeft: 15 }}>
								<Text style={styles.headingText}>Last Name</Text>
								<Text style={styles.text}>Shukla</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderBottomColor: Colors.WhiteGray,
								borderBottomWidth: 1,
								paddingBottom: 15,
								marginBottom: 15,
							}}
						>
							<TypeIcon size={20} color={Colors.Secondary} />
							<View style={{ paddingLeft: 15 }}>
								<Text style={styles.headingText}>Account Type</Text>
								<Text style={styles.text}>Contractor</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderBottomColor: Colors.WhiteGray,
								borderBottomWidth: 1,
								paddingBottom: 15,
								marginBottom: 15,
							}}
						>
							<Email size={20} color={Colors.Secondary} />
							<View style={{ paddingLeft: 15 }}>
								<Text style={styles.headingText}>Email Address</Text>
								<Text style={styles.text}>test@email.com</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderBottomColor: Colors.WhiteGray,
								borderBottomWidth: 1,
								paddingBottom: 15,
								marginBottom: 15,
							}}
						>
							<Phone
								size={20}
								color={Colors.Secondary}
								style={{ transform: [{ scaleX: -1 }] }}
							/>
							<View style={{ paddingLeft: 15 }}>
								<Text style={styles.headingText}>Phone Number</Text>
								<Text style={styles.text}>090078601</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderBottomColor: Colors.WhiteGray,
								borderBottomWidth: 1,
								paddingBottom: 15,
								marginBottom: 15,
							}}
						>
							<PersonIcon size={20} color={Colors.Secondary} />
							<View style={{ paddingLeft: 15 }}>
								<Text style={styles.headingText}>Username</Text>
								<Text style={styles.text}>Hredhaan</Text>
							</View>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								borderBottomColor: Colors.WhiteGray,
								borderBottomWidth: 1,
								paddingBottom: 15,
								marginBottom: 15,
							}}
						>
							<CardText size={20} color={Colors.Secondary} />
							<View style={{ paddingLeft: 15 }}>
								<Text style={styles.headingText}>GSTIN Number</Text>
								<Text style={styles.text}>23 IWHEOIJ 98</Text>
							</View>
						</View>
					</View>
				</View>
				{/* <Spacer bottom={10} /> */}
			</ScrollView>
		</View>

		// {/* </ImageBackground> */}
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
	},
	header: {
		// flexDirection: "row",
		// justifyContent: "space-between",
		backgroundColor: Colors.Primary,
		height: "28%",
		width: "100%",
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 50,
		paddingHorizontal: 20,
	},
	graph: {
		height: "28%",
		backgroundColor: Colors.White,
		marginTop: -180,
		padding: 10,
		margin: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 4,
		borderRadius: 10,
	},
	title: {
		fontFamily: "Lexend-Bold",
		fontSize: 20,
		color: Colors.Black,
	},
	typeText: {
		fontFamily: "Lexend-Medium",
		fontSize: 12,
		color: Colors.Black,
	},
	headingText: {
		fontFamily: "Lexend-Medium",
		fontSize: 10,
		color: Colors.LightGray,
		textTransform: "uppercase",
	},
	text: {
		fontFamily: "Lexend-Regular",
		fontSize: 12,
		color: Colors.Black,
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
