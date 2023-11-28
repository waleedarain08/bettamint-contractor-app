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
} from "react-native";
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
  getBOQListGC,
  getScopeList,
  productivityReducer,
  verifyBOQProgress,
} from "../../redux/slices/productivitySlice";
import Toast from "react-native-toast-message";

LogBox.ignoreAllLogs();

const GCProductivity = ({ navigation }) => {
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataNoteSource, setFilteredDataNoteSource] = useState([]);
  const [searchNotes, setSearchNotes] = useState("");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openActionModal, setOpenActionModal] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openSearchUserModal, setOpenSearchUserModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [contractor, setContractor] = useState(null);
  const [scope, setScope] = useState(null);
  const [currFieldNote, setCurrFieldNote] = useState(null);
  const [currBoq, setCurrBoq] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const dispatch = useDispatch();

  const { fieldNoteList } = useSelector(fieldNoteReducer);
  const projectsListSimple = useSelector(projectsListSimpleReducer);
  const token = useSelector(authToken);
  const labourContractorList = useSelector(labourContractorReducer);
  const { scopeList, boqListGC, loading } = useSelector(productivityReducer);
  const [scopeFilter, setScopeFilter] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getSkillsAction(token));
      dispatch(getUsersAction(token));
      dispatch(getAllProjectsSimpleAction(token));
      dispatch(selectAttendanceAction(null));
      dispatch(removeMusterData());
      dispatch(getFieldNoteList(token));
      dispatch(getScopeList(token));
      dispatch(
        getLabourContactorAction(token, projectsListSimple[0]?.projectId)
      );
      setSelectedProject(projectsListSimple[0]);
      dispatch(getBOQListGC(token, projectsListSimple[0]?.projectId));

      return () => {};
    }, [])
  );

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
  const renderActionModal = () => {
    return (
      <Modal
        isVisible={openActionModal}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenActionModal(!openActionModal)}
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
              height: 300,
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
                  Approve Quality
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                <Cross
                  onPress={() => {
                    setOpenActionModal(!openActionModal);
                  }}
                  size={22}
                  color={Colors.Black}
                />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              <TextInput
                style={styles.dropdown}
                placeholder="Remarks"
                placeholderTextColor={Colors.LightGray}
                multiline={true}
                value={remarks}
                onChangeText={(text) => setRemarks(text)}
                editable={currBoq?.status === "Approved" ? false : true}
              />
              <View style={{ marginTop: 20 }}>
                {currBoq?.status === "Approved" ? (
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        color: Colors.Black,
                        fontSize: 16,
                        marginRight: 10,
                      }}
                    >
                      Approved
                    </Text>
                    <Tick size={25} color={Colors.Primary} />
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={async () => {
                      if (remarks === null) {
                        return Toast.show({
                          type: "info",
                          text1: "Info",
                          text2: "Please add remarks before verification!",
                          topOffset: 10,
                          position: "top",
                          visibilityTime: 4000,
                        });
                      } else {
                        const obj = {
                          remarks,
                          boqProgressId: currBoq?.contractorBOQProgressId,
                          status: "Approved",
                        };
                        let resp = await dispatch(
                          verifyBOQProgress(token, obj)
                        );
                        if (resp.status === 200) {
                          dispatch(
                            getBOQListGC(
                              token,
                              selectedProject?.projectId
                              // LabourContractor?.userId
                            )
                          );
                          setOpenActionModal(false);
                          setRemarks(null);
                          Toast.show({
                            type: "info",
                            text1: "Success",
                            text2: "BOQ marked successfully!",
                            topOffset: 10,
                            position: "top",
                            visibilityTime: 4000,
                          });
                          // toast.success("BOQ marked successfully!");
                        } else {
                          Toast.show({
                            type: "Error",
                            text1: "Error",
                            text2: "Something went wrong!",
                            topOffset: 10,
                            position: "top",
                            visibilityTime: 4000,
                          });

                          // toast.success("Something went wrong!");
                        }
                      }
                    }}
                    style={{
                      width: "100%",
                      backgroundColor: "#81B733",
                      height: 40,
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        color: Colors.White,
                        fontSize: 14,
                      }}
                    >
                      Approve
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
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
                    setScope(null);
                    setScopeFilter([]);
                    // dispatch(getFieldNoteList(token));
                    setOpenFilterModal(false);
                    dispatch(getBOQListGC(token, selectedProject?.projectId));
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
                    getBOQListGC(token, selectedProject?.projectId, item?.value)
                  );
                  setOpenFilterModal(false);
                  // let resp = await dispatch(
                  //   assignContractorFieldNote(
                  //     token,
                  //     currFieldNote?.fieldNoteId,
                  //     item?.value
                  //   )
                  // );
                  // if (resp?.status === 200) {
                  //   dispatch(getFieldNoteList(token));
                  //   setOpenAssignModal(false);
                  //   setContractor(null);
                  //   setSelectedProject(null);
                  //   Toast.show({
                  //     type: "info",
                  //     text1: "Contractor assigned",
                  //     text2: "Contractor assigned successfully.",
                  //     topOffset: 10,
                  //     position: "top",
                  //     visibilityTime: 4000,
                  //   });
                  // }
                }}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <View style={{ marginVertical: 5 }}>
                <Text
                  style={{ fontFamily: "Lexend-Medium", color: Colors.Black }}
                >
                  By Scope
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
                data={scopeList?.map((ele) => ({
                  label: ele?.name,
                  value: ele?.scopeOfWorkId,
                }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Scope of work"}
                value={scope}
                onChange={(item) => {
                  setOpenFilterModal(false);
                  setScope(item.value);
                  const filter = boqListGC?.result?.filter(
                    (e) => e.scopeOfWorkId === item.value
                  );
                  setScopeFilter(filter);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const Item = ({ item, index }) => (
    <View style={[styles.item]} key={item.key}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}
      >
        <View style={{ width: "7%" }}>
          <Text style={styles.flatListText}>{item?.boqId || "0"}</Text>
        </View>
        <View
          style={{
            width: "17%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "Lexend-SemiBold",
                  color: Colors.Black,
                  fontSize: 11,
                }}
              >
                {item?.scopeOfWorkName || "N/A"}
              </Text>
              <Text
                style={{
                  fontFamily: "Lexend-Regular",
                  color: Colors.Black,
                  fontSize: 9,
                }}
              >
                {item?.title || "N/A"}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "10%" }}>
          <Text style={styles.flatListText}>{item?.quantity || "N/A"}</Text>
        </View>
        <View style={{ width: "15%" }}>
          <Text numberOfLines={1} style={styles.flatListText}>
            {item?.description || "N/A"}
          </Text>
        </View>
        {/* <View style={{ width: "15%" }}>
          <Text numberOfLines={1} style={styles.flatListText}>{item?.description || "N/A"}</Text>
        </View> */}
        {/* <View style={{ width: "10%" }}>
          <Text style={styles.flatListText}>{item?.unitName || "N/A"}</Text>
        </View> */}
        <View style={{ width: "14%" }}>
          <Pressable
            onPress={() => {
              setOpenActionModal(true);
              setCurrBoq(item);
              setRemarks(item?.remarks);
            }}
            style={{
              width: "100%",
              backgroundColor:
                item?.status === "Approved" ? Colors.Gray : "#81B733",
              height: 20,
              borderRadius: 3,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: item?.action === null ? 0.5 : 0,
            }}
          >
            <Text
              style={[
                styles.flatListText,
                {
                  fontSize: 9,
                  color: Colors.White,
                },
              ]}
            >
              {"Approve"}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setOpenActionModal(true);
              setCurrBoq(item);
              setRemarks(item?.remarks);
            }}
            style={{
              width: "100%",
              backgroundColor: "#FF6247",
              height: 20,
              borderRadius: 3,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: item?.action === null ? 0.5 : 0,
              marginTop: 5,
            }}
          >
            <Text
              style={[
                styles.flatListText,
                {
                  fontSize: 9,
                  color: Colors.White,
                },
              ]}
            >
              {"Reject"}
            </Text>
          </Pressable>
        </View>
        {/* <View style={{ width: "10%" }}>
          <Text numberOfLines={1} style={styles.flatListText}>
            {item?.amount || "N/A"}
          </Text>
        </View> */}

        <View style={{ width: "14%" }}>
          <Pressable
            onPress={() => {
              // setOpenActionModal(true);
              // setCurrBoq(item);
              // setRemarks(item?.remarks);
            }}
            style={{
              width: "100%",
              backgroundColor: "#81B733",
              height: 20,
              borderRadius: 3,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: item?.action === null ? 0.5 : 0,
            }}
          >
            <Text
              style={[
                styles.flatListText,
                {
                  fontSize: 9,
                  color: Colors.White,
                },
              ]}
            >
              {"Approve"}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setOpenActionModal(true);
              setCurrBoq(item);
              setRemarks(item?.remarks);
            }}
            style={{
              width: "100%",
              backgroundColor: "#FF6247",
              height: 20,
              borderRadius: 3,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: item?.action === null ? 0.5 : 0,
              marginTop: 5,
            }}
          >
            <Text
              style={[
                styles.flatListText,
                {
                  fontSize: 9,
                  color: Colors.White,
                },
              ]}
            >
              {"Reject"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
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
            paddingHorizontal: 8,
            backgroundColor: Colors.White,
            height: 50,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 25,
          }}
        >
          <View style={{ width: "7%" }}>
            <Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
              BOQ ID
            </Text>
          </View>
          <View style={{ width: "17%" }}>
            <Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
              SOW/Title
            </Text>
          </View>
          <View style={{ width: "10%" }}>
            <Text style={styles.flatListTextHeader}>Measurement</Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text style={styles.flatListTextHeader}>Description</Text>
          </View>
          {/* <View style={{ width: "10%" }}>
            <Text style={styles.flatListTextHeader}>Amount</Text>
          </View> */}

          <View style={{ width: "14%" }}>
            <Text style={styles.flatListTextHeader}>Approve Quality</Text>
          </View>
          <View style={{ width: "14%" }}>
            <Text style={styles.flatListTextHeader}>Approve Measurement</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <Pressable
        // onPress={() => {
        //   setOpenSearchModal(true);
        // }}
        style={styles.graph}
      >
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
          {/* <TouchableOpacity
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 3,
              paddingHorizontal: 9,
              paddingVertical: 7,
            }}
          >
            <Text style={styles.smallButton}>Sort By</Text>
          </TouchableOpacity> */}
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
          {/* <TouchableOpacity
            onPress={() => setOpenSearchUserModal(true)}
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
      </Pressable>
      <View
        style={{
          backgroundColor: Colors.White,
          alignItems: "center",
          margin: 10,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 4,
          width: "93%",
          flex: 1,
        }}
      >
        {!boqListGC?.result ||
        (boqListGC?.result?.length === 0 && scopeFilter.length === 0) ? (
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
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  dispatch(
                    getBOQListGC(token, projectsListSimple[0]?.projectId)
                  );
                  setSelectedProject(projectsListSimple[0]);
                  setScopeFilter([]);
                }}
                tintColor={Colors.Primary}
                colors={[Colors.Purple, Colors.Primary]}
              />
            }
            data={scopeFilter.length ? scopeFilter : boqListGC?.result}
            renderItem={({ item, index }) => <Item item={item} index={index} />}
            keyExtractor={(item) => item.id}
            initialNumToRender={0}
            ListHeaderComponent={ListHeader}
            // extraData={fieldNoteList?.length}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
          />
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
                    // dispatch(saveProjectDataAction(item));
                    // dispatch(getFieldNoteList(token, item?.projectId));
                    dispatch(getBOQListGC(token, item?.projectId));
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
      {renderActionModal()}
      {renderAssignContractorModal()}
    </View>
  );
};

export default GCProductivity;

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
});
