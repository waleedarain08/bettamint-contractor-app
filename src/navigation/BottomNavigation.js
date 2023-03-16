import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Attendance from "../screens/Attendance";
import Payments from "../screens/Payments";
import Dashboard from "../screens/Dashboard";
import Projects from "../screens/Projects";
import Profile from "../screens/Profile";
import Jobs from "../screens/Jobs";
import Workers from "../screens/Workers";
import Users from "../screens/Users";
import NewProject from "../screens/NewProject";
const attendance = "Attendance";
const payments = "Payments";
const dashboard = "Dashboard";
const projects = "Projects";
const profile = "Profile";
const jobs = "Jobs";
const workers = "Workers";
const users = "Users";
const newProject = "NewProject";
const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
	return (
		<Tab.Navigator
			initialRouteName={dashboard}
			screenOptions={{ headerShown: false }}
		>
			<Tab.Screen name={payments} component={Payments} />
			<Tab.Screen name={projects} component={Projects} />
			<Tab.Screen name={dashboard} component={Dashboard} />
			<Tab.Screen name={attendance} component={Attendance} />
			<Tab.Screen name={workers} component={Workers} />
		</Tab.Navigator>
	);
};

export default BottomNavigation;
