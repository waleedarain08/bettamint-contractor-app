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
	Alert,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import {
	ClockIcon,
	DateIcon,
	EditIcon,
	LocationIcon,
	Picture,
	RupeesIcon,
} from "../../icons";
import Spacer from "../../components/Spacer";
import DropDownPicker from "react-native-dropdown-picker";
import CheckBox from "@react-native-community/checkbox";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
import { useSelector, useDispatch } from "react-redux";
import { selectedJobReducer } from "../../redux/slices/jobSlice";
import moment from "moment";
const screenWidth = Dimensions.get("window").width;
LogBox.ignoreAllLogs();

const JobDetails = ({ navigation }) => {
	const [open, setOpen] = useState(false);
	const [openSkill, setOpenSkill] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Apple", value: "apple" },
		// { label: "Banana", value: "banana" },
	]);
	const jobOBJ = {
		activeWorkers: 0,
		cityName: "2WVX+C5H, Sanghar, Sindh, Pakistan",
		contactNumber: "91111222333",
		contractorId: null,
		contractorName: null,
		dailyWage: 100,
		description: "work",
		endDate: null,
		geofencingArray: [
			{ latitude: 26.04198067508024, longitude: 68.94373902912463 },
			{ latitude: 26.04375434168726, longitude: 68.94556293125476 },
			{ latitude: 26.042134908024217, longitude: 68.94873866672839 },
			{ latitude: 26.040226261064163, longitude: 68.94624957676257 },
			{ latitude: 26.04198067508024, longitude: 68.94373902912463 },
		],
		image: null,
		isAccomodation: false,
		isCompleted: false,
		isFood: false,
		jobId: 282,
		jobMedia: [],
		jobName: "Mason",
		jobStatusId: null,
		latitude: 26.0435693,
		longitude: 68.947998,
		manDays: 12,
		projectId: 80,
		projectImage:
			"/files/project/Test-project111/1024x1024638156008147427495.png",
		projectName: "Test project111",
		rating: 0,
		reportingTime: "2023-04-06T00:42:00",
		requiredWorkers: 5,
		skillId: 5,
		skillLevel: 0,
		skillTypeId: "Skilled",
		startDate: "2023-04-07T00:00:00",
		supervisorName: null,
		totalWage: 1300,
		workingDays: [
			"2023-04-07T00:00:00",
			"2023-04-08T00:00:00",
			"2023-04-09T00:00:00",
			"2023-04-10T00:00:00",
			"2023-04-11T00:00:00",
			"2023-04-12T00:00:00",
			"2023-04-13T00:00:00",
			"2023-04-14T00:00:00",
			"2023-04-15T00:00:00",
			"2023-04-16T00:00:00",
			"2023-04-17T00:00:00",
			"2023-04-18T00:00:00",
			"2023-04-19T00:00:00",
		],
	};
	const [toggleCheckBox, setToggleCheckBox] = useState(false);
	const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
	const Job = useSelector(selectedJobReducer);
	console.log("job", Job);
	return (
		<View style={styles.container}>
			<View style={styles.header} />
			<ScrollView style={styles.graph} showsVerticalScrollIndicator={false}>
				<View style={{ padding: 10, marginTop: 14 }}>
					<Text style={styles.title}>Job title/skill set</Text>
					<View
						style={[
							styles.inputField,
							{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							},
						]}
					>
						<TextInput
							style={{
								fontFamily: "Lexend-Medium",
								color: Colors.Black,
								fontSize: 12,
								width: "80%",
							}}
							value={Job?.jobName}
							placeholderTextColor={Colors.FormText}
							// placeholder={Job?.jobName}
							editable={false}
						/>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						flex: 1,
						width: "100%",
					}}
				>
					<View style={{ padding: 10, width: "50%" }}>
						<Text style={styles.title}>Required Workers</Text>
						<View
							style={[
								styles.inputField,
								{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								},
							]}
						>
							<TextInput
								style={{
									fontFamily: "Lexend-Medium",
									color: Colors.Black,
									fontSize: 12,
									width: "80%",
								}}
								placeholderTextColor={Colors.FormText}
								// placeholder={Job?.activeWorkers}
								value={Job?.requiredWorkers.toString()}
							/>
							<EditIcon color={Colors.Purple} size={20} />
						</View>
					</View>
					<View style={{ padding: 10, width: "50%" }}>
						<Text style={styles.title}>Skill Level</Text>
						<TextInput
							style={styles.inputField}
							placeholderTextColor={Colors.FormText}
							//   placeholder="Man Days"
							value={Job?.skillTypeId}
							editable={false}
						/>
					</View>
				</View>
				<View style={{ padding: 10 }}>
					<Text style={styles.title}>Project Name</Text>
					<View
						style={[
							styles.inputField,
							{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							},
						]}
					>
						<TextInput
							style={{
								fontFamily: "Lexend-Medium",
								color: Colors.Black,
								fontSize: 12,
								width: "80%",
							}}
							value={Job?.projectName}
							placeholderTextColor={Colors.FormText}
							//   placeholder="mm/dd/yyyy"
							editable={false}
						/>
					</View>
				</View>
				<View style={{ padding: 10 }}>
					<Text style={styles.title}>SuperVisor</Text>
					<View
						style={[
							styles.inputField,
							{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							},
						]}
					>
						<TextInput
							style={{
								fontFamily: "Lexend-Medium",
								color: Colors.Black,
								fontSize: 12,
								width: "80%",
							}}
							value={Job?.supervisorName || "N/A"}
							placeholderTextColor={Colors.FormText}
							//   placeholder="mm/dd/yyyy"
							editable={false}
						/>
					</View>
				</View>

				<View style={{ padding: 10 }}>
					<Text style={styles.title}>Start Date</Text>
					<View
						style={[
							styles.inputField,
							{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							},
						]}
					>
						<TextInput
							style={{
								fontFamily: "Lexend-Medium",
								color: Colors.Black,
								fontSize: 12,
								width: "80%",
							}}
							placeholderTextColor={Colors.FormText}
							placeholder="mm/dd/yyyy"
							value={moment(Job?.startDate).format("DD MMM, YYYY")}
							editable={false}
						/>
						<DateIcon color={Colors.FormBorder} size={22} />
					</View>
				</View>
				<View style={{ padding: 10 }}>
					<Text style={styles.title}>Location</Text>
					<View
						style={[
							styles.inputField,
							{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							},
						]}
					>
						<TextInput
							style={{
								fontFamily: "Lexend-Regular",
								color: Colors.Black,
								fontSize: 12,
								width: "80%",
							}}
							placeholderTextColor={Colors.FormText}
							//   placeholder={Job?.cityName}
							value={Job?.cityName}
							editable={false}
						/>
						<LocationIcon color={Colors.FormBorder} size={25} />
					</View>
				</View>
				<View style={{ padding: 10 }}>
					<Text style={styles.title}>Job Description</Text>
					<View
						style={[
							styles.inputField,
							{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							},
						]}
					>
						<TextInput
							style={styles.inputField}
							placeholder="Job Description"
							placeholderTextColor={Colors.FormText}
							value={Job?.description}
						/>
						<EditIcon color={Colors.Purple} size={20} />
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						flex: 1,
						width: "100%",
					}}
				>
					<View style={{ padding: 10, width: "50%" }}>
						<Text style={styles.title}>Man Days</Text>
						<View
							style={[
								styles.inputField,
								{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								},
							]}
						>
							<TextInput
								style={{
									fontFamily: "Lexend-Medium",
									color: Colors.Black,
									fontSize: 12,
									width: "80%",
								}}
								placeholderTextColor={Colors.FormText}
								placeholder="----"
								value={`${Job?.manDays}`}
							/>
							<EditIcon color={Colors.Purple} size={20} />
						</View>
					</View>
					<View style={{ padding: 10, width: "50%" }}>
						<Text style={styles.title}>Reporting Time</Text>
						<View
							style={[
								styles.inputField,
								{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								},
							]}
						>
							<TextInput
								style={{
									fontFamily: "Lexend-Medium",
									color: Colors.Black,
									fontSize: 12,
									width: "80%",
								}}
								placeholderTextColor={Colors.FormText}
								placeholder="----"
								value={moment(Job?.reportingTime).format("hh:mm A")}
								editable={false}
							/>
							<EditIcon color={Colors.Purple} size={20} />
						</View>
					</View>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						flex: 1,
						width: "100%",
					}}
				>
					<View style={{ padding: 10, width: "50%" }}>
						<Text style={styles.title}>Total</Text>
						<View
							style={[
								styles.inputField,
								{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								},
							]}
						>
							<TextInput
								style={{
									fontFamily: "Lexend-Medium",
									color: Colors.Black,
									fontSize: 12,
									width: "80%",
								}}
								placeholderTextColor={Colors.FormText}
								placeholder="----"
								value={`₹ ${Job?.totalWage}`}
								editable={false}
							/>
							<RupeesIcon color={Colors.FormBorder} size={20} />
						</View>
					</View>
					<View style={{ padding: 10, width: "50%" }}>
						<Text style={styles.title}>DAILY WAGE</Text>
						<View
							style={[
								styles.inputField,
								{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
								},
							]}
						>
							<TextInput
								style={{
									fontFamily: "Lexend-Medium",
									color: Colors.Black,
									fontSize: 12,
									width: "80%",
								}}
								placeholderTextColor={Colors.FormText}
								placeholder="----"
								value={`₹ ${Job?.dailyWage}`}
								editable={false}
							/>
							<RupeesIcon color={Colors.FormBorder} size={20} />
						</View>
					</View>
				</View>

				<View style={{ padding: 10 }}>
					<Text style={styles.title}>Contact Number</Text>
					<View
						style={[
							styles.inputField,
							{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							},
						]}
					>
						<TextInput
							style={styles.inputField}
							placeholder="Enter Contact Number"
							placeholderTextColor={Colors.FormText}
							value={`+${Job?.contactNumber}`}
						/>
						<EditIcon color={Colors.Purple} size={20} />
					</View>
				</View>
				<View
					style={{
						padding: 10,
						width: "90%",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<View
						style={{ flexDirection: "row", alignItems: "center", width: "40%" }}
					>
						<CheckBox
							tintColors={{ true: Colors.Primary, false: Colors.Gray }}
							value={Job?.isFood}
							//   onValueChange={(newValue) => setToggleCheckBox(newValue)}
						/>
						<Text
							style={{
								fontSize: 12,
								color: Colors.Black,
								fontFamily: "Lexend-Medium",
							}}
						>
							Food
						</Text>
					</View>
					<View
						style={{ flexDirection: "row", alignItems: "center", width: "40%" }}
					>
						<CheckBox
							tintColors={{ true: Colors.Primary, false: Colors.Gray }}
							value={Job?.isAccomodation}
							//   onValueChange={(newValue) => setToggleCheckBox2(newValue)}
						/>
						<Text
							style={{
								fontSize: 12,
								color: Colors.Black,
								fontFamily: "Lexend-Medium",
							}}
						>
							Accomodation
						</Text>
					</View>
				</View>
				{/* <Text
          style={{
            paddingLeft: 14,
            fontFamily: "Lexend-Medium",
            color: Colors.Black,
            fontSize: 14,
            textTransform: "uppercase",
          }}
        >
          Job Instructions
        </Text> */}
				{/* <View style={styles.uploadBox}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderColor: Colors.LightGray,
              borderStyle: "dashed",
              borderWidth: 0.6,
              borderRadius: 5,
              width: "48%",
              height: 150,
              backgroundColor: Colors.White,
              elevation: 4,
            }}
          >
            <Image
              source={require("../../assets/icons/video.png")}
              style={{ width: 50, height: 44, marginVertical: 5 }}
            />
            <Text style={styles.imgText}>Upload Video File</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderColor: Colors.LightGray,
              borderStyle: "dashed",
              borderWidth: 0.6,
              borderRadius: 5,
              width: "48%",
              height: 150,
              backgroundColor: Colors.White,
              elevation: 4,
            }}
          >
            <Image
              source={require("../../assets/icons/audio.png")}
              style={{ width: 50, height: 44, marginVertical: 5 }}
            />
            <Text style={styles.imgText}>Upload Audio File</Text>
          </View>
        </View> */}
				<Spacer bottom={20} />
			</ScrollView>
			{/* <Spacer top={-30} /> */}
			{/* <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <TouchableOpacity
          style={[styles.button, { width: "60%" }]}
          onPress={() => alert("Job Created")}
        >
          <Text style={styles.buttonText}>Create Job</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { width: "35%", backgroundColor: Colors.Secondary },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View> */}
		</View>
	);
};
export default JobDetails;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		width: "100%",
	},
	header: {
		backgroundColor: Colors.Primary,
		height: "15%",
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
		height: "93%",
		backgroundColor: Colors.White,
		marginTop: -90,
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
		// padding: 20,
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
		fontFamily: "Lexend-Medium",
		fontSize: 10,
		color: Colors.FormText,
		textTransform: "uppercase",
	},
	imgText: {
		fontFamily: "Lexend-Medium",
		fontSize: 10,
		color: Colors.FormText,
		textTransform: "uppercase",
		// textDecorationLine: "underline",
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
	inputField: {
		// flexDirection: "row",
		// justifyContent: "center",
		// alignItems: "center",
		// fontFamily: "Lexend-Regular",
		// height: 40,
		// borderColor: "#C4C4C4",
		// borderWidth: 1,
		// borderRadius: 4,
		// marginTop: 15,
		// backgroundColor: Colors.White,
		// paddingLeft: 10,
		fontFamily: "Lexend-Medium",
		borderBottomWidth: 1,
		borderColor: Colors.FormBorder,
		// marginTop: 7,
		// borderRadius: 4,
		paddingRight: 7,
		fontSize: 12,
		height: 40,
		backgroundColor: Colors.White,
		// elevation: 3,
		color: Colors.Black,
	},
	button: {
		backgroundColor: Colors.Primary,
		// padding: 15,
		borderRadius: 4,
		marginTop: 15,
		height: 40,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontFamily: "Lexend-Regular",
		fontSize: 14,
		textAlign: "center",
		color: "white",
	},

	//   container: {
	//     flex: 1,
	//     backgroundColor: "#FFF",
	//   },
	//   header: {
	//     backgroundColor: Colors.Primary,
	//     height: "15%",
	//     borderBottomLeftRadius: 50,
	//     borderBottomRightRadius: 50,
	//     paddingHorizontal: 20,
	//   },
	//   headerLogo: {
	//     flexDirection: "row",
	//     alignItems: "center",
	//     marginTop: 25,
	//     width: "100%",
	//   },
	//   heading: {
	//     fontSize: 14,
	//     fontFamily: "Lexend-Medium",
	//     color: Colors.Black,
	//     textAlign: "left",
	//   },

	//   graph: {
	//     height: "88%",
	//     backgroundColor: Colors.White,
	//     marginTop: -80,
	//     margin: 15,
	//     shadowColor: "#000",
	//     shadowOffset: {
	//       width: 0,
	//       height: 2,
	//     },
	//     shadowOpacity: 0.2,
	//     shadowRadius: 5,
	//     elevation: 4,
	//     borderRadius: 10,
	//     padding: 10,
	//   },
	//   graphBottom: {
	//     flexDirection: "row",
	//     justifyContent: "space-between",
	//     paddingHorizontal: 20,
	//     paddingTop: 20,
	//   },
	//   graphBottomText: {
	//     fontSize: 10,
	//     fontFamily: "Lexend-Regular",
	//     color: Colors.Black,
	//   },
	//   graphBottomTextBold: {
	//     fontSize: 32,
	//     fontFamily: "Lexend-Bold",
	//     color: Colors.Secondary,
	//     paddingLeft: 10,
	//   },
	//   graphBottomTabs: {
	//     flexDirection: "row",
	//     justifyContent: "space-between",
	//     alignItems: "center",
	//     backgroundColor: Colors.WhiteGray,
	//     borderRadius: 8,
	//     padding: 12,
	//   },
	//   item: {
	//     flex: 1,
	//     padding: 20,
	//     marginVertical: 8,
	//     marginHorizontal: 15,
	//     backgroundColor: Colors.White,
	//     shadowColor: "#000",
	//     shadowOffset: {
	//       width: 0,
	//       height: 2,
	//     },
	//     shadowOpacity: 0.2,
	//     shadowRadius: 5,
	//     elevation: 4,
	//     borderRadius: 10,
	//   },
	//   title: {
	//     fontFamily: "Lexend-Medium",
	//     fontSize: 11,
	//     color: Colors.FormText,
	//     textTransform: "uppercase",
	//   },
	//   imgText: {
	//     fontFamily: "Lexend-Medium",
	//     fontSize: 8,
	//     color: Colors.Primary,
	//     textTransform: "uppercase",
	//     textDecorationLine: "underline",
	//   },
	//   placeholderText: {
	//     flex: 1,
	//     fontFamily: "Lexend-Medium",
	//     fontSize: 11,
	//     textAlign: "left",
	//     color: Colors.LightGray,
	//   },
	//   scrollGraph: {
	//     height: "50%",
	//     backgroundColor: Colors.White,
	//     margin: 15,
	//     shadowColor: "#000",
	//     shadowOffset: {
	//       width: 0,
	//       height: 2,
	//     },
	//     shadowOpacity: 0.2,
	//     shadowRadius: 5,
	//     elevation: 4,
	//     borderRadius: 10,
	//   },
	//   inputField: {
	//     flexDirection: "row",
	//     justifyContent: "center",
	//     alignItems: "center",
	//     fontFamily: "Lexend-Regular",
	//     height: 45,
	//     borderColor: "#C4C4C4",
	//     borderWidth: 1,
	//     borderRadius: 4,
	//     marginTop: 15,
	//     backgroundColor: Colors.White,
	//     paddingLeft: 10,
	//   },
	//   button: {
	//     backgroundColor: Colors.Primary,
	//     padding: 15,
	//     borderRadius: 4,
	//     marginTop: 15,
	//   },
	//   buttonText: {
	//     fontFamily: "Lexend-Regular",
	//     fontSize: 15,
	//     textAlign: "center",
	//     color: "white",
	//   },
	uploadBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: Colors.White,
		// borderRadius: 4,
		// margin: 10,
		padding: 15,
		width: "100%",
		// height: 150,
		// borderColor: "#C4C4C4",
		// borderWidth: 1,
		// backgroundColor: Colors.White,
	},
});
