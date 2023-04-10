import React, { useEffect, useState } from "react";
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
	TextInput,
	TouchableOpacity,
} from "react-native";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import moment from "moment";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
import {
	Building,
	Search,
	TickIcon,
	Picture,
	SquareCheckBox,
	DotIcon,
	DateIcon,
} from "../../icons";
import { useSelector, useDispatch } from "react-redux";
import {
	getAttendanceMusterAction,
	attendanceMusterReducer,
	getAttendanceApproveAction,
	attendanceApproveReducer,
} from "../../redux/slices/attendanceSlice";
import PersonImage from "../../assets/images/personimage.png";
import typeIcon from "../../assets/icons/typeIcon.png";
import DatePicker from "react-native-date-picker";
LogBox.ignoreAllLogs();
const AttendanceMusterCard = ({ navigation, route }) => {
	const [date, setDate] = useState(new Date());
	const [open, setOpen] = useState(false);
	const [selectedDate, setSelectedDate] = useState("");
	const { workerId, jobId } = route.params;
	console.log("workerId", workerId);
	console.log("jobId", jobId);
	const dispatch = useDispatch();
	const attendanceMuster = useSelector(attendanceMusterReducer);
	console.log("attendanceMuster", attendanceMuster);

	const attendance = attendanceMuster?.attendance;
	console.log("attendance", attendance);

	useEffect(() => {
		dispatch(getAttendanceMusterAction(workerId, jobId));
	}, []);

	useEffect(() => {
		if (attendance) {
			setSelectedDate(attendance?.date);
		}
	}, [attendance]);

	console.log("attendance from screen", attendance);
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
					paddingHorizontal: 6,
					paddingVertical: 8,
				}}
			>
				<View
					style={{
						width: "20%",
					}}
				>
					<Text style={[styles.flatListText, { textAlign: "left" }]}>
						{moment(item?.attendance?.date).format("DD MMMM, YYYY")}
					</Text>
				</View>
				<View
					style={{
						width: "15%",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-around",
					}}
				>
					<Text style={[styles.flatListText, { color: Colors.Primary }]}>
						{item?.day}
					</Text>
					<DotIcon size={25} color={Colors.Primary} />
				</View>
				<View style={{ width: "20%" }}>
					<Text style={styles.flatListText}>{item?.advance}</Text>
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
						// margin: 5,
						borderRadius: 2,
						width: "18%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Text style={styles.smallButton}>Approve</Text>
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
						paddingVertical: 15,
						paddingHorizontal: 8,
						backgroundColor: Colors.White,
						// height: 50,
						// borderRadius: 10
						borderTopLeftRadius: 10,
						borderTopRightRadius: 25,
					}}
				>
					<View style={{ width: "15%" }}>
						<Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
							Date
						</Text>
					</View>
					<View style={{ width: "20%", alignItems: "center" }}>
						<Text style={styles.flatListTextHeader}>Attendance</Text>
					</View>
					<View style={{ width: "15%", alignItems: "center" }}>
						<Text style={styles.flatListTextHeader}>Advance</Text>
					</View>
					<View style={{ width: "15%", alignItems: "center" }}>
						<Text style={styles.flatListTextHeader}>Verified</Text>
					</View>
					<View style={{ width: "18%", alignItems: "center" }}>
						<Text style={[styles.flatListTextHeader, {}]}>Action</Text>
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
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<View style={{ width: "27%" }}>
						<Image
							style={{ width: 92, height: 90, borderRadius: 15 }}
							source={PersonImage}
						/>
					</View>

					<View style={{ width: "70%", bottom: 10 }}>
						<View style={{ flexDirection: "row", alignItems: "center" }}>
							<Text style={[styles.title, { paddingRight: 10 }]}>
								{attendanceMuster?.workerName}
							</Text>
							<SquareCheckBox
								size={20}
								color={Colors.Primary}
								style={{ borderRadius: 10 }}
							/>
						</View>
						<Text style={styles.typeText}>{attendanceMuster?.jobName}</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						// marginTop: 10,
						width: "100%",
						alignItems: "center",
						padding: 10,
					}}
				>
					<Image
						style={{ width: 35, height: 35, borderRadius: 4 }}
						source={typeIcon}
					/>
					<Spacer right={10} />
					<View>
						<Text style={[styles.title, { fontSize: 13 }]}>
							{attendanceMuster?.projectName}
						</Text>
						<Text
							style={[
								styles.typeText,
								{ color: Colors.SubHeading, fontSize: 11 },
							]}
						>
							{attendanceMuster?.cityName}
						</Text>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginTop: 5,
						paddingHorizontal: 10,
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<View style={{ width: "60%" }}>
						<Text
							style={[
								styles.title,
								{ fontSize: 15, textTransform: "uppercase" },
							]}
						>
							April 2023
						</Text>
					</View>
					<View style={{ width: "38%" }}>
						<View style={{ padding: 5, width: "100%" }}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									borderWidth: 0.2,
									borderColor: Colors.FormBorder,
									// marginTop: 7,
									borderRadius: 4,
									paddingHorizontal: 7,
									fontSize: 12,
									height: 32,
									backgroundColor: "#F0F1F3",
									elevation: 1,
									color: Colors.Black,
								}}
							>
								<TextInput
									style={{
										fontFamily: "Lexend-Regular",
										color: Colors.Black,
										fontSize: 10,
										width: "80%",
									}}
									placeholderTextColor={Colors.FormText}
									placeholder="Date Range"
								/>
								{/* <View
                  style={{
                    backgroundColor: Colors.White,
                    width: 25,
                    height: 28,
                    alignItems: "center",
                  }}
                > */}
								<DateIcon
									onPress={() => setOpen(true)}
									color={Colors.FormText}
									size={17}
								/>
								{/* </View> */}
							</View>
						</View>
						<DatePicker
							modal
							mode="date"
							textColor={Colors.Black}
							open={open}
							date={date}
							onConfirm={(date) => {
								setOpen(false);
								setDate(date);
							}}
							onCancel={() => {
								setOpen(false);
							}}
						/>
					</View>
				</View>

				{/* <ScrollView showsHorizontalScrollIndicator={false}> */}
				<View
					style={{
						// margin: 5,
						// padding: 5,
						width: "100%",
						marginTop: 10,
						borderTopWidth: 0.4,
						borderTopColor: "#E5EAED",

						backgroundColor: Colors.White,
						// alignItems: "center",
						// margin: 10,
						// //   paddingHorizontal: 8,
						// borderRadius: 10,
						// shadowColor: "#000",
						// shadowOffset: {
						//   width: 0,
						//   height: 2,
						// },
						// shadowOpacity: 0.2,
						// shadowRadius: 5,
						// elevation: 4,
						// width: "93%",
					}}
				>
					<FlatList
						data={attendance}
						renderItem={({ item, index }) => <Item item={item} index={index} />}
						keyExtractor={(item) => item.id}
						ListHeaderComponent={ListHeader}
						stickyHeaderIndices={[0]}
						showsVerticalScrollIndicator={false}
						// stickyHeaderIndices={[0]}
					/>
				</View>
				{/* </ScrollView> */}
			</View>
		</View>
	);
};
export default AttendanceMusterCard;

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
		// height: "32%",
		backgroundColor: Colors.White,
		// marginTop: -210,
		bottom: 230,
		// padding: 10,
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
		// padding: 10,
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
		fontFamily: "Lexend-Medium",
		fontSize: 16,
		color: Colors.Black,
	},
	num: {
		fontFamily: "Lexend-Medium",
		fontSize: 12,
		color: Colors.LightGray,
	},
	typeText: {
		fontFamily: "Lexend-Regular",
		fontSize: 12,
		color: Colors.Black,
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
		fontSize: 11,
		color: Colors.Black,
		textAlign: "center",
	},
	flatListTextHeader: {
		fontFamily: "Lexend-Medium",
		fontSize: 11,
		color: Colors.ListHeaderText,
		textAlign: "center",
	},
});
