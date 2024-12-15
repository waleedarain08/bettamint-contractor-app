import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../utils/Colors";
//import { RestrictedIcon } from "../icons";

const RestrictedScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center",padding:"2%"}}>
      {/* <RestrictedIcon color={Colors.Danger} size={150} /> */}
      <Text
        style={{
          color: Colors.Black,
          fontSize: 20,
          fontFamily: "Lexend-Medium",
          textAlign: "center",
        }}
      >
        Please contact your site admin to access this data.
      </Text>
    </View>
  );
};

export default RestrictedScreen;

const styles = StyleSheet.create({});
