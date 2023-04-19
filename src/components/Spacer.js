import React from "react";
import { View } from "react-native";
const Spacer = ({
	children,
	top,
	bottom,
	left,
	right,
	horizontal,
	vertical,
	flex,
}) => (
	<View
		style={{
			marginBottom: bottom,
			marginTop: top,
			marginRight: right,
			marginLeft: left,
			marginHorizontal: horizontal,
			marginVertical: vertical,
			flex,
		}}
	>
		{children}
	</View>
);

export default Spacer;
