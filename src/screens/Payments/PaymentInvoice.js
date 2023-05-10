import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../utils/Colors";
import { color } from "react-native-reanimated";

const PaymentInvoice = () => {
	return (
		<View style={styles.container}>
			<View style={styles.rowStyle}>
				<View>
					<Text style={[styles.heading, { color: Colors.Black }]}>
						Company Name
					</Text>
				</View>
				<Text style={styles.heading}>INVOICE</Text>
			</View>
			<View style={{ width: "100%", padding: 10 }}>
				<Text style={styles.heading}>Invoice Summary</Text>
				<View style={styles.rowStyle}>
					<Text style={styles.text}>Description</Text>
					<Text style={styles.text}>Total</Text>
				</View>
				<View
					style={{
						width: "100%",
						borderColor: Colors.FormBorder,
						borderBottomWidth: 1,
						margin: 10,
					}}
				/>
				<View style={styles.rowStyle}>
					<Text style={styles.text}>Wage Fees</Text>
					<Text style={[styles.text, { color: Colors.Primary }]}>₹ 0</Text>
				</View>
				<View style={styles.rowStyle}>
					<Text style={styles.text}>Transaction Fees</Text>
					<Text style={[styles.text, { color: Colors.Primary }]}>₹ 0</Text>
				</View>
				<View style={styles.rowStyle}>
					<Text style={styles.text}>PF</Text>
					<Text style={[styles.text, { color: Colors.Primary }]}>₹ 0</Text>
				</View>
				<View style={styles.rowStyle}>
					<Text style={styles.text}>ESIC</Text>
					<Text style={[styles.text, { color: Colors.Primary }]}>₹ 0</Text>
				</View>
				<View style={styles.rowStyle}>
					<Text style={styles.text}>0% GST</Text>
					<Text style={[styles.text, { color: Colors.Primary }]}>₹ 0</Text>
				</View>
			</View>
			<View style={styles.bottomContainer}>
				<Text
					style={[styles.text, { textAlign: "right", color: Colors.Black }]}
				>
					Total Paid
				</Text>
				<View
					style={{
						width: "100%",
						borderColor: Colors.Black,
						borderBottomWidth: 1,
						margin: 10,
					}}
				/>
				<Text
					style={[
						styles.text,
						{ textAlign: "right", color: Colors.Primary, fontSize: 30 },
					]}
				>
					₹ 0
				</Text>
				<View
					style={{
						width: "100%",
						borderColor: Colors.Black,
						borderBottomWidth: 1,
						margin: 10,
					}}
				/>
			</View>
		</View>
	);
};

export default PaymentInvoice;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		// alignItems: "center",
	},
	heading: {
		fontSize: 20,
		fontFamily: "Lexend-Medium",
		color: Colors.Primary,
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
});
