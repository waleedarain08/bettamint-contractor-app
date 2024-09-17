import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import Vector from "../../assets/images/bgvector.png";
import Profile from "../../assets/icons/Profile.png";
import Spacer from "../../components/Spacer";
import { Colors } from "../../utils/Colors";
import {
  CardText,
  Phone,
  Email,
  TypeIcon,
  PersonIcon,
  EditIcon,
  PackageIcon,
} from "../../icons";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch } from "react-redux";
import { userSignupAction } from "../../redux/slices/authSlice";
import Toast from "react-native-toast-message";
import { useAuth } from "../../context/authContext";
import Button from "../../components/Button";
const Signup = ({ navigation }) => {
  const { register, loading } = useAuth();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [companyName, setCompanyName] = useState(null);
  const [Package, setPackage] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    if (!firstName) {
      ToastAndroid.show("Please enter first name.", ToastAndroid.SHORT);
    } else if (!lastName) {
      ToastAndroid.show("Please enter last name.", ToastAndroid.SHORT);
    } else if (!accountType) {
      ToastAndroid.show("Please select account type.", ToastAndroid.SHORT);
    } else if (!companyName) {
      ToastAndroid.show("Please enter company name.", ToastAndroid.SHORT);
    } else if (!email) {
      ToastAndroid.show("Please enter email.", ToastAndroid.SHORT);
    } else if (!phone) {
      ToastAndroid.show("Please enter phone number.", ToastAndroid.SHORT);
    } else {
      const obj = {
        leadId: 0,
        firstName: firstName,
        lastName: lastName,
        companyName: companyName,
        email: email,
        phoneNumber: phone,
        Profession: accountType,
        isConverted: false,
      };
      try {
        const response = await register(obj);
        if (response) {
          ToastAndroid.show("User signup successfully.", ToastAndroid.SHORT);
        }
      } catch (error) {
        ToastAndroid.show(error?.message, ToastAndroid.SHORT);
      }
      //   console.log(obj);
      // const response = await dispatch(userSignupAction(obj));
      // if (response?.status === 200) {
      // 	navigation.navigate("Login");
      // 	Toast.show({
      // 		type: "info",
      // 		text1: "Success",
      // 		text2: "User signup successfully.",
      // 		topOffset: 10,
      // 		position: "top",
      // 		visibilityTime: 4000,
      // 	});
      // } else {
      // 	Toast.show({
      // 		type: "error",
      // 		text1: "Error",
      // 		text2: "Something want wrong! Try again.",
      // 		topOffset: 10,
      // 		position: "top",
      // 		visibilityTime: 4000,
      // 	});
      // }
    }
  };
  const arr = [
    { label: "Developer", value: "Developer" },
    { label: "Contractor", value: "Contractor" },
    { label: "Sub Contractor", value: "Sub Contractor" },
    { label: "Consultant", value: "Consultant" },
    { label: "Individual", value: "Individual" },
    { label: "Labour Contractor", value: "Labour Contractor" },
  ];
  const pack = [
    {
      label: "Basic   -  Free",
      value: "Basic   -  Free",
    },
    {
      label: "Standard - ₹5,000 / Month",
      value: "Standard - ₹5,000 / Month",
    },
    {
      label: "Plus - ₹10,000 / Month",
      value: "Plus - ₹10,000 / Month",
    },
    {
      label: "Enterprise -  Get In Touch",
      value: "Enterprise -  Get In Touch",
    },
  ];
  return (
    <View style={styles.container}>
      <Toast />
      <View style={{ padding: 40 }}>
        <View>
          <Text style={styles.headingText}>Sign Up Now</Text>
          <Text style={styles.text}>Register for a Free Account</Text>
          <View style={styles.inputField}>
            <Image source={Profile} style={{ paddingRight: 15 }} />
            <TextInput
              style={{
                flex: 1,
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                paddingLeft: 10,
                color: Colors.Black,
              }}
              placeholder="First Name"
              onChangeText={(e) => setFirstName(e)}
              value={firstName}
              placeholderTextColor={Colors.Gray}
            />
          </View>
          <View style={styles.inputField}>
            <Image source={Profile} style={{ paddingRight: 15 }} />
            <TextInput
              style={{
                flex: 1,
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.Black,
                paddingLeft: 10,
              }}
              onChangeText={(e) => setLastName(e)}
              value={lastName}
              placeholder="Last Name"
              placeholderTextColor={Colors.Gray}
            />
          </View>
          <View
            style={[
              styles.inputField,
              { width: "100%", justifyContent: "space-between" },
            ]}
          >
            <TypeIcon
              size={20}
              color={Colors.LightGray}
              style={{ width: "7%" }}
            />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={{
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.FormText,
              }}
              //   iconStyle={styles.iconStyle}
              data={arr}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Account Type"}
              value={accountType}
              onChange={(item) => {
                setAccountType(item.value);
              }}
            />

            {/* <TextInput
              style={{
                flex: 1,
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.Black,
                paddingLeft: 10,
              }}
              placeholder="Account Type"
              placeholderTextColor={Colors.Gray}
            /> */}
          </View>
          <View
            style={[
              styles.inputField,
              { width: "100%", justifyContent: "space-between" },
            ]}
          >
            <PackageIcon
              size={20}
              color={Colors.LightGray}
              style={{ width: "7%" }}
            />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={{
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.FormText,
              }}
              //   iconStyle={styles.iconStyle}
              data={pack}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Package"}
              value={Package}
              onChange={(item) => {
                setPackage(item?.value);
              }}
            />
          </View>
          <View style={styles.inputField}>
            <CardText size={20} color={Colors.LightGray} />
            <TextInput
              style={{
                flex: 1,
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.Black,
                paddingLeft: 10,
              }}
              placeholder="Company Name"
              onChangeText={(e) => setCompanyName(e)}
              value={companyName}
              placeholderTextColor={Colors.Gray}
            />
          </View>
          <View style={styles.inputField}>
            <Email size={20} color={Colors.LightGray} />
            <TextInput
              style={{
                flex: 1,
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.Black,
                paddingLeft: 10,
              }}
              placeholder="Email Address"
              onChangeText={(e) => setEmail(e)}
              value={email}
              placeholderTextColor={Colors.Gray}
            />
          </View>
          <View style={styles.inputField}>
            <Phone size={20} color={Colors.LightGray} />
            <TextInput
              style={{
                flex: 1,
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.Black,
                paddingLeft: 10,
              }}
              placeholder="Phone Number"
              onChangeText={(e) => setPhone(e)}
              value={phone}
              placeholderTextColor={Colors.Gray}
            />
          </View>
          <Button
            title="Sign Up"
            style={{ marginTop: 20 }}
            onPress={handleSignUp}
            loading={loading}
          />
        </View>
      </View>
      <Pressable
        style={styles.bottomView}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.forgotText}>Have an Account? Login Here</Text>
      </Pressable>
    </View>
  );
};

export default Signup;

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
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Lexend-Regular",
    color: Colors.FormText,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "Lexend-Regular",
    color: Colors.Black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdown: {
    // height: 50,
    borderColor: "gray",
    // borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    // elevation: 4,
    backgroundColor: Colors.White,
    width: "90%",
    marginRight: 10,
  },
});
