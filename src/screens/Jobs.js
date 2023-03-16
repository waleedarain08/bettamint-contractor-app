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
import Logo from "../assets/images/logo.png";
import Menu from "../assets/icons/Menu.png";
import { Colors } from "../utils/Colors";
import Spacer from "../components/Spacer";
import BarChart from "../assets/images/barchart.png";
import LineChart from "../assets/images/linechart.png";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
import { Search } from "../icons";
import { Building, Whatsapp } from "../icons";
LogBox.ignoreAllLogs();
const DATA = [
	{
		occupation: "Plumber",
		des: "Description",
		req: "13",
		start: "8 Mar, 2023",
		wage: "₹ 500",
		location: "Koramangala, Bengaluru, Karnataka 560095, India",
	},
	{
		occupation: "Plumber",
		des: "Description",
		req: "13",
		start: "8 Mar, 2023",
		wage: "₹ 500",
		location: "Koramangala, Bengaluru, Karnataka 560095, India",
	},
	{
		occupation: "Plumber",
		des: "Description",
		req: "13",
		start: "8 Mar, 2023",
		wage: "₹ 500",
		location: "Koramangala, Bengaluru, Karnataka 560095, India",
	},
	{
		occupation: "Plumber",
		des: "Description",
		req: "13",
		start: "8 Mar, 2023",
		wage: "₹ 500",
		location: "Koramangala, Bengaluru, Karnataka 560095, India",
	},
	{
		occupation: "Plumber",
		des: "Description",
		req: "13",
		start: "8 Mar, 2023",
		wage: "₹ 500",
		location: "Koramangala, Bengaluru, Karnataka 560095, India",
	},
];

const Jobs = ({ navigation }) => {
	const [details, setDetails] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const Item = ({ item }) => (
		<Pressable
			style={styles.item}
			onPress={() => {
				setModalVisible(true);
				setDetails(item);
			}}
		>
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View>
					<Text style={styles.flatlistHeading}>{item.occupation}</Text>
					<Text style={styles.flatlistSubHeading}>{item.des}</Text>
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
						<Text style={styles.smallButton}>View</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "#E4F1D6",
							padding: 5,
							margin: 5,
							borderRadius: 5,
						}}
					>
						<Text style={[styles.smallButton, { color: "#ADD07C" }]}>
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
							margin: 5,
							borderRadius: 5,
						}}
					>
						<Whatsapp size={20} color={Colors.White} />
						<Spacer right={5} />
						<Text style={[styles.smallButton, { color: Colors.White }]}>
							Share
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Spacer bottom={20} />
			<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
				<View>
					<Text style={styles.flatlistSubHeading}>Required Workers</Text>
					<Text style={[styles.flatlistText, { textAlign: "center" }]}>
						{item.req}
					</Text>
				</View>
				<View>
					<Text style={styles.flatlistSubHeading}>Start Date</Text>
					<Text style={styles.flatlistText}>{item.start}</Text>
				</View>
				<View>
					<Text style={styles.flatlistSubHeading}>Wage</Text>
					<Text style={styles.flatlistText}>{item.wage}</Text>
				</View>
			</View>
			<Spacer bottom={20} />
			<View
				style={{
					borderTopColor: Colors.LightGray,
					borderTopWidth: 1,
					paddingTop: 10,
					borderStyle: "dashed",
				}}
			>
				<Text style={styles.flatlistSubHeading}>Location</Text>
				<Text style={styles.flatlistText}>{item.location}</Text>
			</View>
		</Pressable>
	);
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerLogo}>
					<Image source={Menu} style={{ height: 20, width: 20 }} />
					<Text style={styles.heading}>Projects</Text>
				</View>
				<View>
					<TouchableOpacity>
						<Text>New Project</Text>
					</TouchableOpacity>
				</View>
			</View>
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
					<Text style={styles.selectText}>Link a Project</Text>
				</View>
				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<TouchableOpacity
						style={{
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 5,
						}}
					>
						<Text style={styles.smallButton}>Sort by</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							backgroundColor: "#ECE5FC",
							padding: 5,
							margin: 5,
							borderRadius: 5,
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
							borderRadius: 5,
						}}
					>
						<Search size={20} color={Colors.Secondary} />
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView>
				<FlatList
					data={DATA}
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
		fontSize: 12,
		color: Colors.Black,
	},
	flatlistSubHeading: {
		fontFamily: "Lexend-Medium",
		fontSize: 10,
		color: Colors.LightGray,
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
	},
});
