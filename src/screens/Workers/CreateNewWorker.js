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
  selectedWorkerReducer,
  skillsListReducer,
  updateWorkerAction,
} from "../../redux/slices/workerSlice";
import { assetsUrl } from "../../utils/api_constants";
import { authToken } from "../../redux/slices/authSlice";
import Toast from "react-native-toast-message";
import { getAllJobsAction, jobsListReducer } from "../../redux/slices/jobSlice";
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
  const [workerId, setWorkerId] = useState(null);
  const [uploadType, setUploadType] = useState(null);
  const [initialFetch, setInitialFetch] = useState(true);
  const [filterJobs, setFilterJob] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const projectsList = useSelector(projectsListSimpleReducer);
  const skillsList = useSelector(skillsListReducer);
  const jobsList = useSelector(jobsListReducer);
  const token = useSelector(authToken);
  // console.log(jobsList);
  useEffect(() => {
    dispatch(getAllProjectsSimpleAction(token));
    // dispatch(getAllJobsAction(token, 0));
  }, []);

  // useEffect(() => {
  //   dispatch(getSkillsAction());
  // }, []);
  const worker = useSelector(selectedWorkerReducer);
  // console.log("Worker Data", skillValue);
  const data = [
    { label: "Supervisor", value: "Supervisor" },
    { label: "Skilled", value: "Skilled" },
    { label: "Helper", value: "Helper" },
  ];
  const genders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];
  const selectedProfilePic = worker?.workerDocuments?.filter(
    (ele) => ele?.documentId === "ProfilePicture"
  );
  const selectedAadharCard = worker?.workerDocuments?.filter(
    (ele) => ele?.documentId === "IdentityCard"
  );
  useEffect(() => {
    if (worker) {
      // console.log("WORKER", worker);
      setFullName(worker?.fullName);
      setGenderValue(worker?.gender);
      setSkillLevelValue(worker?.workerSkills[0]?.skillTypeId);
      setPhoneNumber(worker?.phoneNumber);
      setBankName(worker?.bankName);
      setSkillValue(worker?.workerSkills[0]?.skill?.name?.toString());
      setBankAccountNumber(worker?.bankAccountNumber);
      setProfilePic(assetsUrl + selectedProfilePic[0]?.url);
      setAadharCard(assetsUrl + selectedAadharCard[0]?.url);
      setIfscCode(worker?.ifscCode);
    }
  }, [worker]);
  // console.log(skillLevelValue)
  const submitHandler = async () => {
    const formData = new FormData();
    const workerId = worker ? worker?.workerId : 0;
    const status = worker ? worker?.status : "Init";
    formData.append("SkillId", parseInt(skillValue, 10));
    formData.append("SkillTypeId", skillLevelValue);
    formData.append("WorkerId", parseInt(workerId, 10));
    formData.append("JobId", parseInt(selectedJob, 10));
    formData.append("ProjectId", parseInt(selectedProject, 10));
    formData.append("FullName", fullName);
    formData.append("PhoneNumber", `91${phoneNumber}`);
    formData.append("Status", status);
    formData.append("BankName", bankName);
    formData.append("BankAccountNumber", bankAccountNumber);
    formData.append("IFSCCode", ifscCode);
    formData.append("HealthCard", true);
    formData.append("PoliceVerification", true);
    formData.append("Gender", genderValue);
    // console.log('Form data', formData)
    const response = await dispatch(
      updateWorkerAction(token, formData, aadharCardForm, profilePicForm)
    );
    if (response.status === 200) {
      navigation.goBack();
      Toast.show({
        type: "info",
        text1: worker ? "Worker Updated" : "Worker Created",
        text2: worker
          ? "Worker is updated successfully."
          : "Worker is created successfully.",
        topOffset: 10,
        position: "top",
        visibilityTime: 4000,
      });
    }
    // console.log("worker res", response);
  };

  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
      selectionLimit: 1,
    });
    if (result?.assets?.length > 0) {
      const profileFormData = new FormData();
      profileFormData.append("file", {
        name: result?.assets[0]?.fileName,
        type: result?.assets[0]?.type,
        uri: result?.assets[0]?.uri, //Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
      setProfilePicForm(profileFormData);
      setProfilePic(result?.assets[0]?.uri);
    }
  };

  const handleAadharPicker = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
      selectionLimit: 1,
    });
    if (result?.assets?.length > 0) {
      const aadharFormData = new FormData();
      aadharFormData.append("file", {
        name: result?.assets[0]?.fileName,
        type: result?.assets[0]?.type,
        uri: result?.assets[0]?.uri, //Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
      setAadharCardForm(aadharFormData);
      setAadharCard(result?.assets[0]?.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Toast />
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
                autoScroll={false}
                search
                searchPlaceholder="Search Skill"
                inputSearchStyle={{color: Colors.Black}}
                data={skillsList?.map((ele) => ({
                  label: ele?.name,
                  value: ele?.skillId,
                }))}
                maxHeight={500}
                labelField="label"
                valueField="value"
                placeholder={"Select Skill"}
                value={skillValue}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setSkillValue(item.value);
                  setFilterJob([])
                  setSkillLevelValue(null)
                  setSelectedProject(null)
                  setSelectedJob(null)
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
        {/* <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
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
        </View> */}
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
            // marginTop: openProject ? 30 : 0,
          }}
        >
          <Text style={styles.title}>Select Project</Text>
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
              data={projectsList.map((ele) => ({
                label: ele.name,
                value: ele.projectId,
              }))}
              autoScroll={false}
              search
              searchPlaceholder="Search project"
              inputSearchStyle={{color: Colors.Black}}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Project"}
              value={selectedProject}
              onChange={(item) => {
                setSelectedProject(item.value);

                // console.log("JOBS", filterJobs[0]);
                const filterBySkill = jobsList?.filter(
                  (ele) => ele?.skillId === skillValue
                );
                const filterBySkillLevel = filterBySkill?.filter(
                  (ele) => ele?.skillTypeId === skillLevelValue
                );
                const filterByProject = filterBySkillLevel?.filter(
                  (ele) => ele?.projectId === item?.value
                );
                setFilterJob(filterByProject);
                console.log(filterByProject);
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
          <Text style={styles.title}>Select Job</Text>
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
              data={filterJobs?.map((ele) => ({
                label: `${ele.jobName} - ${ele.description}`,
                value: ele.jobId,
              }))}
              autoScroll={false}
              search
              searchPlaceholder="Search Job"
              inputSearchStyle={{color: Colors.Black}}
              // data={[]}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Job"}
              value={selectedJob}
              onChange={(item) => {
                setSelectedJob(item.value);
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
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.FormBorder,
              marginTop: 7,
              borderRadius: 4,
              paddingHorizontal: 7,
              // fontSize: 12,
              height: 50,
              backgroundColor: Colors.White,
              elevation: 3,
              flexDirection: "row",
              alignItems: "center",
              // color: Colors.Black,
            }}
          >
            <Text
              style={{
                fontFamily: "Lexend-Regular",
                // borderWidth: 1,
                // borderColor: Colors.FormBorder,
                // marginTop: 7,
                // borderRadius: 4,
                // paddingHorizontal: 7,
                fontSize: 12,
                // height: 50,
                // backgroundColor: Colors.White,
                // elevation: 3,
                color: Colors.Black,
                width: '7%'
              }}
            >
              +91
            </Text>
            <TextInput
              style={{
                fontFamily: "Lexend-Regular",
                // borderWidth: 1,
                // borderColor: Colors.FormBorder,
                // marginTop: 7,
                // borderRadius: 4,
                // paddingHorizontal: 7,
                fontSize: 12,
                // height: 50,
                // backgroundColor: Colors.White,
                // elevation: 3,
                color: Colors.Black,
                width: '93%'
              }}
              keyboardType="number-pad"
              onChangeText={(e) => {
                if (e?.length <= 10) {
                setPhoneNumber(e);
                }
              }}
              value={phoneNumber}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter Contact Number"
            />
          </View>
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
              handleAadharPicker();
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
          <Text style={styles.buttonText}>
            {!worker ? "Create Worker" : "Update Worker"}
          </Text>
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
