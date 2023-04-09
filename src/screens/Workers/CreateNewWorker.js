import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  Dimensions,
  LogBox,
  Alert,
  Pressable,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import { CardIcon, Picture } from "../../icons";
import Spacer from "../../components/Spacer";
import DropDownPicker from "react-native-dropdown-picker";
import { Dropdown } from "react-native-element-dropdown";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjectsSimpleAction,
  projectsListSimpleReducer,
} from "../../redux/slices/projectSlice";
import { launchImageLibrary } from "react-native-image-picker";
import {
  getSkillsAction,
  skillsListReducer,
  updateWorkerAction,
} from "../../redux/slices/workerSlice";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
LogBox.ignoreAllLogs();

const CreateNewWorker = ({ navigation }) => {
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skillValue, setSkillValue] = useState(null);
  const [projectValue, setProjectValue] = useState(null);
  const [genderValue, setGenderValue] = useState(null);
  const [skillLevelValue, setSkillLevelValue] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilePicForm, setProfilePicForm] = useState("");
  const [aadharCard, setAadharCard] = useState("");
  const [aadharCardForm, setAadharCardForm] = useState("");
  const [uploadType, setUploadType] = useState(null);
  const [initialFetch, setInitialFetch] = useState(true);
  const projectsList = useSelector(projectsListSimpleReducer);
  const skillsList = useSelector(skillsListReducer);
  console.log(skillsList);
  useEffect(() => {
    dispatch(getAllProjectsSimpleAction());
  }, []);
  // useEffect(() => {
  //   dispatch(getSkillsAction());
  // }, []);
  const data = [
    { label: "Supervisor", value: "Supervisor" },
    { label: "Skilled", value: "Skilled" },
    { label: "Helper", value: "Helper" },
  ];
  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  console.log(skillValue);
  const submitHandler = async () => {
    const formData = new FormData();
    formData.append("SkillId", parseInt(skillValue, 10));
    formData.append("SkillTypeId", skillLevelValue);
    formData.append("WorkerId", 0);
    formData.append("FullName", fullName);
    formData.append("PhoneNumber", phoneNumber);
    formData.append("Status", "Init");
    formData.append("BankName", bankName);
    formData.append("BankAccountNumber", bankAccountNumber);
    formData.append("IFSCCode", ifscCode);
    formData.append("HealthCard", true);
    formData.append("PoliceVerification", true);
    formData.append("Gender", genderValue);

    dispatch(updateWorkerAction(formData, profilePicForm, aadharCardForm));
  };

  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
      selectionLimit: 1,
    });
    if (result?.assets?.length > 0) {
      if (uploadType === "Profile") {
        const profileFormData = new FormData();
        profileFormData.append("file", {
          name: result?.assets[0]?.fileName,
          type: result?.assets[0]?.type,
          uri: result?.assets[0]?.uri, //Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });
        setProfilePicForm(profileFormData);
        setProfilePic(result?.assets[0]?.uri);
      } else if (uploadType === "Aadhar") {
        const aadharFormData = new FormData();
        aadharFormData.append("file", {
          name: result?.assets[0]?.fileName,
          type: result?.assets[0]?.type,
          uri: result?.assets[0]?.uri, //Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });
        setAadharCardForm(aadharFormData);
        setAadharCard(result?.assets[0]?.uri);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <ScrollView style={styles.graph}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            marginTop: 20,
            paddingBottom: 15,
          }}
        >
          <Pressable
            onPress={() => {
              handleImagePicker();
              setUploadType("Profile");
            }}
            style={{ width: "28%" }}
          >
            {profilePic ? (
              <Image
                source={{ uri: profilePic }}
                style={{ width: "100%", height: 82, borderRadius: 5 }}
              />
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: Colors.FormBorder,
                  borderStyle: "dashed",
                  borderWidth: 1,
                  borderRadius: 5,
                  width: "100%",
                  height: 82,
                }}
              >
                <Picture size={38} color={"#D1E0EE"} />
                <Text style={styles.imgText}>Add Picture</Text>
              </View>
            )}
          </Pressable>
          <View style={{ width: "68%" }}>
            <Text style={styles.title}>Select Skill</Text>
            <View style={{ marginTop: 7 }}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={{
                  fontFamily: "Lexend-Regular",
                  fontSize: 13,
                  color: Colors.FormText,
                }}
                iconStyle={styles.iconStyle}
                data={skillsList?.map((ele) => ({
                  label: ele?.name,
                  value: ele.skillId,
                }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Skill"}
                value={skillValue}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setSkillValue(item.value);
                  // setIsFocus(false);
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
          <Text style={styles.title}>Full Name</Text>
          <TextInput
            style={{
              fontFamily: "Lexend-Regular",
              borderWidth: 1,
              borderColor: Colors.FormBorder,
              marginTop: 7,
              borderRadius: 4,
              paddingHorizontal: 7,
              fontSize: 12,
              height: 50,
              backgroundColor: Colors.White,
              elevation: 3,
              color: Colors.Black,
            }}
            onChangeText={(e) => setFullName(e)}
            value={fullName}
            placeholderTextColor={Colors.FormText}
            placeholder="Enter Name"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
          <Text style={styles.title}>Gender</Text>
          <View style={{ marginTop: 7 }}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={{
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.FormText,
              }}
              iconStyle={styles.iconStyle}
              data={genders}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Gender"}
              value={genderValue}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setGenderValue(item.value);
                // setIsFocus(false);
              }}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
          <Text style={styles.title}>Project</Text>
          <View style={{ marginTop: 7 }}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={{
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.FormText,
              }}
              iconStyle={styles.iconStyle}
              data={projectsList?.map((ele) => ({
                label: ele?.name,
                value: ele.projectId,
              }))}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Project"}
              value={projectValue}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setProjectValue(item.value);
                // setIsFocus(false);
              }}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: 15,
            // marginTop: openProject ? 30 : 0,
          }}
        >
          <Text style={styles.title}>Skill Level</Text>
          <View style={{ marginTop: 7 }}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={{
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.FormText,
              }}
              iconStyle={styles.iconStyle}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Skill Level"}
              value={skillLevelValue}
              onChange={(item) => {
                setSkillLevelValue(item.value);
              }}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: 15,
            // marginTop: openJob ? 30 : 0,
          }}
        >
          <Text style={styles.title}>Contact Number</Text>
          <TextInput
            style={{
              fontFamily: "Lexend-Regular",
              borderWidth: 1,
              borderColor: Colors.FormBorder,
              marginTop: 7,
              borderRadius: 4,
              paddingHorizontal: 7,
              fontSize: 12,
              height: 50,
              backgroundColor: Colors.White,
              elevation: 3,
              color: Colors.Black,
            }}
            onChangeText={(e) => setPhoneNumber(e)}
            value={phoneNumber}
            placeholderTextColor={Colors.FormText}
            placeholder="Enter Contact Number"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
          <Text style={styles.title}>Bank Name</Text>
          <TextInput
            style={{
              fontFamily: "Lexend-Regular",
              borderWidth: 1,
              borderColor: Colors.FormBorder,
              marginTop: 7,
              borderRadius: 4,
              paddingHorizontal: 7,
              fontSize: 12,
              height: 50,
              backgroundColor: Colors.White,
              elevation: 3,
              color: Colors.Black,
            }}
            onChangeText={(e) => setBankName(e)}
            value={bankName}
            placeholderTextColor={Colors.FormText}
            placeholder="Enter Bank Name"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
          <Text style={styles.title}>Bank Account Number</Text>
          <TextInput
            style={{
              fontFamily: "Lexend-Regular",
              borderWidth: 1,
              borderColor: Colors.FormBorder,
              marginTop: 7,
              borderRadius: 4,
              paddingHorizontal: 7,
              fontSize: 12,
              height: 50,
              backgroundColor: Colors.White,
              elevation: 3,
              color: Colors.Black,
            }}
            onChangeText={(e) => setBankAccountNumber(e)}
            value={bankAccountNumber}
            placeholderTextColor={Colors.FormText}
            placeholder="Enter Bank Account Number"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 20 }}>
          <Text style={styles.title}>IFSC Code</Text>
          <TextInput
            style={{
              fontFamily: "Lexend-Regular",
              borderWidth: 1,
              borderColor: Colors.FormBorder,
              marginTop: 7,
              borderRadius: 4,
              paddingHorizontal: 7,
              fontSize: 12,
              height: 50,
              backgroundColor: Colors.White,
              elevation: 3,
              color: Colors.Black,
            }}
            onChangeText={(e) => setIfscCode(e)}
            value={ifscCode}
            placeholderTextColor={Colors.FormText}
            placeholder="Enter Code"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 20 }}>
          <Pressable
            onPress={() => {
              handleImagePicker();
              setUploadType("Aadhar");
            }}
            style={{
              width: "100%",
              backgroundColor: Colors.White,
              borderWidth: 0.5,
              borderColor: Colors.FormBorder,
              height: 200,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              elevation: 3,
            }}
          >
            {aadharCard ? (
              <Image
                source={{ uri: aadharCard }}
                style={{ width: "100%", height: 200, borderRadius: 4 }}
              />
            ) : (
              <View
                style={{
                  width: "100%",
                  backgroundColor: Colors.White,
                  borderWidth: 0.5,
                  borderColor: Colors.FormBorder,
                  height: 200,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 4,
                  elevation: 3,
                }}
              >
                <CardIcon color={Colors.FormBorder} size={40} />
                <Text
                  style={{
                    fontFamily: "Lexend-Regular",
                    fontSize: 12,
                    color: Colors.Primary,
                  }}
                >
                  Upload Aadhar Card
                </Text>
              </View>
            )}
          </Pressable>
        </View>
        {/* <Spacer top={20} /> */}
      </ScrollView>
      <Spacer top={-20} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={[styles.button, { width: "60%" }]}
          onPress={() => {
            submitHandler();
          }}
        >
          <Text style={styles.buttonText}>Create Worker</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { width: "35%", backgroundColor: Colors.Secondary },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CreateNewWorker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    backgroundColor: Colors.Primary,
    height: "15%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
  },
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "100%",
  },
  graph: {
    height: "88%",
    backgroundColor: Colors.White,
    marginTop: -90,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderRadius: 10,
    // padding: 20,
  },
  graphBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  graphBottomText: {
    fontSize: 10,
    fontFamily: "Lexend-Regular",
    color: Colors.Black,
  },
  graphBottomTextBold: {
    fontSize: 32,
    fontFamily: "Lexend-Bold",
    color: Colors.Secondary,
    paddingLeft: 10,
  },
  graphBottomTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.WhiteGray,
    borderRadius: 8,
    padding: 12,
  },
  item: {
    flex: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 15,
    backgroundColor: Colors.White,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderRadius: 10,
  },
  title: {
    fontFamily: "Lexend-Medium",
    fontSize: 11,
    color: Colors.FormText,
    textTransform: "uppercase",
  },
  imgText: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.Primary,
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
  stat: {
    fontFamily: "Lexend-Medium",
    fontSize: 6,
    textAlign: "right",
    color: Colors.LightGray,
  },
  scrollGraph: {
    height: "50%",
    backgroundColor: Colors.White,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderRadius: 10,
  },
  inputField: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Lexend-Regular",
    height: 40,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 15,
    backgroundColor: Colors.White,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: Colors.Primary,
    // padding: 15,
    borderRadius: 4,
    marginTop: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Lexend-Regular",
    fontSize: 14,
    textAlign: "center",
    color: "white",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    elevation: 4,
    backgroundColor: Colors.White,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    fontFamily: "Lexend-Regular",
  },
  placeholderStyle: {
    fontSize: 12,
    fontFamily: "Lexend-Regular",
    color: Colors.FormText,
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily: "Lexend-Regular",
    color: Colors.Black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
