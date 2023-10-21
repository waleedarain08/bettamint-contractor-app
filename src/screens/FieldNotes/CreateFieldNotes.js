import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  LogBox,
  Pressable,
  Appearance,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import { ClockIcon, DateIcon, Picture } from "../../icons";
import Spacer from "../../components/Spacer";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProjectsSimpleAction,
  projectsListSimpleReducer,
} from "../../redux/slices/projectSlice";
import { launchImageLibrary } from "react-native-image-picker";
import {
  selectedWorkerReducer,
  skillsListReducer,
} from "../../redux/slices/workerSlice";
import { authToken } from "../../redux/slices/authSlice";
import Toast from "react-native-toast-message";
import { jobsListReducer } from "../../redux/slices/jobSlice";
import {
  createFieldNoteEntry,
  fieldNoteReducer,
  getScopeList,
} from "../../redux/slices/fieldNoteSlice";
import {
  getLabourContactorAction,
  labourContractorReducer,
} from "../../redux/slices/userSlice";
import moment from "moment";
import { assetsUrl } from "../../utils/api_constants";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
LogBox.ignoreAllLogs();

const CreateFieldNotes = ({ navigation }) => {
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === "dark";
  const textColor = isDarkMode ? "white" : "black";

  const dispatch = useDispatch();
  const [scopeValue, setScopeValue] = useState(null);
  const [contractorValue, setContractorValue] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(null);
  const [openTime, setOpenTime] = useState(false);
  const [fieldPic, setFieldPic] = useState("");
  const [fieldPicForm, setFieldPicForm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const projectsList = useSelector(projectsListSimpleReducer);
  const { scopeList, selectedNote } = useSelector(fieldNoteReducer);
  const labourContractorList = useSelector(labourContractorReducer);

  const token = useSelector(authToken);

  useEffect(() => {
    dispatch(getAllProjectsSimpleAction(token));
    dispatch(getScopeList(token));
    dispatch(getLabourContactorAction(token));
  }, []);

  useEffect(() => {
    console.log(selectedNote);
    if (selectedNote) {
      setSelectedProject(selectedNote?.projectId);
      setContractorValue(selectedNote?.contractorId);
      setScopeValue(selectedNote?.scopeOfWorkId);
      setLocation(selectedNote?.location);
      setDescription(selectedNote?.description);
      setFieldPic(assetsUrl + selectedNote?.imageUrl);
      setTime(new Date(selectedNote?.dateTime));
      setDate(new Date(selectedNote?.dateTime));
      setSelectedDate(new Date(selectedNote?.dateTime));
    }
  }, [selectedNote]);

  const submitHandler = async () => {
    const formData = new FormData();
    if (!fieldPic) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select image.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!scopeValue) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select scope of work.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!description) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter description.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!contractorValue) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select contractor.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!selectedProject) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select project.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!location) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter location.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!selectedDate) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select date.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!time) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select time.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else {
      formData.append("ScopeOfWorkId", parseInt(scopeValue, 10));
      formData.append("ContractorId", parseInt(contractorValue, 10));
      formData.append("ProjectId", parseInt(selectedProject, 10));
      formData.append("Description", description);
      formData.append("Location", location);
      selectedNote &&
        formData.append("FieldNoteId", parseInt(selectedNote?.fieldNoteId, 10));
      !selectedNote &&
        formData.append("Image", {
          name: fieldPicForm?.assets[0]?.fileName,
          type: fieldPicForm?.assets[0]?.type,
          uri: fieldPicForm?.assets[0]?.uri, //Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });
      formData.append(
        "DateTime",
        `${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm")}`
      );
      console.log("FORMDATA", formData);
      const response = await dispatch(createFieldNoteEntry(token, formData));
      if (response.status === 200) {
        navigation.goBack();
        Toast.show({
          type: "info",
          text1: selectedNote ? "Field Note Updates" : "Field Note Created",
          text2: selectedNote
            ? "Field Note is updated successfully."
            : "New Field Note is created successfully.",
          topOffset: 10,
          position: "top",
          visibilityTime: 4000,
        });
      }
    }
  };

  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
      selectionLimit: 1,
    });
    if (result?.assets?.length > 0) {
      console.log(result);
      setFieldPicForm(result);
      setFieldPic(result?.assets[0]?.uri);
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
            }}
            style={{ width: "28%" }}
          >
            {fieldPic ? (
              <Image
                source={{ uri: fieldPic }}
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
            <Text style={styles.title}>Scope of work</Text>
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
                inputSearchStyle={{ color: Colors.Black }}
                data={scopeList?.map((ele) => ({
                  label: ele?.name,
                  value: ele?.scopeOfWorkId,
                }))}
                maxHeight={500}
                labelField="label"
                valueField="value"
                placeholder={"Select Scope"}
                value={scopeValue}
                onChange={(item) => {
                  setScopeValue(item.value);
                }}
              />
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
          <Text style={styles.title}>Description</Text>
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
            onChangeText={(e) => setDescription(e)}
            value={description}
            placeholderTextColor={Colors.FormText}
            placeholder="Enter Description"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
          <Text style={styles.title}>Select Contractor</Text>
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
              data={
                labourContractorList?.length
                  ? labourContractorList?.map((ele) => ({
                      label: ele?.fullName,
                      value: ele?.userId,
                    }))
                  : []
              }
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Contractor"}
              value={contractorValue}
              onChange={(item) => {
                setContractorValue(item.value);
              }}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: 15,
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
              inputSearchStyle={{ color: Colors.Black }}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Project"}
              value={selectedProject}
              onChange={(item) => {
                setSelectedProject(item.value);
              }}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
          <Text style={styles.title}>Location</Text>
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
            onChangeText={(e) => setLocation(e)}
            value={location}
            placeholderTextColor={Colors.FormText}
            placeholder="Enter Location"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 15,
            paddingBottom: 15,
          }}
        >
          <View style={{ width: "48%" }}>
            <Text style={styles.title}>Select Date</Text>
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
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
          <View style={{ width: "48%" }}>
            <Text style={styles.title}>Select TIME</Text>
            <Pressable
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
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
              ]}
              onPress={() => setOpenTime(true)}
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
        </View>
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
            // console.log('CLICK')
          }}
        >
          <Text style={styles.buttonText}>
            {selectedNote ? "Update Note" : "Create Note"}
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
      <DatePicker
        modal
        mode="date"
        textColor={textColor}
        open={open}
        date={date}
        onConfirm={(date) => {
          // console.log(date)
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
    </View>
  );
};
export default CreateFieldNotes;

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
