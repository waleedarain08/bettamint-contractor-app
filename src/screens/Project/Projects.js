import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
  Modal,
  LogBox,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
// import BarChart from "../assets/images/barchart.png";
// import LineChart from "../assets/images/linechart.png";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
LogBox.ignoreAllLogs();
import { Building, Search, LocationIcon } from "../../icons";
const DATA = [
  {
    id: "1",
    title: "Ram Parshad Twin Towers",
    num: "175",
    image:
      "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    stat: "Daily Stats*",
    worker: "247",
    type: "Residential",
    days: "30",
    supervisor: "Laxmi",
    location:
      "V.Nagar, Tisaiyanvilai, Tirunelveli Natak vin 5703, New Dehli, India",
  },
  {
    id: "2",
    title: "Ram Parshad Twin Towers",
    num: "175",
    image:
      "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    stat: "Daily Stats*",
    worker: "247",
    type: "Residential",
    days: "30",
    supervisor: "Laxmi",
    location:
      "V.Nagar, Tisaiyanvilai, Tirunelveli Natak vin 5703, New Dehli, India",
  },
  {
    id: "3",
    title: "Ram Parshad Twin Towers",
    num: "175",
    image:
      "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    stat: "Daily Stats*",
    worker: "200",
    type: "Residential",
    days: "30",
    supervisor: "Laxmi",
    location:
      "V.Nagar, Tisaiyanvilai, Tirunelveli Natak vin 5703, New Dehli, India",
  },
  {
    id: "4",
    title: "Ram Parshad Twin Towers",
    num: "175",
    image:
      "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    stat: "Daily Stats*",
    worker: "456",
    type: "Residential",
    days: "30",
    supervisor: "Laxmi",
    location:
      "V.Nagar, Tisaiyanvilai, Tirunelveli Natak vin 5703, New Dehli, India",
  },
];

const Projects = ({ navigation }) => {
  const [details, setDetails] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const Item = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => {
        navigation.navigate("ProjectDetails");
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
      >
        <View style={{ width: "30%" }}>
          <ImageBackground
            source={{ uri: item.image }}
            imageStyle={{ borderRadius: 5 }}
            style={{
              width: 100,
              height: 100,
              resizeMode: "contain",
              alignItems: "center",
            }}
          >
            <Text
              style={[
                styles.heading,
                { fontSize: 12, bottom: 0, position: "absolute" },
              ]}
            >
              {item.type}
            </Text>
          </ImageBackground>
        </View>
        <Spacer left={10} />
        <View style={{ width: "65%" }}>
          <Text style={styles.title}>{item.title}</Text>
          {/* <Spacer bottom={10} /> */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <LocationIcon size={22} color={Colors.LightGray} />
            <Text style={styles.num}>{item.location}</Text>
          </View>
          <Spacer bottom={10} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRightColor: Colors.LightGray,
                // borderRightWidth: 0.5,
                // paddingRight: 10,
                // borderStyle: "",
              }}
            >
              <Text style={styles.workerHeading}>Required{"\n"}Workers:</Text>
              <Text style={styles.workerNumber}>{item.worker}</Text>
            </View>
            <View
              style={{
                height: 26,
                marginTop: 2,
                width: 0.6,
                backgroundColor: Colors.LightGray,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.workerHeading}>Active{"\n"}Workers:</Text>
              <Text style={styles.workerNumber}>{item.worker}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.graph}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#F7F8F9",
              borderRadius: 50,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Building size={20} color={Colors.LightGray} />
          </View>
          <View>
            <Text style={styles.selectText}>Link a Project</Text>
            <Text
              style={[
                styles.selectText,
                { fontFamily: "Lexend-SemiBold", color: Colors.Black },
              ]}
            >
              Select a Project to link
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 3,
              paddingHorizontal: 9,
              paddingVertical: 7,
            }}
          >
            <Text style={styles.smallButton}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 3,
              paddingHorizontal: 7,
            }}
          >
            <Search size={13} color={Colors.Secondary} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.linkText}>
        Please type a Project Name here to link*
      </Text>
      <ScrollView>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <View style={styles.modalView}>
            <ImageBackground
              source={{ uri: details?.image }}
              style={{
                margin: 10,
                width: 330,
                height: 330,
                resizeMode: "contain",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  margin: 10,
                }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text style={styles.modalText}>Project</Text>
                    <Text style={styles.modalHeading}>{details?.title}</Text>
                  </View>
                  <Building size={20} color={Colors.White} />
                </View>
                <Spacer bottom={10} />
              </View>
            </ImageBackground>
            <View style={{ padding: 20 }}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.WhiteGray,
                  padding: 10,
                }}
              >
                <Text style={[styles.modalText, { color: Colors.Gray }]}>
                  PROJECT TYPE
                </Text>
                <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                  {details?.type}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.WhiteGray,
                  padding: 10,
                }}
              >
                <Text style={[styles.modalText, { color: Colors.Gray }]}>
                  Required Workers
                </Text>

                <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                  {details?.days}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.WhiteGray,
                  padding: 10,
                }}
              >
                <Text style={[styles.modalText, { color: Colors.Gray }]}>
                  Active Workers
                </Text>
                <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                  {details?.days}
                </Text>
              </View>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.WhiteGray,
                  padding: 10,
                }}
              >
                <Text style={[styles.modalText, { color: Colors.Gray }]}>
                  LOCATION
                </Text>
                <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                  {details?.location}
                </Text>
              </View>

              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default Projects;

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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: "10%",
    backgroundColor: Colors.White,
    marginTop: -170,
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
    fontFamily: "Lexend-SemiBold",
    fontSize: 16,
    color: Colors.Black,
  },
  num: {
    fontFamily: "Lexend-Medium",
    fontSize: 12,
    color: Colors.LightGray,
  },
  stat: {
    fontFamily: "Lexend-Medium",
    fontSize: 6,
    textAlign: "right",
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
    fontSize: 10,
    color: Colors.LightGray,
    paddingRight: 10,
  },
  workerNumber: {
    fontFamily: "Lexend-Medium",
    fontSize: 22,
    color: Colors.Black,
  },
  modalView: {
    paddingTop: Platform.OS === "android" ? 0 : 50,
    backgroundColor: Colors.White,
    bottom: 0,
    shadowColor: "#000",
    width: "90%",
    height: "95%",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  modalText: {
    fontFamily: "Lexend-Medium",
    fontSize: 12,
    color: Colors.White,
  },
  modalHeading: {
    fontFamily: "Lexend-Medium",
    fontSize: 16,
    color: Colors.White,
  },
});
