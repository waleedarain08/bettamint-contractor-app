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
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
import { User, Tick, Cross, Search, Building } from "../../icons";
import { useDispatch, useSelector } from "react-redux";
import { authToken } from "../../redux/slices/authSlice";
import {
	getUsersAction,
	loadingUsers,
	usersListReducer,
} from "../../redux/slices/userSlice";
import { Searchbar } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import { RefreshControl } from "react-native-gesture-handler";
LogBox.ignoreAllLogs();
const DATA = [
	{
		name: "Rajesh Kumar",
		occupation: "Plumber",
		userId: "7890",
		email: "email@email.com",
		role: "Super Admin",
	},
	{
		name: "Manoj Beddi",
		occupation: "Plumber",
		userId: "7890",
		email: "email@email.com",
		role: "Admin",
	},
	{
		name: "Kirshen kumar",
		occupation: "Plumber",
		userId: "7890",
		email: "email@email.com",
		role: "Contractor",
	},
	{
		name: "Arvind Kumar",
		occupation: "Plumber",
		userId: "7890",
		email: "email@email.com",
		role: "Admin",
	},
	{
		name: "Rajesh Kumar",
		occupation: "Plumber",
		userId: "7890",
		email: "email@email.com",
		role: "Admin",
	},
];

const Users = ({ navigation }) => {
	const [details, setDetails] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [filteredDataSource, setFilteredDataSource] = useState([]);
	const [masterDataSource, setMasterDataSource] = useState([]);
	const [search, setSearch] = useState("");
	const [openSearchModal, setOpenSearchModal] = useState(false);
	const [openFilterModal, setOpenFilterModal] = useState(false);
	const [userFilter, setUserFilter] = useState(null);
	const [selectedContractor, setSelectedContractor] = useState(null);

	const token = useSelector(authToken);
	const usersList = useSelector(usersListReducer);
	const isLoading = useSelector(loadingUsers);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUsersAction(token));
	}, []);
	useEffect(() => {
		setFilteredDataSource(usersList);
		setMasterDataSource(usersList);
	}, [usersList]);
	const searchFilterFunction = (text) => {
		// Check if searched text is not blank
		if (text) {
			// Inserted text is not blank
			// Filter the masterDataSource and update FilteredDataSource
			const newData = masterDataSource.filter(function (item) {
				// Applying filter for the inserted text in search bar
				const itemData = item.fullName
					? item.fullName.toUpperCase()
					: "".toUpperCase();
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
									Filter By:
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
										setUserFilter(null);
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
							{/* <View style={{ marginVertical: 5 }}>
                <Text
                  style={{ fontFamily: "Lexend-Medium", color: Colors.Gray }}
                >
                  Filer By:
                </Text>
              </View> */}
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
								data={[
									{ label: "Labour Contractor", value: "LabourContractor" },
								]}
								maxHeight={300}
								labelField="label"
								valueField="value"
								placeholder={"Select Contractor"}
								value={selectedContractor}
								onChange={(item) => {
									setOpenFilterModal(false);
									setSelectedContractor(item);
									setUserFilter(
										usersList?.filter((ele) => ele.leadTypeId === item?.value)
									);
								}}
							/>
						</View>
					</View>
				</View>
			</Modal>
		);
	};
	const renderSearchModal = () => {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={openSearchModal}
				onRequestClose={() => {
					// Alert.alert("Modal has been closed.");
					setOpenSearchModal(!openSearchModal);
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
									Search Users
								</Text>
							</View>
							<View style={{ alignItems: "flex-end" }}>
								<Cross
									onPress={() => {
										setOpenSearchModal(!openSearchModal);
									}}
									size={22}
									color={Colors.Black}
								/>
								{/* <Pressable
                  onPress={() => {
                    setSelectedContractor(null);
                    setOpenFilterModal(false);
                    setUserFilter(null);
                  }}
                  style={{ marginTop: 3 }}
                >
                  <Text style={{ fontFamily: "Lexend-Medium", fontSize: 10 }}>
                    Clear Filter
                  </Text>
                </Pressable> */}
							</View>
						</View>
						<View style={{ marginVertical: 10 }}>
							<Searchbar
								style={{
									backgroundColor: Colors.WhiteGray,
									borderRadius: 4,
									borderWidth: 1,
									width: "100%",
									// height: 50,
									marginTop: 10,
									borderColor: Colors.LightGray,
								}}
								placeholder="Search"
								placeholderTextColor={Colors.FormText}
								mode="bar"
								icon={() => <Search size={20} color={Colors.Black} />}
								clearIcon={() => <Cross size={20} color={Colors.FormText} />}
								onChangeText={(text) => searchFilterFunction(text)}
								value={search}
							/>
						</View>
					</View>
				</View>
			</Modal>
		);
	};

	const Item = ({ item }) => (
		<Pressable
			style={styles.item}
			onPress={() => {
				// setModalVisible(true);
				// setDetails(item);
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				<View style={{ width: "60%" }}>
					<Text style={styles.flatlistHeading}>{item.fullName}</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: "35%",
					}}
				>
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 3,
						}}
					>
						<Text style={styles.smallButton}>Manage</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#E4F1D6",
							padding: 5,
							margin: 5,
							borderRadius: 3,
						}}
					>
						<Text style={[styles.smallButton, { color: "#81B737" }]}>
							History
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Spacer bottom={13} />
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View style={{ alignItems: "center" }}>
					<Text style={styles.flatlistSubHeading}>User Id</Text>
					<Text
						style={[styles.flatlistText, { textAlign: "center", marginTop: 5 }]}
					>
						{item.userId}
					</Text>
				</View>
				<View style={{ alignItems: "center" }}>
					<Text style={styles.flatlistSubHeading}>Email Address</Text>
					<Text
						style={[styles.flatlistText, { textAlign: "center", marginTop: 5 }]}
					>
						{item.emailAddress}
					</Text>
				</View>
				<View style={{ alignItems: "center" }}>
					<Text style={styles.flatlistSubHeading}>Role</Text>
					<Text
						style={[styles.flatlistText, { textAlign: "center", marginTop: 5 }]}
					>
						{item.userTypeId || "N/A"}
					</Text>
				</View>
			</View>
			{/* <Spacer bottom={} /> */}
		</Pressable>
	);
	return (
		<View style={styles.container}>
			<View style={styles.header} />

			<View style={styles.graph}>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						width: "20%",
					}}
				>
					{/* <TouchableOpacity
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 3,
              width: "55%",
              alignItems: "center",
            }}
          >
            <Text style={styles.smallButton}>Sort by</Text>
          </TouchableOpacity> */}
					<TouchableOpacity
						onPress={() => setOpenFilterModal(true)}
						style={{
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 3,
							width: "100%",
							alignItems: "center",
						}}
					>
						<Text style={styles.smallButton}>Filter</Text>
					</TouchableOpacity>
				</View>
				<Pressable
					onPress={() => setOpenSearchModal(true)}
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						width: "75%",
						backgroundColor: "#ECE4FC",
						alignItems: "center",
						borderRadius: 4,
						// height: 50
					}}
				>
					{/* <Searchbar
            style={{
              backgroundColor: "#ECE4FC",
              borderRadius: 10,
              width: "100%",
              // height: 40,
              // marginBottom: 10
            }}
            placeholder="Search"
            placeholderTextColor={Colors.FormText}
            mode="bar"
            icon={() => <Search size={20} color={Colors.Black} />}
            clearIcon={() => <Cross size={20} color={Colors.FormText} />}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
          /> */}
					<View style={{ width: "70%", paddingLeft: 5 }}>
						<Text
							style={{
								color: "#ADBAC3",
								fontFamily: "Lexend-Regular",
								fontSize: 11,
							}}
						>
							SEARCH
						</Text>
					</View>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							padding: 3,
							// margin: 5,
							borderRadius: 5,
							width: "15%",
						}}
					>
						<Search size={20} color={Colors.Secondary} />
					</View>
				</Pressable>
			</View>
			{/* <ScrollView> */}
			<View style={{ width: "100%", flex: 1 }}>
				<FlatList
					refreshControl={
						<RefreshControl
							refreshing={isLoading}
							onRefresh={() => dispatch(getUsersAction(token))}
							tintColor={Colors.Primary}
							colors={[Colors.Purple, Colors.Primary]}
						/>
					}
					data={userFilter ? userFilter : filteredDataSource}
					renderItem={({ item }) => <Item item={item} />}
					keyExtractor={(item) => item.userId}
					showsVerticalScrollIndicator={false}
				/>
			</View>
			{renderFilterModal()}
			{renderSearchModal()}
			{/* </ScrollView> */}
		</View>
	);
};
export default Users;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
		width: "100%",
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
		// width: "100%",
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
		color: Colors.Black,
		textTransform: "uppercase",
	},
	flatlistSubHeading: {
		fontFamily: "Lexend-Medium",
		fontSize: 10,
		color: Colors.LightGray,
		textTransform: "uppercase",
	},
	flatlistText: {
		fontFamily: "Lexend-Bold",
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
		textTransform: "capitalize",
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
