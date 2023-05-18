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
import { Picture, RupeesIcon, User, Email, LockIcon } from "../../icons";
import Spacer from "../../components/Spacer";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
import CheckBox from "@react-native-community/checkbox";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAction,
  getRoles,
  rolesReducer,
} from "../../redux/slices/userSlice";
import { authToken } from "../../redux/slices/authSlice";
import { Dropdown } from "react-native-element-dropdown";
import {
  getAllProjectsSimpleAction,
  projectsListSimpleReducer,
} from "../../redux/slices/projectSlice";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
LogBox.ignoreAllLogs();

const CreateNewUser = ({ navigation, route }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUseRole] = useState(null);
  const [project, setProject] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    // { label: "Banana", value: "banana" },
  ]);
  const projectsList = useSelector(projectsListSimpleReducer);

  const userInfo = route?.params?.userInfo;
  // console.log(userInfo);
  const token = useSelector(authToken);
  const roles = useSelector(rolesReducer);
  // console.log("ROLES", roles);
  const dispatch = useDispatch();
  // useEffect(() => {}, []);
  useFocusEffect(
    React.useCallback(() => {
      // setTimeout(() => {
        dispatch(getRoles(token));
        dispatch(getAllProjectsSimpleAction(token));
      // }, 1000);
      return () => {};
    }, [dispatch, token])
  );
  useEffect(() => {
    setFullName(userInfo?.fullName);
    setEmail(userInfo?.emailAddress);
    setUsername(userInfo?.username);
    setUseRole(userInfo?.roleId);
    setProject(userInfo?.userProjects[0]?.projectId);
  }, [userInfo]);
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      {/* <Toast /> */}
      <ScrollView style={styles.graph}>
        <View
          style={{ paddingHorizontal: 15, paddingBottom: 13, marginTop: 20 }}
        >
          <Text style={styles.title}>Full Name</Text>
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
                fontFamily: "Lexend-Medium",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter Name"
              value={fullName}
              onChangeText={(e) => setFullName(e)}
              // value="₹ 56,000"
            />
            <User color={Colors.FormBorder} size={30} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
          <Text style={styles.title}>Email</Text>
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
                fontFamily: "Lexend-Medium",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter Email"
              value={email}
              onChangeText={(e) => setEmail(e)}

              // value="₹ 56,000"
            />
            <Email
              color={Colors.FormBorder}
              size={20}
              style={{ paddingRight: 5 }}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
          <Text style={styles.title}>User Name</Text>
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
                fontFamily: "Lexend-Medium",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter User Name"
              value={userName}
              onChangeText={(e) => setUsername(e)}
              // value="₹ 56,000"
            />
            <User color={Colors.FormBorder} size={30} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
          <Text style={styles.title}>Password</Text>
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
                fontFamily: "Lexend-Medium",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              placeholder="*********"
              value={password}
              onChangeText={(e) => setPassword(e)}

              // value="₹ 56,000"
            />
            <LockIcon color={Colors.FormBorder} size={25} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
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
              autoScroll={false}
              // search
              // searchPlaceholder="Search Skill"
              inputSearchStyle={{ color: Colors.Black }}
              data={
                projectsList?.length
                  ? projectsList?.map((ele) => ({
                      label: ele?.name,
                      value: ele.projectId,
                    }))
                  : []
              }
              maxHeight={500}
              labelField="label"
              valueField="value"
              placeholder={"Select Project"}
              value={project}
              // onFocus={() => {
              //   // setIsFocus(true);
              //   dispatch(getAllProjectsSimpleAction(token));
              // }}
              // onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setProject(item?.value);

                // setIsFocus(false);
              }}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
          <Text style={styles.title}>User Role</Text>
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
              // search
              // searchPlaceholder="Search Skill"
              inputSearchStyle={{ color: Colors.Black }}
              data={
                roles?.length
                  ? roles?.map((ele) => ({
                      label: ele?.name,
                      value: ele?.roleId,
                    }))
                  : []
              }
              maxHeight={500}
              labelField="label"
              valueField="value"
              placeholder={"Select Role"}
              value={userRole}
              // onFocus={() => {
              //   // setIsFocus(true);
              //   dispatch(getRoles(token));
              // }}
              // onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setUseRole(item?.value);

                // setIsFocus(false);
              }}
            />
          </View>
        </View>
        {/* <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
          <Text style={styles.title}>OR Enter New Role</Text>
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
                fontFamily: "Lexend-Medium",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter new role name here"
              // value="₹ 56,000"
            />
            <Pressable
              style={{
                width: "15%",
                backgroundColor: "#ECE5FC",
                alignItems: "center",
                padding: 4,
                borderRadius: 4,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Lexend-Regular",
                    fontSize: 12,
                    color: Colors.Purple,
                  }}
                >
                  Add
                </Text>
              </View>
            </Pressable>
          </View>
        </View> */}
        {/* <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              color: Colors.Black,
              fontSize: 12,
              textTransform: "uppercase",
            }}
          >
            Select features to assign to this new role*
          </Text>
        </View> */}
        {/* <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // flex: 1,
              width: "90%",
              alignItems: "center",
              // paddingHorizontal: 10,
              paddingBottom: 5,
              marginBottom: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: Colors.FormBorder,
            }}
          >
            <View style={{ width: "30%" }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: 14,
                    fontFamily: "Lexend-Regular",
                  },
                ]}
              >
                Dashboard
              </Text>
            </View>

            <View
              style={{
                // padding: 10,
                width: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>view</Text>
            </View>
            <View
              style={{
                // padding: 10,
                width: "35%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>
                Create/Edit
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // flex: 1,
              width: "90%",
              alignItems: "center",
              paddingBottom: 5,
              marginBottom: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: Colors.FormBorder,
            }}
          >
            <View style={{ width: "30%" }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: 14,
                    fontFamily: "Lexend-Regular",
                  },
                ]}
              >
                Project
              </Text>
            </View>

            <View
              style={{
                // padding: 10,
                width: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>view</Text>
            </View>
            <View
              style={{
                // padding: 10,
                width: "35%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>
                Create/Edit
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // flex: 1,
              width: "90%",
              alignItems: "center",
              paddingBottom: 5,
              marginBottom: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: Colors.FormBorder,
            }}
          >
            <View style={{ width: "30%" }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: 14,
                    fontFamily: "Lexend-Regular",
                  },
                ]}
              >
                Jobs
              </Text>
            </View>

            <View
              style={{
                // padding: 10,
                width: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>view</Text>
            </View>
            <View
              style={{
                // padding: 10,
                width: "35%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>
                Create/Edit
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // flex: 1,
              width: "90%",
              alignItems: "center",
              paddingBottom: 5,
              marginBottom: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: Colors.FormBorder,
            }}
          >
            <View style={{ width: "30%" }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: 14,
                    fontFamily: "Lexend-Regular",
                  },
                ]}
              >
                Attendance
              </Text>
            </View>

            <View
              style={{
                // padding: 10,
                width: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>view</Text>
            </View>
            <View
              style={{
                // padding: 10,
                width: "35%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>
                Create/Edit
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // flex: 1,
              width: "90%",
              alignItems: "center",
              paddingBottom: 5,
              marginBottom: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: Colors.FormBorder,
            }}
          >
            <View style={{ width: "30%" }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: 14,
                    fontFamily: "Lexend-Regular",
                  },
                ]}
              >
                Worker
              </Text>
            </View>

            <View
              style={{
                // padding: 10,
                width: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>view</Text>
            </View>
            <View
              style={{
                // padding: 10,
                width: "35%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>
                Create/Edit
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // flex: 1,
              width: "90%",
              alignItems: "center",
              paddingBottom: 5,
              marginBottom: 20,
              borderBottomWidth: 0.2,
              borderBottomColor: Colors.FormBorder,
            }}
          >
            <View style={{ width: "30%" }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: 14,
                    fontFamily: "Lexend-Regular",
                  },
                ]}
              >
                User
              </Text>
            </View>

            <View
              style={{
                // padding: 10,
                width: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>view</Text>
            </View>
            <View
              style={{
                // padding: 10,
                width: "35%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>
                Create/Edit
              </Text>
            </View>
          </View>
        </View> */}
        {/* <Spacer top={20} /> */}
        {/* <View>
					<Text style={styles.heading}>
						Select features to assign to this new role*
					</Text>
				</View> */}
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
          onPress={async () => {
            if (!password) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please enter Password.",
                topOffset: 10,
                position: "top",
                visibilityTime: 4000,
              });
            } else {
              const user = {
                userId: userInfo?.userId,
                username: userName,
                fullName: fullName,
                password: password,
                emailAddress: email,
                // userTypeId: "SuperAdmin",
                roleId: userRole,
                projectIds: [project],
              };
              const response = await dispatch(createUserAction(token, user));
              if (response?.status === 200) {
                navigation.goBack();
                Toast.show({
                  type: "success",
                  text1: "User Updated",
                  text2: "User is updated successfully.",
                  topOffset: 10,
                  position: "top",
                  visibilityTime: 4000,
                });
              } else {
                Toast.show({
                  type: "error",
                  text1: "Error",
                  text2: "Something went wrong!",
                  topOffset: 10,
                  position: "top",
                  visibilityTime: 4000,
                });
              }
              console.log("USER HIT", response);
            }
          }}
        >
          <Text style={styles.buttonText}>Update User</Text>
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
export default CreateNewUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    // alignItems: 'center'
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
  heading: {
    fontSize: 13,
    fontFamily: "Lexend-Medium",
    color: Colors.Black,
    textAlign: "center",
  },

  graph: {
    height: "88%",
    backgroundColor: Colors.White,
    marginTop: -80,
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
    width: "93%",
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
    fontSize: 12,
    color: Colors.FormText,
  },
  imgText: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.Primary,
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
  placeholderText: {
    flex: 1,
    fontFamily: "Lexend-Medium",
    fontSize: 11,
    textAlign: "left",
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
    // height: 45,
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
});
