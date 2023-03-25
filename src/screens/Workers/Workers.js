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

import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
import { User, TickIcon, Cross, Search, Building } from "../../icons";
LogBox.ignoreAllLogs();
const Workers = ({ navigation }) => {
	const [details, setDetails] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const DATA = [
		{
			name: "Rajesh",
			status: "Online",
			phone: "1234567890",
			location: "Koramangala, Bengaluru, Karnataka 560095, India",
			bank: "HDFC",
			account: "123 4567 890",
			img: "https://images.pexels.com/photos/2880871/pexels-photo-2880871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		},
		{
			name: "Rajesh",
			status: "Online",
			phone: "1234567890",
			location: "Koramangala, Bengaluru, Karnataka 560095, India",
			bank: "HDFC",
			account: "123 4567 890",
			img: "https://images.pexels.com/photos/2880871/pexels-photo-2880871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		},
		{
			name: "Rajesh",
			status: "Online",
			phone: "1234567890",
			location: "Koramangala, Bengaluru, Karnataka 560095, India",
			bank: "HDFC",
			account: "123 4567 890",
			img: "https://images.pexels.com/photos/2880871/pexels-photo-2880871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		},
		{
			name: "Rajesh",
			status: "Online",
			phone: "1234567890",
			location: "Koramangala, Bengaluru, Karnataka 560095, India",
			bank: "HDFC",
			account: "123 4567 890",
			img: "https://images.pexels.com/photos/2880871/pexels-photo-2880871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		},
		{
			name: "Rajesh",
			status: "Online",
			phone: "1234567890",
			location: "Koramangala, Bengaluru, Karnataka 560095, India",
			bank: "HDFC",
			account: "123 4567 890",
			img: "https://images.pexels.com/photos/2880871/pexels-photo-2880871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		},
		{
			name: "Rajesh",
			status: "Online",
			phone: "1234567890",
			location: "Koramangala, Bengaluru, Karnataka 560095, India",
			bank: "HDFC",
			account: "123 4567 890",
			img: "https://images.pexels.com/photos/2880871/pexels-photo-2880871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		},
		{
			name: "Rajesh",
			status: "Online",
			phone: "1234567890",
			location: "Koramangala, Bengaluru, Karnataka 560095, India",
			bank: "HDFC",
			account: "123 4567 890",
			img: "https://images.pexels.com/photos/2880871/pexels-photo-2880871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		},
		{
			name: "Rajesh",
			status: "Online",
			phone: "1234567890",
			location: "Koramangala, Bengaluru, Karnataka 560095, India",
			bank: "HDFC",
			account: "123 4567 890",
			img: "https://images.pexels.com/photos/2880871/pexels-photo-2880871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		},
		{
			name: "Rajesh",
			status: "Online",
			phone: "1234567890",
			location: "Koramangala, Bengaluru, Karnataka 560095, India",
			bank: "HDFC",
			account: "123 4567 890",
			img: "https://images.pexels.com/photos/2880871/pexels-photo-2880871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		},
		{
			name: "Rajesh",
			status: "Online",
			phone: "1234567890",
			location: "Koramangala, Bengaluru, Karnataka 560095, India",
			bank: "HDFC",
			account: "123 4567 890",
			img: "https://images.pexels.com/photos/2880871/pexels-photo-2880871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		},
		{
			name: "Rajesh",
			status: "Online",
			phone: "1234567890",
			location: "Koramangala, Bengaluru, Karnataka 560095, India",
			bank: "HDFC",
			account: "123 4567 890",
			img: "https://images.pexels.com/photos/2880871/pexels-photo-2880871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
		},
	];
	const Item = ({ item, index }) => (
		<View style={[styles.item]}>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					width: "100%",
					justifyContent: "space-between",
				}}
			>
				<View
					style={{
						width: "25%",
					}}
				>
					<Text style={[styles.flatListText, { textAlign: "left" }]}>
						{item.name}
						{item.phone}
					</Text>
				</View>
				<View style={{ width: "20%" }}>
					<Text style={styles.flatListText}>{item.status}</Text>
				</View>
				<View style={{ width: "15%", alignItems: "center" }}>
					<TickIcon size={20} color={Colors.Primary} />
				</View>
				<View style={{ width: "15%", alignItems: "center" }}>
					<TickIcon size={20} color={Colors.Primary} />
				</View>
				<TouchableOpacity
					onPress={() => {
						setModalVisible(true);
						setDetails(item);
					}}
					style={{
						backgroundColor: "#ECE5FC",
						padding: 5,
						margin: 5,
						borderRadius: 3,
						width: "15%",
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
					}}
				>
					<View style={{ width: "25%" }}>
						<Text style={[styles.flatListText, { textAlign: "left" }]}>
							Name
						</Text>
					</View>
					<View style={{ width: "20%" }}>
						<Text style={styles.flatListText}>Status</Text>
					</View>
					<View style={{ width: "25%" }}>
						<Text style={styles.flatListText}>Adhar</Text>
					</View>
					<View style={{ width: "15%" }}>
						<Text style={styles.flatListText}>Bank</Text>
					</View>
					<View style={{ width: "15%" }}>
						<Text style={styles.flatListText}>Action</Text>
					</View>
				</View>
			</View>
		);
	};
	return (
		<View style={styles.container}>
			<View style={styles.header} />
			{/* <View style={styles.headerLogo}>
          <Image source={Menu} style={{ height: 20, width: 20 }} />
          <Text style={styles.heading}>Projects</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text>New Project</Text>
          </TouchableOpacity>
        </View>
      </View> */}
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
					<Text style={styles.selectText}>Select Project</Text>
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
						<Search size={15} color={Colors.Secondary} />
					</TouchableOpacity>
				</View>
			</View>
			<ScrollView>
				<View
					style={{
						backgroundColor: Colors.White,
						alignItems: "center",
						margin: 10,
						padding: 10,
						borderRadius: 10,
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 2,
						},
						shadowOpacity: 0.2,
						shadowRadius: 5,
						elevation: 4,
					}}
				>
					<FlatList
						data={DATA}
						renderItem={({ item }) => <Item item={item} />}
						keyExtractor={(item) => item.id}
						ListHeaderComponent={ListHeader}
					/>
				</View>
			</ScrollView>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					padding: 20,
					position: "absolute",
					bottom: 0,
				}}
			>
				<TouchableOpacity style={[styles.button, { width: "48%" }]}>
					<Text style={styles.buttonText}>Pay Online</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.button,
						{ width: "48%", backgroundColor: Colors.Secondary },
					]}
				>
					<Text style={styles.buttonText}>Pay Offline</Text>
				</TouchableOpacity>
			</View>
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
							source={{ uri: details?.img }}
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
										<Text style={styles.modalText}>Name</Text>
										<Text style={styles.modalHeading}>{details?.name}</Text>
									</View>
									<User size={20} color={Colors.White} />
								</View>
								<Spacer bottom={10} />
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
									Phone Number
								</Text>
								<Text style={[styles.modalHeading, { color: Colors.Black }]}>
									{details?.phone}
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
									Location
								</Text>

								<Text style={[styles.modalHeading, { color: Colors.Black }]}>
									{details?.location}
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
									Bank Name
								</Text>
								<Text style={[styles.modalHeading, { color: Colors.Black }]}>
									{details?.bank}
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
									Bank Account Number
								</Text>
								<Text style={[styles.modalHeading, { color: Colors.Black }]}>
									{details?.account}
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
export default Workers;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
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
	button: {
		backgroundColor: Colors.Primary,
		justifyContent: "center",
		borderRadius: 4,
		marginTop: 15,
		height: 40,
	},
	buttonText: {
		fontFamily: "Lexend-Regular",
		fontSize: 12,
		textAlign: "center",
		color: "white",
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
});
