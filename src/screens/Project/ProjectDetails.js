import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  LogBox,
} from "react-native";
import { ScrollView } from "react-native";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { Building } from "../../icons";
import { assetsUrl } from "../../utils/api_constants";
import { useProject } from "../../context/projectContext";
LogBox.ignoreAllLogs();

const ProjectDetails = ({}) => {
  const [location, setLocation] = useState(null);
  const { selectedProject } = useProject();

  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${selectedProject?.latitude}&lon=${selectedProject?.longitude}`
  )
    .then((response) => response.json())
    .then((data) => setLocation(data.display_name))
    .catch((error) => console.error(error));

  return (
    <ScrollView>
      <View style={styles.header} />
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
              source={{ uri: assetsUrl + selectedProject?.url }}
              imageStyle={{ borderRadius: 10 }}
              style={{
                // marginHorizontal: 20,
                // padding: 10,
                width: "100%",
                height: 280,
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
                    <Text style={styles.modalText}>Project</Text>
                    <Text style={styles.modalHeading}>
                      {selectedProject?.name}
                    </Text>
                  </View>
                  <Building size={20} color={Colors.White} />
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
                borderBottomWidth: 2,
                borderBottomColor: Colors.WhiteGray,
                padding: 10,
              }}
            >
              <Text style={[styles.modalText, { color: Colors.Gray }]}>
                PROJECT TYPE
              </Text>
              <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                {selectedProject?.projectTypeId}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: Colors.WhiteGray,
                padding: 10,
              }}
            >
              <Text style={[styles.modalText, { color: Colors.Gray }]}>
                Required Workers
              </Text>

              <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                {selectedProject?.requiredWorkers}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: Colors.WhiteGray,
                padding: 10,
              }}
            >
              <Text style={[styles.modalText, { color: Colors.Gray }]}>
                Active Workers
              </Text>
              <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                {selectedProject?.activeWorkers}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: Colors.WhiteGray,
                padding: 10,
              }}
            >
              <Text style={[styles.modalText, { color: Colors.Gray }]}>
                Project Area In SQFTS
              </Text>
              <Text style={[styles.modalHeading, { color: Colors.Black }]}>
                {selectedProject?.projectArea}
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
                {location}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "Lexend-Medium",
                  fontSize: 12,
                  color: Colors.Gray,
                  padding: 10,
                }}
              >
                VIEW BUDGET
              </Text>
              <FlatList
                data={selectedProject?.scopeOfWorks}
                keyExtractor={(item) => item.scopeOfWorkId}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                      width: "100%",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 12,
                        color: Colors.Gray,
                        width: "15%",
                      }}
                    >
                      {item.scopeOfWorkId}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 12,
                        color: Colors.Gray,
                        width: "45%",
                      }}
                    >
                      {item.scopeOfWorkName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 12,
                        color: Colors.Gray,
                        width: "20%",
                      }}
                    >
                      ₹ {item.costPerSqFeet}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 12,
                        color: Colors.Gray,
                        width: "20%",
                      }}
                    >
                      ₹ {item.costPerSqFeet * selectedProject?.projectArea}
                    </Text>
                  </View>
                )}
                ListHeaderComponent={() => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                      width: "100%",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 12,
                        color: Colors.Black,
                        width: "15%",
                        textAlign: "left",
                      }}
                    >
                      SR #.
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 12,
                        color: Colors.Black,
                        width: "45%",
                      }}
                    >
                      SOW
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 12,
                        color: Colors.Black,
                        width: "20%",
                      }}
                    >
                      COST SQFT
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 12,
                        color: Colors.Black,
                        width: "20%",
                      }}
                    >
                      AMOUNT
                    </Text>
                  </View>
                )}
                ListFooterComponent={() => (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 10,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        width: "15%",
                      }}
                    />

                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 14,
                        color: Colors.Black,
                        width: "45%",
                      }}
                    >
                      TOTAL
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 14,
                        color: Colors.Black,
                        width: "20%",
                      }}
                    >
                      ₹{" "}
                      {selectedProject?.scopeOfWorks
                        ?.reduce(
                          (accumulator, currentValue) =>
                            accumulator + currentValue.costPerSqFeet,
                          0
                        )
                        .toLocaleString()}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 14,
                        color: Colors.Black,
                        width: "20%",
                      }}
                    >
                      ₹{" "}
                      {selectedProject?.scopeOfWorks
                        ?.reduce(
                          (accumulator, currentValue) =>
                            accumulator +
                            currentValue.costPerSqFeet *
                              selectedProject?.projectArea,
                          0
                        )
                        .toLocaleString()}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ProjectDetails;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    // alignItems: "center",
  },
  header: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // backgroundColor: Colors.Primary,
    // height: "28%",
    // width: "100%",
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
    // paddingHorizontal: 20,
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
    // justifyContent: "space-between",
    // alignItems: "center",
    // height: "8%",
    // backgroundColor: Colors.White,
    // marginTop: -180,
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
    // flexDirection: "row",
    // justifyContent: "space-between",
    // paddingHorizontal: 20,
    // paddingTop: 20,
  },
  graphBottomText: {
    // fontSize: 10,
    // fontFamily: "Lexend-Regular",
    // color: Colors.Black,
  },
  graphBottomTextBold: {
    // fontSize: 32,
    // fontFamily: "Lexend-Bold",
    // color: Colors.Secondary,
    // paddingLeft: 10,
  },
  graphBottomTabs: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
    // backgroundColor: Colors.WhiteGray,
    // borderRadius: 8,
    // padding: 12,
  },
  item: {
    // padding: 10,
    // marginVertical: 8,
    // marginHorizontal: 15,
    // backgroundColor: Colors.White,
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
    // paddingTop: Platform.OS === "android" ? 0 : 50,
    backgroundColor: Colors.White,
    // bottom: 0,
    // shadowColor: "#000",
    width: "90%",
    // height: "95%",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    // marginTop: -170,
    // width: '100%',
    alignItems: "center",
    marginVertical: 20,
  },
  modalText: {
    fontFamily: "Lexend-Medium",
    fontSize: 11,
    color: Colors.FormBorder,
    textTransform: "uppercase",
  },
  modalHeading: {
    fontFamily: "Lexend-Medium",
    fontSize: 14,
    color: Colors.White,
  },
});
