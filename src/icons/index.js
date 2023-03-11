import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
export const VectorIcon = ({ name, color, size, type, style }) => {
	switch (type) {
		case "FontAwesome":
			return (
				<FontAwesome name={name} color={color} size={size} style={style} />
			);
		case "FontAwesome5":
			return (
				<FontAwesome5 name={name} color={color} size={size} style={style} />
			);
		case "Ionicons":
			return <Ionicons name={name} color={color} size={size} style={style} />;
		case "AntDesign":
			return <AntDesign name={name} color={color} size={size} style={style} />;
		case "EvilIcons":
			return <EvilIcons name={name} color={color} size={size} style={style} />;
		case "Entypo":
			return <Entypo name={name} color={color} size={size} style={style} />;
		case "Feather":
			return <Feather name={name} color={color} size={size} style={style} />;
		case "Fontisto":
			return <Fontisto name={name} color={color} size={size} style={style} />;
		case "MaterialIcons":
			return (
				<MaterialIcons name={name} color={color} size={size} style={style} />
			);
		case "MaterialCommunityIcons":
			return (
				<MaterialCommunityIcons
					name={name}
					color={color}
					size={size}
					style={style}
				/>
			);
		default:
			return <></>;
	}
};
export const PersonRunning = ({ color, size, style }) => (
	<VectorIcon
		name="running"
		color={color}
		size={size}
		type="FontAwesome5"
		style={style}
	/>
);

export const Biking = ({ color, size, style }) => (
	<VectorIcon
		name="biking"
		color={color}
		size={size}
		type="FontAwesome5"
		style={style}
	/>
);

export const ArrowSwapIcon = ({ color, size, style }) => (
	<VectorIcon
		name="arrow-swap"
		color={color}
		size={size}
		type="Fontisto"
		style={style}
	/>
);

export const QuestionMark = ({ color, size, style }) => (
	<VectorIcon
		name="question"
		color={color}
		size={size}
		type="FontAwesome5"
		style={style}
	/>
);
export const CheckIcon = ({ color, size, style }) => (
	<VectorIcon
		name="check-circle"
		color={color}
		size={size}
		type="FontAwesome5"
		style={style}
	/>
);
export const ArrowLeft = ({ color, size, style }) => (
	<VectorIcon
		name="chevron-left"
		color={color}
		size={size}
		type="Feather"
		style={style}
	/>
);
export const MyLocation = ({ color, size, style }) => (
	<VectorIcon
		name="my-location"
		color={color}
		size={size}
		type="MaterialIcons"
		style={style}
	/>
);
export const ArrowLongRight = ({ color, size, style }) => (
	<VectorIcon
		name="arrow-long-right"
		color={color}
		size={size}
		type="Entypo"
		style={style}
	/>
);
