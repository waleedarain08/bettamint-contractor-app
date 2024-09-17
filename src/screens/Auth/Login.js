import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  ToastAndroid,
  Linking,
} from "react-native";
import React, { useState } from "react";
import Profile from "../../assets/icons/Profile.png";
import { Colors } from "../../utils/Colors";
import Button from "../../components/Button";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const handleButtonPress = () => {
    if (username.trim() === "") {
      ToastAndroid.showWithGravity(
        "Please enter your email address",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      return;
    }
    navigation.navigate("Password", { username: username });
  };
  return (
    <View style={styles.container}>
      <View style={{ padding: 40 }}>
        <View>
          <Text style={styles.headingText}>Get Started</Text>
          <Text style={styles.text}>Enter you Email Address</Text>
          <View style={styles.inputField}>
            <Image source={Profile} style={{ paddingRight: 15 }} />
            <TextInput
              style={{
                flex: 1,
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.Black,
              }}
              placeholder={"Email"}
              placeholderTextColor={Colors.Gray}
              mode="outlined"
              value={username}
              onChangeText={(e) => setUsername(e)}
              keyboardType={"email-address"}
            />
          </View>
          <Button
            title="Next"
            style={{ marginTop: 20 }}
            onPress={handleButtonPress}
          />
        </View>
      </View>
      <Pressable
        style={styles.bottomView}
        onPress={() => {
          Linking.openURL("https://www.bettamint.com/");
        }}
      >
        <Text style={styles.forgotText}>Not a member? Sign Up Now</Text>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary,
    justifyContent: "center",
  },
  headingText: {
    fontFamily: "Lexend-Medium",
    fontSize: 27,
    textAlign: "left",
    color: Colors.White,
  },
  text: {
    fontFamily: "Lexend-Regular",
    fontSize: 14,
    textAlign: "left",
    color: Colors.White,
  },
  inputField: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Lexend-Regular",
    height: 50,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 15,
    backgroundColor: Colors.White,
    paddingLeft: 10,
  },
  forgotText: {
    fontFamily: "Lexend-Regular",
    fontSize: 13,
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    color: Colors.White,
    marginTop: 15,
  },
  button: {
    backgroundColor: Colors.Secondary,
    padding: 15,
    borderRadius: 4,
    marginTop: 15,
  },
  buttonText: {
    fontFamily: "Lexend-Regular",
    fontSize: 15,
    textAlign: "center",
    color: "white",
  },
  bottomView: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", //Here is the trick
    bottom: 20, //Here is the trick
  },
});
