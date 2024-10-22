import React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  LogBox,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { User } from "../../icons";
import { assetsUrl } from "../../utils/api_constants";
import { useWorker } from "../../context/workerContext";
LogBox.ignoreAllLogs();

const WorkerDetails = ({}) => {
  const { selectedWorker } = useWorker();
  const profilePic = selectedWorker?.workerDocuments?.filter(
    (ele) => ele?.documentId === "ProfilePicture"
  );
  const aadharCard = selectedWorker?.workerDocuments?.filter(
    (ele) => ele?.documentId === "IdentityCard"
  );

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.graph} />
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={styles.modalView}>
            <View style={{ width: "95%", margin: 10, borderRadius: 30 }}>
              <ImageBackground
                source={{
                  uri: assetsUrl + profilePic[0]?.url,
                  // uri: "https://images.pexels.com/photos/2880871/pexels-photo-2880871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                }}
                imageStyle={{ borderRadius: 10 }}
                style={{
                  // marginHorizontal: 20,
                  // padding: 10,
                  width: "100%",
                  height: 300,
                  resizeMode: "contain",
                  // alignItems: "center",
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
                      <Text style={styles.modalText}>Name</Text>
                      <Text style={styles.modalHeading}>
                        {selectedWorker?.fullName}
                      </Text>
                    </View>
                    <View>
                      <User size={30} color={Colors.White} />
                    </View>
                  </View>
                  <Spacer bottom={10} />
                </View>
              </ImageBackground>
            </View>
            <View
              style={{
                padding: 10,
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.WhiteGray,
                  padding: 10,
                }}
              >
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.WhiteGray,
                    padding: 10,
                  }}
                >
                  <Text style={[styles.modalText, { color: Colors.Gray }]}>
                    Skill Level
                  </Text>
                  <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                    {selectedWorker?.workerSkills[0]?.skillTypeId}
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
                    Skill Set
                  </Text>
                  <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                    {selectedWorker?.workerSkills[0]?.skill?.name}
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
                    Phone Number
                  </Text>
                  <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                    {selectedWorker?.phoneNumber}
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
                    Bank Name
                  </Text>
                  <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                    {selectedWorker?.bankName}
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
                    Bank Account Number
                  </Text>
                  <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                    {selectedWorker?.bankAccountNumber}
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
                    IFC Code
                  </Text>
                  <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                    {selectedWorker?.ifscCode}
                  </Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.WhiteGray,
                    padding: 10,
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "70%" }}>
                    <Text style={[styles.modalText, { color: Colors.Gray }]}>
                      Work History
                    </Text>
                    <Text
                      style={[styles.modalHeading, { color: Colors.Black }]}
                    >
                      {`${selectedWorker?.workerJobs?.length} Jobs`}
                    </Text>
                  </View>
                  <View style={{ width: "20%" }}>
                    <TouchableOpacity
                      onPress={() => {}}
                      style={{
                        backgroundColor: "#ECE5FC",
                        padding: 5,
                        margin: 5,
                        borderRadius: 3,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.smallButton}>View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.WhiteGray,
                    padding: 10,
                    width: "100%",
                    // flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "space-between",
                    paddingBottom: 70,
                  }}
                >
                  <Image
                    source={{ uri: assetsUrl + aadharCard[0]?.url }}
                    style={{ width: 300, height: 150 }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default WorkerDetails;

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
    // flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "2%",
    // backgroundColor: Colors.White,
    marginTop: -200,
    // padding: 10,
    // margin: 15,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    // elevation: 4,
    // borderRadius: 10,
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
    fontFamily: "Lexend-Bold",
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
    fontSize: 20,
    color: Colors.Black,
  },
  modalView: {
    paddingTop: Platform.OS === "android" ? 0 : 50,
    backgroundColor: Colors.White,
    bottom: 0,
    shadowColor: "#000",
    width: "90%",
    height: "98%",
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
