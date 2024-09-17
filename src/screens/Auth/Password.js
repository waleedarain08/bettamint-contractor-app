import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  PermissionsAndroid,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import Lock from "../../assets/icons/Lock.png";
import { Colors } from "../../utils/Colors";
import Toast from "react-native-toast-message";
import messaging from "@react-native-firebase/messaging";
import { EyeIcon, EyeOffIcon } from "../../icons";
import { useAuth } from "../../context/authContext";
import Button from "../../components/Button";

const Password = ({ navigation, route }) => {
  const { login, loading } = useAuth();
  const { username } = route.params;
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: "Enable Notifications",
          message: "Bettamint needs to allow notifications",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the notification");
        requestUserPermission();
      } else {
        console.log("permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  }
  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      if (response) {
        // navigation.navigate("Home");
      }
    } catch (error) {
      console.log("Login Error", error.message);
      ToastAndroid.showWithGravity(
        error.message,
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    }
  };

  return (
    <View style={styles.container}>
      <Toast />
      <View style={{ padding: 40 }}>
        <View>
          <Text style={styles.headingText}>Password</Text>
          <Text style={styles.text}>Enter your Password to login</Text>
          <View style={styles.inputField}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image source={Lock} style={{ paddingRight: 15, width: "5%" }} />
              <TextInput
                style={{
                  flex: 1,
                  fontFamily: "Lexend-Regular",
                  fontSize: 13,
                  color: Colors.Black,
                  width: "85%",
                }}
                placeholder="Password"
                placeholderTextColor={Colors.Gray}
                value={password}
                onChangeText={(e) => setPassword(e)}
                secureTextEntry={secureText}
              />
              <View style={{ width: "10%" }}>
                {secureText ? (
                  <EyeOffIcon
                    onPress={() => setSecureText(false)}
                    color={Colors.Gray}
                    size={16}
                  />
                ) : (
                  <EyeIcon
                    onPress={() => setSecureText(true)}
                    color={Colors.Gray}
                    size={16}
                  />
                )}
              </View>
            </View>
          </View>
          <Button
            title="Login"
            loading={loading}
            style={{ marginTop: 20 }}
            onPress={handleLogin}
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

export default Password;

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
    textAlign: "right",
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
