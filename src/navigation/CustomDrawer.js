import { Image, Pressable, Text, View } from "react-native";
import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Colors } from "../utils/Colors";
import { Logout, Right } from "../icons";
const CustomDrawer = ({ navigation }) => {
  const routes = [
    { name: "Dashboard", route: "Dashboard", id: 1 },
    { name: "Project", route: "Projects", id: 2 },
    { name: "Jobs", route: "Jobs", id: 3 },
    { name: "Attendance", route: "Attendance", id: 4 },
    { name: "Workers", route: "Workers", id: 5 },
    { name: "Payments", route: "Payments", id: 6 },
    { name: "User", route: "Users", id: 7 },
    { name: "My Profile", route: "Profile", id: 7 },
  ];

  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={{ flex: 1, paddingHorizontal: 30 }}>
        <View style={{ marginTop: 60, marginBottom: 60 }}>
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 190, height: 35 }}
          />
        </View>
        {routes.map((value) => (
          <Pressable
            onPress={() => {
              navigation.navigate(value.route);
            }}
            style={{
              marginVertical: 15,
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
            marginTop: 30,
          }}
        />
        <View>
          <Pressable
            onPress={() => {
              navigation.navigate("SelectLanguage");
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
              <Logout color={Colors.White} size={28} />
            </View>
          </Pressable>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
