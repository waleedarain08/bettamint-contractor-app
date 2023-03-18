/* eslint-disable react-native/no-inline-styles */
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
import Logo from "../assets/images/logo.png";
import Menu from "../assets/icons/Menu.png";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "../screens/Profile";
import Payments from "../screens/Payments";
import Attendance from "../screens/Attendance";
import { Colors } from "../utils/Colors";
import Workers from "../screens/Workers";
import Login from "../screens/Login";
import SelectLanguage from "../screens/SelectLanguage";
import Dashboard from "../screens/Dashboard";
import Projects from "../screens/Projects";
import CustomDrawer from "./CustomDrawer";
// import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const PaymentStack = createNativeStackNavigator();
const AttendanceStack = createNativeStackNavigator();
const MyWorkStack = createNativeStackNavigator();
const ProjectStack = createNativeStackNavigator();
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
              fontWeight: "500",
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
        // headerTitle: () => (
        //   // <Text
        //   //   style={{
        //   //     fontSize: 18,
        //   //     fontFamily: 'Lexend-Medium',
        //   //     color: Colors.white,
        //   //   }}>
        //   //   {t('paymentScreen.bettaPay')}
        //   // </Text>
        //   <Image
        //     style={{ width: 80, height: 40, marginTop: 15, marginLeft: 10 }}
        //     source={require("../Assets/bettapayLogo.png")}
        //   />
        // ),
        // headerStyle: {
        //   backgroundColor: Colors.black,
        // },
        // headerLeft: () => (
        //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        //     <Item
        //       title="menu"
        //       iconName={"menu"}
        //       onPress={() => navigation.toggleDrawer("Menu")}
        //     />
        //   </HeaderButtons>
        // ),
        // headerBackground: () => (
        //   <Image
        //     style={{width: 100, height: 50}}
        //     source={require('../Assets/bettapayLogo.png')}
        //   />
        // ),
        // headerRight: () => (
        //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        //     <Item
        //       title="notifications"
        //       iconName={'notifications'}
        //       onPress={() => navigation.navigate('NotificationScreen')}
        //     />
        //   </HeaderButtons>
        // ),
      }}
    />
  </PaymentStack.Navigator>
);

const AttendanceNavigator = ({ navigation }) => {
  //   const { t } = useTranslation();
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
          //   headerTitle: () => (
          //     <Text
          //       style={{
          //         fontSize: 18,
          //         fontFamily: "Lexend-Medium",
          //         fontWeight: "500",
          //         color: Colors.Black,
          //       }}
          //     >
          //       Muster Card
          //       {/* {t('attendanceScreen.attendance')} */}
          //     </Text>
          //   ),
          //   headerLeft: () => (
          //     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          //       <Item
          //         title="menu"
          //         iconName={"menu"}
          //         onPress={() => navigation.toggleDrawer("Menu")}
          //       />
          //     </HeaderButtons>
          //   ),
          // headerRight: () => (
          //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          //     <Item
          //       title="notifications"
          //       iconName={'notifications'}
          //       onPress={() => navigation.navigate('NotificationScreen')}
          //     />
          //   </HeaderButtons>
          // ),
        }}
      />
    </AttendanceStack.Navigator>
  );
};

const WorkersNavigator = ({ navigation }) => {
  return (
    <MyWorkStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: Colors.White,
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
      }}
    >
      <MyWorkStack.Screen
        name="WorkerStack"
        component={Workers}
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
              Workers
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
          //   headerTitle: () => (
          //     <Text
          //       style={{
          //         fontSize: 18,
          //         fontFamily: "Lexend-Medium",
          //         fontWeight: "500",
          //         color: Colors.Black,
          //       }}
          //     >
          //       {t("myWorkScreen.myWork")}
          //     </Text>
          //   ),
          //   headerLeft: () => (
          //     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          //       <Item
          //         title="menu"
          //         iconName={"menu"}
          //         onPress={() => navigation.toggleDrawer("Menu")}
          //       />
          //     </HeaderButtons>
          //   ),
          // headerRight: () => (
          //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          //     <Item
          //       title="notifications"
          //       iconName={'notifications'}
          //       onPress={() => alert('No Notification')}
          //     />
          //   </HeaderButtons>
          // ),
        }}
      />
    </MyWorkStack.Navigator>
  );
};
const ProjectNavigator = ({ navigation }) => {
  //   const { t } = useTranslation();
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
          //   headerLeft: () => (
          //     <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          //       <Item
          //         title="menu"
          //         iconName={"menu"}
          //         onPress={() => navigation.toggleDrawer("Menu")}
          //       />
          //     </HeaderButtons>
          //   ),
          // headerRight: () => (
          //   <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          //     <Item
          //       title="notifications"
          //       iconName={'notifications'}
          //       onPress={() => alert('No Notification')}
          //     />
          //   </HeaderButtons>
          // ),
        }}
      />
    </ProjectStack.Navigator>
  );
};

function MainNavigation({}) {
  //   const { t } = useTranslation();
  //   const authToken = useSelector((state) => state?.auth?.isWorkerLogin);
  //   const dispatch = useDispatch();

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

  //   const linking = {
  //     prefixes: ["bettamint://"],
  //   };

  return (
    <>
      <NavigationContainer
        // linking={linking}
        theme={MyTheme}
        // ref={navigationRef}
      >
        <Stack.Navigator
          initialRouteName="SelectLanguage"
          screenOptions={{
            headerBackTitleVisible: false,
            headerTitle: "",
            headerTintColor: Colors.Primary,
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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

function TabDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: styles.drawerStyles,
        drawerType: "front",
        swipeEdgeWidth: Platform.OS === "android" && 180,
        // headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="DrawerTab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

function TabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName={"Dashboard"}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.Primary,
        },
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="Payments"
        component={PaymentNavigator}
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
      />
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
        name="Workers"
        component={WorkersNavigator}
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

const styles = StyleSheet.create({
  drawerStyles: {
    width: 260,
    //   backgroundColor: 'transparent',
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
});
export default MainNavigation;
