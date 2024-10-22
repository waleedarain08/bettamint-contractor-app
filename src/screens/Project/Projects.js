import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
  Modal,
  LogBox,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { Searchbar } from "react-native-paper";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
import { Building, Search, BackIcon, Cross } from "../../icons";
import { assetsUrl } from "../../utils/api_constants";
import RestrictedScreen from "../../components/RestrictedScreen";
import { useFocusEffect } from "@react-navigation/native";
import { useGeneralContext } from "../../context/generalContext";
import { useAuth } from "../../context/authContext";
import { useProject } from "../../context/projectContext";
LogBox.ignoreAllLogs();

const Projects = ({ navigation }) => {
  const { user } = useAuth();
  const { projects } = useGeneralContext();
  const {
    loading,
    allProjects,
    getAllProjects,
    mappingProjects,
    getMappingProjects,
    setSelectedProject,
    getLabourProjects,
  } = useProject();
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const getData = () => {
    getAllProjects().catch((error) => {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    });
  };

  const getMappingProjectsData = () => {
    getMappingProjects().catch((error) => {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    });
  };

  //! LIFE CYCLE
  useFocusEffect(
    React.useCallback(() => {
      if (user?.user?.leadTypeId === "LabourContractor") {
        getMappingProjectsData();
      } else {
        getData();
      }

      return () => {};
    }, [user])
  );

  useEffect(() => {
    if (user?.user?.leadTypeId === "LabourContractor") {
      setFilteredDataSource(mappingProjects);
      setMasterDataSource(mappingProjects);
    } else {
      setFilteredDataSource(projects);
      setMasterDataSource(projects);
    }
  }, [mappingProjects?.length, projects?.length]);

  const roles = user?.user?.role?.roleFeatureSets;
  const isProjectListPresent = roles.some(
    (item) => item.featureSet.name === "Project List"
  );

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource?.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const Item = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => {
        navigation.navigate("ProjectDetails", { projectId: item?.projectId });
        setSelectedProject(item);
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "100%" }}
      >
        <View style={{ width: "30%" }}>
          <ImageBackground
            source={{ uri: assetsUrl + item?.url }}
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
              {item.projectTypeId}
            </Text>
          </ImageBackground>
        </View>
        <Spacer left={15} />
        <View style={{ width: "65%" }}>
          <Text style={styles.title}>{item.name}</Text>
          {/* <Spacer bottom={10} /> */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
            }}
          >
            <Text style={styles.num}>
              Remaining Days:
              {/* {getProjectsAddress(item?.latitude, item?.longitude)} */}
            </Text>
            <Text
              style={[
                styles.workerNumber,
                { color: Colors.Gray, fontSize: 16, marginLeft: 5 },
              ]}
            >
              {item?.remainingDays}
            </Text>
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
              <Text style={styles.workerNumber}>{item?.requiredWorkers}</Text>
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
              <Text style={styles.workerNumber}>{item?.activeWorkers}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      {isProjectListPresent ? (
        <>
          {user?.user?.leadTypeId === "LabourContractor" ? (
            <View style={styles.graph}>
              <Pressable
                onPress={() => {
                  setOpenSearchModal(true);
                }}
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  width: "70%",
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
                  <Text style={styles.selectText}>Select a Project</Text>
                  <Text
                    style={[
                      styles.selectText,
                      { fontFamily: "Lexend-SemiBold", color: Colors.Black },
                    ]}
                  >
                    {selectedProjectId
                      ? selectedProjectId?.name
                      : mappingProjects
                      ? mappingProjects[0]?.name
                      : "Select a project"}
                  </Text>
                </View>
              </Pressable>
              <View style={{ flexDirection: "row", width: "28%" }}>
                <TouchableOpacity
                  onPress={() => {
                    getLabourProjects(selectedProjectId.projectId)
                      .then(() => {
                        getData();
                      })
                      .catch((error) => {
                        ToastAndroid.show(error.message, ToastAndroid.SHORT);
                      });
                  }}
                  style={{
                    backgroundColor: "#ECE5FC",
                    padding: 5,
                    margin: 5,
                    borderRadius: 3,
                    paddingHorizontal: 9,
                    paddingVertical: 7,
                    //   height: 35,
                    width: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.smallButton}>Submit</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
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
					</TouchableOpacity> */}
              </View>
            </View>
          ) : (
            <View style={styles.graph}>
              <Pressable
                onPress={() => {
                  setOpenSearchModal(true);
                }}
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  alignItems: "center",
                  width: "70%",
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
                  <Text style={styles.selectText}>Select a Project</Text>
                  <Text
                    style={[
                      styles.selectText,
                      { fontFamily: "Lexend-SemiBold", color: Colors.Black },
                    ]}
                  >
                    {selectedProjectId
                      ? selectedProjectId?.name
                      : projects
                      ? projects[0]?.name
                      : "Select a project"}
                  </Text>
                </View>
              </Pressable>
              <View style={{ flexDirection: "row", width: "15%" }}>
                {/* <TouchableOpacity
							style={{
								backgroundColor: "#ECE5FC",
								padding: 5,
								margin: 5,
								borderRadius: 3,
								paddingHorizontal: 9,
								paddingVertical: 7,
								//   height: 35,
								//   width: "80%",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text style={styles.smallButton}>Filter</Text>
						</TouchableOpacity> */}
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
          )}
          <Text style={styles.linkText}>
            Please type a Project Name here to link*
          </Text>
          {/* <ScrollView> */}
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  getData();
                }}
                tintColor={Colors.Primary}
                colors={[Colors.Purple, Colors.Primary]}
              />
            }
            data={allProjects}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
          />
          {/* </ScrollView> */}
          <Modal
            visible={openSearchModal}
            animationType="slide"
            onRequestClose={() => {
              setOpenSearchModal(false);
            }}
            presentationStyle="pageSheet"
          >
            <View style={{ width: "100%" }}>
              <View
                style={{
                  width: "100%",
                  padding: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <View style={{ width: "12%" }}>
                  <BackIcon
                    onPress={() => {
                      setOpenSearchModal(false);
                    }}
                    size={30}
                    color={Colors.Black}
                  />
                </View>
                <View style={{ width: "88%" }}>
                  <Text
                    style={{
                      fontFamily: "Lexend-Medium",
                      fontSize: 18,
                      color: Colors.Black,
                    }}
                  >
                    Search
                  </Text>
                </View>
              </View>
              <View style={{ width: "100%", alignItems: "center" }}>
                <Searchbar
                  style={{
                    backgroundColor: "#F1F5F8",
                    borderRadius: 5,
                    width: "90%",
                  }}
                  placeholder="Search Project"
                  placeholderTextColor={Colors.FormText}
                  mode="bar"
                  icon={() => <Search size={20} color={Colors.Black} />}
                  clearIcon={() => <Cross size={20} color={Colors.FormText} />}
                  onChangeText={(text) => searchFilterFunction(text)}
                  value={search}
                />
              </View>
              <View
                style={{ width: "100%", marginTop: 10, paddingBottom: 280 }}
              >
                <FlatList
                  data={filteredDataSource}
                  renderItem={({ item }) => (
                    <Pressable
                      style={{
                        width: "88%",
                        borderWidth: 1,
                        marginBottom: 5,
                        alignSelf: "center",
                        padding: 10,
                        borderRadius: 7,
                        borderColor: Colors.FormBorder,
                      }}
                      onPress={() => {
                        setSelectedProjectId(item);
                        setOpenSearchModal(false);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: "Lexend-Regular",
                          color: Colors.FormText,
                        }}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  )}
                  keyExtractor={(item) => item.projectId}
                />
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <RestrictedScreen />
      )}
    </View>
  );
};
export default Projects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    alignItems: "center",
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
    opacity: 0.9,
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
    width: "92%",
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
    alignSelf: "flex-end",
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
