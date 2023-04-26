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
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import BarChart from "../../assets/images/barchart.png";
import LineChart from "../../assets/images/linechart.png";
import { useDrawerProgress } from "@react-navigation/drawer";
import Animated from "react-native-reanimated";
import { countsReducer, getCountsData } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { authToken } from "../../redux/slices/authSlice";

export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
LogBox.ignoreAllLogs();
const DATA = [
  {
    id: "1",
    title: "Total Projects*",
    num: "175",
    image: require("../../assets/images/totalprojects.png"),
    stat: "Daily Stats*",
  },
  {
    id: "2",
    title: "Active Projects*",
    num: "175",
    image: require("../../assets/images/totalworker.png"),
    stat: "Daily Stats*",
  },
  {
    id: "3",
    title: "Total Workers*",
    num: "175",
    image: require("../../assets/images/activeprojects.png"),
    stat: "Daily Stats*",
  },
  {
    id: "4",
    title: "Active Workers*",
    num: "175",
    image: require("../../assets/images/activeworker.png"),
    stat: "Daily Stats*",
  },
];

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={item.image}
        style={{
          width: 25,
          height: 25,
          resizeMode: "contain",
        }}
      />
      <Spacer right={10} />
      <Text style={styles.num}>{item.num}</Text>
    </View>
    <Text style={styles.stat}>{item.stat}</Text>
  </View>
);
const Dashboard = ({ navigation }) => {
  const progress = useDrawerProgress();
  const dispatch = useDispatch();
  const token = useSelector(authToken);
  const counts = useSelector(countsReducer);
  console.log("COUNTS", counts);
  useEffect(() => {
    dispatch(getCountsData(token));
  }, []);
  const scale = Animated.interpolateNode(progress.value, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolateNode(progress.value, {
    inputRange: [0, 1],
    outputRange: [1, 30],
  });

  const animatedStyle = { borderRadius, transform: [{ scale: scale }] };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        width: "100%",
        // ...animatedStyle,
      }}
    >
      <View style={styles.header} />
      <View style={styles.graph}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: 15,
            justifyContent: "center",
          }}
        >
          <Image
            source={BarChart}
            style={{
              height: 190,
              width: "100%",
              resizeMode: "contain",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </View>
        <View style={styles.graphBottom}>
          <View style={styles.graphBottomTabs}>
            <Text style={styles.graphBottomText}>
              Avg Active {"\n"}Workforce{" "}
            </Text>
            <Text style={styles.graphBottomTextBold}>350</Text>
          </View>
          <View style={styles.graphBottomTabs}>
            <Text style={styles.graphBottomText}>Average {"\n"}Workforce</Text>
            <Text
              style={[styles.graphBottomTextBold, { color: Colors.Primary }]}
            >
              350
            </Text>
          </View>
        </View>
      </View>
      <ScrollView>
        {/* <FlatList
          data={DATA}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
        /> */}
        <View
          style={{
            width: "96%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.item}>
            <Text style={styles.title}>{"Total Project"}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/totalprojects.png")}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                }}
              />
              <Spacer right={10} />
              <Text style={styles.num}>{counts?.totalProjects}</Text>
            </View>
            {/* <Text style={styles.stat}>{item.stat}</Text> */}
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>{"Active Project"}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/totalprojects.png")}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                }}
              />
              <Spacer right={10} />
              <Text style={styles.num}>{counts?.activeProjects}</Text>
            </View>
            {/* <Text style={styles.stat}>{item.stat}</Text> */}
          </View>
        </View>
        <View
          style={{
            width: "96%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.item}>
            <Text style={styles.title}>{"Total Workers"}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/totalprojects.png")}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                }}
              />
              <Spacer right={10} />
              <Text style={styles.num}>{counts?.totalWorkers}</Text>
            </View>
            {/* <Text style={styles.stat}>{item.stat}</Text> */}
          </View>
          <View style={styles.item}>
            <Text style={styles.title}>{"Active Workers"}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/totalprojects.png")}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: "contain",
                }}
              />
              <Spacer right={10} />
              <Text style={styles.num}>{counts?.activeWorkers}</Text>
            </View>
            {/* <Text style={styles.stat}>{item.stat}</Text> */}
          </View>
        </View>
        <Spacer bottom={10} />
        <View style={styles.scrollGraph}>
          <Image
            source={LineChart}
            style={{ height: 190, width: 340, resizeMode: "contain" }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: '100%'
  },
  header: {
    backgroundColor: Colors.Primary,
    height: "28%",
    width: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
  },
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "100%",
  },
  graph: {
    height: 320,
    backgroundColor: Colors.White,
    marginTop: -160,
    // position: "absolute",
    // top: 100,
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
    width: "90%",
  },
  graphBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    width: "100%",
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
    width: "45%",
  },
  item: {
    // flex: 1,
    width: '43%',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 15,
    backgroundColor: Colors.White,
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
  title: {
    fontFamily: "Lexend-Bold",
    fontSize: 12,
    color: Colors.LightGray,
  },
  num: {
    fontFamily: "Lexend-Medium",
    fontSize: 26,
    color: Colors.Black,
  },
  stat: {
    fontFamily: "Lexend-Medium",
    fontSize: 6,
    textAlign: "right",
    color: Colors.LightGray,
  },
  scrollGraph: {
    height: 210,
    backgroundColor: Colors.White,
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
    width: "90%",
  },
});
