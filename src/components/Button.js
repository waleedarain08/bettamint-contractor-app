import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../utils/Colors";

const Button = ({
  onPress,
  backgroundColor = Colors.Primary,
  width = "100%",
  height = 40,
  title,
  titleColor = Colors.White,
  titleSize = 14,
  style = {},
  textStyle = {},
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: backgroundColor,
        padding: 10,
        borderRadius: 5,
        justifyContent: "center",
        width: width,
        alignItems: "center",
        height: height,
        ...style,
      }}
    >
      <Text
        style={{
          fontFamily: "Lexend-Medium",
          fontSize: titleSize,
          color: titleColor,
          ...textStyle,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
