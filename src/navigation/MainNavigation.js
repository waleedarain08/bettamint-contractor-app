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
} from "../icons";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const PaymentStack = createNativeStackNavigator();
const AttendanceStack = createNativeStackNavigator();
const WorkerStack = createNativeStackNavigator();
const ProjectStack = createNativeStackNavigator();
const JobStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const UserStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
LogBox.ignoreAllLogs();

const PaymentNavigator = ({ navigation }) => (
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
            Muster Card
          </Text>
        ),
      }}
    />
  </PaymentStack.Navigator>
);

const JobsNavigator = ({ navigation }) => (
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
            <Pressable
              onPress={() => {
                navigation.navigate("CreateNewJob");
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
                  New Job
                </Text>
              </View>
            </Pressable>
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
      }}
    />
  </JobStack.Navigator>
);

const AttendanceNavigator = ({ navigation }) => {
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
                    Muster Roll
                  </Text>
                </View>
              </Pressable>
              <Pressable style={{ marginLeft: 5 }}>
                <Image
                  source={require("../assets/icons/download.png")}
                  style={{ height: 30, width: 30, marginRight: 0 }}
                />
              </Pressable>
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
              Muster Card
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
              Approve Attendance
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

const WorkersNavigator = ({ navigation }) => {
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
                    Worker
                  </Text>
                </View>
              </Pressable>
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
              Add New Worker
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
              <Pressable
                onPress={() => {
                  navigation.navigate("CreateNewWorker");
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
                    Edit
                  </Text>
                </View>
              </Pressable>
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
              <Pressable
                onPress={() => {
                  navigation.navigate("CreateNewProject");
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
              Create New Project
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
              <Pressable
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
              </Pressable>
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
                style={{ height: 30, width: 30, marginRight: 16 }}
              />
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
            Create New User
          </Text>
        ),
      }}
    />
  </UserStack.Navigator>
);

function MainNavigation({}) {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);
  }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
    },
  };

  return (
    <>
      <NavigationContainer
        theme={MyTheme}
        // ref={navigationRef}
      >
        <Stack.Navigator
          initialRouteName="SelectLanguage"
          screenOptions={{
            headerBackTitleVisible: false,
            headerTitle: "",
            headerTintColor: Colors.Primary,
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="SelectLanguage"
            component={SelectLanguage}
            options={{
              headerShadowVisible: false,
              headerShown: false,
            }}
          />
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
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Otp"
            component={Otp}
            options={{
              headerShadowVisible: false,
              headerShown: false,
            }}
          />

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
        </Stack.Navigator>
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

function TabNavigator({ navigation }) {
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

  return (
    <Animated.View style={[style, { flex: 1 }]}>
      <Tab.Navigator
        initialRouteName={"Dashboard"}
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
                <Pressable>
                  <Image
                    source={require("../assets/icons/Search.png")}
                    style={{ height: 30, width: 30, marginRight: 10 }}
                  />
                </Pressable>
                <Pressable onPress={() => navigation.navigate("Profile")}>
                  <Image
                    source={require("../assets/icons/ProfileButton.png")}
                    style={{ height: 30, width: 30, marginRight: 16 }}
                  />
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
