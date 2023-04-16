import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	ImageBackground,
	StyleSheet,
	FlatList,
	Dimensions,
	Pressable,
	Modal,
	LogBox,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
// import BarChart from "../assets/images/barchart.png";
// import LineChart from "../assets/images/linechart.png";
import { useSelector, useDispatch } from "react-redux";
import {
	getAllProjectsAction,
	projectsListReducer,
} from "../../redux/slices/projectSlice";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
LogBox.ignoreAllLogs();
import { Building, Search, LocationIcon } from "../../icons";
import { GOOGLE_API_KEY, assetsUrl } from "../../utils/api_constants";
import { selectedProjectReducer } from "../../redux/slices/projectSlice";
const DATA = [
	{
		id: "1",
		title: "Ram Parshad Twin Towers",
		num: "175",
		image:
			"https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		stat: "Daily Stats*",
		worker: "1247",
		type: "Residential",
		days: "30",
		supervisor: "Laxmi",
		location:
			"V.Nagar, Tisaiyanvilai, Tirunelveli Natak vin 5703, New Dehli, India",
	},
	{
		id: "2",
		title: "Ram Parshad Twin Towers",
		num: "175",
		image:
			"https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		stat: "Daily Stats*",
		worker: "1247",
		type: "Residential",
		days: "30",
		supervisor: "Laxmi",
		location:
			"V.Nagar, Tisaiyanvilai, Tirunelveli Natak vin 5703, New Dehli, India",
	},
	{
		id: "3",
		title: "Ram Parshad Twin Towers",
		num: "175",
		image:
			"https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		stat: "Daily Stats*",
		worker: "1247",
		type: "Residential",
		days: "30",
		supervisor: "Laxmi",
		location:
			"V.Nagar, Tisaiyanvilai, Tirunelveli Natak vin 5703, New Dehli, India",
	},
	{
		id: "4",
		title: "Ram Parshad Twin Towers",
		num: "175",
		image:
			"https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		stat: "Daily Stats*",
		worker: "1247",
		type: "Residential",
		days: "30",
		supervisor: "Laxmi",
		location:
			"V.Nagar, Tisaiyanvilai, Tirunelveli Natak vin 5703, New Dehli, India",
	},
];

const ProjectDetails = ({ navigation, route }) => {
	const [details, setDetails] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const projectsList = useSelector(projectsListReducer);
	// console.log("Project", projectsList[0]);
	// const { projectId } = route.params;
	// const project = projectsList.find(
	// 	(project) => project.projectId === projectId
	// );
	const project = useSelector(selectedProjectReducer);
	return (
		<View style={styles.container}>
			<View style={styles.header} />
			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
				}}
			>
				<View style={styles.modalView}>
					<View style={{ width: "95%", margin: 10, borderRadius: 30 }}>
						<ImageBackground
							source={{ uri: assetsUrl + project?.url }}
							imageStyle={{ borderRadius: 10 }}
							style={{
								// marginHorizontal: 20,
								// padding: 10,
								width: "100%",
								height: 280,
								resizeMode: "contain",
								// alignItems: "center",
								borderRadius: 20,
							}}
						>
							<View
								style={{
									position: "absolute",
									left: 0,
									right: 0,
									bottom: 0,
									margin: 10,
								}}
							>
								<View
									style={{
										justifyContent: "space-between",
										flexDirection: "row",
										alignItems: "center",
									}}
								>
									<View>
										<Text style={styles.modalText}>Project</Text>
										<Text style={styles.modalHeading}>{project?.name}</Text>
									</View>
									<Building size={20} color={Colors.White} />
								</View>
								<Spacer bottom={10} />
							</View>
						</ImageBackground>
					</View>
					<View
						style={{ padding: 10, justifyContent: "flex-start", width: "100%" }}
					>
						<View
							style={{
								borderBottomWidth: 2,
								borderBottomColor: Colors.WhiteGray,
								padding: 10,
							}}
						>
							<Text style={[styles.modalText, { color: Colors.Gray }]}>
								PROJECT TYPE
							</Text>
							<Text style={[styles.modalHeading, { color: Colors.Black }]}>
								{project?.projectTypeId}
							</Text>
						</View>
						<View
							style={{
								borderBottomWidth: 2,
								borderBottomColor: Colors.WhiteGray,
								padding: 10,
							}}
						>
							<Text style={[styles.modalText, { color: Colors.Gray }]}>
								Required Workers
							</Text>

							<Text style={[styles.modalHeading, { color: Colors.Black }]}>
								{project?.requiredWorkers}
							</Text>
						</View>
						<View
							style={{
								borderBottomWidth: 2,
								borderBottomColor: Colors.WhiteGray,
								padding: 10,
							}}
						>
							<Text style={[styles.modalText, { color: Colors.Gray }]}>
								Active Workers
							</Text>
							<Text style={[styles.modalHeading, { color: Colors.Black }]}>
								{project?.activeWorkers}
							</Text>
						</View>

						<View
							style={{
								borderBottomWidth: 1,
								borderBottomColor: Colors.WhiteGray,
								padding: 10,
							}}
						>
							<Text style={[styles.modalText, { color: Colors.Gray }]}>
								LOCATION
							</Text>
							<Text style={[styles.modalHeading, { color: Colors.Black }]}>
								V.V.Nagar, Tisaiyanvilai, Tirunelveli Natak vin 5703, New Dehli,
								India
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
};
export default ProjectDetails;

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
		fontSize: 10,
		color: Colors.LightGray,
		paddingRight: 10,
	},
	workerNumber: {
		fontFamily: "Lexend-Medium",
		fontSize: 20,
		color: Colors.Black,
	},
	modalView: {
		// paddingTop: Platform.OS === "android" ? 0 : 50,
		backgroundColor: Colors.White,
		// bottom: 0,
		// shadowColor: "#000",
		width: "90%",
		// height: "95%",
		// shadowOffset: {
		//   width: 0,
		//   height: 2,
		// },
		// shadowOpacity: 0.25,
		// shadowRadius: 4,
		elevation: 5,
		borderRadius: 10,
		marginTop: -170,
		// width: '100%',
		alignItems: "center",
	},
	modalText: {
		fontFamily: "Lexend-Medium",
		fontSize: 11,
		color: Colors.FormBorder,
		textTransform: "uppercase",
	},
	modalHeading: {
		fontFamily: "Lexend-Medium",
		fontSize: 14,
		color: Colors.White,
	},
});
