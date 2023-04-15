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
	LocationIcon,
	Picture,
	RupeesIcon,
} from "../../icons";
import Spacer from "../../components/Spacer";
import DropDownPicker from "react-native-dropdown-picker";
import CheckBox from "@react-native-community/checkbox";
import { createJobAction, createJobReducer } from "../../redux/slices/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import {
	projectsListSimpleReducer,
	getAllProjectsSimpleAction,
} from "../../redux/slices/projectSlice";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
LogBox.ignoreAllLogs();

const CreateNewJob = ({ navigation }) => {
	const [open, setOpen] = useState(false);
	const [openSkill, setOpenSkill] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([]);
	const [selectedProject, setSelectedProject] = useState(null);
	const [requiredWorkers, setRequiredWorkers] = useState("");
	const [requiredSkills, setRequiredSkills] = useState("");
	const [jobDescription, setJobDescription] = useState("");
	const [jobLocation, setJobLocation] = useState("");
	const [jobDate, setJobDate] = useState("");
	const [jobTime, setJobTime] = useState("");
	const [jobBudget, setJobBudget] = useState("");
	const [manDay, setManDay] = useState("");
	const [number, setNumber] = useState("");

	const [toggleCheckBox, setToggleCheckBox] = useState(false);
	const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
	const dispatch = useDispatch();
	const projectsListSimple = useSelector(projectsListSimpleReducer);

	useEffect(() => {
		dispatch(getAllProjectsSimpleAction());
	}, [selectedProject]);
	const onValueChange = (value) => {
		setSelectedProject(value);
	};
	const job = useSelector(createJobReducer);
	useEffect(() => {
		if (job) {
			setSelectedProject(job?.selectedProject);
			setRequiredWorkers(job?.requiredWorkers);
			setRequiredSkills(job?.requiredSkills);
			setJobDescription(job?.jobDescription);
			setJobLocation(job?.jobLocation);
			setJobDate(job?.jobDate);
			setJobTime(job?.jobTime);
			setJobBudget(job?.jobBudget);
			setManDay(job?.manDay);
			setNumber(job?.number);
		}
	}, [job]);

	const submitHandler = async () => {
		const formData = new FormData();
		formData.append("selectedProject", selectedProject);
		formData.append("requiredWorkers", requiredWorkers);
		formData.append("requiredSkills", requiredSkills);
		formData.append("jobDescription", jobDescription);
		formData.append("jobLocation", jobLocation);
		formData.append("jobDate", jobDate);
		formData.append("jobTime", jobTime);
		formData.append("jobBudget", jobBudget);
		formData.append("manDay", manDay);
		formData.append("number", number);
		const response = await dispatch(createJobAction(formData));
		console.log("response", response);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header} />
			<ScrollView style={styles.graph} showsVerticalScrollIndicator={false}>
				<View style={{ padding: 10, marginTop: 14 }}>
					<Text style={styles.title}>Project Name</Text>
					{/* <View style={styles.inputField}> */}
					{/* <TextInput
            style={styles.inputField}
			placeholderTextColor={Colors.FormText}
            placeholder="Enter Project Name"
          /> */}
					<View style={{ marginTop: 7 }}>
						<DropDownPicker
							items={projectsListSimple.map((project) => ({
								label: project?.name,
								value: project?.projectId,
							}))}
							value={selectedProject}
							onValueChange={onValueChange}
							open={open}
							setOpen={setOpen}
							setValue={setSelectedProject}
							placeholder="Select Your Project"
							placeholderStyle={{ color: Colors.FormText, fontSize: 13 }}
							listItemContainerStyle={{ borderColor: Colors.FormBorder }}
							dropDownContainerStyle={{
								backgroundColor: "#dfdfdf",
								borderColor: Colors.FormBorder,
							}}
							// itemSeparatorStyle={{
							//   backgroundColor: "red",
							// }}
							// selectedItemContainerStyle={{fo}}
							selectedItemLabelStyle={{
								fontWeight: "bold",
							}}
							style={{
								borderColor: Colors.FormBorder,
								borderRadius: 4,
								height: 50,
								backgroundColor: Colors.White,
								elevation: 3,
							}}
							arrowIconStyle={{ height: 20, width: 10 }}
						/>
					</View>
					{/* </View> */}
				</View>
				<View style={{ padding: 10, marginTop: open ? 28 : 0 }}>
					<Text style={styles.title}>REQUIRED WORKERS</Text>
					<TextInput
						style={styles.inputField}
						placeholderTextColor={Colors.FormText}
						placeholder="Enter number of required workers"
						value={requiredWorkers}
						onChangeText={(text) => setRequiredWorkers(text)}
					/>
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
									fontFamily: "Lexend-Regular",
									color: Colors.Black,
									fontSize: 12,
									width: "80%",
								}}
								placeholderTextColor={Colors.FormText}
								placeholder="mm/dd/yyyy"
								value={jobDate}
								onChangeText={(text) => setJobDate(text)}
							/>
							<DateIcon color={Colors.FormBorder} size={22} />
						</View>
					</View>
					<View style={{ padding: 10, width: "50%" }}>
						<Text style={styles.title}>Man Days</Text>
						<TextInput
							style={styles.inputField}
							placeholderTextColor={Colors.FormText}
							placeholder="Man Days"
							value={manDay}
							onChangeText={(text) => setManDay(text)}
						/>
					</View>
				</View>
				<View style={{ padding: 10 }}>
					<Text style={styles.title}>Skill Set</Text>
					{/* <View style={styles.inputField}>
            <TextInput
              style={styles.placeholderText}
              placeholder="Select skill set"
              editable={false}
            />
          </View> */}
					<View style={{ marginTop: 7 }}>
						<DropDownPicker
							open={openSkill}
							value={value}
							items={items}
							setOpen={setOpenSkill}
							setValue={setValue}
							setItems={setItems}
							placeholder="Select Skill Set"
							placeholderStyle={{ color: Colors.FormText, fontSize: 13 }}
							listItemContainerStyle={{ borderColor: Colors.FormBorder }}
							dropDownContainerStyle={{
								backgroundColor: "#dfdfdf",
								borderColor: Colors.FormBorder,
							}}
							selectedItemLabelStyle={{
								fontWeight: "bold",
							}}
							style={{
								borderColor: Colors.FormBorder,
								borderRadius: 4,
								height: 50,
								backgroundColor: Colors.White,
								elevation: 3,
							}}
							arrowIconStyle={{ height: 20, width: 10 }}
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
						<Text style={styles.title}>REPORTING TIME</Text>
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
								placeholder="----"
								value={jobTime}
								onChangeText={(text) => setJobTime(text)}
							/>
							<ClockIcon color={Colors.FormText} size={25} />
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
									fontFamily: "Lexend-Regular",
									color: Colors.Black,
									fontSize: 12,
									width: "80%",
								}}
								placeholderTextColor={Colors.FormText}
								placeholder="----"
								value={jobBudget}
								onChangeText={(text) => setJobBudget(text)}
							/>
							<RupeesIcon color={Colors.FormBorder} size={20} />
						</View>
					</View>
				</View>
				<View style={{ padding: 10 }}>
					<Text style={styles.title}>Job Description</Text>
					<TextInput
						style={styles.inputField}
						placeholder="Job Description"
						placeholderTextColor={Colors.FormText}
						value={jobDescription}
						onChangeText={(text) => setJobDescription(text)}
					/>
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
							placeholder="Location"
							value={jobLocation}
							onChangeText={(text) => setJobLocation(text)}
						/>
						<LocationIcon color={Colors.FormBorder} size={25} />
					</View>
				</View>
				<View style={{ padding: 10 }}>
					<Text style={styles.title}>Contact Number</Text>
					<TextInput
						style={styles.inputField}
						placeholder="Enter Contact Number"
						placeholderTextColor={Colors.FormText}
						value={number}
						onChangeText={(text) => setNumber(text)}
					/>
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
							value={toggleCheckBox}
							onValueChange={(newValue) => setToggleCheckBox(newValue)}
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
							value={toggleCheckBox2}
							onValueChange={(newValue) => setToggleCheckBox2(newValue)}
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
				<Text
					style={{
						paddingLeft: 14,
						fontFamily: "Lexend-Medium",
						color: Colors.Black,
						fontSize: 14,
						textTransform: "uppercase",
					}}
				>
					Job Instructions
				</Text>
				<View style={styles.uploadBox}>
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
						{/* <Picture size={40} color={Colors.LightGray} /> */}
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
						{/* <Picture size={40} color={Colors.LightGray} /> */}
						<Image
							source={require("../../assets/icons/audio.png")}
							style={{ width: 50, height: 44, marginVertical: 5 }}
						/>
						<Text style={styles.imgText}>Upload Audio File</Text>
					</View>
				</View>
				<Spacer bottom={20} />
			</ScrollView>
			<Spacer top={-30} />
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					padding: 20,
				}}
			>
				<TouchableOpacity
					style={[styles.button, { width: "60%" }]}
					onPress={() => submitHandler()}
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
			</View>
		</View>
	);
};
export default CreateNewJob;

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
		fontSize: 11,
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
		fontFamily: "Lexend-Regular",
		borderWidth: 1,
		borderColor: Colors.FormBorder,
		marginTop: 7,
		borderRadius: 4,
		paddingHorizontal: 7,
		fontSize: 12,
		height: 50,
		backgroundColor: Colors.White,
		elevation: 3,
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
