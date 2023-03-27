import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  Dimensions,
  LogBox,
  Pressable,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
import { Building, Search, TickIcon, Picture } from "../../icons";
import PersonImage from "../../assets/images/personimage.png";
import typeIcon from "../../assets/icons/typeIcon.png";
LogBox.ignoreAllLogs();
const AttendanceMusterCard = ({ navigation }) => {
  // useEffect(() => {
  // 	navigation.getParent()?.setOptions({
  // 		tabBarStyle: {
  // 			display: "none",
  // 		},
  // 	});
  // 	return () =>
  // 		navigation.getParent()?.setOptions({
  // 			tabBarStyle: undefined,
  // 		});
  // }, [navigation]);
  const DATA = [
    {
      date: "01/01/2021",
      attendance: "P1",
      advance: "-",
    },
    {
      date: "01/01/2021",
      attendance: "P1",
      advance: "-",
    },
    {
      date: "01/01/2021",
      attendance: "P1",
      advance: "-",
    },
    {
      date: "01/01/2021",
      attendance: "P1",
      advance: "-",
    },
    {
      date: "01/01/2021",
      attendance: "P1",
      advance: "-",
    },
    {
      date: "01/01/2021",
      attendance: "P1",
      advance: "-",
    },
    {
      date: "01/01/2021",
      attendance: "P1",
      advance: "-",
    },
    {
      date: "01/01/2021",
      attendance: "P1",
      advance: "-",
    },
    {
      date: "01/01/2021",
      attendance: "P1",
      advance: "-",
    },
    {
      date: "01/01/2021",
      attendance: "P1",
      advance: "-",
    },

    {
      date: "01/01/2021",
      attendance: "P1",
      advance: "-",
    },
    {
      date: "01/01/2021",
      attendance: "P1",
      advance: "-",
    },
  ];
  const Item = ({ item, index }) => (
    <Pressable
      style={[styles.item]}
      onPress={() => {
        navigation.navigate("AttendanceMusterCard");
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "20%",
          }}
        >
          <Text style={[styles.flatListText, { textAlign: "left" }]}>
            {item.date}
          </Text>
        </View>
        <View style={{ width: "20%" }}>
          <Text style={styles.flatListText}>{item.attendance}</Text>
        </View>
        <View style={{ width: "15%" }}>
          <Text style={styles.flatListText}>{item.advance}</Text>
        </View>
        <View style={{ width: "15%", alignItems: "center" }}>
          <TickIcon size={20} color={Colors.Primary} />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AttendanceMusterCard");
          }}
          style={{
            backgroundColor: "#ECE5FC",
            padding: 5,
            margin: 5,
            borderRadius: 3,
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.smallButton}>Approve</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
  const ListHeader = () => {
    return (
      <View style={[styles.item]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "20%" }}>
            <Text style={[styles.flatListText, { textAlign: "left" }]}>
              Date
            </Text>
          </View>
          <View style={{ width: "20%" }}>
            <Text style={styles.flatListText}>Attendance</Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text style={styles.flatListText}>Advance</Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text style={styles.flatListText}>Verified</Text>
          </View>
          <View style={{ width: "20%" }}>
            <Text style={styles.flatListText}>Action</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.graph}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            padding: 10,
          }}
        >
          <View style={{ width: "35%" }}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 10 }}
              source={PersonImage}
            />
          </View>

          <View style={{ width: "65%" }}>
            <Text style={styles.title}>Pritam Pandit Tripathi</Text>
            <Text style={styles.typeText}>Electrician</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", padding: 10 }}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 4 }}
            source={typeIcon}
          />
          <Spacer right={10} />
          <View>
            <Text style={[styles.title, { fontSize: 13 }]}>
              Guru Heights Phase-2 Construction
            </Text>
            <Text style={styles.typeText}>Delhi 11 Guru Mandir Road...</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: Colors.White,
            alignItems: "center",
            margin: 10,
            padding: 10,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 4,
          }}
        >
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default AttendanceMusterCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    backgroundColor: Colors.Primary,
    height: "28%",
    width: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontFamily: "Lexend-Medium",
    color: Colors.White,
    marginLeft: 10,
  },
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "100%",
  },
  graph: {
    height: "32%",
    backgroundColor: Colors.White,
    marginTop: -180,
    padding: 10,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderRadius: 10,
  },
  graphBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  graphBottomText: {
    fontSize: 10,
    fontFamily: "Lexend-Regular",
    color: Colors.Black,
  },
  graphBottomTextBold: {
    fontSize: 32,
    fontFamily: "Lexend-Bold",
    color: Colors.Secondary,
    paddingLeft: 10,
  },
  graphBottomTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.WhiteGray,
    borderRadius: 8,
    padding: 12,
  },
  item: {
    padding: 10,
    backgroundColor: Colors.White,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    // borderRadius: 10,
  },
  title: {
    fontFamily: "Lexend-Bold",
    fontSize: 16,
    color: Colors.Black,
  },
  num: {
    fontFamily: "Lexend-Medium",
    fontSize: 12,
    color: Colors.LightGray,
  },
  typeText: {
    fontFamily: "Lexend-Medium",
    fontSize: 12,
    color: Colors.LightGray,
  },

  selectText: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.Gray,
    paddingLeft: 10,
  },
  smallButton: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.Secondary,
  },
  linkText: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.White,
    textAlign: "right",
    marginRight: 15,
  },
  workerHeading: {
    fontFamily: "Lexend-Medium",
    fontSize: 12,
    color: Colors.Gray,
  },
  workerNumber: {
    fontFamily: "Lexend-Medium",
    fontSize: 20,
    color: Colors.Black,
  },
  flatListText: {
    fontFamily: "Lexend-Medium",
    fontSize: 11,
    color: Colors.Black,
    textAlign: "center",
  },
});
