import React, { useEffect } from "react";
import {
	View,
	Text,
	Image,
	ImageBackground,
	StyleSheet,
	FlatList,
	Dimensions,
	LogBox,
	Alert,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import { Picture } from "../../icons";
import Spacer from "../../components/Spacer";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
LogBox.ignoreAllLogs();

const CreateNewProject = ({ navigation }) => {
	// useEffect(() => {
	// 	navigation.getParent()?.setOptions({
	// 		tabBarStyle: {
	// 			display: "none",
	// 		},
	// 	});
	// 	return () =>
	// 		navigation.getParent()?.setOptions({
	// 			tabBarStyle: undefined,
	// 		});
	// }, [navigation]);
	return (
		<View style={styles.container}>
			<View style={styles.header} />
			<ScrollView style={styles.graph}>
				<View
					style={{
						flexDirection: "row",
						width: "100%",
						alignItems: "center",
						padding: 20,
					}}
				>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							borderColor: Colors.LightGray,
							borderStyle: "dashed",
							borderWidth: 1,
							borderRadius: 5,
							width: 80,
							height: 80,
						}}
					>
						<Picture size={40} color={Colors.LightGray} />
						<Text style={styles.imgText}>Add Picture</Text>
					</View>
					<Spacer right={20} />
					<View style={{ width: "65%" }}>
						<Text style={styles.title}>Project Type</Text>
						<View style={styles.inputField}></View>
					</View>
				</View>
				<View style={{ padding: 20 }}>
					<Text style={styles.title}>Project Name</Text>
					<View style={styles.inputField}>
						<TextInput style={{ flex: 1 }} placeholder="Enter Project Name" />
					</View>
				</View>
				<Spacer top={20} />
				<View>
					<ImageBackground
						style={{ width: "100%", height: 365 }}
						source={require("../../assets/images/map.png")}
					>
						<View style={[styles.inputField, { margin: 20 }]}>
							<TextInput style={{ flex: 1 }} placeholder="Search Location" />
						</View>
					</ImageBackground>
				</View>
			</ScrollView>
			<Spacer top={-20} />
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					padding: 20,
				}}
			>
				<TouchableOpacity
					style={[styles.button, { width: "60%" }]}
					onPress={() => alert("Project Created")}
				>
					<Text style={styles.buttonText}>Create Project</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.button,
						{ width: "35%", backgroundColor: Colors.Secondary },
					]}
					onPress={() => navigation.goBack()}
				>
					<Text style={styles.buttonText}>Cancel</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
export default CreateNewProject;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
	},
	header: {
		backgroundColor: Colors.Primary,
		height: "15%",
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 50,
		paddingHorizontal: 20,
	},
	headerLogo: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 25,
		width: "100%",
	},
	graph: {
		height: "88%",
		backgroundColor: Colors.White,
		marginTop: -90,
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
		// padding: 20,
	},
	graphBottom: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingTop: 20,
	},
	graphBottomText: {
		fontSize: 10,
		fontFamily: "Lexend-Regular",
		color: Colors.Black,
	},
	graphBottomTextBold: {
		fontSize: 32,
		fontFamily: "Lexend-Bold",
		color: Colors.Secondary,
		paddingLeft: 10,
	},
	graphBottomTabs: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: Colors.WhiteGray,
		borderRadius: 8,
		padding: 12,
	},
	item: {
		flex: 1,
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 15,
		backgroundColor: Colors.White,
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
		fontSize: 12,
		color: Colors.LightGray,
	},
	imgText: {
		fontFamily: "Lexend-Medium",
		fontSize: 10,
		color: Colors.Primary,
		textTransform: "uppercase",
		textDecorationLine: "underline",
	},
	stat: {
		fontFamily: "Lexend-Medium",
		fontSize: 6,
		textAlign: "right",
		color: Colors.LightGray,
	},
	scrollGraph: {
		height: "50%",
		backgroundColor: Colors.White,
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
	inputField: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		fontFamily: "Lexend-Regular",
		height: 40,
		borderColor: "#C4C4C4",
		borderWidth: 1,
		borderRadius: 4,
		marginTop: 15,
		backgroundColor: Colors.White,
		paddingLeft: 10,
	},
	button: {
		backgroundColor: Colors.Primary,
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
