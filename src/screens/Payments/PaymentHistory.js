import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
	Pressable,
	ScrollView,
	FlatList,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../utils/Colors";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { DateIcon } from "../../icons";
const DATA = [
	{
		id: "1",
		name: "John Doe",
		job: "Plumber",
		amount: "₹ 1000",
		date: "12/2020",
		status: "Paid",
	},
	{
		id: "2",
		name: "John Doe",
		job: "Plumber",
		amount: "₹ 1000",
		date: "12/2020",
		status: "Paid",
	},
	{
		id: "3",
		name: "John Doe",
		job: "Plumber",
		amount: "₹ 1000",
		date: "12/2020",
		status: "Paid",
	},
];
const PaymentHistory = ({ navigation }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([
		{ label: "Residential", value: "Residential" },
		{ label: "Commercial", value: "Commercial" },
		{ label: "Hospitality", value: "Hospitality" },
		{ label: "Infrastructure", value: "Infrastructure" },
	]);
	const [openDate, setOpenDate] = useState(false);
	const [date, setDate] = useState(new Date());
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
						width: "20%",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Text
						style={[
							styles.flatListText,
							{
								textAlign: "left",
								textTransform: "uppercase",
								fontSize: 10,
							},
						]}
					>
						{item.name}
					</Text>
				</View>
				<View style={{ width: "20%" }}>
					<Text style={[styles.flatListText]}>{item.job}</Text>
				</View>
				<View style={{ width: "15%" }}>
					<Text style={styles.flatListText}>{item?.date}</Text>
				</View>
				<View style={{ width: "15%" }}>
					<Text style={styles.flatListText}>{item?.status}</Text>
				</View>
				<View style={{ width: "15%" }}>
					<Text style={styles.flatListText}>{item?.amount}</Text>
				</View>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("PaymentInvoice");
					}}
					style={{
						backgroundColor: "#ECE5FC",
						padding: 5,
						margin: 5,
						borderRadius: 3,
						width: "12%",
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
						paddingHorizontal: 8,
						backgroundColor: Colors.White,
						height: 50,
						borderTopLeftRadius: 10,
						borderTopRightRadius: 25,
					}}
				>
					<View
						style={{
							width: "20%",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						<Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
							Worker Name
						</Text>
					</View>
					<View style={{ width: "20%", alignItems: "center" }}>
						<Text style={[styles.flatListTextHeader]}>Job Name</Text>
					</View>
					<View style={{ width: "15%", alignItems: "center" }}>
						<Text style={styles.flatListTextHeader}>Paid Date</Text>
					</View>
					<View style={{ width: "15%", alignItems: "center" }}>
						<Text style={styles.flatListTextHeader}>Status</Text>
					</View>
					<View style={{ width: "15%", alignItems: "center" }}>
						<Text style={styles.flatListTextHeader}>Amount</Text>
					</View>
					<View style={{ width: "15%", alignItems: "center" }}>
						<Text style={styles.flatListTextHeader}>Action</Text>
					</View>
				</View>
			</View>
		);
	};
	return (
		<ScrollView style={styles.container}>
			<View style={{ width: "100%", padding: 10 }}>
				<Text style={styles.heading}>
					Payment History - Please select project name and date range to see the
					payment history
				</Text>

				<View style={{ width: "100%", padding: 10 }}>
					<Text style={styles.text}>Choose Project</Text>
					<View style={{ marginTop: 7 }}>
						<DropDownPicker
							open={open}
							value={value}
							items={items}
							setOpen={setOpen}
							setValue={setValue}
							setItems={setItems}
							placeholder="Select"
							// maxHeight={80}
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

				<View style={{ width: "100%", padding: 10 }}>
					<Text style={styles.text}>Select Date Range</Text>
					<View style={{ marginTop: 7, width: "100%" }}>
						<Pressable
							onPress={() => setOpenDate(true)}
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
								editable={false}

								// onChangeText={(text) => setJobDate(text)}
							/>
							<DateIcon
								onPress={() => setOpenDate(true)}
								color={Colors.FormBorder}
								size={22}
							/>
						</Pressable>
					</View>
				</View>
				<FlatList
					data={DATA}
					renderItem={({ item, index }) => <Item item={item} index={index} />}
					keyExtractor={(item) => item.id}
					ListHeaderComponent={ListHeader}
					stickyHeaderIndices={[0]}
					showsVerticalScrollIndicator={false}
				/>
			</View>

			<DatePicker
				modal
				mode="date"
				textColor={Colors.Black}
				open={openDate}
				date={date}
				onConfirm={(date) => {
					setOpen(false);
					setDate(date);
					setSelectedDate(date);
				}}
				onCancel={() => {
					setOpen(false);
				}}
			/>
		</ScrollView>
	);
};

export default PaymentHistory;

const styles = StyleSheet.create({
	container: {
		flex: 1,

		// alignItems: "center",
	},
	heading: {
		fontSize: 16,
		fontFamily: "Lexend-Medium",
		color: Colors.Black,
		marginLeft: 10,
	},
	text: {
		fontSize: 14,
		fontFamily: "Lexend-Regular",
		color: Colors.Gray,
	},
	rowStyle: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		padding: 10,
	},
	bottomContainer: {
		paddingTop: 30,
		backgroundColor: Colors.PrimaryLight,
		paddingRight: 10,
		paddingBottom: 30,
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
	inputField: {
		borderWidth: 1,
		borderColor: Colors.FormBorder,
		borderRadius: 4,
		height: 50,
		backgroundColor: Colors.White,
		elevation: 3,
	},
	item: {
		// paddingVertical: 5,
		// backgroundColor: Colors.White,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 4,
		width: "100%",
		// height: 40
		// borderRadius: 10,
	},
	flatListText: {
		fontFamily: "Lexend-Medium",
		fontSize: 10,
		color: Colors.ListItemText,
		textAlign: "center",
	},
	flatListTextHeader: {
		fontFamily: "Lexend-Medium",
		fontSize: 10,
		color: Colors.ListHeaderText,
		textAlign: "center",
	},
	smallButton: {
		fontFamily: "Lexend-SemiBold",
		fontSize: 10,
		color: Colors.Secondary,
	},
});
