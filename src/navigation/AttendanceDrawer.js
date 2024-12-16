import { Image, Pressable, Share, Text, View } from "react-native";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Colors } from "../utils/Colors";
import { Logout, Right } from "../icons";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, userData } from "../redux/slices/authSlice";
import { getVersion } from "react-native-device-info";
import { emptyAttendanceAction } from "../redux/slices/attendanceSlice";
import { emptyAllProjectsSimpleAction } from "../redux/slices/projectSlice";
import { useAuth } from "../context/authContext";


const AttendanceDrawer = ({ navigation }) => {
  //const userdata = useSelector(userData);
  //const roles = userdata?.user?.role?.roleFeatureSets;
  const {logout} = useAuth();


  // const isDashboardPresent = roles.some(
  //   (item) => item.featureSet.name === "Dashboard"
  // );
  // const isProjectListPresent = roles.some(
  //   (item) => item.featureSet.name === "Project List"
  // );
  // const isJobsListPresent = roles.some(
  //   (item) => item.featureSet.name === "Jobs List"
  // );
  // const isAttendanceListPresent = roles.some(
  //   (item) => item.featureSet.name === "Attendance List"
  // );
  // const isWorkerListPresent = roles.some(
  //   (item) => item.featureSet.name === "Worker List"
  // );
  // const isPaymentListPresent = roles.some(
  //   (item) => item.featureSet.name === "Payment List"
  // );
  // const isUsersListPresent = roles.some(
  //   (item) => item.featureSet.name === "Users List"
  // );

  const dispatch = useDispatch();
  const routes = [
    {
      name: "Attendance",
      route: "AttendanceStack",
      id: 4,
      access: true,
    },
    { name: "My Profile", route: "ProfileAttendance", id: 7, access: true },
    // { name: "Share App", route: "Share", id: 9, access: true },
  ];

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Bettamint",
        message:
          "Please install this app and start getting Workers, AppLink :https://play.google.com/store/apps/details?id=com.bettamint",
        url: "https://play.google.com/store/apps/details?id=com.bettamint",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{ flex: 1, paddingHorizontal: 30 }}>
        <View style={{ marginTop: 40, marginBottom: 50 }}>
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 190, height: 35 }}
          />
        </View>
        {routes
          ?.filter((e) => e.access === true)
          .map((value) => (
            <Pressable
              onPress={() => {
                if (value.route === "Share") {
                  onShare();
                } else {
                  navigation.navigate(value.route);
                }
              }}
              style={{
                marginVertical: 13,
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "90%" }}>
                <Text
                  style={{
                    fontFamily: "Lexend-SemiBold",
                    fontSize: 16,
                    color: Colors.White,
                  }}
                >
                  {value.name}
                </Text>
              </View>
              <View style={{ width: "10%" }}>
                <Right color={Colors.White} size={18} />
              </View>
            </Pressable>
          ))}
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "#F8F8F8",
            marginTop: 20,
          }}
        />
        <View>
          <Pressable
            onPress={() => {
              logout();
              // navigation.navigate("SelectLanguage");
              // dispatch(logoutAction());
              // dispatch(emptyAttendanceAction());
              // dispatch(emptyAllProjectsSimpleAction());
            }}
            style={{
              marginVertical: 35,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "80%" }}>
              <Text
                style={{
                  fontFamily: "Lexend-SemiBold",
                  fontSize: 16,
                  color: Colors.White,
                }}
              >
                LOGOUT
              </Text>
            </View>
            <View style={{ width: "13%" }}>
              <Logout color={Colors.White} size={23} />
            </View>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Lexend-Light",
              color: "#00005",
              opacity: 0.5,
            }}
          >
            App Version: {getVersion()}
          </Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default AttendanceDrawer;
