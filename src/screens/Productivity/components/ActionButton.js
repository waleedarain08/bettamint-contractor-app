import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../../utils/Colors";

const ActionButton = ({ onPress, title, width = "22%" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.actionBtn, { width: width }]}
    >
      <Text style={styles.smallButton}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  actionBtn: {
    backgroundColor: "#ECE5FC",
    padding: 5,
    margin: 5,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  smallButton: {
    fontFamily: "Lexend-SemiBold",
    fontSize: 12,
    color: Colors.Secondary,
  },
});
