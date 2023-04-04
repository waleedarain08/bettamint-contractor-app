import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, LogBox } from "react-native";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { Building, Search, TickIcon } from "../../icons";

LogBox.ignoreAllLogs();
const Workers = ({ navigation }) => {
	const [data, setData] = useState({
		array: [
			{
				id: 1,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 2,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 3,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 4,
				name: "Arvind Chauhan",
				status: "Offline",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 5,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 6,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 7,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 8,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 9,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 10,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},

			{
				id: 11,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 12,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 13,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 14,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 15,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 16,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 17,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 18,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
			{
				id: 19,
				name: "Arvind Chauhan",
				status: "Online",
				due: "₹ 10,350",
				issued: "₹ 8,650",
				selected: false,
			},
		],
	});

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
						width: "30%",
					}}
				>
					<Text
						style={[
							styles.flatListText,
							{ textAlign: "left", textTransform: "uppercase", fontSize: 10 },
						]}
					>
						{item.name}
					</Text>
					<Text
						style={[styles.flatListText, { textAlign: "left", fontSize: 9 }]}
					>
						+91 231 2345 789
					</Text>
				</View>
				<View style={{ width: "15%", alignItems: "center" }}>
					{item.status == "Online" ? (
						<Text style={[styles.flatListText, { color: Colors.Primary }]}>
							{item.status}
						</Text>
					) : (
						<Text style={styles.flatListText}>{item.status}</Text>
					)}
				</View>
				<View style={{ width: "15%", alignItems: "center" }}>
					<TickIcon size={20} color={Colors.Primary} />
				</View>
				<View style={{ width: "15%", alignItems: "center" }}>
					<TickIcon size={20} color={Colors.Primary} />
				</View>
				<View style={{ width: "18%" }}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("WorkerDetails");
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
					<View>
						<Text style={styles.selectText}>Link a Project</Text>
						<Text
							style={[
								styles.selectText,
								{ fontFamily: "Lexend-SemiBold", color: Colors.Black },
							]}
						>
							Select a Project
						</Text>
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
						<Text style={styles.smallButton}>Sort By</Text>
					</TouchableOpacity>
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
			</View>
			{/* <ScrollView> */}
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
				<FlatList
					data={data.array}
					renderItem={({ item, index }) => <Item item={item} index={index} />}
					keyExtractor={(item) => item.id}
					ListHeaderComponent={ListHeader}
					stickyHeaderIndices={[0]}
					showsVerticalScrollIndicator={false}
				/>
			</View>
			{/* <Spacer bottom={60} /> */}
			{/* <View
        style={{
          width: "93%",
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          bottom: 18,
        }}
      >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Pay Online</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.Secondary }]}
        >
          <Text style={styles.buttonText}>Pay Offline</Text>
        </TouchableOpacity>
      </View> */}
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
});
