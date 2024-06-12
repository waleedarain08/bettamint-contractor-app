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
export const VectorIcon = ({ name, color, size, type, style, onPress }) => {
  switch (type) {
    case "FontAwesome":
      return (
        <FontAwesome
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    case "FontAwesome5":
      return (
        <FontAwesome5 name={name} color={color} size={size} style={style} />
      );
    case "Ionicons":
      return (
        <Ionicons
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    case "AntDesign":
      return <AntDesign name={name} color={color} size={size} style={style} />;
    case "EvilIcons":
      return (
        <EvilIcons
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    case "Entypo":
      return (
        <Entypo
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    case "Feather":
      return (
        <Feather
          name={name}
          color={color}
          size={size}
          style={style}
          onPress={onPress}
        />
      );
    case "Fontisto":
      return <Fontisto name={name} color={color} size={size} style={style} />;
    case "MaterialIcons":
      return (
        <MaterialIcons
          onPress={onPress}
          name={name}
          color={color}
          size={size}
          style={style}
        />
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
    name="user"
    color={color}
    size={size}
    type="EvilIcons"
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
export const Cross = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="cross"
    color={color}
    size={size}
    type="Entypo"
    style={style}
    onPress={onPress}
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

export const PlusIcon = ({ color, size, style }) => (
  <VectorIcon
    name="plus"
    color={color}
    size={size}
    type="Entypo"
    style={style}
  />
);
export const MenuIcon = ({ color, size, style }) => (
  <VectorIcon
    name="menu"
    color={color}
    size={size}
    type="Entypo"
    style={style}
  />
);
export const DonwloadIcon = ({ color, size, style }) => (
  <VectorIcon
    name="download"
    color={color}
    size={size}
    type="AntDesign"
    style={style}
  />
);
export const SquareCheckBox = ({ color, size, style }) => (
  <VectorIcon
    name="checksquare"
    color={color}
    size={size}
    type="AntDesign"
    style={style}
  />
);
export const NotificationIcon = ({ color, size, style }) => (
  <VectorIcon
    name="notifications-none"
    color={color}
    size={size}
    type="MaterialIcons"
    style={style}
  />
);
export const DotIcon = ({ color, size, style }) => (
  <VectorIcon
    name="dot-single"
    color={color}
    size={size}
    type="Entypo"
    style={style}
  />
);
export const DateIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="date-range"
    color={color}
    size={size}
    type="MaterialIcons"
    style={style}
    onPress={onPress}
  />
);
export const ClockIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="clock-o"
    color={color}
    size={size}
    type="FontAwesome"
    style={style}
    onPress={onPress}
  />
);
export const RupeesIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="rupee"
    color={color}
    size={size}
    type="FontAwesome"
    style={style}
    onPress={onPress}
  />
);
export const CardIcon = ({ color, size, style }) => (
  <VectorIcon
    name="idcard"
    color={color}
    size={size}
    type="AntDesign"
    style={style}
  />
);
export const LockIcon = ({ color, size, style }) => (
  <VectorIcon
    name="lock-closed-outline"
    color={color}
    size={size}
    type="Ionicons"
    style={style}
  />
);
export const RestoreIcon = ({ color, size, style }) => (
  <VectorIcon
    name="restore"
    color={color}
    size={size}
    type="MaterialIcons"
    style={style}
  />
);
export const BackIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="chevron-back"
    color={color}
    size={size}
    type="Ionicons"
    style={style}
    onPress={onPress}
  />
);
export const BackCircleIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="arrow-back-circle-sharp"
    color={color}
    size={size}
    type="Ionicons"
    style={style}
    onPress={onPress}
  />
);
export const PackageIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="box"
    color={color}
    size={size}
    type="Feather"
    style={style}
    onPress={onPress}
  />
);

export const EyeIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="eye"
    color={color}
    size={size}
    type="Feather"
    style={style}
    onPress={onPress}
  />
);

export const EyeOffIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="eye-off"
    color={color}
    size={size}
    type="Feather"
    style={style}
    onPress={onPress}
  />
);

export const RestrictedIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="do-not-disturb-alt"
    color={color}
    size={size}
    type="MaterialIcons"
    style={style}
    onPress={onPress}
  />
);
export const DeleteIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="delete-forever"
    color={color}
    size={size}
    type="MaterialIcons"
    style={style}
    onPress={onPress}
  />
);
export const HomeIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="home"
    color={color}
    size={size}
    type="AntDesign"
    style={style}
    onPress={onPress}
  />
);
export const HatIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="aperture"
    color={color}
    size={size}
    type="Feather"
    style={style}
    onPress={onPress}
  />
);
export const ChatIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="chatbox-ellipses"
    color={color}
    size={size}
    type="Ionicons"
    style={style}
    onPress={onPress}
  />
);
export const PlusSquareIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="plussquare"
    color={color}
    size={size}
    type="AntDesign"
    style={style}
    onPress={onPress}
  />
);
export const PlusCircleIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="pluscircleo"
    color={color}
    size={size}
    type="AntDesign"
    style={style}
    onPress={onPress}
  />
);
export const DocumentIcon = ({ color, size, style, onPress }) => (
  <VectorIcon
    name="document-text-outline"
    color={color}
    size={size}
    type="Ionicons"
    style={style}
    onPress={onPress}
  />
);
