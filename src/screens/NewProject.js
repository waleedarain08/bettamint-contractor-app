import React from "react";
import {
	View,
	Text,
	Image,
	ImageBackground,
	StyleSheet,
	FlatList,
	Dimensions,
	LogBox,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Logo from "../assets/images/logo.png";
import Menu from "../assets/icons/Menu.png";
import { Colors } from "../utils/Colors";
import Spacer from "../components/Spacer";
import BarChart from "../assets/images/barchart.png";
import LineChart from "../assets/images/linechart.png";
import { Picture } from "../icons";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
LogBox.ignoreAllLogs();

const NewProject = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerLogo}>
					<Image source={Menu} style={{ height: 20, width: 20 }} />
					<Image
						source={Logo}
						style={{ width: 150, height: 25, resizeMode: "contain", left: 15 }}
					/>
				</View>
			</View>
			<View style={styles.graph}>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<Picture size={50} color={Colors.LightGray} />
					<Text style={styles.imgText}>Add Picture</Text>
				</View>
				<View></View>
			</View>
		</View>
	);
};
export default NewProject;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
	},
	header: {
		backgroundColor: Colors.Primary,
		height: "28%",
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
		flexDirection: "row",
		justifyContent: "space-between",
		height: "100%",
		backgroundColor: Colors.White,
		marginTop: -100,
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
		fontSize: 12,
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
});
