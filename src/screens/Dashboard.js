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
const DATA = [
	{
		id: "1",
		title: "Total Projects*",
		num: "175",
		image: require("../assets/images/totalprojects.png"),
		stat: "Daily Stats*",
	},
	{
		id: "2",
		title: "Active Projects*",
		num: "175",
		image: require("../assets/images/totalworker.png"),
		stat: "Daily Stats*",
	},
	{
		id: "3",
		title: "Total Workers*",
		num: "175",
		image: require("../assets/images/activeprojects.png"),
		stat: "Daily Stats*",
	},
	{
		id: "4",
		title: "Active Workers*",
		num: "175",
		image: require("../assets/images/activeworker.png"),
		stat: "Daily Stats*",
	},
];
const Item = ({ item }) => (
	<View style={styles.item}>
		<Text style={styles.title}>{item.title}</Text>
		<View style={{ flexDirection: "row", alignItems: "center" }}>
			<Image
				source={item.image}
				style={{
					width: 30,
					height: 30,
					resizeMode: "contain",
					alignItems: "center",
				}}
			/>
			<Text style={styles.num}>{item.num}</Text>
		</View>
		<Text style={styles.stat}>{item.stat}</Text>
	</View>
);
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
				<View style={{ height: "60%", alignItems: "center" }}>
					<Image
						source={BarChart}
						style={{ height: 200, width: 360, resizeMode: "contain" }}
					/>
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
			<ScrollView>
				<FlatList
					data={DATA}
					renderItem={({ item }) => <Item item={item} />}
					keyExtractor={(item) => item.id}
					numColumns={2}
				/>

				<View style={styles.scrollGraph}>
					<Spacer bottom={50} />
					<Image
						source={LineChart}
						style={{ height: 200, width: 340, resizeMode: "contain" }}
					/>
					{/* <LineChart
						data={chartData}
						width={screenWidth}
						height={220}
						chartConfig={chartConfig}
					/> */}
				</View>
			</ScrollView>
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
	num: {
		fontFamily: "Lexend-Medium",
		fontSize: 26,
		color: Colors.Black,
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
