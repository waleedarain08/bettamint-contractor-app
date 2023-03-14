import React from "react";
import {
	View,
	Text,
	Image,
	ImageBackground,
	StyleSheet,
	FlatList,
	Dimensions,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Logo from "../assets/images/logo.png";
import Menu from "../assets/icons/Menu.png";
import { Colors } from "../utils/Colors";
import Spacer from "../components/Spacer";
import BarChart from "../assets/images/barchart.png";
import LineChart from "../assets/images/linechart.png";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
import { Building } from "../icons";
const DATA = [
	{
		id: "1",
		title: "Ram Parshad Twin Towers",
		num: "175",
		image:
			"https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		stat: "Daily Stats*",
		worker: "1247",
	},
	{
		id: "2",
		title: "Ram Parshad Twin Towers",
		num: "175",
		image:
			"https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		stat: "Daily Stats*",
		worker: "1247",
	},
	{
		id: "3",
		title: "Ram Parshad Twin Towers",
		num: "175",
		image:
			"https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		stat: "Daily Stats*",
		worker: "1247",
	},
	{
		id: "4",
		title: "Ram Parshad Twin Towers",
		num: "175",
		image:
			"https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		stat: "Daily Stats*",
		worker: "1247",
	},
];
const Item = ({ item }) => (
	<View style={styles.item}>
		<View style={{ flexDirection: "row", alignItems: "center" }}>
			<Image
				source={{ uri: item.image }}
				style={{
					width: 100,
					height: 100,
					resizeMode: "contain",
					alignItems: "center",
					borderRadius: 10,
				}}
			/>
			<Spacer left={10} />
			<View>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.num}>RERA ID: {item.id}</Text>
				<Text style={styles.num}>
					REMAINING {"\n"}WORK DAYS {item.id}
				</Text>
			</View>
		</View>
		<Spacer bottom={10} />
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				borderTopColor: Colors.LightGray,
				borderTopWidth: 1,
				paddingTop: 10,
				borderStyle: "dashed",
			}}
		>
			<View
				style={{
					alignItems: "center",
					borderRightColor: Colors.LightGray,
					borderRightWidth: 1,
					paddingRight: 20,
					borderStyle: "dashed",
				}}
			>
				<Text style={styles.workerHeading}>Total Workers</Text>
				<Text style={styles.workerNumber}>{item.worker}</Text>
			</View>
			<View
				style={{
					alignItems: "center",
					borderRightColor: Colors.LightGray,
					borderRightWidth: 1,
					paddingRight: 20,
					borderStyle: "dashed",
				}}
			>
				<Text style={styles.workerHeading}>Total Workers</Text>
				<Text style={styles.workerNumber}>{item.worker}</Text>
			</View>
			<View style={{ alignItems: "center" }}>
				<Text style={styles.workerHeading}>Total Workers</Text>
				<Text style={styles.workerNumber}>{item.worker}</Text>
			</View>
		</View>
	</View>
);
const Projects = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerLogo}>
					<Image source={Menu} style={{ height: 20, width: 20 }} />
					<Text style={styles.heading}>Projects</Text>
				</View>
				<View>
					<TouchableOpacity>
						<Text>New Project</Text>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.graph}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<View
						style={{
							backgroundColor: "#F7F8F9",
							borderRadius: 50,
							width: 40,
							height: 40,
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Building size={20} color={Colors.LightGray} />
					</View>
					<Text style={styles.selectText}>Link a Project</Text>
				</View>
				<TouchableOpacity style={{ backgroundColor: "#F7F8F9", padding: 5 }}>
					<Text style={styles.smallButton}>Submit</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.linkText}>
				Please type a Project Name here to link*
			</Text>
			<ScrollView>
				<FlatList
					data={DATA}
					renderItem={({ item }) => <Item item={item} />}
					keyExtractor={(item) => item.id}
				/>
			</ScrollView>
		</View>
	);
};
export default Projects;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
	},
	header: {
		// flexDirection: "row",
		// justifyContent: "space-between",
		backgroundColor: Colors.Primary,
		height: "35%",
		width: "100%",
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 50,
		paddingHorizontal: 20,
	},
	heading: {
		fontSize: 20,
		fontFamily: "Lexend-Medium",
		color: Colors.White,
		marginLeft: 10,
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
		alignItems: "center",
		height: "8%",
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
		padding: 10,
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
		fontSize: 16,
		color: Colors.Black,
	},
	num: {
		fontFamily: "Lexend-Medium",
		fontSize: 12,
		color: Colors.LightGray,
	},
	stat: {
		fontFamily: "Lexend-Medium",
		fontSize: 6,
		textAlign: "right",
		color: Colors.LightGray,
	},

	selectText: {
		fontFamily: "Lexend-Medium",
		fontSize: 10,
		color: Colors.Gray,
		paddingLeft: 10,
	},
	smallButton: {
		fontFamily: "Lexend-Medium",
		fontSize: 10,
		color: Colors.Secondary,
	},
	linkText: {
		fontFamily: "Lexend-Medium",
		fontSize: 10,
		color: Colors.White,
		textAlign: "right",
		marginRight: 15,
	},
	workerHeading: {
		fontFamily: "Lexend-Medium",
		fontSize: 12,
		color: Colors.Gray,
	},
	workerNumber: {
		fontFamily: "Lexend-Medium",
		fontSize: 20,
		color: Colors.Black,
	},
});
