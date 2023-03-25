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

export const Search = ({ color, size, style }) => (
	<VectorIcon
		name="search"
		color={color}
		size={size}
		type="Feather"
		style={style}
	/>
);
export const Building = ({ color, size, style }) => (
	<VectorIcon
		name="building-o"
		color={color}
		size={size}
		type="FontAwesome"
		style={style}
	/>
);
export const User = ({ color, size, style }) => (
	<VectorIcon
		name="user-circle"
		color={color}
		size={size}
		type="FontAwesome5"
		style={style}
	/>
);
export const AccountType = ({ color, size, style }) => (
	<VectorIcon
		name="pager"
		color={color}
		size={size}
		type="FontAwesome5"
		style={style}
	/>
);
export const Email = ({ color, size, style }) => (
	<VectorIcon
		name="email"
		color={color}
		size={size}
		type="Fontisto"
		style={style}
	/>
);
export const Phone = ({ color, size, style }) => (
	<VectorIcon
		name="phone"
		color={color}
		size={size}
		type="Entypo"
		style={style}
	/>
);
export const CardText = ({ color, size, style }) => (
	<VectorIcon
		name="creditcard"
		color={color}
		size={size}
		type="AntDesign"
		style={style}
	/>
);
export const Whatsapp = ({ color, size, style }) => (
	<VectorIcon
		name="whatsapp"
		color={color}
		size={size}
		type="FontAwesome"
		style={style}
	/>
);
export const Tick = ({ color, size, style }) => (
	<VectorIcon
		name="check"
		color={color}
		size={size}
		type="Entypo"
		style={style}
	/>
);
export const Cross = ({ color, size, style }) => (
	<VectorIcon
		name="cross"
		color={color}
		size={size}
		type="Entypo"
		style={style}
	/>
);
export const Picture = ({ color, size, style }) => (
	<VectorIcon
		name="picture"
		color={color}
		size={size}
		type="AntDesign"
		style={style}
	/>
);

export const Right = ({ color, size, style }) => (
	<VectorIcon
		name="right"
		color={color}
		size={size}
		type="AntDesign"
		style={style}
	/>
);

export const Logout = ({ color, size, style }) => (
	<VectorIcon
		name="logout"
		color={color}
		size={size}
		type="MaterialIcons"
		style={style}
	/>
);

export const JobIcon = ({ color, size, style }) => (
	<VectorIcon
		name="briefcase-outline"
		color={color}
		size={size}
		type="Ionicons"
		style={style}
	/>
);
export const DashboardIcon = ({ color, size, style }) => (
	<VectorIcon
		name="appstore-o"
		color={color}
		size={size}
		type="AntDesign"
		style={style}
	/>
);
export const AttendanceIcon = ({ color, size, style }) => (
	<VectorIcon
		name="calendar"
		color={color}
		size={size}
		type="Entypo"
		style={style}
	/>
);
export const PaymentIcon = ({ color, size, style }) => (
	<VectorIcon
		name="currency-inr"
		color={color}
		size={size}
		type="MaterialCommunityIcons"
		style={style}
	/>
);

export const LocationIcon = ({ color, size, style }) => (
	<VectorIcon
		name="location-outline"
		color={color}
		size={size}
		type="Ionicons"
		style={style}
	/>
);

export const TickIcon = ({ color, size, style }) => (
	<VectorIcon
		name="check"
		color={color}
		size={size}
		type="Entypo"
		style={style}
	/>
);
export const EditIcon = ({ color, size, style }) => (
	<VectorIcon
		name="edit"
		color={color}
		size={size}
		type="AntDesign"
		style={style}
	/>
);
export const PersonIcon = ({ color, size, style }) => (
	<VectorIcon
		name="person-circle-outline"
		color={color}
		size={size}
		type="Ionicons"
		style={style}
	/>
);
export const TypeIcon = ({ color, size, style }) => (
	<VectorIcon
		name="briefcase-outline"
		color={color}
		size={size}
		type="Ionicons"
		style={style}
	/>
);
