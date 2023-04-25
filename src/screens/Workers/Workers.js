import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	LogBox,
	Modal,
	Pressable,
	ActivityIndicator,
	RefreshControl,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { BackIcon, Building, Cross, Search, TickIcon } from "../../icons";
import { Searchbar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
	getAllProjectsSimpleAction,
	projectsListSimpleReducer,
} from "../../redux/slices/projectSlice";
import {
	getAllWorkersAction,
	getSkillsAction,
	selectWorkerAction,
	workerLoading,
	workersListReducer,
} from "../../redux/slices/workerSlice";
import { getUsersAction, usersListReducer } from "../../redux/slices/userSlice";
import { Dropdown } from "react-native-element-dropdown";
import { authToken } from "../../redux/slices/authSlice";

LogBox.ignoreAllLogs();
const Workers = ({ navigation }) => {
	const [openSearchModal, setOpenSearchModal] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);
	const [filteredDataSource, setFilteredDataSource] = useState([]);
	const [masterDataSource, setMasterDataSource] = useState([]);
	const [search, setSearch] = useState("");
	const [openFilterModal, setOpenFilterModal] = useState(false);
	const [selectedContractor, setSelectedContractor] = useState(null);
	const [labourContractors, setLabourContractors] = useState(null);

	const dispatch = useDispatch();
	const projectsListSimple = useSelector(projectsListSimpleReducer);
	const workersList = useSelector(workersListReducer);
	const isLoading = useSelector(workerLoading);
	const usersList = useSelector(usersListReducer);
	const token = useSelector(authToken);

	// console.log("------project", projectsListSimple)
	// console.log('worker list', workersList)
	useEffect(() => {
		dispatch(getAllProjectsSimpleAction());
		dispatch(getUsersAction(token));
	}, []);
	useEffect(() => {
		setLabourContractors(
			usersList?.filter((ele) => ele?.leadTypeId === "LabourContractor")
		);
	}, [usersList]);
	useEffect(() => {
		setFilteredDataSource(projectsListSimple);
		setMasterDataSource(projectsListSimple);
	}, [projectsListSimple]);
	useEffect(() => {
		dispatch(getSkillsAction(token));
	}, []);
	useEffect(() => {
		dispatch(
			getAllWorkersAction(
				token,
				selectedProject?.projectId || projectsListSimple[0]?.projectId,
				0
			)
		);
	}, [selectedProject]);

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

	const rowColors = ["#F3F4F4", "#FFFFFF"];

	const renderFilterModal = () => {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={openFilterModal}
				onRequestClose={() => {
					// Alert.alert("Modal has been closed.");
					setOpenFilterModal(!openFilterModal);
				}}
			>
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
						backgroundColor: "rgba(0,0,0,0.2)",
						//   width: '90%',
						//   height: 200
					}}
				>
					<View
						style={{
							width: "80%",
							backgroundColor: Colors.White,
							// height: 200,
							borderRadius: 10,
							padding: 15,
						}}
					>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<View>
								<Text
									style={{
										fontFamily: "Lexend-Medium",
										color: Colors.Black,
										fontSize: 16,
										// marginBottom: 10,
									}}
								>
									Filter
								</Text>
							</View>
							<View style={{ alignItems: "flex-end" }}>
								<Cross
									onPress={() => {
										setOpenFilterModal(!openFilterModal);
									}}
									size={22}
									color={Colors.Black}
								/>
								<Pressable
									onPress={() => {
										setSelectedContractor(null);
										setOpenFilterModal(false);
										dispatch(
											getAllWorkersAction(
												token,
												selectedProject?.projectId ||
													projectsListSimple[0]?.projectId,
												0
											)
										);
									}}
									style={{ marginTop: 3 }}
								>
									<Text style={{ fontFamily: "Lexend-Medium", fontSize: 10 }}>
										Clear Filter
									</Text>
								</Pressable>
							</View>
						</View>
						<View style={{ marginVertical: 10 }}>
							<View style={{ marginVertical: 5 }}>
								<Text
									style={{ fontFamily: "Lexend-Medium", color: Colors.Gray }}
								>
									By Contractor
								</Text>
							</View>
							<Dropdown
								style={styles.dropdown}
								placeholderStyle={styles.placeholderStyle}
								selectedTextStyle={styles.selectedTextStyle}
								itemTextStyle={{
									fontFamily: "Lexend-Regular",
									fontSize: 13,
									color: Colors.FormText,
								}}
								iconStyle={styles.iconStyle}
								data={labourContractors?.map((ele) => ({
									label: ele?.fullName,
									value: ele?.userId,
								}))}
								maxHeight={300}
								labelField="label"
								valueField="value"
								placeholder={"Select Contractor"}
								value={selectedContractor}
								onChange={(item) => {
									setOpenFilterModal(false);
									setSelectedContractor(item);
									dispatch(
										getAllWorkersAction(
											token,
											selectedProject?.projectId ||
												projectsListSimple[0]?.projectId,
											item?.value
										)
									);
								}}
							/>
						</View>
					</View>
				</View>
			</Modal>
		);
	};

	const Item = ({ item, index }) => {
		return (
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
							width: "30%",
						}}
					>
						<Text
							style={[
								styles.flatListText,
								{ textAlign: "left", textTransform: "uppercase", fontSize: 10 },
							]}
						>
							{item.fullName}
						</Text>
						<Text
							style={[styles.flatListText, { textAlign: "left", fontSize: 9 }]}
						>
							{`+${item?.phoneNumber}`}
						</Text>
					</View>
					<View style={{ width: "15%", alignItems: "center" }}>
						{item.workerTypeId == "Online" ? (
							<Text style={[styles.flatListText, { color: Colors.Primary }]}>
								{item.workerTypeId}
							</Text>
						) : (
							<Text style={styles.flatListText}>{item.workerTypeId}</Text>
						)}
					</View>
					<View style={{ width: "15%", alignItems: "center" }}>
						{item?.adharVerified ? (
							<TickIcon size={20} color={Colors.Primary} />
						) : (
							<Cross size={20} color={"red"} />
						)}
					</View>
					<View style={{ width: "15%", alignItems: "center" }}>
						{item?.bankVerified ? (
							<TickIcon size={20} color={Colors.Primary} />
						) : (
							<Cross size={20} color={"red"} />
						)}
					</View>
					<View style={{ width: "18%" }}>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("WorkerDetails");
								dispatch(selectWorkerAction(item));
							}}
							style={{
								backgroundColor: "#ECE5FC",
								padding: 5,
								margin: 5,
								borderRadius: 2,
								width: "80%",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text style={styles.smallButton}>View</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	};

	const ListHeader = () => {
		return (
			<View style={[styles.item]}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						width: "100%",
						justifyContent: "space-between",
						paddingHorizontal: 8,
						backgroundColor: Colors.White,
						height: 50,
						borderTopLeftRadius: 10,
						borderTopRightRadius: 25,
					}}
				>
					<View
						style={{
							width: "30%",
						}}
					>
						<Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
							Name
						</Text>
					</View>
					<View style={{ width: "15%", alignItems: "center" }}>
						<Text style={styles.flatListTextHeader}>Status</Text>
					</View>
					<View style={{ width: "15%", alignItems: "center" }}>
						<Text style={styles.flatListTextHeader}>Aadhar</Text>
					</View>
					<View style={{ width: "15%", alignItems: "center" }}>
						<Text style={styles.flatListTextHeader}>Bank</Text>
					</View>
					<View style={{ width: "18%", alignItems: "center" }}>
						<Text style={styles.flatListTextHeader}>Action</Text>
					</View>
				</View>
			</View>
		);
	};
	return (
		<View style={styles.container}>
			<View style={styles.header} />
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
						<Text style={styles.selectText}>Select a Project Everywhere</Text>
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
					</View>
				</View>
				<View style={{ flexDirection: "row" }}>
					{/* <TouchableOpacity
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
          </TouchableOpacity> */}
					<TouchableOpacity
						onPress={() => setOpenFilterModal(true)}
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
			</Pressable>
			<View
				style={{
					backgroundColor: Colors.White,
					alignItems: "center",
					margin: 10,
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
					flex: 1,
				}}
			>
				{workersList?.length === 0 || !workersList ? (
					<View
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
					>
						<Text
							style={{
								fontFamily: "Lexend-Medium",
								fontSize: 18,
								color: Colors.Gray,
							}}
						>
							No Record Found!
						</Text>
					</View>
				) : (
					<FlatList
						refreshControl={
							<RefreshControl
								refreshing={isLoading}
								onRefresh={() =>
									dispatch(
										getAllWorkersAction(token, selectedProject?.projectId, 0)
									)
								}
								tintColor={Colors.Primary}
								colors={[Colors.Purple, Colors.Primary]}
							/>
						}
						data={workersList}
						renderItem={({ item, index }) => <Item item={item} index={index} />}
						keyExtractor={(item) => item.id}
						ListHeaderComponent={ListHeader}
						stickyHeaderIndices={[0]}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</View>
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
			{renderFilterModal()}
		</View>
	);
};
export default Workers;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		width: "100%",
		alignItems: "center",
	},
	buttonText: {
		fontFamily: "Lexend-Regular",
		fontSize: 12,
		textAlign: "center",
		color: "white",
	},
	button: {
		width: "48%",
		padding: 12,
		backgroundColor: Colors.Primary,
		borderRadius: 4,
		justifyContent: "center",
		alignItems: "center",
	},
	header: {
		backgroundColor: Colors.Primary,
		height: "28%",
		width: "100%",
		borderBottomLeftRadius: 50,
		borderBottomRightRadius: 50,
		paddingHorizontal: 20,
	},
	graph: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
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
	item: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 4,
		width: "100%",
	},
	title: {
		fontFamily: "Lexend-Bold",
		fontSize: 16,
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
	flatListText: {
		fontFamily: "Lexend-Medium",
		fontSize: 11,
		color: Colors.ListItemText,
		textAlign: "center",
	},
	flatListTextHeader: {
		fontFamily: "Lexend-Medium",
		fontSize: 11,
		color: Colors.ListHeaderText,
		textAlign: "center",
	},
	placeholderStyle: {
		fontSize: 14,
		fontFamily: "Lexend-Regular",
		color: Colors.FormText,
	},
	selectedTextStyle: {
		fontSize: 14,
		fontFamily: "Lexend-Medium",
		color: Colors.Black,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	dropdown: {
		height: 40,
		borderColor: "gray",
		borderWidth: 0.5,
		borderRadius: 5,
		paddingHorizontal: 8,
		elevation: 4,
		backgroundColor: Colors.White,
	},
});
