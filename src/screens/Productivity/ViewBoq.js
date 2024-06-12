import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  LogBox,
  Pressable,
  RefreshControl,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Appearance,
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import Modal from "react-native-modal";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { Searchbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAttendanceAction,
  attendanceListReducer,
  saveProjectDataAction,
  selectAttendanceAction,
  loadingAttendance,
  removeMusterData,
} from "../../redux/slices/attendanceSlice";
import {
  projectsListSimpleReducer,
  getAllProjectsSimpleAction,
} from "../../redux/slices/projectSlice";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
import {
  Building,
  Search,
  BackIcon,
  Cross,
  EditIcon,
  DeleteIcon,
  TickIcon,
  Tick,
  Picture,
  DateIcon,
  ClockIcon,
  VectorIcon,
} from "../../icons";
import { authToken } from "../../redux/slices/authSlice";
import {
  getSkillsAction,
  skillsListReducer,
} from "../../redux/slices/workerSlice";
import { Dropdown } from "react-native-element-dropdown";
import {
  getLabourContactorAction,
  getUsersAction,
  labourContractorReducer,
  usersListReducer,
} from "../../redux/slices/userSlice";
import {
  assignContractorFieldNote,
  createFieldNoteEntry,
  deleteFieldNote,
  editFieldNoteAction,
  fieldNoteReducer,
  getFieldNoteList,
  //   getScopeList,
  markFieldNoteAction,
} from "../../redux/slices/fieldNoteSlice";
import { Image } from "react-native";
import { assetsUrl } from "../../utils/api_constants";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
// import Toast from "react-native-toast-message";
import {
  approveBOQMeasurementReason,
  getBOQListGC,
  getListOfBOQ,
  getListOfBOQV2,
  getScopeList,
  productivityReducer,
  rejectBOQProgress,
  verifyBOQProgress,
} from "../../redux/slices/productivitySlice";
import Toast from "react-native-toast-message";
import { launchImageLibrary } from "react-native-image-picker";
import DatePicker from "react-native-date-picker";

LogBox.ignoreAllLogs();

const ViewBoq = ({ navigation }) => {
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataNoteSource, setFilteredDataNoteSource] = useState([]);
  const [searchNotes, setSearchNotes] = useState("");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openSearchUserModal, setOpenSearchUserModal] = useState(false);
  const [contractor, setContractor] = useState(null);
  const [currFieldNote, setCurrFieldNote] = useState(null);
  const [boqList, setBoqList] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const [innerActiveSections, setInnerActiveSections] = useState([]);

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(null);
  const [openTime, setOpenTime] = useState(false);
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === "dark";
  const textColor = isDarkMode ? "white" : "black";

  const dispatch = useDispatch();

  const { fieldNoteList } = useSelector(fieldNoteReducer);
  const projectsListSimple = useSelector(projectsListSimpleReducer);
  const token = useSelector(authToken);
  const labourContractorList = useSelector(labourContractorReducer);
  const { scopeList, boqListGC, loading, boqListGCViewMode } =
    useSelector(productivityReducer);
  // console.log("boqListGC", boqListGCViewMode);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllProjectsSimpleAction(token));
      dispatch(
        getLabourContactorAction(token, projectsListSimple[0]?.projectId)
      );
      setSelectedProject(projectsListSimple[0]);
      dispatch(getListOfBOQ(token, projectsListSimple[0]?.projectId));
      dispatch(getListOfBOQV2(token, projectsListSimple[0]?.projectId));

      return () => {};
    }, [])
  );

  useEffect(() => {
    // const calculateBoqGrandTotal = () => {
    //   setCalculations((prev) => ({
    //     amount: { value: 0, inProcess: true },
    //     percentage: { value: 0, inProcess: true },
    //   }));
    //   const totalActualAmount = getGrandTotalAmount(boqListGCViewMode);
    //   setCalculations((prev) => ({
    //     ...prev,
    //     amount: { value: totalActualAmount, inProcess: false },
    //   }));
    //   const totalPercentage = getGrandTotalPercentage(boqListGCViewMode);
    //   setCalculations((prev) => ({
    //     ...prev,
    //     percentage: { value: totalPercentage, inProcess: false },
    //   }));
    // };
    if (boqListGCViewMode?.length > 0) {
      setBoqList(
        boqListGCViewMode.map((item) => ({ ...item, showMore: false }))
      );
      // GrandTotal();
    }
  }, [boqListGCViewMode]);
  useEffect(() => {
    setFilteredDataSource(projectsListSimple);
    setMasterDataSource(projectsListSimple);
  }, [projectsListSimple]);

  useEffect(() => {
    setFilteredDataNoteSource(fieldNoteList);
  }, [fieldNoteList]);

  const searchFieldNotesFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const filteredData = fieldNoteList.filter((item) =>
        item?.description?.toLowerCase().includes(text)
      );
      setFilteredDataNoteSource(filteredData);
      setSearchNotes(text);
    } else {
      setFilteredDataNoteSource(fieldNoteList);
      setSearchNotes(text);
    }
  };
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

  const renderSearchModal = () => {
    return (
      <Modal
        isVisible={openSearchUserModal}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenSearchModal(!openSearchUserModal)}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "88%",
              backgroundColor: Colors.White,
              // height: 200,
              borderRadius: 10,
              padding: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Lexend-Medium",
                    color: Colors.Black,
                    fontSize: 16,
                    // marginBottom: 10,
                  }}
                >
                  Search
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Cross
                  onPress={() => {
                    setOpenSearchUserModal(!openSearchUserModal);
                  }}
                  size={22}
                  color={Colors.Black}
                />
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Searchbar
                style={{
                  backgroundColor: Colors.WhiteGray,
                  borderRadius: 4,
                  borderWidth: 1,
                  width: "100%",
                  marginTop: 10,
                  borderColor: Colors.LightGray,
                }}
                placeholder="Search"
                placeholderTextColor={Colors.FormText}
                mode="bar"
                icon={() => <Search size={20} color={Colors.Black} />}
                clearIcon={() => <Cross size={20} color={Colors.FormText} />}
                onChangeText={(text) => searchFieldNotesFunction(text)}
                value={searchNotes}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderAssignContractorModal = () => {
    return (
      <Modal
        isVisible={openAssignModal}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenAssignModal(!openAssignModal)}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "88%",
              backgroundColor: Colors.White,
              height: 450,
              borderRadius: 10,
              padding: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Lexend-Medium",
                    color: Colors.Black,
                    fontSize: 16,
                    // marginBottom: 10,
                  }}
                >
                  Assign Contractor
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                <Cross
                  onPress={() => {
                    setOpenAssignModal(!openAssignModal);
                  }}
                  size={22}
                  color={Colors.Black}
                />
              </View>
            </View>
            <View style={{ marginTop: 15 }}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={{
                  fontFamily: "Lexend-Regular",
                  fontSize: 13,
                  color: Colors.FormText,
                }}
                iconStyle={styles.iconStyle}
                autoScroll={false}
                inputSearchStyle={{ color: Colors.Black }}
                data={
                  labourContractorList?.length
                    ? labourContractorList?.map((ele) => ({
                        label: ele?.fullName,
                        value: ele?.userId,
                      }))
                    : []
                }
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Contractor"}
                value={contractor}
                onChange={async (item) => {
                  setContractor(item.value);
                  let resp = await dispatch(
                    assignContractorFieldNote(
                      token,
                      currFieldNote?.fieldNoteId,
                      item?.value
                    )
                  );
                  if (resp?.status === 200) {
                    dispatch(getFieldNoteList(token));
                    setOpenAssignModal(false);
                    setContractor(null);
                    setSelectedProject(null);
                    Toast.show({
                      type: "info",
                      text1: "Contractor assigned",
                      text2: "Contractor assigned successfully.",
                      topOffset: 10,
                      position: "top",
                      visibilityTime: 4000,
                    });
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  // console.log("boqListGC", boqListGC)
  const renderFilterModal = () => {
    return (
      <Modal
        isVisible={openFilterModal}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenFilterModal(!openFilterModal)}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: Colors.White,
              height: "80%",
              borderRadius: 10,
              padding: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Lexend-Medium",
                    color: Colors.Black,
                    fontSize: 16,
                    // marginBottom: 10,
                  }}
                >
                  Filter
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Cross
                  onPress={() => {
                    setOpenFilterModal(!openFilterModal);
                  }}
                  size={22}
                  color={Colors.Black}
                />
                <Pressable
                  onPress={() => {
                    setOpenFilterModal(false);
                    dispatch(getListOfBOQ(token, selectedProject?.projectId));
                    setContractor(null);
                  }}
                  style={{ marginTop: 3 }}
                >
                  <Text
                    style={{
                      fontFamily: "Lexend-Medium",
                      fontSize: 10,
                      color: Colors.Gray,
                    }}
                  >
                    Clear Filter
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <View style={{ marginVertical: 5 }}>
                <Text
                  style={{ fontFamily: "Lexend-Medium", color: Colors.Black }}
                >
                  By Contractor
                </Text>
              </View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={{
                  fontFamily: "Lexend-Regular",
                  fontSize: 13,
                  color: Colors.FormText,
                }}
                iconStyle={styles.iconStyle}
                autoScroll={false}
                inputSearchStyle={{ color: Colors.Black }}
                data={
                  labourContractorList?.length
                    ? labourContractorList?.map((ele) => ({
                        label: ele?.fullName,
                        value: ele?.userId,
                      }))
                    : []
                }
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Contractor"}
                value={contractor}
                onChange={async (item) => {
                  setContractor(item.value);
                  dispatch(
                    getListOfBOQ(token, selectedProject?.projectId, item?.value)
                  );
                  setOpenFilterModal(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  // const Item = ({ item, index }) => (
  //   <View
  //     style={{
  //       width: "100%",
  //       backgroundColor: "white",
  //       flex: 1,
  //       marginBottom: 10,
  //       borderRadius: 10,
  //       padding: 10,
  //       elevation: 5,
  //     }}
  //   >
  //     <View
  //       style={{
  //         width: "100%",
  //         flexDirection: "row",
  //         alignItems: "center",
  //         justifyContent: "space-between",
  //       }}
  //     >
  //       {/* <View style={{ width: "40%" }}> */}
  //       <Text
  //         style={{
  //           fontFamily: "Lexend-Medium",
  //           fontSize: 12,
  //           color: Colors.FormBorder,
  //         }}
  //       >
  //         BOQ ID:{" "}
  //         <Text style={{ color: Colors.Black }}>{item?.boqNumber || "0"}</Text>
  //       </Text>
  //       <Text
  //         style={{
  //           fontFamily: "Lexend-Medium",
  //           fontSize: 12,
  //           color: Colors.FormBorder,
  //         }}
  //       >
  //         Cost Code:{" "}
  //         <Text style={{ color: Colors.Black }}>{item?.boqCode || "0"}</Text>
  //       </Text>
  //       <Text
  //         style={{
  //           fontFamily: "Lexend-Medium",
  //           fontSize: 12,
  //           color: Colors.FormBorder,
  //         }}
  //       >
  //         Work Order:{" "}
  //         <Text style={{ color: Colors.Black }}>
  //           {item?.workOrderNumber || "0"}
  //         </Text>
  //       </Text>
  //       {/* </View> */}
  //     </View>
  //     {/* <View
  //       style={{
  //         flexDirection: "row",
  //         width: "100%",
  //         alignItems: "center",
  //         justifyContent: "space-between",
  //         marginVertical: 10,
  //       }}
  //     >
  //       <View style={{ width: "40%" }}>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-Medium",
  //             fontSize: 18,
  //             color: Colors.Black,
  //           }}
  //           numberOfLines={1}
  //         >
  //           {item?.scopeOfWorkName || "N/A"}
  //         </Text>
  //       </View>
  //       <View style={{ width: "60%" }}>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-Medium",
  //             fontSize: 12,
  //             color: Colors.FormBorder,
  //           }}
  //         >
  //           DESCRIPTION
  //         </Text>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-Medium",
  //             fontSize: 12,
  //             color: Colors.Black,
  //           }}
  //           numberOfLines={1}
  //         >
  //           {item?.description || "N/A"}
  //         </Text>
  //       </View>
  //     </View> */}
  //     <View
  //       style={{
  //         width: "100%",
  //         height: 0.7,
  //         backgroundColor: Colors.Gray,
  //         marginVertical: 10,
  //         // borderWidth: 0.5,
  //       }}
  //     ></View>
  //     <View
  //       style={{
  //         width: "100%",
  //         flexDirection: "row",
  //         alignItems: "center",
  //         justifyContent: "space-between",
  //       }}
  //     >
  //       <View style={{ width: "30%", alignItems: "center" }}>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-SemiBold",
  //             fontSize: 12,
  //             color: Colors.Gray,
  //           }}
  //         >
  //           SOW
  //         </Text>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-Medium",
  //             fontSize: 12,
  //             color: Colors.Black,
  //             marginTop: 5,
  //           }}
  //           numberOfLines={1}
  //         >
  //           {item?.scopeOfWorkName || "N/A"}
  //         </Text>
  //       </View>
  //       <View style={{ width: "35%", alignItems: "center" }}>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-SemiBold",
  //             fontSize: 12,
  //             color: Colors.Gray,
  //           }}
  //         >
  //           DESCRIPTION
  //         </Text>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-Medium",
  //             fontSize: 12,
  //             color: Colors.Black,
  //             marginTop: 5,
  //           }}
  //           numberOfLines={1}
  //         >
  //           {item?.description || "N/A"}
  //         </Text>
  //       </View>
  //       <View style={{ width: "30%", alignItems: "center" }}>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-SemiBold",
  //             fontSize: 12,
  //             color: Colors.Gray,
  //           }}
  //         >
  //           TITLE
  //         </Text>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-Medium",
  //             fontSize: 12,
  //             color: Colors.Black,
  //             marginTop: 5,
  //           }}
  //         >
  //           {item?.title || "N/A"}
  //         </Text>
  //       </View>
  //     </View>
  //     <View
  //       style={{
  //         width: "100%",
  //         flexDirection: "row",
  //         alignItems: "center",
  //         justifyContent: "space-between",
  //         marginVertical: 10,
  //       }}
  //     >
  //       <View style={{ width: "30%", alignItems: "center" }}>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-SemiBold",
  //             fontSize: 12,
  //             color: Colors.Gray,
  //           }}
  //         >
  //           QUALITY
  //         </Text>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-Medium",
  //             fontSize: 12,
  //             color: Colors.Black,
  //             marginTop: 5,
  //           }}
  //         >
  //           {item?.quantity || "N/A"}
  //         </Text>
  //       </View>
  //       <View style={{ width: "35%", alignItems: "center" }}>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-SemiBold",
  //             fontSize: 12,
  //             color: Colors.Gray,
  //           }}
  //         >
  //           UNIT
  //         </Text>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-Medium",
  //             fontSize: 12,
  //             color: Colors.Black,
  //             marginTop: 5,
  //           }}
  //         >
  //           {item?.unitCode || "N/A"}
  //         </Text>
  //       </View>
  //       <View style={{ width: "30%", alignItems: "center" }}>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-SemiBold",
  //             fontSize: 12,
  //             color: Colors.Gray,
  //           }}
  //         >
  //           AMOUNT
  //         </Text>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-Medium",
  //             fontSize: 12,
  //             color: Colors.Black,
  //             marginTop: 5,
  //           }}
  //         >
  //           {item?.amount || "N/A"}
  //         </Text>
  //       </View>
  //     </View>
  //     <View
  //       style={{
  //         width: "100%",
  //         flexDirection: "row",
  //         alignItems: "center",
  //         justifyContent: "space-between",
  //       }}
  //     >
  //       <View style={{ width: "30%", alignItems: "center" }}>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-SemiBold",
  //             fontSize: 12,
  //             color: Colors.Gray,
  //           }}
  //         >
  //           RATE
  //         </Text>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-Medium",
  //             fontSize: 12,
  //             color: Colors.Black,
  //             marginTop: 5,
  //           }}
  //         >
  //           {item?.rate || "N/A"}
  //         </Text>
  //       </View>
  //       <View style={{ width: "35%", alignItems: "center" }}>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-SemiBold",
  //             fontSize: 12,
  //             color: Colors.Gray,
  //             textAlign: "center",
  //           }}
  //         >
  //           QUALITY STATUS
  //         </Text>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-Medium",
  //             fontSize: 12,
  //             color: Colors.Black,
  //             marginTop: 5,
  //           }}
  //         >
  //           {item?.qualityStatus || "N/A"}
  //         </Text>
  //       </View>
  //       <View style={{ width: "30%", alignItems: "center" }}>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-SemiBold",
  //             fontSize: 12,
  //             color: Colors.Gray,
  //           }}
  //         >
  //           MEASUREMENT STATUS
  //         </Text>
  //         <Text
  //           style={{
  //             fontFamily: "Lexend-Medium",
  //             fontSize: 12,
  //             color: Colors.Black,
  //             marginTop: 5,
  //           }}
  //         >
  //           {item?.measurementStatus || "N/A"}
  //         </Text>
  //       </View>
  //     </View>
  //   </View>
  // );
  const SECTIONS = [
    {
      title: "First",
      header: "First Header",
      content: "Lorem ipsum...",
    },
    {
      title: "Second",
      header: "Second Header",
      content: "Lorem ipsum...",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.graph}>
        <Pressable
          onPress={() => {
            setOpenSearchModal(true);
          }}
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
            <Text style={styles.selectText}>Select a Project</Text>
            <Text
              style={[
                styles.selectText,
                { fontFamily: "Lexend-SemiBold", color: Colors.Black },
              ]}
            >
              {selectedProject ? selectedProject?.name : "Select a project"}
            </Text>
          </View>
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() => {
              setOpenFilterModal(true);
            }}
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 3,
              paddingHorizontal: 9,
              paddingVertical: 7,
            }}
          >
            <Text style={styles.smallButton}>Filter</Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          margin: 10,
          borderRadius: 10,
          width: "93%",
        }}
      >
        {!boqListGC || boqListGC?.length === 0 ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  dispatch(getFieldNoteList(token));
                }}
                tintColor={Colors.Primary}
                colors={[Colors.Purple, Colors.Primary]}
              />
            }
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Lexend-Medium",
                fontSize: 18,
                color: Colors.Gray,
              }}
            >
              No Record Found!
            </Text>
          </ScrollView>
        ) : (
          <View style={{ width: "100%" }}>
            <ScrollView>
              <Accordion
                sections={boqListGCViewMode}
                activeSections={activeSections}
                renderHeader={(item) => (
                  <View style={styles.firstAccordionHeader}>
                    <View style={styles.firstLayer}>
                      <View style={{ width: "10%" }}>
                        <Text
                          style={{
                            fontFamily: "Lexend-Medium",
                            fontSize: 12,
                            color: Colors.Black,
                          }}
                        >
                          {item.scopeOfWorkId}
                        </Text>
                      </View>
                      <View style={{ width: "80%" }}>
                        <Text
                          style={{
                            fontFamily: "Lexend-Medium",
                            fontSize: 12,
                            color: Colors.Black,
                          }}
                        >
                          {item.scopeOfWorkName}
                        </Text>
                      </View>
                      <VectorIcon
                        type="Entypo"
                        name={"chevron-down"}
                        color={Colors.Black}
                        size={20}
                      />
                    </View>
                  </View>
                )}
                renderContent={(section) => (
                  <View>
                    <Accordion
                      sections={section?.boQs}
                      activeSections={innerActiveSections}
                      renderHeader={(item) => (
                        <View style={styles.firstAccordionHeader}>
                          <View style={styles.firstLayer}>
                            <View style={{ width: "80%" }}>
                              <Text
                                style={{
                                  fontFamily: "Lexend-Medium",
                                  fontSize: 12,
                                  color: Colors.Black,
                                }}
                              >
                                {`WORKORDER # ${item.workOrder}`}
                              </Text>
                            </View>
                            <VectorIcon
                              type="Entypo"
                              name={"chevron-down"}
                              color={Colors.Black}
                              size={20}
                            />
                          </View>
                        </View>
                      )}
                      renderContent={(item) =>
                        item?.titles?.map((subItem, index) => {
                          // return the JSX you want for each item here
                          // for example:
                          return (
                            <View
                              style={{
                                width: "100%",
                                backgroundColor: "white",
                                flex: 1,
                                marginBottom: 10,
                                borderRadius: 10,
                                padding: 10,
                                elevation: 5,
                              }}
                            >
                              <View
                                style={{
                                  width: "100%",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                {/* <View style={{ width: "40%" }}> */}
                                <Text
                                  style={{
                                    fontFamily: "Lexend-Medium",
                                    fontSize: 12,
                                    color: Colors.FormBorder,
                                  }}
                                >
                                  BOQ ID:{" "}
                                  <Text style={{ color: Colors.Black }}>
                                    {/* {item?.boqNumber || "0"} */}
                                  </Text>
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Lexend-Medium",
                                    fontSize: 12,
                                    color: Colors.FormBorder,
                                  }}
                                >
                                  Cost Code:{" "}
                                  <Text style={{ color: Colors.Black }}>
                                    {subItem?.title || "0"}
                                  </Text>
                                </Text>
                                <Text
                                  style={{
                                    fontFamily: "Lexend-Medium",
                                    fontSize: 12,
                                    color: Colors.FormBorder,
                                  }}
                                >
                                  Work Order:{" "}
                                  <Text style={{ color: Colors.Black }}>
                                    {/* {item?.workOrderNumber || "0"} */}
                                  </Text>
                                </Text>
                                {/* </View> */}
                              </View>
                              <View
                                style={{
                                  width: "100%",
                                  height: 0.7,
                                  backgroundColor: Colors.Gray,
                                  marginVertical: 10,
                                  // borderWidth: 0.5,
                                }}
                              ></View>
                              <View
                                style={{
                                  width: "100%",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <View
                                  style={{ width: "30%", alignItems: "center" }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-SemiBold",
                                      fontSize: 12,
                                      color: Colors.Gray,
                                    }}
                                  >
                                    SOW
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-Medium",
                                      fontSize: 12,
                                      color: Colors.Black,
                                      marginTop: 5,
                                    }}
                                    numberOfLines={1}
                                  >
                                    {"N/A"}
                                  </Text>
                                </View>
                                <View
                                  style={{ width: "35%", alignItems: "center" }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-SemiBold",
                                      fontSize: 12,
                                      color: Colors.Gray,
                                    }}
                                  >
                                    DESCRIPTION
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-Medium",
                                      fontSize: 12,
                                      color: Colors.Black,
                                      marginTop: 5,
                                    }}
                                    numberOfLines={1}
                                  >
                                    {"N/A"}
                                  </Text>
                                </View>
                                <View
                                  style={{ width: "30%", alignItems: "center" }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-SemiBold",
                                      fontSize: 12,
                                      color: Colors.Gray,
                                    }}
                                  >
                                    TITLE
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-Medium",
                                      fontSize: 12,
                                      color: Colors.Black,
                                      marginTop: 5,
                                    }}
                                  >
                                    {"N/A"}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  width: "100%",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginVertical: 10,
                                }}
                              >
                                <View
                                  style={{ width: "30%", alignItems: "center" }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-SemiBold",
                                      fontSize: 12,
                                      color: Colors.Gray,
                                    }}
                                  >
                                    QUALITY
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-Medium",
                                      fontSize: 12,
                                      color: Colors.Black,
                                      marginTop: 5,
                                    }}
                                  >
                                    {"N/A"}
                                  </Text>
                                </View>
                                <View
                                  style={{ width: "35%", alignItems: "center" }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-SemiBold",
                                      fontSize: 12,
                                      color: Colors.Gray,
                                    }}
                                  >
                                    UNIT
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-Medium",
                                      fontSize: 12,
                                      color: Colors.Black,
                                      marginTop: 5,
                                    }}
                                  >
                                    {"N/A"}
                                  </Text>
                                </View>
                                <View
                                  style={{ width: "30%", alignItems: "center" }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-SemiBold",
                                      fontSize: 12,
                                      color: Colors.Gray,
                                    }}
                                  >
                                    AMOUNT
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-Medium",
                                      fontSize: 12,
                                      color: Colors.Black,
                                      marginTop: 5,
                                    }}
                                  >
                                    {"N/A"}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  width: "100%",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <View
                                  style={{ width: "30%", alignItems: "center" }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-SemiBold",
                                      fontSize: 12,
                                      color: Colors.Gray,
                                    }}
                                  >
                                    RATE
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-Medium",
                                      fontSize: 12,
                                      color: Colors.Black,
                                      marginTop: 5,
                                    }}
                                  >
                                    {item?.rate || "N/A"}
                                  </Text>
                                </View>
                                <View
                                  style={{ width: "35%", alignItems: "center" }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-SemiBold",
                                      fontSize: 12,
                                      color: Colors.Gray,
                                      textAlign: "center",
                                    }}
                                  >
                                    QUALITY STATUS
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-Medium",
                                      fontSize: 12,
                                      color: Colors.Black,
                                      marginTop: 5,
                                    }}
                                  >
                                    {"N/A"}
                                  </Text>
                                </View>
                                <View
                                  style={{ width: "30%", alignItems: "center" }}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-SemiBold",
                                      fontSize: 12,
                                      color: Colors.Gray,
                                    }}
                                  >
                                    MEASUREMENT STATUS
                                  </Text>
                                  <Text
                                    style={{
                                      fontFamily: "Lexend-Medium",
                                      fontSize: 12,
                                      color: Colors.Black,
                                      marginTop: 5,
                                    }}
                                  >
                                    {"N/A"}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          );
                        })
                      }
                      onChange={(activeSection) => {
                        setInnerActiveSections(activeSection);
                      }}
                    />
                  </View>
                )}
                onChange={(activeSection) => {
                  setActiveSections(activeSection);
                }}
              />
            </ScrollView>
            {/* <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => {
                    dispatch(
                      getListOfBOQ(token, projectsListSimple[0]?.projectId)
                    );
                    setSelectedProject(projectsListSimple[0]);
                  }}
                  tintColor={Colors.Primary}
                  colors={[Colors.Purple, Colors.Primary]}
                />
              }
              data={boqListGC}
              renderItem={({ item, index }) => (
                <CollapableItem item={item} index={index} />
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            /> */}
          </View>
        )}
      </View>
      <Modal
        isVisible={openSearchModal}
        useNativeDriver={true}
        backdropColor={Colors.WhiteGray}
        backdropOpacity={1}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenSearchModal(false)}
      >
        <View style={{ width: "100%", flex: 1 }}>
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
                    dispatch(getListOfBOQV2(token, item?.projectId));
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: "Lexend-Regular",
                      color: Colors.Black,
                    }}
                  >
                    {item.name}
                  </Text>
                </Pressable>
              )}
              keyExtractor={(item) => item.projectId}
              //   extraData={filteredDataSource.length}
            />
          </View>
        </View>
      </Modal>
      {renderFilterModal()}
      {renderSearchModal()}
      {/* {renderAssignContractorModal()} */}
      <DatePicker
        modal
        mode="date"
        textColor={textColor}
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <DatePicker
        modal
        mode="time"
        textColor={textColor}
        open={openTime}
        date={date}
        onConfirm={(date) => {
          setOpenTime(false);
          setTime(date);
        }}
        onCancel={() => {
          setOpenTime(false);
        }}
      />
    </View>
  );
};

export default ViewBoq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    alignItems: "center",
  },
  header: {
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
    width: "93%",
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
    paddingHorizontal: 5,
    // backgroundColor: Colors.White,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    width: "100%",
    // height: 40
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
    fontFamily: "Lexend-SemiBold",
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
    fontSize: 10,
    color: Colors.ListItemText,
    textAlign: "center",
  },
  flatListTextHeader: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.ListHeaderText,
    textAlign: "center",
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Lexend-Regular",
    color: Colors.FormText,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "Lexend-Medium",
    color: Colors.Black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  dropdown: {
    // height: 40,
    maxHeight: 120,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    elevation: 4,
    backgroundColor: Colors.White,
  },
  titleNote: {
    fontFamily: "Lexend-Medium",
    fontSize: 11,
    color: Colors.FormText,
    textTransform: "uppercase",
  },
  button: {
    backgroundColor: Colors.Primary,
    // padding: 15,
    borderRadius: 4,
    marginTop: 15,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Lexend-Regular",
    fontSize: 14,
    textAlign: "center",
    color: "white",
  },
  firstAccordionHeader: {
    width: "100%",
    backgroundColor: Colors.White,
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  firstLayer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
  },
});
