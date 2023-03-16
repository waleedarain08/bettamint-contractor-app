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
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
import { Building, Search } from "../icons";
LogBox.ignoreAllLogs();
const DATA = [
	{
		name: "Arvind Chauhan",
		days: "2",
		present: "2",
		absent: "0",
	},
	{
		name: "Arvind Chauhan",
		days: "2",
		present: "2",
		absent: "0",
	},
	{
		name: "Arvind Chauhan",
		days: "2",
		present: "2",
		absent: "0",
	},
	{
		name: "Arvind Chauhan",
		days: "2",
		present: "2",
		absent: "0",
	},
	{
		name: "Arvind Chauhan",
		days: "2",
		present: "2",
		absent: "0",
	},
	{
		name: "Arvind Chauhan",
		days: "2",
		present: "2",
		absent: "0",
	},
	{
		name: "Arvind Chauhan",
		days: "2",
		present: "2",
		absent: "0",
	},
	{
		name: "Arvind Chauhan",
		days: "2",
		present: "2",
		absent: "0",
	},
	{
		name: "Arvind Chauhan",
		days: "2",
		present: "2",
		absent: "0",
	},
	{
		name: "Arvind Chauhan",
		days: "2",
		present: "2",
		absent: "0",
	},

	{
		name: "Arvind Chauhan",
		days: "2",
		present: "2",
		absent: "0",
	},
	{
		name: "Arvind Chauhan",
		days: "2",
		present: "2",
		absent: "0",
	},
];
const Item = ({ item, index }) => (
	<View style={[styles.item]}>
		<View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
			<View style={{ width: "30%", alignItems: "center" }}>
				<Text style={styles.flatListText}>{item.name}</Text>
			</View>
			<View style={{ width: "15%" }}>
				<Text style={styles.flatListText}>{item.days}</Text>
			</View>
			<View style={{ width: "15%" }}>
				<Text style={styles.flatListText}>{item.present}</Text>
			</View>
			<View style={{ width: "15%" }}>
				<Text style={styles.flatListText}>{item.absent}</Text>
			</View>
			<TouchableOpacity
				style={{
					backgroundColor: "#ECE5FC",
					padding: 5,
					margin: 5,
					borderRadius: 5,
					width: "20%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Text style={styles.smallButton}>View</Text>
			</TouchableOpacity>
		</View>
	</View>
);
const ListHeader = () => {
	return (
		<View style={[styles.item]}>
			<View
				style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
			>
				<View style={{ width: "30%" }}>
					<Text style={styles.flatListText}>Name</Text>
				</View>
				<View style={{ width: "15%" }}>
					<Text style={styles.flatListText}>Days</Text>
				</View>
				<View style={{ width: "15%" }}>
					<Text style={styles.flatListText}>Present</Text>
				</View>
				<View style={{ width: "15%" }}>
					<Text style={styles.flatListText}>Absent</Text>
				</View>
				<View style={{ width: "20%" }}>
					<Text style={styles.flatListText}>Action</Text>
				</View>
			</View>
		</View>
	);
};
const Attendance = ({ navigation }) => {
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
					<Text style={styles.selectText}>Select Project</Text>
				</View>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<TouchableOpacity
						style={{
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 5,
						}}
					>
						<Text style={styles.smallButton}>Sort by</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 5,
						}}
					>
						<Text style={styles.smallButton}>Filter</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 5,
						}}
					>
						<Search size={20} color={Colors.Secondary} />
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView>
				<View
					style={{
						backgroundColor: Colors.White,
						alignItems: "center",
						margin: 10,
						padding: 10,
						borderRadius: 10,
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 2,
						},
						shadowOpacity: 0.2,
						shadowRadius: 5,
						elevation: 4,
					}}
				>
					<FlatList
						data={DATA}
						renderItem={({ item }) => <Item item={item} />}
						keyExtractor={(item) => item.id}
						ListHeaderComponent={ListHeader}
					/>
				</View>
			</ScrollView>
		</View>
	);
};
export default Attendance;

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
		// marginVertical: 8,
		// marginHorizontal: 15,
		backgroundColor: Colors.White,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 4,
		// borderRadius: 10,
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
	flatListText: {
		fontFamily: "Lexend-Medium",
		fontSize: 12,
		color: Colors.Black,
	},
});
