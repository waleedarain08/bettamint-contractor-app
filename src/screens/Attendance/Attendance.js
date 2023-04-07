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
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { useSelector, useDispatch } from "react-redux";
import {
	getAllAttendanceAction,
	attendanceListReducer,
} from "../../redux/slices/attendanceSlice";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
import { Building, Search } from "../../icons";
LogBox.ignoreAllLogs();
const Attendance = ({ navigation }) => {
	const dispatch = useDispatch();
	const attendanceList = useSelector(attendanceListReducer);
	console.log("ATTENDANCE LIST", attendanceList);
	React.useEffect(() => {
		dispatch(getAllAttendanceAction());
	}, []);
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
	const rowColors = ["#F3F4F4", "#FFFFFF"];
	const Item = ({ item, index }) => (
		<View style={[styles.item]}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					width: "100%",
					justifyContent: "space-between",
					backgroundColor: rowColors[index % rowColors?.length],
					paddingHorizontal: 8,
					paddingVertical: 4,
				}}
			>
				<View
					style={{
						width: "35%",
					}}
				>
					<Text
						style={[
							styles.flatListText,
							{ textAlign: "left", textTransform: "uppercase" },
						]}
					>
						{item?.fullName}
					</Text>
				</View>
				<View style={{ width: "15%" }}>
					<Text style={styles.flatListText}>{item.days}</Text>
				</View>
				<View style={{ width: "15%" }}>
					<Text style={styles.flatListText}>{item.present}</Text>
				</View>
				<View style={{ width: "13%" }}>
					<Text style={styles.flatListText}>{item.absent}</Text>
				</View>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("AttendanceMusterCard");
					}}
					style={{
						backgroundColor: "#ECE5FC",
						padding: 5,
						margin: 5,
						borderRadius: 2,
						width: "13%",
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
					style={{
						flexDirection: "row",
						alignItems: "center",
						width: "100%",
						justifyContent: "space-between",
						// paddingVertical: 15,
						paddingHorizontal: 8,
						backgroundColor: Colors.White,
						height: 50,
						// borderRadius: 10
						borderTopLeftRadius: 10,
						borderTopRightRadius: 25,
					}}
				>
					<View style={{ width: "35%" }}>
						<Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
							Name
						</Text>
					</View>
					<View style={{ width: "20%" }}>
						<Text style={styles.flatListTextHeader}>Man-Days</Text>
					</View>
					<View style={{ width: "15%" }}>
						<Text style={styles.flatListTextHeader}>Present</Text>
					</View>
					<View style={{ width: "15%" }}>
						<Text style={styles.flatListTextHeader}>Absent</Text>
					</View>
					<View style={{ width: "15%" }}>
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
					<View>
						<Text style={styles.selectText}>Link a Project</Text>
						<Text
							style={[
								styles.selectText,
								{ fontFamily: "Lexend-SemiBold", color: Colors.Black },
							]}
						>
							Select a Project
						</Text>
					</View>
				</View>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						style={{
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 3,
							paddingHorizontal: 9,
							paddingVertical: 7,
						}}
					>
						<Text style={styles.smallButton}>Sort By</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 3,
							paddingHorizontal: 9,
							paddingVertical: 7,
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
							borderRadius: 3,
							paddingHorizontal: 7,
						}}
					>
						<Search size={13} color={Colors.Secondary} />
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ alignItems: "flex-end", paddingRight: 20, width: "100%" }}>
				<Text style={{ fontSize: 10, textAlign: "right", color: Colors.White }}>
					Attendance is validated via two-factor authentication*{"\n"} i.e.
					worker Check-In & Geolocation Tracking during work hours.
				</Text>
			</View>
			{/* <ScrollView> */}
			<View
				style={{
					backgroundColor: Colors.White,
					alignItems: "center",
					margin: 10,
					//   paddingHorizontal: 8,
					borderRadius: 10,
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.2,
					shadowRadius: 5,
					elevation: 4,
					width: "93%",
				}}
			>
				<FlatList
					data={attendanceList}
					renderItem={({ item, index }) => <Item item={item} index={index} />}
					keyExtractor={(item) => item.id}
					ListHeaderComponent={ListHeader}
					stickyHeaderIndices={[0]}
					showsVerticalScrollIndicator={false}
				/>
			</View>
			{/* </ScrollView> */}
		</View>
	);
};
export default Attendance;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		width: "100%",
		alignItems: "center",
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
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// height: "10%",
		backgroundColor: Colors.White,
		marginTop: -170,
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
		width: "93%",
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
		// paddingVertical: 5,
		// backgroundColor: Colors.White,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 4,
		width: "100%",
		// height: 40
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
		fontFamily: "Lexend-SemiBold",
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
		color: Colors.ListItemText,
		textAlign: "center",
	},
	flatListTextHeader: {
		fontFamily: "Lexend-Medium",
		fontSize: 11,
		color: Colors.ListHeaderText,
		textAlign: "center",
	},
});
