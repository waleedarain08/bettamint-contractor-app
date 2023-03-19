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
import Animated, { interpolateNode } from "react-native-reanimated";

import Logo from "../assets/images/logo.png";
import Menu from "../assets/icons/Menu.png";

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
import SelectLanguage from "../screens/Auth/SelectLanguage";
import Dashboard from "../screens/Dashboard/Dashboard";
import Projects from "../screens/Project/Projects";
import CustomDrawer from "./CustomDrawer";
import MainLayout from "../screens/MainLayout";
import CreateNewProject from "../screens/Project/CreateNewProject";
import ProjectDetails from "../screens/Project/ProjectDetails";
import PaymentMusterCard from "../screens/Payments/PaymentMusterCard";
import AttendanceMusterCard from "../screens/Attendance/AttendanceMusterCard";
import Jobs from "../screens/Jobs/Jobs";
import CreateNewJob from "../screens/Jobs/CreateNewJob";
import JobDetails from "../screens/Jobs/JobDetails";
import WorkerDetails from "../screens/Workers/WorkerDetails";
import CreateNewWorker from "../screens/Workers/CreateNewWorker";
import Users from "../screens/Users/Users";
import CreateNewUser from "../screens/Users/CreateNewUser";
// import SplashScreen from 'react-native-splash-screen';

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
            <Image
              source={Menu}
              style={{ height: 20, width: 20, marginLeft: 0 }}
            />
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
            <Image
              source={Menu}
              style={{ height: 20, width: 20, marginLeft: 0 }}
            />
          </Pressable>
        ),
        headerRight: () => (
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
            <View>
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
              <Image
                source={Menu}
                style={{ height: 20, width: 20, marginLeft: 0 }}
              />
            </Pressable>
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
              <Image
                source={Menu}
                style={{ height: 20, width: 20, marginLeft: 0 }}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                navigation.navigate("CreateNewWorker");
              }}
              style={{
                backgroundColor: Colors.Purple,
                padding: 5,
                borderRadius: 12,
                paddingHorizontal: 10,
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
              Create New Worker
            </Text>
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
            <Pressable
              onPress={() => {
                navigation.navigate("CreateNewWorker");
              }}
              style={{
                backgroundColor: Colors.Purple,
                padding: 5,
                borderRadius: 12,
                paddingHorizontal: 10,
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
              <Image
                source={Menu}
                style={{ height: 20, width: 20, marginLeft: 0 }}
              />
            </Pressable>
          ),
          headerRight: () => (
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
              <View>
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
            <Image
              source={Menu}
              style={{ height: 20, width: 20, marginLeft: 0 }}
            />
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
            <Image
              source={Menu}
              style={{ height: 20, width: 20, marginLeft: 0 }}
            />
          </Pressable>
        ),
        headerRight: () => (
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
            <View>
              <Text
                style={{
                  fontFamily: "Lexend-Medium",
                  fontSize: 11,
                  color: Colors.White,
                }}
              >
                User
              </Text>
            </View>
          </Pressable>
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
  //   React.useEffect(() => {
  //     setTimeout(() => {
  //       SplashScreen.hide();
  //     }, 1000);
  //   }, []);

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
  return (
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
          //   tabBarStyle,
          tabBarActiveTintColor: Colors.Primary,
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: "Lexend-Medium",
            marginBottom: 5,
          },
          //   tabBarLabel: t("myWorkScreen.myWork"),
          //   tabBarIcon: ({ size, focused }) => (
          //     <Image
          //       source={require("../Assets/my-work.png")}
          //       style={{
          //         width: 24,
          //         height: 26,
          //         resizeMode: "contain",
          //         tintColor: focused ? Colors.green : Colors.lightGray,
          //       }}
          //     />
          //   ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={JobsNavigator}
        options={{
          headerShadowVisible: false,
          //   tabBarStyle,
          tabBarActiveTintColor: Colors.Primary,
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: "Lexend-Medium",
            marginBottom: 5,
          },
          //   tabBarLabel: t("myWorkScreen.myWork"),
          //   tabBarIcon: ({ size, focused }) => (
          //     <Image
          //       source={require("../Assets/my-work.png")}
          //       style={{
          //         width: 24,
          //         height: 26,
          //         resizeMode: "contain",
          //         tintColor: focused ? Colors.green : Colors.lightGray,
          //       }}
          //     />
          //   ),
        }}
      />

      <Tab.Screen
        name="Dashboard"
        options={{
          headerShadowVisible: false,
          //   tabBarStyle,
          tabBarActiveTintColor: Colors.Primary,
          headerShown: true,
          tabBarLabelStyle: {
            fontFamily: "Lexend-Medium",
            marginBottom: 5,
          },
          headerLeft: () => (
            <Pressable onPress={() => navigation.openDrawer()}>
              <Image
                source={Menu}
                style={{ height: 20, width: 20, marginLeft: 16 }}
              />
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
          //   tabBarLabel: t("myWorkScreen.myWork"),
          //   tabBarIcon: ({ size, focused }) => (
          //     <Image
          //       source={require("../Assets/my-work.png")}
          //       style={{
          //         width: 24,
          //         height: 26,
          //         resizeMode: "contain",
          //         tintColor: focused ? Colors.green : Colors.lightGray,
          //       }}
          //     />
          //   ),
        }}
      >
        {(props) => <Dashboard {...props} />}
      </Tab.Screen>
      {/* <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShadowVisible: false,
            //   tabBarStyle,
            tabBarActiveTintColor: Colors.Primary,
            //   headerShown: false,
            tabBarLabelStyle: {
              fontFamily: "Lexend-Medium",
              marginBottom: 5,
            },
            headerLeft: () => (
              <Pressable onPress={() => navigation.openDrawer()}>
                <Image
                  source={Menu}
                  style={{ height: 20, width: 20, marginLeft: 16 }}
                />
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
            //   tabBarLabel: t("myWorkScreen.myWork"),
            //   tabBarIcon: ({ size, focused }) => (
            //     <Image
            //       source={require("../Assets/my-work.png")}
            //       style={{
            //         width: 24,
            //         height: 26,
            //         resizeMode: "contain",
            //         tintColor: focused ? Colors.green : Colors.lightGray,
            //       }}
            //     />
            //   ),
          }}
        /> */}
      <Tab.Screen
        name="Attendance"
        component={AttendanceNavigator}
        options={{
          headerShadowVisible: false,
          //   tabBarStyle,
          tabBarActiveTintColor: Colors.Black,
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: "Lexend-Medium",
            marginBottom: 5,
          },
          //   tabBarLabel: t("myWorkScreen.myWork"),
          //   tabBarIcon: ({ size, focused }) => (
          //     <Image
          //       source={require("../Assets/my-work.png")}
          //       style={{
          //         width: 24,
          //         height: 26,
          //         resizeMode: "contain",
          //         tintColor: focused ? Colors.green : Colors.lightGray,
          //       }}
          //     />
          //   ),
        }}
      />
      <Tab.Screen
        name="Payments"
        component={PaymentNavigator}
        options={{
          headerShadowVisible: false,
          //   tabBarStyle,
          tabBarActiveTintColor: Colors.Black,
          headerShown: false,
          tabBarLabelStyle: {
            fontFamily: "Lexend-Medium",
            marginBottom: 5,
          },
          //   tabBarLabel: t("myWorkScreen.myWork"),
          //   tabBarIcon: ({ size, focused }) => (
          //     <Image
          //       source={require("../Assets/my-work.png")}
          //       style={{
          //         width: 24,
          //         height: 26,
          //         resizeMode: "contain",
          //         tintColor: focused ? Colors.green : Colors.lightGray,
          //       }}
          //     />
          //   ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainNavigation;
