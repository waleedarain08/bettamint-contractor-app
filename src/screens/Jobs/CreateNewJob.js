import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  LogBox,
  Appearance,
  Pressable,
  ToastAndroid,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import { ClockIcon, DateIcon, LocationIcon, RupeesIcon } from "../../icons";
import Spacer from "../../components/Spacer";
import CheckBox from "@react-native-community/checkbox";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { GOOGLE_API_KEY } from "../../utils/api_constants";
import { useGeneralContext } from "../../context/generalContext";
import { useJob } from "../../context/jobContext";

LogBox.ignoreAllLogs();

const CreateNewJob = ({ navigation }) => {
  const { projects, skills } = useGeneralContext();
  const { createJob, getJobs } = useJob();
  const [selectedProject, setSelectedProject] = useState(null);
  const [requiredWorkers, setRequiredWorkers] = useState(null);
  const [dailyWage, setDailyWage] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);
  const [jobLocation, setJobLocation] = useState(null);
  const [manDay, setManDay] = useState(null);
  const [number, setNumber] = useState(null);
  const [supervisorName, setSupervisorName] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(null);
  const [openTime, setOpenTime] = useState(false);
  const [skillValue, setSkillValue] = useState(null);
  const [skillLevelValue, setSkillLevelValue] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBox2, setToggleCheckBox2] = useState(false);
  const [publicVal, setPublicVal] = useState(true);
  const [privateVal, setPrivateVal] = useState(false);
  const [nmrVal, setNMRVal] = useState(true);
  const [prwVal, setPRWVal] = useState(false);
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === "dark";
  const textColor = isDarkMode ? "white" : "black";

  const skillLevel = [
    { label: "Supervisor", value: "Supervisor" },
    { label: "Skilled", value: "Skilled" },
    { label: "Helper", value: "Helper" },
  ];

  useEffect(() => {
    const getCurrentCity = () => {
      const project = projects?.filter(
        (ele) => ele?.projectId === selectedProject
      );
      setProjectData(project[0]);
      if (project[0]?.latitude && project[0]?.longitude) {
        const locationPublish = `${project[0]?.latitude}, ${project[0]?.longitude}`;

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationPublish}&sensor=true&key=${GOOGLE_API_KEY}`;
        fetch(url)
          .then((response) => response.json())
          .then((response) => {
            const address = response.results[0].formatted_address;
            setJobLocation(address);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    getCurrentCity();
  }, [selectedProject]);

  const submitHandler = () => {
    const formData = new FormData();
    if (!selectedProject) {
      ToastAndroid.show("Please select the project.", ToastAndroid.SHORT);
    } else if (!requiredWorkers) {
      ToastAndroid.show("Please enter required workers.", ToastAndroid.SHORT);
    } else if (!manDay) {
      ToastAndroid.show("Please enter man days.", ToastAndroid.SHORT);
    } else if (!skillValue) {
      ToastAndroid.show("Please select skill.", ToastAndroid.SHORT);
    } else if (!skillLevelValue) {
      ToastAndroid.show("Please select skill level.", ToastAndroid.SHORT);
    } else if (!time) {
      ToastAndroid.show("Please select reporting time.", ToastAndroid.SHORT);
    } else if (!dailyWage) {
      ToastAndroid.show("Please enter daily wage.", ToastAndroid.SHORT);
    } else if (!jobDescription) {
      ToastAndroid.show("Please enter job description.", ToastAndroid.SHORT);
    } else if (!number) {
      ToastAndroid.show("Please enter contact number.", ToastAndroid.SHORT);
    } else {
      formData.append("contractorId", 1);
      formData.append("startDate", moment(date).format("YYYY-MM-DD"));
      formData.append("endDate", "");
      formData.append("latitude", Number(projectData?.latitude));
      formData.append("longitude", Number(projectData?.longitude));
      formData.append("skillId", parseInt(skillValue, 10));
      formData.append("skillLevel", 0);
      formData.append("reportingTime", moment(time).format("YYYY-MM-DD hh:mm"));
      formData.append("rating", 0);
      formData.append("requiredWorkers", parseInt(requiredWorkers, 10));
      formData.append("dailyWage", parseInt(dailyWage, 10));
      formData.append("audio", "");
      formData.append("video", "");
      formData.append("projectId", parseInt(selectedProject, 10));
      formData.append("description", jobDescription);
      formData.append("contactNumber", `91${number}`);
      formData.append("manDays", manDay);
      formData.append("isFood", toggleCheckBox);
      formData.append("isAccomodation", toggleCheckBox2);
      formData.append("skillTypeId", skillLevelValue);
      formData.append("cityName", jobLocation);
      formData.append("isPrivate", privateVal ? true : false);
      formData.append("supervisorName", supervisorName);
      formData.append("isNMR", nmrVal ? true : false);
      createJob(formData)
        .then((response) => {
          if (response?.status === 200) {
            getJobs(0);
            navigation.goBack();
            ToastAndroid.show("Job Created", ToastAndroid.SHORT);
          } else {
            ToastAndroid.show("Job Not Created", ToastAndroid.SHORT);
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
          ToastAndroid.show(
            "Something went wrong! Try again.",
            ToastAndroid.SHORT
          );
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <ScrollView style={styles.graph} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10, marginTop: 14 }}>
          <Text style={styles.title}>Project Name</Text>
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
              data={projects.map((project) => ({
                label: project?.name,
                value: project?.projectId,
                ...project,
              }))}
              autoScroll={false}
              search
              searchPlaceholder="Search Project"
              inputSearchStyle={{ color: Colors.Black }}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Your Project"}
              value={selectedProject}
              onChange={(item) => {
                setSelectedProject(item.value);
              }}
            />
          </View>
        </View>
        <View style={{ padding: 10, marginTop: open ? 28 : 0 }}>
          <Text style={styles.title}>REQUIRED WORKERS</Text>
          <TextInput
            style={styles.inputField}
            placeholderTextColor={Colors.FormText}
            placeholder="Enter number of required workers"
            value={requiredWorkers}
            onChangeText={(text) => setRequiredWorkers(text)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            width: "100%",
          }}
        >
          <View style={{ padding: 10, width: "50%" }}>
            <Text style={styles.title}>Start Date</Text>
            <View
              style={[
                styles.inputField,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
            >
              <TextInput
                style={{
                  fontFamily: "Lexend-Regular",
                  color: Colors.Black,
                  fontSize: 12,
                  width: "80%",
                }}
                onPressIn={() => setOpen(true)}
                placeholderTextColor={Colors.FormText}
                placeholder="mm/dd/yyyy"
                value={date ? moment(date).format("MM/DD/YYYY") : "mm/dd/yyyy"}
                // onChangeText={(text) => setJobDate(text)}
              />
              <DateIcon
                onPress={() => setOpen(true)}
                color={Colors.FormBorder}
                size={22}
              />
            </View>
          </View>
          <View style={{ padding: 10, width: "50%" }}>
            <Text style={styles.title}>Man Days</Text>
            <TextInput
              style={styles.inputField}
              placeholderTextColor={Colors.FormText}
              placeholder="Man Days"
              value={manDay}
              onChangeText={(text) => setManDay(text)}
            />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Skill Set</Text>
          {/* <View style={styles.inputField}>
            <TextInput
              style={styles.placeholderText}
              placeholder="Select skill set"
              editable={false}
            />
          </View> */}
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
              // data={data}
              data={skills?.map((ele) => ({
                label: ele?.name,
                value: ele?.skillId,
              }))}
              maxHeight={300}
              autoScroll={false}
              search
              searchPlaceholder="Search Skill"
              inputSearchStyle={{ color: Colors.Black }}
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
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Skill Level</Text>
          {/* <View style={styles.inputField}>
            <TextInput
              style={styles.placeholderText}
              placeholder="Select skill set"
              editable={false}
            />
          </View> */}
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
              data={skillLevel}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Level"}
              value={skillLevelValue}
              // onFocus={() => setIsFocus(true)}
              // onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setSkillLevelValue(item.value);
                // setIsFocus(false);
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            width: "100%",
          }}
        >
          <View style={{ padding: 10, width: "50%" }}>
            <Text style={styles.title}>REPORTING TIME</Text>
            <Pressable
              style={[
                styles.inputField,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
              // onPress={() => setOpenTime(true)}
            >
              <TextInput
                style={{
                  fontFamily: "Lexend-Regular",
                  color: Colors.Black,
                  fontSize: 12,
                  width: "80%",
                }}
                onPressIn={() => setOpenTime(true)}
                placeholderTextColor={Colors.FormText}
                placeholder="----"
                value={time ? moment(time).format("hh:mm A") : "----"}
              />
              <ClockIcon
                onPress={() => setOpenTime(true)}
                color={Colors.FormBorder}
                size={20}
              />
            </Pressable>
          </View>
          <View style={{ padding: 10, width: "50%" }}>
            <Text style={styles.title}>DAILY WAGE</Text>
            <View
              style={[
                styles.inputField,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              ]}
            >
              <TextInput
                style={{
                  fontFamily: "Lexend-Regular",
                  color: Colors.Black,
                  fontSize: 12,
                  width: "80%",
                }}
                placeholderTextColor={Colors.FormText}
                placeholder="----"
                value={dailyWage}
                onChangeText={(text) => setDailyWage(text)}
              />
              <RupeesIcon color={Colors.FormBorder} size={20} />
            </View>
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Job Description</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Job Description"
            placeholderTextColor={Colors.FormText}
            value={jobDescription}
            onChangeText={(text) => setJobDescription(text)}
          />
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Location</Text>
          <View
            style={[
              styles.inputField,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <TextInput
              style={{
                fontFamily: "Lexend-Regular",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              placeholder="Location"
              value={jobLocation || "Location"}
              //   onChangeText={(text) => setJobLocation(text)}
              editable={false}
            />
            <LocationIcon color={Colors.FormBorder} size={25} />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Supervisor Name</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Enter Supervisor Name"
            placeholderTextColor={Colors.FormText}
            value={supervisorName}
            onChangeText={(text) => setSupervisorName(text)}
          />
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Contact Number</Text>
          {/* <TextInput
						style={styles.inputField}
						placeholder="Enter Contact Number"
						placeholderTextColor={Colors.FormText}
						value={number}
						onChangeText={(text) => setNumber(text)}
					/> */}
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
                width: "7%",
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
                width: "93%",
              }}
              keyboardType="number-pad"
              onChangeText={(e) => {
                if (e?.length <= 10) {
                  setNumber(e);
                }
              }}
              value={number}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter Contact Number"
            />
          </View>
        </View>
        <View
          style={{
            padding: 10,
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "40%" }}
          >
            <CheckBox
              tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                fontSize: 12,
                color: Colors.Black,
                fontFamily: "Lexend-Medium",
              }}
            >
              Food
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "40%" }}
          >
            <CheckBox
              tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              value={toggleCheckBox2}
              onValueChange={(newValue) => setToggleCheckBox2(newValue)}
            />
            <Text
              style={{
                fontSize: 12,
                color: Colors.Black,
                fontFamily: "Lexend-Medium",
              }}
            >
              Accomodation
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "40%" }}
          >
            <CheckBox
              tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              value={nmrVal}
              onValueChange={(newValue) => {
                setNMRVal(newValue);
                setPRWVal(false);
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: Colors.Black,
                fontFamily: "Lexend-Medium",
              }}
            >
              NMR
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "40%" }}
          >
            <CheckBox
              tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              value={prwVal}
              onValueChange={(newValue) => {
                setNMRVal(false);
                setPRWVal(newValue);
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: Colors.Black,
                fontFamily: "Lexend-Medium",
              }}
            >
              PRW
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "40%" }}
          >
            <CheckBox
              tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              value={publicVal}
              onValueChange={(newValue) => {
                setPublicVal(newValue);
                setPrivateVal(false);
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: Colors.Black,
                fontFamily: "Lexend-Medium",
              }}
            >
              Public
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "40%" }}
          >
            <CheckBox
              tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              value={privateVal}
              onValueChange={(newValue) => {
                setPublicVal(false);
                setPrivateVal(newValue);
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: Colors.Black,
                fontFamily: "Lexend-Medium",
              }}
            >
              Private
            </Text>
          </View>
        </View>
        {/* <Text
					style={{
						paddingLeft: 14,
						fontFamily: "Lexend-Medium",
						color: Colors.Black,
						fontSize: 14,
						textTransform: "uppercase",
					}}
				>
					Job Instructions
				</Text> */}
        {/* <View style={styles.uploadBox}>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							borderColor: Colors.LightGray,
							borderStyle: "dashed",
							borderWidth: 0.6,
							borderRadius: 5,
							width: "48%",
							height: 150,
							backgroundColor: Colors.White,
							elevation: 4,
						}}
					>
						<Image
							source={require("../../assets/icons/video.png")}
							style={{ width: 50, height: 44, marginVertical: 5 }}
						/>
						<Text style={styles.imgText}>Upload Video File</Text>
					</View>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							borderColor: Colors.LightGray,
							borderStyle: "dashed",
							borderWidth: 0.6,
							borderRadius: 5,
							width: "48%",
							height: 150,
							backgroundColor: Colors.White,
							elevation: 4,
						}}
					>
						<Image
							source={require("../../assets/icons/audio.png")}
							style={{ width: 50, height: 44, marginVertical: 5 }}
						/>
						<Text style={styles.imgText}>Upload Audio File</Text>
					</View>
				</View> */}
        <DatePicker
          modal
          mode="date"
          textColor={textColor}
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false);
            setDate(date);
            setSelectedDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <DatePicker
          modal
          mode="time"
          textColor={textColor}
          open={openTime}
          date={date}
          onConfirm={(date) => {
            setOpenTime(false);
            setTime(date);
          }}
          onCancel={() => {
            setOpenTime(false);
          }}
        />
        <Spacer bottom={20} />
      </ScrollView>
      <Spacer top={-30} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <TouchableOpacity
          style={[styles.button, { width: "60%" }]}
          onPress={() => submitHandler()}
        >
          <Text style={styles.buttonText}>Create Job</Text>
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
export default CreateNewJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
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
    height: "93%",
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
    color: Colors.FormText,
    textTransform: "uppercase",
    // textDecorationLine: "underline",
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
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // fontFamily: "Lexend-Regular",
    // height: 40,
    // borderColor: "#C4C4C4",
    // borderWidth: 1,
    // borderRadius: 4,
    // marginTop: 15,
    // backgroundColor: Colors.White,
    // paddingLeft: 10,
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
  uploadBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.White,
    // borderRadius: 4,
    // margin: 10,
    padding: 15,
    width: "100%",
    // height: 150,
    // borderColor: "#C4C4C4",
    // borderWidth: 1,
    // backgroundColor: Colors.White,
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
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    elevation: 4,
    backgroundColor: Colors.White,
  },
});
