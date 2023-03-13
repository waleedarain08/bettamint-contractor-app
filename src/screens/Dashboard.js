import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet } from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Logo from "../assets/images/logo.png";
import Menu from "../assets/icons/Menu.png";
import { Colors } from "../utils/Colors";
import { PersonRunning } from "../icons";
import { LineGraph } from "react-native-graph";
// const priceHistory = usePriceHistory("ethereum");
const Dashboard = ({ navigation }) => {
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
				<View style={{ height: "60%" }}>
					<Text>Graph Area</Text>
				</View>
				<View style={styles.graphBottom}>
					<View style={styles.graphBottomTabs}>
						<Text style={styles.graphBottomText}>
							Avg Active {"\n"}Workforce{" "}
						</Text>
						<Text style={styles.graphBottomTextBold}>350</Text>
					</View>
					<View style={styles.graphBottomTabs}>
						<Text style={styles.graphBottomText}>Average {"\n"}Workforce</Text>
						<Text style={styles.graphBottomTextBold}>350</Text>
					</View>
				</View>
			</View>
			<ScrollView></ScrollView>
		</View>
	);
};
export default Dashboard;

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
		height: "40%",
		backgroundColor: Colors.White,
		marginTop: -100,
		margin: 20,
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
});
