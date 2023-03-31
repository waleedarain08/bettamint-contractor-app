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
	Pressable,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import PersonImage from "../../assets/images/personimage.png";
import typeIcon from "../../assets/icons/typeIcon.png";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
import { Building, Search, TickIcon, SquareCheckBox } from "../../icons";
LogBox.ignoreAllLogs();
const PaymentMusterCard = ({ navigation }) => {
	const DATA = [
		{
			date: "01 Mar",
			attendance: "P1",
			advance: "-",
		},
		{
			date: "02 Mar",
			attendance: "P1",
			advance: "-",
		},
		{
			date: "03 Mar",
			attendance: "P1",
			advance: "-",
		},
		{
			date: "04 Mar",
			attendance: "P1",
			advance: "-",
		},
		{
			date: "04 Mar",
			attendance: "P1",
			advance: "-",
		},
		{
			date: "04 Mar",
			attendance: "P1",
			advance: "-",
		},
		{
			date: "05 Mar",
			attendance: "P1",
			advance: "-",
		},
		{
			date: "06 Mar",
			attendance: "P1",
			advance: "-",
		},
		{
			date: "07 Mar",
			attendance: "P1",
			advance: "-",
		},
		{
			date: "08 Mar",
			attendance: "P1",
			advance: "-",
		},

		{
			date: "09 Mar",
			attendance: "P1",
			advance: "-",
		},
		{
			date: "10 Mar",
			attendance: "P1",
			advance: "-",
		},
	];
	const Item = ({ item, index }) => (
		<Pressable
			style={[styles.item]}
			onPress={() => {
				navigation.navigate("AttendanceMusterCard");
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					width: "100%",
					justifyContent: "space-between",
				}}
			>
				<View
					style={{
						width: "20%",
					}}
				>
					<Text style={[styles.flatListText, { textAlign: "left" }]}>
						{item.date}
					</Text>
				</View>
				<View style={{ width: "20%" }}>
					<Text style={[styles.flatListText, { color: Colors.Primary }]}>
						{item.attendance}
					</Text>
				</View>
				<View style={{ width: "15%" }}>
					<Text style={styles.flatListText}>{item.advance}</Text>
				</View>
				<View style={{ width: "15%", alignItems: "center" }}>
					<TickIcon size={20} color={Colors.Primary} />
				</View>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("AttendanceMusterCard");
					}}
					style={{
						backgroundColor: "#ECE5FC",
						padding: 5,
						margin: 5,
						borderRadius: 3,
						width: "20%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text style={styles.smallButton}>Approve</Text>
				</TouchableOpacity>
			</View>
		</Pressable>
	);
	const ListHeader = () => {
		return (
			<View style={[styles.item]}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<View style={{ width: "20%" }}>
						<Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
							Date
						</Text>
					</View>
					<View style={{ width: "20%" }}>
						<Text style={styles.flatListTextHeader}>Attendance</Text>
					</View>
					<View style={{ width: "15%" }}>
						<Text style={styles.flatListTextHeader}>Advance</Text>
					</View>
					<View style={{ width: "15%" }}>
						<Text style={styles.flatListTextHeader}>Verified</Text>
					</View>
					<View style={{ width: "20%" }}>
						<Text style={styles.flatListTextHeader}>Action</Text>
					</View>
				</View>
			</View>
		);
	};
	return (
		<View style={styles.container}>
			<View style={styles.header} />
			<View style={styles.graph}>
				<View
					style={{
						flexDirection: "row",
						width: "100%",
						padding: 10,
					}}
				>
					<View style={{ width: "25%" }}>
						<Image
							style={{ width: 70, height: 70, borderRadius: 10 }}
							source={PersonImage}
						/>
					</View>

					<View style={{ width: "75%" }}>
						<View style={{ flexDirection: "row" }}>
							<Text style={[styles.title, { paddingRight: 10 }]}>
								Pritam Pandit Tripathi
							</Text>
							<SquareCheckBox
								size={20}
								color={Colors.Primary}
								style={{ borderRadius: 10 }}
							/>
						</View>
						<Text style={styles.typeText}>Electrician</Text>
					</View>
				</View>

				<View style={{ flexDirection: "row", padding: 10 }}>
					<Image
						style={{ width: 50, height: 50, borderRadius: 4 }}
						source={typeIcon}
					/>
					<Spacer right={10} />
					<View>
						<Text style={[styles.title, { fontSize: 13 }]}>
							Guru Heights Phase-2 Construction
						</Text>
						<Text style={styles.typeText}>Delhi 11 Guru Mandir Road...</Text>
					</View>
				</View>
				<View style={{ flexDirection: "row", padding: 10 }}>
					<Text style={[styles.title, { fontSize: 19 }]}>March 2023</Text>
				</View>

				<ScrollView>
					<View
						style={{
							margin: 5,
							padding: 5,
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
				<Spacer bottom={60} />
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						padding: 20,
						position: "absolute",
						bottom: 0,
					}}
				>
					<TouchableOpacity style={[styles.button, { width: "48%" }]}>
						<Text style={styles.buttonText}>Pay Online</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.button,
							{ width: "48%", backgroundColor: Colors.Secondary },
						]}
					>
						<Text style={styles.buttonText}>Pay Offline</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};
export default PaymentMusterCard;

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
		// height: "35%",
		backgroundColor: Colors.White,
		marginTop: -150,
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
	typeText: {
		fontFamily: "Lexend-Medium",
		fontSize: 12,
		color: Colors.LightGray,
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
		fontSize: 11,
		color: Colors.Black,
		textAlign: "center",
	},
	button: {
		backgroundColor: Colors.Primary,
		justifyContent: "center",
		borderRadius: 4,
		marginTop: 15,
		height: 40,
	},
	buttonText: {
		fontFamily: "Lexend-Regular",
		fontSize: 12,
		textAlign: "center",
		color: "white",
	},
	flatListTextHeader: {
		fontFamily: "Lexend-Medium",
		fontSize: 11,
		color: Colors.NewGray,
		textAlign: "center",
	},
});
