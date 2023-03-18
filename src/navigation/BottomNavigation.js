// import "react-native-gesture-handler";

// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createDrawerNavigator } from "@react-navigation/drawer";

// import Attendance from "../screens/Attendance";
// import Payments from "../screens/Payments";
// import Dashboard from "../screens/Dashboard";
// import Projects from "../screens/Projects";
// import Profile from "../screens/Profile";
// import Jobs from "../screens/Jobs";
// import Workers from "../screens/Workers";
// import Users from "../screens/Users";
// import NewProject from "../screens/NewProject";
// import Menu from "../assets/icons/Menu.png";
// import { Image, Pressable, StyleSheet } from "react-native";
// import { Colors } from "../utils/Colors";
// import Logo from "../assets/images/logo.png";
// import CustomDrawer from "./CustomDrawer";

// const attendance = "Attendance";
// const payments = "Payments";
// const dashboard = "Dashboard";
// const projects = "Projects";
// const profile = "Profile";
// const jobs = "Jobs";
// const workers = "Workers";
// const users = "Users";
// const newProject = "NewProject";
// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

// const TabNavigator = ({ navigation }) => {
//   return (
//     <Tab.Navigator
//       initialRouteName={dashboard}
//       screenOptions={{
//         headerShown: true,
//         headerStyle: {
//           backgroundColor: Colors.Primary,
//         },
//         headerShadowVisible: false,
//         headerLeft: () => (
//           <Pressable onPress={() => navigation.openDrawer()}>
//             <Image
//               source={Menu}
//               style={{ height: 20, width: 20, marginLeft: 20 }}
//             />
//           </Pressable>
//         ),
//       }}
//     >
//       <Tab.Screen name={payments} component={Payments} />
//       <Tab.Screen name={projects} component={Projects} />
//       <Tab.Screen
//         name={dashboard}
//         component={Dashboard}
//         options={{
//           headerTitle: () => (
//             <Image
//               source={Logo}
//               style={{
//                 width: 150,
//                 height: 25,
//                 resizeMode: "contain",
//                 // right: 0,
//               }}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen name={attendance} component={Attendance} />
//       <Tab.Screen name={workers} component={Workers} />
//     </Tab.Navigator>
//   );
// };
// const BottomNavigation = () => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         drawerStyle: styles.drawerStyles,
//         drawerType: "front",
//         swipeEdgeWidth: Platform.OS === "android" && 180,
//         headerShown: false,
//       }}
//       drawerContent={(props) => <CustomDrawer {...props} />}
//       //   screenOptions={{ headerShown: false }}
//     >
//       <Drawer.Screen name="DrawerTab" component={TabNavigator} />
//       {/* <Drawer.Screen name="Article" component={Article} /> */}
//     </Drawer.Navigator>
//   );
// };
// const styles = StyleSheet.create({
// 	drawerStyles: {
// 	  width: 260,
// 	//   backgroundColor: 'transparent',
// 	},
// 	safeArea: {
// 	  flex: 1,
// 	  backgroundColor: 'white'
// 	},
//   })
// export default BottomNavigation;
