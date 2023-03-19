import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  LogBox,
  ScrollView,
} from "react-native";
import React from "react";
import Vector from "../../assets/images/bgvector.png";
// import ProfileIcon from "../assets/icons/Profile.png";
// import Lock from "../assets/icons/Lock.png";
import { Colors } from "../../utils/Colors";
LogBox.ignoreAllLogs();
import { CardText, Phone, Email, AccountType, User } from "../../icons";
import Spacer from "../../components/Spacer";
const img =
  "https://images.pexels.com/photos/417273/pexels-photo-417273.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
const Profile = ({ navigation }) => {
  return (
    // <ImageBackground source={Vector} style={styles.container}>
    <View style={styles.container}>
      <ScrollView style={{ padding: 20, flex: 1 }}>
        <Spacer top={10} />
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={{ uri: img }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={styles.heading}>Pyramid Builders</Text>
          <View
            style={{
              backgroundColor: Colors.White,
              width: "100%",
              height: "70%",
              marginTop: 20,
              borderRadius: 35,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: Colors.WhiteGray,
                borderBottomWidth: 1,
                paddingBottom: 15,
                marginBottom: 15,
              }}
            >
              <User size={20} color={Colors.Secondary} />
              <View style={{ paddingLeft: 15 }}>
                <Text style={styles.headingText}>First Name</Text>
                <Text style={styles.text}>Hredhaan</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: Colors.WhiteGray,
                borderBottomWidth: 1,
                paddingBottom: 15,
                marginBottom: 15,
              }}
            >
              <User size={20} color={Colors.Secondary} />
              <View style={{ paddingLeft: 15 }}>
                <Text style={styles.headingText}>Last Name</Text>
                <Text style={styles.text}>Shukla</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: Colors.WhiteGray,
                borderBottomWidth: 1,
                paddingBottom: 15,
                marginBottom: 15,
              }}
            >
              <AccountType size={20} color={Colors.Secondary} />
              <View style={{ paddingLeft: 15 }}>
                <Text style={styles.headingText}>Account Type</Text>
                <Text style={styles.text}>Contractor</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: Colors.WhiteGray,
                borderBottomWidth: 1,
                paddingBottom: 15,
                marginBottom: 15,
              }}
            >
              <Email size={20} color={Colors.Secondary} />
              <View style={{ paddingLeft: 15 }}>
                <Text style={styles.headingText}>Email Address</Text>
                <Text style={styles.text}>test@email.com</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: Colors.WhiteGray,
                borderBottomWidth: 1,
                paddingBottom: 15,
                marginBottom: 15,
              }}
            >
              <Phone
                size={20}
                color={Colors.Secondary}
                style={{ transform: [{ scaleX: -1 }] }}
              />
              <View style={{ paddingLeft: 15 }}>
                <Text style={styles.headingText}>Phone Number</Text>
                <Text style={styles.text}>090078601</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: Colors.WhiteGray,
                borderBottomWidth: 1,
                paddingBottom: 15,
                marginBottom: 15,
              }}
            >
              <User size={20} color={Colors.Secondary} />
              <View style={{ paddingLeft: 15 }}>
                <Text style={styles.headingText}>Username</Text>
                <Text style={styles.text}>Hredhaan</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderBottomColor: Colors.WhiteGray,
                borderBottomWidth: 1,
                paddingBottom: 15,
                marginBottom: 15,
              }}
            >
              <CardText size={20} color={Colors.Secondary} />
              <View style={{ paddingLeft: 15 }}>
                <Text style={styles.headingText}>GSTIN Number</Text>
                <Text style={styles.text}>23 IWHEOIJ 98</Text>
              </View>
            </View>
          </View>
        </View>
        {/* <Spacer bottom={10} /> */}
      </ScrollView>
    </View>

    // {/* </ImageBackground> */}
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Primary,
    justifyContent: "center",
  },
  heading: {
    fontFamily: "Lexend-Medium",
    fontSize: 20,
    color: Colors.White,
    marginTop: 15,
  },
  headingText: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.LightGray,
    textTransform: "uppercase",
  },
  text: {
    fontFamily: "Lexend-Regular",
    fontSize: 12,
    color: Colors.Black,
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
    fontSize: 16,
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
});
