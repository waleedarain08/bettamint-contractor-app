import { Image, Pressable, Share, Text, View } from "react-native";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Colors } from "../utils/Colors";
import { Logout, Right } from "../icons";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/slices/authSlice";

const CustomDrawer = ({ navigation }) => {
  const dispatch = useDispatch();
  const routes = [
    { name: "Dashboard", route: "Dashboard", id: 1 },
    { name: "Project", route: "Projects", id: 2 },
    { name: "Jobs", route: "Jobs", id: 3 },
    { name: "Attendance", route: "Attendance", id: 4 },
    { name: "Workers", route: "Workers", id: 5 },
    { name: "Payments", route: "Payments", id: 6 },
    { name: "User", route: "Users", id: 7 },
    { name: "My Profile", route: "Profile", id: 7 },
    { name: "Report", route: "Dashboard", id: 8 },
    { name: "Share App", route: "Share", id: 9 },
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
        {routes.map((value) => (
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
              // navigation.navigate("SelectLanguage");
              dispatch(logoutAction());
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
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
