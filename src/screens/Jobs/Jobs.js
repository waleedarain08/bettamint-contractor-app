import React, { useEffect, useState } from "react";
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
// import Logo from "../assets/images/logo.png";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
// import BarChart from "../assets/images/barchart.png";
// import LineChart from "../assets/images/linechart.png";
import DropDownPicker from "react-native-dropdown-picker";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
import { LocationIcon, Search, BackIcon, Cross } from "../../icons";
import { Building, Whatsapp } from "../../icons";
import { useSelector, useDispatch } from "react-redux";
import { Searchbar } from "react-native-paper";
import {
	getAllJobsAction,
	jobsListReducer,
	selectedJobAction,
} from "../../redux/slices/jobSlice";
import {
	getAllProjectsSimpleAction,
	projectsListSimpleReducer,
} from "../../redux/slices/projectSlice";
import moment from "moment";
LogBox.ignoreAllLogs();

const Jobs = ({ navigation }) => {
	const [details, setDetails] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [openSearchModal, setOpenSearchModal] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);
	const [filteredDataSource, setFilteredDataSource] = useState([]);
	const [masterDataSource, setMasterDataSource] = useState([]);
	const [search, setSearch] = useState("");
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();

	const jobsList = useSelector(jobsListReducer);
	const projectsListSimple = useSelector(projectsListSimpleReducer);

	useEffect(() => {
		dispatch(getAllJobsAction());
	}, []);
	useEffect(() => {
		dispatch(getAllProjectsSimpleAction());
	}, [selectedProject]);

	const onValueChange = (value) => {
		setSelectedProject(value);
	};
	useEffect(() => {
		setFilteredDataSource(projectsListSimple);
		setMasterDataSource(projectsListSimple);
	}, [projectsListSimple]);
	const searchFilterFunction = (text) => {
		// Check if searched text is not blank
		if (text) {
			// Inserted text is not blank
			// Filter the masterDataSource and update FilteredDataSource
			const newData = masterDataSource.filter(function (item) {
				// Applying filter for the inserted text in search bar
				const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			setFilteredDataSource(newData);
			setSearch(text);
		} else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			setFilteredDataSource(masterDataSource);
			setSearch(text);
		}
	};
	const Item = ({ item }) => (
		<View style={styles.item}>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View>
					<Text style={styles.flatlistHeading}>{item?.projectName}</Text>
				</View>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("JobDetails");
							dispatch(selectedJobAction(item));
						}}
						style={{
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 3,
							paddingHorizontal: 8,
						}}
					>
						<Text style={styles.smallButton}>View</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#E4F1D6",
							padding: 5,
							margin: 5,
							borderRadius: 3,
							paddingHorizontal: 8,
						}}
					>
						<Text style={[styles.smallButton, { color: "#7EB734" }]}>
							Complete
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							backgroundColor: "#1BD741",
							padding: 5,
							paddingHorizontal: 7,
							margin: 5,
							borderRadius: 3,
						}}
					>
						<Whatsapp size={15} color={Colors.White} />
						<Spacer right={5} />
						<Text style={[styles.smallButton, { color: Colors.White }]}>
							Share
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Text style={styles.flatlistSubHeading}>Description</Text>
			<Text style={{ fontFamily: "Lexend-Regular" }}>{item?.description}</Text>
			<Spacer bottom={10} />
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View>
					<Text style={[styles.flatlistSubHeading, { textAlign: "center" }]}>
						Required Workers
					</Text>
					<Text
						style={[
							styles.flatlistText,
							{ textAlign: "center", marginTop: 6, fontSize: 9.5 },
						]}
					>
						{item?.requiredWorkers}
					</Text>
				</View>
				<View>
					<Text style={[styles.flatlistSubHeading, { textAlign: "center" }]}>
						Start Date
					</Text>
					<Text
						style={[
							styles.flatlistText,
							{ textAlign: "center", marginTop: 6, fontSize: 9.5 },
						]}
					>
						{moment(item?.startDate).format("DD MMMM, YYYY")}
					</Text>
				</View>
				<View>
					<Text style={[styles.flatlistSubHeading, { textAlign: "center" }]}>
						Wage
					</Text>
					<Text
						style={[
							styles.flatlistText,
							{ textAlign: "center", marginTop: 6, fontSize: 9.5 },
						]}
					>
						{`Total: ₹${
							item?.dailyWage * item?.workingDays?.length
						} | Daily: ₹${item?.dailyWage}`}
					</Text>
				</View>
			</View>
			<Spacer bottom={20} />
			<View
				style={{
					borderTopColor: Colors.LightGray,
					borderTopWidth: 1,
					paddingTop: 10,
					borderStyle: "dashed",
					width: "100%",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<View style={{ width: "92%" }}>
					<Text style={styles.flatlistSubHeading}>Location</Text>
					<Text style={styles.flatlistText}>{item.location}</Text>
				</View>
				<View style={{ width: "5%" }}>
					<LocationIcon style={{ marginTop: 5 }} size={20} color={"#ADBAC3"} />
				</View>
			</View>
		</View>
	);
	return (
		<View style={styles.container}>
			<View style={styles.header}></View>
			<Pressable
				onPress={() => {
					setOpenSearchModal(true);
				}}
				style={styles.graph}
			>
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
							{selectedProject
								? selectedProject?.name
								: projectsListSimple
								? projectsListSimple[0]?.name
								: "Select a project"}
						</Text>
						{/* {projectsListSimple && (
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
								placeholder="Select"
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
						)} */}
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
						<Text style={styles.smallButton}>Submit</Text>
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
			</Pressable>
			<ScrollView>
				<FlatList
					data={jobsList}
					renderItem={({ item }) => <Item item={item} />}
					keyExtractor={(item) => item.id}
				/>
			</ScrollView>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<View style={styles.modalView}>
						<ImageBackground
							source={{ uri: details?.image }}
							style={{
								margin: 10,
								width: 330,
								height: 330,
								resizeMode: "contain",
								alignItems: "center",
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
										<Text style={styles.modalHeading}>{details?.title}</Text>
									</View>
									<Building size={20} color={Colors.White} />
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
										<Text
											style={[styles.workerHeading, { color: Colors.White }]}
										>
											Total Workers
										</Text>
										<Text
											style={[styles.workerNumber, { color: Colors.White }]}
										>
											{details?.worker}
										</Text>
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
										<Text
											style={[styles.workerHeading, { color: Colors.White }]}
										>
											Total Workers
										</Text>
										<Text
											style={[styles.workerNumber, { color: Colors.White }]}
										>
											{details?.worker}
										</Text>
									</View>
									<View style={{ alignItems: "center" }}>
										<Text
											style={[styles.workerHeading, { color: Colors.White }]}
										>
											Total Workers
										</Text>
										<Text
											style={[styles.workerNumber, { color: Colors.White }]}
										>
											{details?.worker}
										</Text>
									</View>
								</View>
							</View>
						</ImageBackground>
						<View style={{ padding: 20 }}>
							<View
								style={{
									borderBottomWidth: 1,
									borderBottomColor: Colors.WhiteGray,
									padding: 10,
								}}
							>
								<Text style={[styles.modalText, { color: Colors.Gray }]}>
									PROJECT TYPE
								</Text>
								<Text style={[styles.modalHeading, { color: Colors.Black }]}>
									{details?.type}
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
									RERA ID
								</Text>

								<Text style={[styles.modalHeading, { color: Colors.Black }]}>
									{details?.id}
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
									REMAINING WORK DAYS
								</Text>
								<Text style={[styles.modalHeading, { color: Colors.Black }]}>
									{details?.days}
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
									RSUPERVISOR
								</Text>
								<Text style={[styles.modalHeading, { color: Colors.Black }]}>
									{details?.supervisor}
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
									{details?.location}
								</Text>
							</View>

							<TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
								<Text>Close</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
			<Modal
				visible={openSearchModal}
				animationType="slide"
				onRequestClose={() => {
					setOpenSearchModal(false);
				}}
				presentationStyle="pageSheet"
			>
				<View style={{ width: "100%" }}>
					<View
						style={{
							width: "100%",
							padding: 15,
							flexDirection: "row",
							alignItems: "center",
							marginTop: 10,
						}}
					>
						<View style={{ width: "12%" }}>
							<BackIcon
								onPress={() => {
									setOpenSearchModal(false);
								}}
								size={30}
								color={Colors.Black}
							/>
						</View>
						<View style={{ width: "88%" }}>
							<Text
								style={{
									fontFamily: "Lexend-Medium",
									fontSize: 18,
									color: Colors.Black,
								}}
							>
								Search
							</Text>
						</View>
					</View>
					<View style={{ width: "100%", alignItems: "center" }}>
						<Searchbar
							style={{
								backgroundColor: "#F1F5F8",
								borderRadius: 5,
								width: "90%",
							}}
							placeholder="Search Project"
							placeholderTextColor={Colors.FormText}
							mode="bar"
							icon={() => <Search size={20} color={Colors.Black} />}
							clearIcon={() => <Cross size={20} color={Colors.FormText} />}
							onChangeText={(text) => searchFilterFunction(text)}
							value={search}
						/>
					</View>
					<View style={{ width: "100%", marginTop: 10, paddingBottom: 280 }}>
						<FlatList
							data={filteredDataSource}
							renderItem={({ item }) => (
								<Pressable
									style={{
										width: "88%",
										borderWidth: 1,
										marginBottom: 5,
										alignSelf: "center",
										padding: 10,
										borderRadius: 7,
										borderColor: Colors.FormBorder,
									}}
									onPress={() => {
										setSelectedProject(item);
										setOpenSearchModal(false);
									}}
								>
									<Text
										style={{
											fontSize: 14,
											fontFamily: "Lexend-Regular",
											color: Colors.FormText,
										}}
									>
										{item.name}
									</Text>
								</Pressable>
							)}
							keyExtractor={(item) => item.projectId}
						/>
					</View>
				</View>
			</Modal>
		</View>
	);
};
export default Jobs;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
	},
	header: {
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
	flatlistHeading: {
		fontFamily: "Lexend-Medium",
		fontSize: 14,
		textTransform: "uppercase",
		color: Colors.Black,
	},
	flatlistSubHeading: {
		fontFamily: "Lexend-Medium",
		fontSize: 9,
		color: Colors.LightGray,
		textTransform: "uppercase",
		// marginTop: 5
	},
	flatlistText: {
		fontFamily: "Lexend-SemiBold",
		fontSize: 10,
		color: Colors.Black,
	},
	modalView: {
		paddingTop: Platform.OS === "android" ? 0 : 50,
		backgroundColor: Colors.White,
		bottom: 0,
		shadowColor: "#000",
		width: "90%",
		height: "95%",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		borderRadius: 10,
	},
	modalText: {
		fontFamily: "Lexend-Medium",
		fontSize: 12,
		color: Colors.White,
	},
	modalHeading: {
		fontFamily: "Lexend-Medium",
		fontSize: 16,
		color: Colors.White,
	},
});
