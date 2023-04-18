import React, { useState, useEffect } from "react";
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
  RefreshControl,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { useSelector, useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { Searchbar } from "react-native-paper";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
import { Building, Search, BackIcon, Cross, TickIcon } from "../../icons";
import {
  getAllProjectsAction,
  projectsListReducer,
  projectsListSimpleReducer,
  getAllProjectsSimpleAction,
  loadingProject,
  selectProjectAction,
} from "../../redux/slices/projectSlice";
import { GOOGLE_API_KEY, assetsUrl } from "../../utils/api_constants";
import { authToken, userData } from "../../redux/slices/authSlice";
LogBox.ignoreAllLogs();

const Projects = ({ navigation }) => {
  const [details, setDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState("");
  const token = useSelector(authToken);
  //! INSTANCES
  const dispatch = useDispatch();

  //! SELECTORS
  const projectsList = useSelector(projectsListReducer);
  const projectsListSimple = useSelector(projectsListSimpleReducer);
  const isLoading = useSelector(loadingProject);

  //! LIFE CYCLE
  useEffect(() => {
    dispatch(getAllProjectsAction(token));
  }, []);

  useEffect(() => {
    dispatch(getAllProjectsSimpleAction(token));
  }, []);

  const onValueChange = (value) => {
    setSelectedProject(value);
  };
  useEffect(() => {
    setFilteredDataSource(projectsListSimple);
    setMasterDataSource(projectsListSimple);
  }, [projectsListSimple]);
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const Item = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => {
        navigation.navigate("ProjectDetails", { projectId: item?.projectId });
        // console.log(item);
        dispatch(selectProjectAction(item));
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
        <Spacer left={10} />
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
      <View
        style={styles.graph}
		>
        <Pressable
		  onPress={() => {
			setOpenSearchModal(true);
		  }}
          style={{
            flexDirection: "row",
            // justifyContent: "space-between",
            alignItems: "center",
			width: '70%'
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
              {selectedProject
                ? selectedProject?.name
                : projectsListSimple
                ? projectsListSimple[0]?.name
                : "Select a project"}
            </Text>
          </View>
        </Pressable>
        <View style={{ flexDirection: "row", width: "28%" }}>
          <TouchableOpacity
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
      {/* <ScrollView> */}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              dispatch(getAllProjectsAction(token));
            }}
            tintColor={Colors.Primary}
            colors={[Colors.Purple, Colors.Primary]}
          />
        }
        data={projectsList}
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
          <View style={{ width: "100%", marginTop: 10, paddingBottom: 280 }}>
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
                    setSelectedProject(item);
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
