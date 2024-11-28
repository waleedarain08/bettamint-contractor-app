import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  Text,
  View,
  LogBox,
  Switch,
  Linking,
  StyleSheet,
  Pressable,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  DefaultTheme,
  useNavigation,
  // DarkTheme,
} from "@react-navigation/native";
import Animated, {
  interpolateNode,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import Logo from "../assets/images/logo.png";
import Menu from "../assets/icons/Menu.png";
import { useDrawerStatus } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  useDrawerProgress,
} from "@react-navigation/drawer";
import Profile from "../screens/Profile/Profile";
import Payments from "../screens/Payments/Payments";
import Attendance from "../screens/Attendance/Attendance";
import { Colors } from "../utils/Colors";
import Workers from "../screens/Workers/Workers";
import Login from "../screens/Auth/Login";
import Password from "../screens/Auth/Password";
import Otp from "../screens/Auth/Otp";
import SelectLanguage from "../screens/Auth/SelectLanguage";
import ChangePassword from "../screens/Auth/ChangePassword";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import Dashboard from "../screens/Dashboard/Dashboard";
import Projects from "../screens/Project/Projects";
import CustomDrawer from "./CustomDrawer";
import MainLayout from "../screens/MainLayout";
import CreateNewProject from "../screens/Project/CreateNewProject";
import ProjectDetails from "../screens/Project/ProjectDetails";
import PaymentMusterCard from "../screens/Payments/PaymentMusterCard";
import AttendanceMusterCard from "../screens/Attendance/AttendanceMusterCard";
import ApproveAttendance from "../screens/Attendance/ApproveAttendance";
import Jobs from "../screens/Jobs/Jobs";
import CreateNewJob from "../screens/Jobs/CreateNewJob";
import JobDetails from "../screens/Jobs/JobDetails";
import WorkerDetails from "../screens/Workers/WorkerDetails";
import CreateNewWorker from "../screens/Workers/CreateNewWorker";
import Users from "../screens/Users/Users";
import CreateNewUser from "../screens/Users/CreateNewUser";
import SplashScreen from "react-native-splash-screen";
import Signup from "../screens/Auth/Signup";
import PayOnline from "../screens/Payments/PayOnline";
import PaymentHistory from "../screens/Payments/PaymentHistory";
import PaymentInvoice from "../screens/Payments/PaymentInvoice";
import {
  Building,
  AttendanceIcon,
  JobIcon,
  DashboardIcon,
  PaymentIcon,
  PlusIcon,
  MenuIcon,
  DonwloadIcon,
  NotificationIcon,
  EditIcon,
  DotIcon,
  RestoreIcon,
} from "../icons";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWorkerAction,
  selectedWorkerReducer,
} from "../redux/slices/workerSlice";
import { authToken, userData } from "../redux/slices/authSlice";
import { navigationRef } from "./NavigationRef";
import {
  selectProjectAction,
  selectedProjectReducer,
} from "../redux/slices/projectSlice";
import { emptyPaymentListAction } from "../redux/slices/paymentSlice";
import EditUser from "../screens/Users/EditUser";
import FieldNotes from "../screens/FieldNotes/FieldNotes";
import AttendanceDrawer from "./AttendanceDrawer";
import CreateFieldNotes from "../screens/FieldNotes/CreateFieldNotes";
import {
  editFieldNoteAction,
  fieldNoteReducer,
} from "../redux/slices/fieldNoteSlice";
import Productivity from "../screens/Productivity/Productivity";
import GCProductivity from "../screens/Productivity/GCProductivity";
import ViewBoq from "../screens/Productivity/ViewBoq";
import VerifyBoq from "../screens/Productivity/VerifyBoq";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/authContext";
import UpdateBoq from "../screens/Productivity/UpdateBoq";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const PaymentStack = createNativeStackNavigator();
const AttendanceStack = createNativeStackNavigator();
const AttendanceOnlyStack = createNativeStackNavigator();
const WorkerStack = createNativeStackNavigator();
const ProjectStack = createNativeStackNavigator();
const JobStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const FieldNotesStack = createNativeStackNavigator();
const ProductivityStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
LogBox.ignoreAllLogs();

const PaymentNavigator = ({ navigation }) => {
  const { user } = useAuth();
  const roles = user?.user?.role?.roleFeatureSets;
  const isPaymentListPresent = roles?.some(
    (item) => item?.featureSet?.name === "Payment List"
  );

  return (
    <PaymentStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: Colors.White,
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
      }}
    >
      <PaymentStack.Screen
        name="PaymentStack"
        component={Payments}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
                marginHorizontal: 13,
              }}
            >
              Payment
            </Text>
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <MenuIcon size={30} color={Colors.White} />
            </Pressable>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* {isPaymentListPresent && (
                <Pressable
                  style={{
                    height: 30,
                    width: 30,
                    backgroundColor: Colors.Purple,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    navigation.navigate("PaymentHistory");
                  }}
                >
                  <RestoreIcon size={22} color={Colors.White} />
                </Pressable>
              )} */}
              <Pressable
                style={{ marginLeft: 8 }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 8 }}
                />
              </Pressable>
              <Pressable
                style={{
                  marginLeft: 0,
                  height: 30,
                  width: 30,
                  backgroundColor: Colors.Purple,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NotificationIcon size={22} color={Colors.White} />
              </Pressable>
            </View>
          ),
        }}
      />
      <PaymentStack.Screen
        name="PaymentMusterCard"
        component={PaymentMusterCard}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
              }}
            >
              Muster Roll
            </Text>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable
                style={{ marginLeft: 8 }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 8 }}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      <PaymentStack.Screen
        name="PayOnline"
        component={PayOnline}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
              }}
            >
              Pay Online
            </Text>
          ),
        }}
      />
      <PaymentStack.Screen
        name="PaymentHistory"
        component={PaymentHistory}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
              }}
            >
              Payment History
            </Text>
          ),
        }}
      />
      <PaymentStack.Screen
        name="PaymentInvoice"
        component={PaymentInvoice}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
              }}
            >
              Payment Invoice
            </Text>
          ),
        }}
      />
    </PaymentStack.Navigator>
  );
};

const JobsNavigator = ({ navigation }) => {
  const { user } = useAuth();
  const roles = user?.user?.role?.roleFeatureSets;
  const isJobsListPresent = roles.some(
    (item) => item.featureSet.name === "Jobs List"
  );
  return (
    <JobStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: Colors.White,
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
      }}
    >
      <JobStack.Screen
        name="JobStack"
        component={Jobs}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
                marginHorizontal: 13,
              }}
            >
              Jobs
            </Text>
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <MenuIcon size={30} color={Colors.White} />
            </Pressable>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {isJobsListPresent && (
                <Pressable
                  onPress={() => {
                    navigation.navigate("CreateNewJob");
                  }}
                  style={{
                    backgroundColor: Colors.Purple,
                    padding: 5,
                    borderRadius: 15,
                    paddingHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <PlusIcon size={20} color={Colors.White} />
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 11,
                        color: Colors.White,
                      }}
                    >
                      New Job
                    </Text>
                  </View>
                </Pressable>
              )}
              <Pressable
                style={{ marginLeft: 8 }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 8 }}
                />
              </Pressable>
              <Pressable
                style={{
                  marginLeft: 0,
                  height: 30,
                  width: 30,
                  backgroundColor: Colors.Purple,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NotificationIcon size={22} color={Colors.White} />
              </Pressable>
            </View>
          ),
        }}
      />
      <JobStack.Screen
        name="CreateNewJob"
        component={CreateNewJob}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
              }}
            >
              Create New Job
            </Text>
          ),
        }}
      />
      <JobStack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
              }}
            >
              Job Details
            </Text>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* <Pressable
              onPress={() => {
                navigation.navigate("CreateNewJob");
              }}
              style={{
                backgroundColor: Colors.Purple,
                padding: 5,
                borderRadius: 15,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <EditIcon size={20} color={Colors.White} />
                <Text
                  style={{
                    fontFamily: "Lexend-Medium",
                    fontSize: 11,
                    color: Colors.White,
                    paddingLeft: 5,
                  }}
                >
                  Edit
                </Text>
              </View>
            </Pressable> */}
              <Pressable
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 16 }}
                />
              </Pressable>
            </View>
          ),
        }}
      />
    </JobStack.Navigator>
  );
};

const AttendanceNavigator = ({ navigation }) => {
  const { user } = useAuth();
  const roles = user?.user?.role?.roleFeatureSets;
  const isAttendanceListPresent = roles?.some(
    (item) => item?.featureSet?.name === "Attendance List"
  );
  return (
    <AttendanceStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: Colors.White,
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
      }}
    >
      <AttendanceStack.Screen
        name="AttendanceStack"
        component={Attendance}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                fontWeight: "500",
                color: Colors.White,
                marginHorizontal: 13,
              }}
            >
              Attendance
            </Text>
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <MenuIcon size={30} color={Colors.White} />
            </Pressable>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {isAttendanceListPresent && (
                <>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("ApproveAttendance");
                    }}
                    style={{
                      backgroundColor: Colors.Purple,
                      paddingVertical: 8,
                      borderRadius: 14,
                      paddingHorizontal: 7,
                    }}
                  >
                    <View
                      style={{
                        // flexDirection: "row",
                        // justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Lexend-Medium",
                          fontSize: 10,
                          color: Colors.White,
                        }}
                      >
                        Today's Muster Roll
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable style={{ marginLeft: 5 }}>
                    <Image
                      source={require("../assets/icons/download.png")}
                      style={{ height: 30, width: 30, marginRight: 0 }}
                    />
                  </Pressable>
                </>
              )}
              <Pressable
                style={{ marginLeft: 5 }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 0 }}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      <AttendanceStack.Screen
        name="AttendanceMusterCard"
        component={AttendanceMusterCard}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                // fontWeight: "500",
                color: Colors.White,
                // marginHorizontal: 13,
              }}
            >
              Muster Roll
            </Text>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <Image
                source={require("../assets/icons/ProfileButton.png")}
                style={{ height: 30, width: 30, marginRight: 5 }}
              />
            </Pressable>
          ),
        }}
      />
      <AttendanceStack.Screen
        name="ApproveAttendance"
        component={ApproveAttendance}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                // fontWeight: "500",
                color: Colors.White,
                // marginHorizontal: 13,
              }}
            >
              Today's Muster Roll
            </Text>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <Image
                source={require("../assets/icons/ProfileButton.png")}
                style={{ height: 30, width: 30, marginRight: 5 }}
              />
            </Pressable>
          ),
        }}
      />
    </AttendanceStack.Navigator>
  );
};
const AttendanceOnlyNavigator = ({ navigation }) => {
  const { user } = useAuth();
  const roles = user?.user?.role?.roleFeatureSets;
  const isAttendanceListPresent = roles.some(
    (item) => item.featureSet.name === "Attendance List"
  );
  return (
    <AttendanceOnlyStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: Colors.White,
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
      }}
    >
      <AttendanceOnlyStack.Screen
        name="AttendanceStack"
        component={Attendance}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                fontWeight: "500",
                color: Colors.White,
                marginHorizontal: 13,
              }}
            >
              Attendance
            </Text>
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <MenuIcon size={30} color={Colors.White} />
            </Pressable>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {isAttendanceListPresent && (
                <>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("ApproveAttendance");
                    }}
                    style={{
                      backgroundColor: Colors.Purple,
                      paddingVertical: 8,
                      borderRadius: 14,
                      paddingHorizontal: 7,
                    }}
                  >
                    <View
                      style={{
                        // flexDirection: "row",
                        // justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Lexend-Medium",
                          fontSize: 10,
                          color: Colors.White,
                        }}
                      >
                        Today's Muster Roll
                      </Text>
                    </View>
                  </Pressable>
                  {/* <Pressable style={{ marginLeft: 5 }}>
                    <Image
                      source={require("../assets/icons/download.png")}
                      style={{ height: 30, width: 30, marginRight: 0 }}
                    />
                  </Pressable> */}
                </>
              )}
              <Pressable
                style={{ marginLeft: 5 }}
                onPress={() => navigation.navigate("ProfileAttendance")}
              >
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 0 }}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      <AttendanceOnlyStack.Screen
        name="AttendanceMusterCard"
        component={AttendanceMusterCard}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                // fontWeight: "500",
                color: Colors.White,
                // marginHorizontal: 13,
              }}
            >
              Muster Roll
            </Text>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <Image
                source={require("../assets/icons/ProfileButton.png")}
                style={{ height: 30, width: 30, marginRight: 5 }}
              />
            </Pressable>
          ),
        }}
      />
      <AttendanceOnlyStack.Screen
        name="ApproveAttendance"
        component={ApproveAttendance}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                // fontWeight: "500",
                color: Colors.White,
                // marginHorizontal: 13,
              }}
            >
              Today's Muster Roll
            </Text>
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <Image
                source={require("../assets/icons/ProfileButton.png")}
                style={{ height: 30, width: 30, marginRight: 5 }}
              />
            </Pressable>
          ),
        }}
      />
      <AttendanceOnlyStack.Screen
        name="ProfileAttendance"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          //   headerTitle: () => (
          //     <Text
          //       style={{
          //         fontSize: 18,
          //         fontFamily: "Lexend-Medium",
          //         // fontWeight: "500",
          //         color: Colors.White,
          //         // marginHorizontal: 13,
          //       }}
          //     >
          //       Today's Muster Roll
          //     </Text>
          //   ),
          //   headerRight: () => (
          //     <Pressable onPress={() => navigation.navigate("Profile")}>
          //       <Image
          //         source={require("../assets/icons/ProfileButton.png")}
          //         style={{ height: 30, width: 30, marginRight: 5 }}
          //       />
          //     </Pressable>
          //   ),
        }}
      />
    </AttendanceOnlyStack.Navigator>
  );
};

const WorkersNavigator = ({ navigation }) => {
  const worker = useSelector(selectedWorkerReducer);
  const dispatch = useDispatch();
  return (
    <WorkerStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: Colors.White,
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
      }}
    >
      <WorkerStack.Screen
        name="WorkerStack"
        component={Workers}
        options={{
          headerBackVisible: false,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                // fontWeight: "500",
                color: Colors.White,
                marginHorizontal: 13,
              }}
            >
              Workers
            </Text>
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <MenuIcon size={30} color={Colors.White} />
            </Pressable>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable>
                <Image
                  source={require("../assets/icons/download.png")}
                  style={{ height: 30, width: 30, marginRight: 10 }}
                />
              </Pressable>
              <Pressable
                onPress={() => {
                  navigation.navigate("CreateNewWorker");
                  dispatch(selectWorkerAction(null));
                }}
                style={{
                  backgroundColor: Colors.Purple,
                  padding: 5,
                  borderRadius: 12,
                  paddingHorizontal: 10,
                  marginRight: 10,
                  justifyContent: "center",
                  height: 28,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "Lexend-Medium",
                      fontSize: 11,
                      color: Colors.White,
                    }}
                  >
                    Add Worker
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Profile")}>
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 8 }}
                />
              </Pressable>
              <Pressable
                style={{
                  marginLeft: 0,
                  height: 30,
                  width: 30,
                  backgroundColor: Colors.Purple,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // onPress={() => navigation.navigate("Profile")}
              >
                <NotificationIcon size={22} color={Colors.White} />
              </Pressable>
            </View>
          ),
        }}
      />
      <WorkerStack.Screen
        name="CreateNewWorker"
        component={CreateNewWorker}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                // fontWeight: "500",
                color: Colors.White,
                // marginHorizontal: 13,
              }}
            >
              {!worker ? "Add New Worker" : "Edit Worker"}
            </Text>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Pressable onPress={() => navigation.navigate("Profile")}>
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 16 }}
                />
              </Pressable>
            </View>
          ),
        }}
      />
      <WorkerStack.Screen
        name="WorkerDetails"
        component={WorkerDetails}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                // fontWeight: "500",
                color: Colors.White,
                // marginHorizontal: 13,
              }}
            >
              Worker Details
            </Text>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* <Pressable
                onPress={() => {
                  navigation.navigate("CreateNewWorker");
                }}
                style={{
                  backgroundColor: Colors.Purple,
                  padding: 5,
                  borderRadius: 14,
                  paddingHorizontal: 10,
                  marginRight: 10,
                  justifyContent: "center",
                  height: 28,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <EditIcon color={Colors.White} size={14} />
                  <Text
                    style={{
                      fontFamily: "Lexend-Medium",
                      fontSize: 11,
                      color: Colors.White,
                      paddingLeft: 6,
                    }}
                  >
                    Edit
                  </Text>
                </View>
              </Pressable> */}
              <Pressable onPress={() => navigation.navigate("Profile")}>
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30 }}
                />
              </Pressable>
            </View>
          ),
        }}
      />
    </WorkerStack.Navigator>
  );
};

const ProjectNavigator = ({ navigation }) => {
  const project = useSelector(selectedProjectReducer);
  const { user } = useAuth();
  const roles = user?.user?.role?.roleFeatureSets;
  const isProjectListPresent = roles?.some(
    (item) => item?.featureSet?.name === "Project List"
  );
  const projectBoundariesAccess = roles.some(
    (item) =>
      item.featureSet.route === "PROJECT_BOUNDARY" &&
      Number(item.accessRightId) !== 1
  );
  const showPressable =
    user?.user?.role?.name === "SuperAdmin" ||
    (isProjectListPresent && projectBoundariesAccess);

  const dispatch = useDispatch();
  return (
    <ProjectStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: Colors.White,
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
        headerShadowVisible: false,
      }}
    >
      <ProjectStack.Screen
        name="ProjectStack"
        component={Projects}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                fontWeight: "500",
                color: Colors.White,
                marginHorizontal: 13,
              }}
            >
              Projects
            </Text>
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <MenuIcon size={30} color={Colors.White} />
            </Pressable>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {showPressable && (
                <Pressable
                  onPress={() => {
                    navigation.navigate("CreateNewProject");
                    dispatch(selectProjectAction(null));
                  }}
                  style={{
                    backgroundColor: Colors.Purple,
                    padding: 5,
                    borderRadius: 12,
                    paddingHorizontal: 10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <PlusIcon size={20} color={Colors.White} />
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 11,
                        color: Colors.White,
                      }}
                    >
                      New Project
                    </Text>
                  </View>
                </Pressable>
              )}
              <Pressable
                style={{ marginLeft: 8 }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 7 }}
                />
              </Pressable>
              <Pressable
                style={{
                  marginLeft: 0,
                  height: 30,
                  width: 30,
                  backgroundColor: Colors.Purple,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // onPress={() => navigation.navigate("Profile")}
              >
                <NotificationIcon size={22} color={Colors.White} />
              </Pressable>
            </View>
          ),
        }}
      />
      <ProjectStack.Screen
        name="CreateNewProject"
        component={CreateNewProject}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
              }}
            >
              {project ? "Update Project" : "Create New Project"}
            </Text>
          ),
          headerRight: () => (
            <Pressable
              style={{ marginLeft: 10 }}
              onPress={() => navigation.navigate("Profile")}
            >
              <Image
                source={require("../assets/icons/ProfileButton.png")}
                style={{ height: 30, width: 30, marginRight: 16 }}
              />
            </Pressable>
          ),
        }}
      />
      <ProjectStack.Screen
        name="ProjectDetails"
        component={ProjectDetails}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
              }}
            >
              Project Details
            </Text>
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* <Pressable
                onPress={() => {
                  navigation.navigate("CreateNewProject");
                }}
                style={{
                  backgroundColor: Colors.Purple,
                  padding: 5,
                  borderRadius: 14,
                  paddingHorizontal: 10,
                  height: 28,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <EditIcon size={15} color={Colors.White} />
                  <Text
                    style={{
                      fontFamily: "Lexend-Medium",
                      fontSize: 12,
                      color: Colors.White,
                      marginLeft: 5,
                    }}
                  >
                    Edit
                  </Text>
                </View>
              </Pressable> */}
              <Pressable
                style={{ marginLeft: 8 }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 7 }}
                />
              </Pressable>
            </View>
          ),
        }}
      />
    </ProjectStack.Navigator>
  );
};

const ProfileNavigator = ({ navigation }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerTintColor: Colors.White,
      headerStyle: {
        backgroundColor: Colors.Primary,
      },
    }}
  >
    <ProfileStack.Screen
      name="ProfileStack"
      component={Profile}
      options={{
        headerBackVisible: false,
        headerTitle: () => (
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Lexend-Medium",
              color: Colors.White,
              marginHorizontal: 13,
            }}
          >
            Profile
          </Text>
        ),
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <MenuIcon size={30} color={Colors.White} />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable
            style={{
              marginLeft: 0,
              height: 30,
              width: 30,
              backgroundColor: Colors.Purple,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <NotificationIcon size={22} color={Colors.White} />
          </Pressable>
        ),
      }}
    />
  </ProfileStack.Navigator>
);

const UserNavigator = ({ navigation }) => (
  <UserStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerShadowVisible: false,
      headerTintColor: Colors.White,
      headerStyle: {
        backgroundColor: Colors.Primary,
      },
    }}
  >
    <UserStack.Screen
      name="UserStack"
      component={Users}
      options={{
        headerBackVisible: false,
        headerTitle: () => (
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Lexend-Medium",
              color: Colors.White,
              marginHorizontal: 13,
            }}
          >
            Users
          </Text>
        ),
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <MenuIcon size={30} color={Colors.White} />
          </Pressable>
        ),
        headerRight: () => (
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("CreateNewUser");
              }}
              style={{
                backgroundColor: Colors.Purple,
                padding: 5,
                borderRadius: 12,
                paddingHorizontal: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <PlusIcon size={20} color={Colors.White} />
                <Text
                  style={{
                    fontFamily: "Lexend-Medium",
                    fontSize: 11,
                    color: Colors.White,
                  }}
                >
                  USER
                </Text>
              </View>
            </Pressable>
            <Pressable
              style={{ marginLeft: 10 }}
              onPress={() => navigation.navigate("Profile")}
            >
              <Image
                source={require("../assets/icons/ProfileButton.png")}
                style={{ height: 30, width: 30, marginRight: 8 }}
              />
            </Pressable>
            <Pressable
              style={{
                marginLeft: 0,
                height: 30,
                width: 30,
                backgroundColor: Colors.Purple,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
              // onPress={() => navigation.navigate("Profile")}
            >
              <NotificationIcon size={22} color={Colors.White} />
            </Pressable>
          </View>
        ),
      }}
    />
    <UserStack.Screen
      name="CreateNewUser"
      component={CreateNewUser}
      options={{
        headerTitle: () => (
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Lexend-Medium",
              color: Colors.White,
            }}
          >
            Create User
          </Text>
        ),
      }}
    />
    <UserStack.Screen
      name="EditUser"
      component={EditUser}
      options={{
        headerTitle: () => (
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Lexend-Medium",
              color: Colors.White,
            }}
          >
            Update User
          </Text>
        ),
      }}
    />
  </UserStack.Navigator>
);

const FieldNotesNavigator = ({ navigation }) => {
  const { selectedNote } = useSelector(fieldNoteReducer);
  const dispatch = useDispatch();
  return (
    <FieldNotesStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: Colors.White,
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
      }}
    >
      <FieldNotesStack.Screen
        name="FieldNotesStack"
        component={FieldNotes}
        options={{
          headerBackVisible: false,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
                marginHorizontal: 13,
              }}
            >
              Field Notes
            </Text>
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <MenuIcon size={30} color={Colors.White} />
            </Pressable>
          ),
          headerRight: () => (
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Pressable
                onPress={() => {
                  navigation.navigate("CreateFieldNotes");
                  dispatch(editFieldNoteAction(null));
                }}
                style={{
                  backgroundColor: Colors.Purple,
                  padding: 5,
                  borderRadius: 12,
                  paddingHorizontal: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <PlusIcon size={20} color={Colors.White} />
                  <Text
                    style={{
                      fontFamily: "Lexend-Medium",
                      fontSize: 11,
                      color: Colors.White,
                    }}
                  >
                    New Note
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 8 }}
                />
              </Pressable>
              <Pressable
                style={{
                  marginLeft: 0,
                  height: 30,
                  width: 30,
                  backgroundColor: Colors.Purple,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // onPress={() => navigation.navigate("Profile")}
              >
                <NotificationIcon size={22} color={Colors.White} />
              </Pressable>
            </View>
          ),
        }}
      />
      <FieldNotesStack.Screen
        name="CreateFieldNotes"
        component={CreateFieldNotes}
        options={{
          headerShown: false,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
              }}
            >
              {selectedNote ? "Update Field Note" : "Create Field Note"}
            </Text>
          ),
        }}
      />
    </FieldNotesStack.Navigator>
  );
};

const ProductivityNavigator = ({ navigation }) => {
  return (
    <ProductivityStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: Colors.White,
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
      }}
    >
      <ProductivityStack.Screen
        name="ProductivityStack"
        component={Productivity}
        options={{
          headerBackVisible: false,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
                marginHorizontal: 13,
              }}
            >
              Productivity
            </Text>
          ),
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <MenuIcon size={30} color={Colors.White} />
            </Pressable>
          ),
          headerRight: () => (
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Pressable
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 8 }}
                />
              </Pressable>
              <Pressable
                style={{
                  marginLeft: 0,
                  height: 30,
                  width: 30,
                  backgroundColor: Colors.Purple,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // onPress={() => navigation.navigate("Profile")}
              >
                <NotificationIcon size={22} color={Colors.White} />
              </Pressable>
            </View>
          ),
        }}
      />
      <ProductivityStack.Screen
        name="VerifyProgress"
        component={VerifyBoq}
        options={{
          // headerBackVisible: false,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
                // marginHorizontal: 13,
              }}
            >
              Verify Progress
            </Text>
          ),
          headerTitleAlign: "left",
          // headerLeft: () => (
          //   <Pressable onPress={() => navigation.goBack()}>
          //     <MenuIcon size={30} color={Colors.White} />
          //   </Pressable>
          // ),
          headerRight: () => (
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Pressable
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 8 }}
                />
              </Pressable>
              <Pressable
                style={{
                  marginLeft: 0,
                  height: 30,
                  width: 30,
                  backgroundColor: Colors.Purple,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // onPress={() => navigation.navigate("Profile")}
              >
                <NotificationIcon size={22} color={Colors.White} />
              </Pressable>
            </View>
          ),
        }}
      />
      <ProductivityStack.Screen
        name="ViewBoq"
        component={ViewBoq}
        options={{
          // headerBackVisible: false,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
                // marginHorizontal: 13,
              }}
            >
              BOQ List
            </Text>
          ),
          headerTitleAlign: "left",
          // headerLeft: () => (
          //   <Pressable onPress={() => navigation.goBack()}>
          //     <MenuIcon size={30} color={Colors.White} />
          //   </Pressable>
          // ),
          headerRight: () => (
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Pressable
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 8 }}
                />
              </Pressable>
              <Pressable
                style={{
                  marginLeft: 0,
                  height: 30,
                  width: 30,
                  backgroundColor: Colors.Purple,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                // onPress={() => navigation.navigate("Profile")}
              >
                <NotificationIcon size={22} color={Colors.White} />
              </Pressable>
            </View>
          ),
        }}
      />
      <ProductivityStack.Screen
        name="UpdateBoq"
        component={UpdateBoq}
        options={{
          // headerBackVisible: false,
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontFamily: "Lexend-Medium",
                color: Colors.White,
                // marginHorizontal: 13,
              }}
            >
              Update BOQ List
            </Text>
          ),
          headerTitleAlign: "left",
          // headerLeft: () => (
          //   <Pressable onPress={() => navigation.goBack()}>
          //     <MenuIcon size={30} color={Colors.White} />
          //   </Pressable>
          // ),
          headerRight: () => (
            <View
              style={{ flexDirection: "row", justifyContent: "space-evenly" }}
            >
              <Pressable
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={require("../assets/icons/ProfileButton.png")}
                  style={{ height: 30, width: 30, marginRight: 8 }}
                />
              </Pressable>
              <Pressable
                style={{
                  marginLeft: 0,
                  height: 30,
                  width: 30,
                  backgroundColor: Colors.Purple,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NotificationIcon size={22} color={Colors.White} />
              </Pressable>
            </View>
          ),
        }}
      />
    </ProductivityStack.Navigator>
  );
};

function MainNavigation({ navigation }) {
  const { user, setUser } = useAuth();
  const roles = user?.user?.role?.roleFeatureSets;
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (!userData) {
        return;
      }
      console.log("TOKEN--->>>", {
        token: JSON.parse(userData).token,
      });
      console.log("USER--->>>", user);
      setUser(JSON.parse(userData));
    };
    getUser();
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
    },
  };

  // Array of expected names
  const expectedNames = [
    "Attendance List",
    "Attendance Detail",
    "Communication ",
    "Profile",
  ];

  // Function to check if only the expected names are present
  function hasOnlyExpectedNames(data) {
    const actualNames = data.map((item) => item.featureSet.name);

    // Check if all expected names are present
    const areAllExpectedNamesPresent = expectedNames.every((name) =>
      actualNames.includes(name)
    );

    // Check if there are no extra names
    const hasNoExtraNames = actualNames.every((name) =>
      expectedNames.includes(name)
    );

    return areAllExpectedNamesPresent && hasNoExtraNames;
  }

  // Check if only the expected names are present
  const result = roles && hasOnlyExpectedNames(roles);

  return (
    <>
      <NavigationContainer theme={MyTheme} ref={navigationRef}>
        {!user?.isAuthenticated ? (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerBackTitleVisible: false,
              headerShadowVisible: false,
              headerTintColor: Colors.White,
              headerStyle: {
                backgroundColor: Colors.Primary,
              },
            }}
          >
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShadowVisible: false,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Password"
              component={Password}
              options={{
                headerShadowVisible: false,
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShadowVisible: false,
                headerShown: true,
              }}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{
                headerShadowVisible: false,
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                headerShadowVisible: false,
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        ) : (
          <>
            {result ? (
              <Stack.Navigator
                initialRouteName="AttendanceNavigator"
                screenOptions={{
                  headerBackTitleVisible: false,
                  headerTitle: "",
                  headerTintColor: Colors.Primary,
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name="AttendanceNavigator"
                  component={AttendanceTabDrawer}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            ) : (
              <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{
                  headerBackTitleVisible: false,
                  headerTitle: "",
                  headerTintColor: Colors.Primary,
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name="Main"
                  component={TabDrawer}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Workers"
                  component={WorkersNavigator}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Profile"
                  component={ProfileNavigator}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Users"
                  component={UserNavigator}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="FieldNotes"
                  component={FieldNotesNavigator}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Productivity"
                  component={ProductivityNavigator}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Navigator>
            )}
          </>
        )}
      </NavigationContainer>
    </>
  );
}

function TabDrawer() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.Primary }}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: "slide",
          overlayColor: "transparent",
          drawerStyle: {
            flex: 1,
            width: "65%",
            backgroundColor: "transparent",
          },
          sceneContainerStyle: { backgroundColor: "transparent" },
          // headerShown: true,
        }}
        drawerContent={(props) => {
          return <CustomDrawer {...props} />;
        }}
      >
        {/* <Drawer.Screen name="DrawerTab">
          {(props) => <Dashboard {...props} />}
        </Drawer.Screen> */}
        <Drawer.Screen
          name="DrawerTab"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </View>
  );
}
function AttendanceTabDrawer() {
  return (
    <View style={{ flex: 1, backgroundColor: Colors.Primary }}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: "slide",
          overlayColor: "transparent",
          drawerStyle: {
            flex: 1,
            width: "65%",
            backgroundColor: "transparent",
          },
          sceneContainerStyle: { backgroundColor: "transparent" },
          // headerShown: true,
        }}
        drawerContent={(props) => {
          return <AttendanceDrawer {...props} />;
        }}
      >
        <Drawer.Screen
          name="AttendanceDrawerTab"
          component={AttendanceOnlyNavigator}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </View>
  );
}

function TabNavigator({ navigation }) {
  const { user } = useAuth();
  const tabBarStyle = {
    height: Platform.OS === "ios" ? 80 : 55,
  };
  const status = useDrawerStatus();
  const isOpened = status === "open";
  const style = useAnimatedStyle(
    () => ({
      transform: [{ scale: withTiming(isOpened ? 0.85 : 1) }],
    }),
    [isOpened]
  );
  const roles = user?.user?.role?.roleFeatureSets;

  const isDashboardPresent = roles.some(
    (item) => item?.featureSet?.name === "Dashboard"
  );
  return (
    <Animated.View style={[style, { flex: 1 }]}>
      <Tab.Navigator
        initialRouteName={isDashboardPresent ? "Dashboard" : "Attendance"}
        screenOptions={{
          // headerShown: true,
          headerStyle: {
            backgroundColor: Colors.Primary,
          },
          headerShadowVisible: false,
        }}
      >
        <Tab.Screen
          name="Projects"
          component={ProjectNavigator}
          options={{
            headerShadowVisible: false,
            tabBarStyle,
            tabBarIcon: ({ size, focused }) => (
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                }}
                source={
                  focused
                    ? require("../assets/icons/ProjectActive.png")
                    : require("../assets/icons/ProjectInactive.png")
                }
              />
            ),
            tabBarActiveTintColor: Colors.Primary,
            headerShown: false,
            tabBarLabelStyle: {
              fontFamily: "Lexend-Medium",
              marginBottom: 5,
            },
          }}
        />
        <Tab.Screen
          name="Jobs"
          component={JobsNavigator}
          options={{
            headerShadowVisible: false,
            tabBarStyle,
            tabBarIcon: ({ size, focused }) => (
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                }}
                source={
                  focused
                    ? require("../assets/icons/JobsActive.png")
                    : require("../assets/icons/Jobs.png")
                }
              />
            ),
            tabBarActiveTintColor: Colors.Primary,
            headerShown: false,
            tabBarLabelStyle: {
              fontFamily: "Lexend-Medium",
              marginBottom: 5,
            },
          }}
        />

        <Tab.Screen
          name="Dashboard"
          options={{
            headerShadowVisible: false,
            tabBarStyle,
            tabBarIcon: ({ size, focused }) => (
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                }}
                source={
                  focused
                    ? require("../assets/icons/DashboardActive.png")
                    : require("../assets/icons/Dashboard.png")
                }
              />
            ),
            tabBarActiveTintColor: Colors.Primary,
            headerShown: true,
            tabBarLabelStyle: {
              fontFamily: "Lexend-Medium",
              marginBottom: 5,
            },
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.openDrawer()}
                style={{
                  padding: 10,
                  marginLeft: 10,
                }}
              >
                <MenuIcon size={30} color={Colors.White} />
              </Pressable>
            ),
            headerTitle: () => (
              <Image
                source={Logo}
                style={{
                  width: 110,
                  height: 22,
                  resizeMode: "contain",
                  // right: 0,
                }}
              />
            ),
            headerRight: () => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* <Pressable>
									<Image
										source={require("../assets/icons/Search.png")}
										style={{ height: 30, width: 30, marginRight: 10 }}
									/>
								</Pressable> */}
                <Pressable onPress={() => navigation.navigate("Profile")}>
                  <Image
                    source={require("../assets/icons/ProfileButton.png")}
                    style={{ height: 30, width: 30, marginRight: 8 }}
                  />
                </Pressable>
                <Pressable
                  style={{
                    marginLeft: 0,
                    height: 30,
                    width: 30,
                    backgroundColor: Colors.Purple,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 15,
                  }}
                  // onPress={() => navigation.navigate("Profile")}
                >
                  <NotificationIcon size={22} color={Colors.White} />
                </Pressable>
              </View>
            ),
          }}
          component={Dashboard}
        />
        <Tab.Screen
          name="Attendance"
          component={AttendanceNavigator}
          options={{
            headerShadowVisible: false,
            tabBarStyle,
            tabBarIcon: ({ size, focused }) => (
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                }}
                source={
                  focused
                    ? require("../assets/icons/AttendanceActive.png")
                    : require("../assets/icons/Attendance.png")
                }
              />
            ),
            tabBarActiveTintColor: Colors.Black,
            headerShown: false,
            tabBarLabelStyle: {
              fontFamily: "Lexend-Medium",
              marginBottom: 5,
            },
          }}
        />
        <Tab.Screen
          name="Payments"
          component={PaymentNavigator}
          options={{
            headerShadowVisible: false,
            tabBarStyle,
            tabBarIcon: ({ size, focused }) => (
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                }}
                source={
                  focused
                    ? require("../assets/icons/PaymentsActive.png")
                    : require("../assets/icons/Payments.png")
                }
              />
            ),
            tabBarActiveTintColor: Colors.Black,
            headerShown: false,
            tabBarLabelStyle: {
              fontFamily: "Lexend-Medium",
              marginBottom: 5,
            },
          }}
        />
      </Tab.Navigator>
    </Animated.View>
  );
}

export default MainNavigation;
