import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Image,
	ImageBackground,
	StyleSheet,
	FlatList,
	Dimensions,
	LogBox,
	Modal,
	Pressable,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
import { Building, Search } from "../../icons";
import { OptionsButton } from "react-native-options-button";
import { useSelector, useDispatch } from "react-redux";
import {
	getAttendanceReportAction,
	attendanceReportReducer,
} from "../../redux/slices/attendanceSlice";
LogBox.ignoreAllLogs();
const ApproveAttendance = ({ navigation, route }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const dispatch = useDispatch();
	const { projectId } = route.params.projectId;
	const attendanceReport = useSelector(attendanceReportReducer);

	const [items, setItems] = useState([
		{ label: "P", value: "P" },
		{ label: "1/2P", value: "1/2P" },
		{ label: "P1", value: "P1" },
		{ label: "P2", value: "P2" },
		{ label: "P3", value: "P3" },
		{ label: "P4", value: "P4" },
		{ label: "P5", value: "P5" },
	]);
	const OPTIONS = [
		{ label: "P", value: "P" },
		{ label: "1/2P", value: "1/2P" },
		{ label: "P1", value: "P1" },
		{ label: "P2", value: "P2" },
		{ label: "P3", value: "P3" },
		{ label: "P4", value: "P4" },
		{ label: "P5", value: "P5" },
	];
	const DATA = [
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Offline",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Offline",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
		{
			name: "Arvind Chauhan",
			status: "Online",
		},
	];

	const Options = ({ item }) => (
		<View
			style={{
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
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					width: "100%",
					justifyContent: "space-between",
					// paddingVertical: 6,
				}}
			>
				<Pressable
					style={{
						width: "100%",
					}}
					onPress={() => setModalVisible(false)}
				>
					<Text
						style={[styles.flatListText, { textAlign: "left", fontSize: 11 }]}
					>
						{item.label}
					</Text>
				</Pressable>
			</View>
		</View>
	);
	const OptionsHeader = () => {
		return (
			<View
				style={{
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
					<View style={{ width: "100%" }}>
						<Text
							style={[styles.flatListText, { textAlign: "left", fontSize: 11 }]}
						>
							Approve Status
						</Text>
					</View>
				</View>
			</View>
		);
	};
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
						width: "32%",
					}}
				>
					<Text
						style={[
							styles.flatListText,
							{
								textAlign: "left",
								textTransform: "uppercase",
								fontSize: 10,
								color: Colors.ListItemText,
							},
						]}
					>
						{item.name}
					</Text>
					<Text
						style={[
							styles.flatListText,
							{
								textAlign: "left",
								textTransform: "uppercase",
								fontSize: 9,
								color: Colors.ListItemText,
							},
						]}
					>
						General labour
					</Text>
				</View>
				<View style={{ width: "12%" }}>
					{item.status === "Online" ? (
						<Text style={[styles.flatListText, { color: Colors.Primary }]}>
							{item.status}
						</Text>
					) : (
						<Text style={[styles.flatListText, { color: Colors.Black }]}>
							{item.status}
						</Text>
					)}
				</View>
				<View style={{ width: "17%" }}>
					<Text style={styles.flatListText}>--</Text>
				</View>
				<View style={{ width: "17%" }}>
					<Text style={styles.flatListText}>--</Text>
				</View>
				<View style={{ width: "18%" }}>
					<TouchableOpacity
						onPress={() => setModalVisible(true)}
						style={{
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 3,
							width: "90%",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text style={[styles.smallButton]}>Approve</Text>
					</TouchableOpacity>
				</View>
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
					<View style={{ width: "32%" }}>
						<Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
							Name & Skill Set
						</Text>
					</View>
					<View style={{ width: "12%" }}>
						<Text style={styles.flatListTextHeader}>Status</Text>
					</View>
					<View style={{ width: "17%" }}>
						<Text style={styles.flatListTextHeader}>Check-In</Text>
					</View>
					<View style={{ width: "17%" }}>
						<Text style={styles.flatListTextHeader}>Check Out</Text>
					</View>
					<View style={{ width: "18%" }}>
						<Text style={styles.flatListTextHeader}>Action</Text>
					</View>
				</View>
			</View>
		);
	};
	return (
		<View style={styles.container}>
			<View style={styles.header} />
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					// Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View style={{ width: "100%", alignItems: "flex-end" }}>
					<View style={styles.modalView}>
						<FlatList
							data={OPTIONS}
							renderItem={({ item }) => <Options item={item} />}
							keyExtractor={(item) => item.id}
							ListHeaderComponent={OptionsHeader}
						/>
					</View>
				</View>
			</Modal>

			<View style={styles.graph}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					{/* <View
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
          <Text style={styles.selectText}>Select Project</Text> */}
					<TouchableOpacity
						style={{
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 5,
						}}
					>
						<Text style={styles.smallButton}>Online-90</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 5,
						}}
					>
						<Text style={styles.smallButton}>Offline-20</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 5,
						}}
					>
						<Text style={styles.smallButton}>Present-87</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 5,
						}}
					>
						<Text style={styles.smallButton}>Absent-05</Text>
					</TouchableOpacity>
				</View>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
						<Search size={15} color={Colors.Secondary} />
					</TouchableOpacity>
				</View>
			</View>
			<View
				style={{ alignItems: "flex-end", marginHorizontal: 0, width: "93%" }}
			>
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
					data={DATA}
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
export default ApproveAttendance;
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
		fontSize: 10,
		color: Colors.Black,
		textAlign: "center",
	},
	flatListTextHeader: {
		fontFamily: "Lexend-Medium",
		fontSize: 11,
		color: Colors.ListHeaderText,
		textAlign: "center",
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		top: 200,
		// left: 250,
		width: "40%",
		height: "60%",
		borderRadius: 10,
		padding: 5,
		// alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});
