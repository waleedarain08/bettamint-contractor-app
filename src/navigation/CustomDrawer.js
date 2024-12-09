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

const CustomDrawer = ({ navigation }) => {
  const userdata = useSelector(userData);
  const {user, logout} = useAuth();
  const roles = user?.user?.role?.roleFeatureSets;

  const fieldNotesAccess =
    roles &&
    roles.filter((item) => item.featureSet.route === "QUALITY_MANAGEMENT")[0]
      ?.accessRightId !== 1;

  const isDashboardPresent = roles.some(
    (item) => item.featureSet.name === "Dashboard" || item.featureSet.name === "Worker Onboarding"
  );
  const isProjectListPresent = roles.some(
    (item) => item.featureSet.name === "Project List"
  );
  const isJobsListPresent = roles.some(
    (item) => item.featureSet.name === "Jobs List" || item.featureSet.name === "Worker Onboarding"
  );
  const isAttendanceListPresent = roles.some(
    (item) => item.featureSet.name === "Attendance List"
  );
  const isWorkerListPresent = roles.some(
    (item) => item.featureSet.name === "Worker List" || item.featureSet.name === "Worker Onboarding"
  );
  const isPaymentListPresent = roles.some(
    (item) => item.featureSet.name === "Payment List" || item.featureSet.name === "Payroll" || item.featureSet.name === "Payments"
  );
  const isUsersListPresent = roles.some(
    (item) => item.featureSet.name === "Users List"
  );

  const isProductivityPresent = roles.some(
    (item) => item.featureSet.name === "Measurement Submission" || item.featureSet.name === "Quality Management" ||  item.featureSet.name === "Change Management" ||  item.featureSet.name === "Variation Management"|| item.featureSet.name === "Users List"
  );

  const dispatch = useDispatch();
  const routes = [
    {
      name: "Dashboard",
      route: "Dashboard",
      id: 1,
      access: isDashboardPresent,
    },
    { name: "Project", route: "Projects", id: 2, access: isProjectListPresent },
    { name: "Jobs", route: "Jobs", id: 3, access: isJobsListPresent },
    {
      name: "Attendance",
      route: "Attendance",
      id: 4,
      access: isAttendanceListPresent,
    },
    { name: "Workers", route: "Workers", id: 5, access: isWorkerListPresent },
    {
      name: "Payments",
      route: "Payments",
      id: 6,
      access: isPaymentListPresent,
    },
    { name: "User", route: "Users", id: 7, access: isUsersListPresent },
    {
      name: "Field Notes",
      route: "FieldNotes",
      id: 8,
      access: fieldNotesAccess,
    },
    {
      name: "Productivity",
      route: "Productivity",
      id: 9,
      access: isProductivityPresent,
    },
    { name: "My Profile", route: "Profile", id: 10, access: true },
    { name: "Share App", route: "Share", id: 11, access: true },
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
        <View style={{ marginTop: 30, marginBottom: 30 }}>
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
              // dispatch(logoutAction());
              // dispatch(emptyAttendanceAction());
              // dispatch(emptyAllProjectsSimpleAction());
            }}
            style={{
              marginVertical: 25,
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

export default CustomDrawer;
