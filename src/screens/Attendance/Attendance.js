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
  PermissionsAndroid,
} from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../../utils/Colors";
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
import { Building, Search, BackIcon, Cross } from "../../icons";
import { authToken } from "../../redux/slices/authSlice";
import {
  getSkillsAction,
  markWorkerJob,
  skillsListReducer,
} from "../../redux/slices/workerSlice";
import { Dropdown } from "react-native-element-dropdown";
import { getUsersAction, usersListReducer } from "../../redux/slices/userSlice";
import SearchWorkerModal from "../../components/SearchWorkerModal";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Geolocation from "react-native-geolocation-service";

LogBox.ignoreAllLogs();

const Attendance = ({ navigation }) => {
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataAttSource, setFilteredDataAttSource] = useState([]);
  const [masterDataAttSource, setMasterDataAttSource] = useState([]);
  const [searchAttendance, setSearchAttendance] = useState("");
  const [openDeListModal, setOpenDeListModal] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [filteredAttendance, setFilteredAttendance] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [delistReason, setDelistReason] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [labourContractors, setLabourContractors] = useState(null);
  const [openSearchUserModal, setOpenSearchUserModal] = useState(false);
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const attendanceList = useSelector(attendanceListReducer);
  const skillsList = useSelector(skillsListReducer);
  const usersList = useSelector(usersListReducer);
  const projectsListSimple = useSelector(projectsListSimpleReducer);
  const isLoading = useSelector(loadingAttendance);
  const token = useSelector(authToken);
  let pageNum = 1;
  // const page = React.useRef(1);

  const status = [
    { label: "No Show", value: "NoShow" },
    { label: "Tardiness", value: "Tardiness" },
    { label: "Misconduct", value: "Misconduct" },
    { label: "Job Ended", value: "JobEnded" },
  ];

  const getLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location permission required",
          message: "Bettamint needs to access your location",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        getCurrentLocation();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        // setCurrentPosition(position);
        console.log(position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  useFocusEffect(
    React.useCallback(() => {
      if (projectsListSimple) {
        dispatch(
          getAllAttendanceAction(
            token,
            projectsListSimple[0]?.projectId,
            0,
            1,
            15,
            "",
            0
          )
        );
        setSelectedProject(projectsListSimple[0]);
        dispatch(saveProjectDataAction(projectsListSimple[0]));
        getLocationPermission();
      }
      return () => {};
    }, [projectsListSimple && projectsListSimple[0]?.projectId])
  );
  // useEffect(() => {
  //   dispatch(getSkillsAction(token));
  //   dispatch(getUsersAction(token));
  //   dispatch(getAllProjectsSimpleAction(token));
  //   dispatch(selectAttendanceAction(null));
  //   dispatch(removeMusterData());
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getSkillsAction(token));
      dispatch(getUsersAction(token));
      dispatch(getAllProjectsSimpleAction(token));
      dispatch(selectAttendanceAction(null));
      dispatch(removeMusterData());
      setCount(1);
      setFilteredDataAttSource([]);
      return () => {};
    }, [])
  );
  useEffect(() => {
    setLabourContractors(
      usersList?.filter((ele) => ele?.leadTypeId === "LabourContractor")
    );
  }, [usersList]);
  // console.log("filteredDataAttSource", attendanceList?.attendances);
  // useEffect(() => {
  //   const projectId =
  //     projectsListSimple?.[0]?.projectId || selectedProject?.projectId;
  //   if (projectId) {
  //     dispatch(
  //       getAllAttendanceAction(
  //         token,
  //         projectId,
  //         0,
  //         1,
  //         15,
  //         selectedSkills?.value || "",
  //         selectedOrder?.value || 0
  //       )
  //     );
  //   }
  // }, [selectedProject]);

  useEffect(() => {
    setFilteredDataSource(projectsListSimple);
    setMasterDataSource(projectsListSimple);
  }, [projectsListSimple]);

  useEffect(() => {
    if (attendanceList?.attendances?.length > 0) {
      console.log('USE EFFECT---->>>>>')
      setFilteredDataAttSource(attendanceList?.attendances);
      setMasterDataAttSource(attendanceList?.attendances);
      // setFilteredDataAttSource((prev) => {
      //   return [...(prev || []), ...(attendanceList?.attendances || [])];
      // });
      // setMasterDataAttSource((prev) => {
      //   return [...(prev || []), ...(attendanceList?.attendances || [])];
      // });

      // console.log("attendanceList", filteredDataAttSource[0]);
      // console.log("attendanceList", attendanceList?.attendances[0]);
    }
    // console.log("filteredDataAttSource", filteredAttendance);
  }, [attendanceList?.attendances, selectedSkills]);
  // console.log("filteredDataAttSource", filteredDataAttSource);
  // useEffect(() => {
  //   if (attendanceList?.attendances?.length > 0) {
  //     console.log("selectedOrder", selectedOrder);
  //     if (selectedOrder?.value === 1) {
  //       setFilteredDataAttSource((prev) => {
  //         return [...(attendanceList?.attendances || [])];
  //       });
  //       setMasterDataAttSource((prev) => {
  //         return [...(attendanceList?.attendances || [])];
  //       });
  //     } else {
  //       setFilteredDataAttSource((prev) => {
  //         return [...(attendanceList?.attendances || [])];
  //       });
  //       setMasterDataAttSource((prev) => {
  //         return [...(attendanceList?.attendances || [])];
  //       });
  //     }

  //     // console.log("attendanceList", filteredDataAttSource[0]);
  //     // console.log("attendanceList", attendanceList?.attendances[0]);
  //   } else {
  //     setFilteredDataAttSource([]);
  //     setMasterDataAttSource([]);
  //   }
  // }, [selectedSkills, selectedOrder]);
  const searchFilterAttendanceFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataAttSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.workerName
          ? item.workerName.toUpperCase()
          : "".toUpperCase();
        console.log(itemData);
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataAttSource(newData);
      setSearchAttendance(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataAttSource(masterDataAttSource);
      setSearchAttendance(text);
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
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

  const renderFilterModal = () => {
    return (
      <Modal
        isVisible={openFilterModal}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenSearchModal(!openFilterModal)}
      >
        <View style={styles.filterModalContainer}>
          <View style={styles.filterInnerCon}>
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
                    setSelectedContractor(null);
                    setSelectedSkills(null);
                    setSelectedStatus(null);
                    dispatch(
                      getAllAttendanceAction(
                        token,
                        selectedProject?.projectId ||
                          projectsListSimple[0]?.projectId,
                        0,
                        count,
                        15,
                        "",
                        0
                      )
                    );
                    setOpenFilterModal(false);
                    setFilteredAttendance(null);
                  }}
                  style={{ marginTop: 3 }}
                >
                  <Text
                    style={{
                      fontFamily: "Lexend-Medium",
                      fontSize: 10,
                      color: Colors.Black,
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
                  By Status
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
                data={status}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Status"}
                value={selectedStatus}
                onChange={(item) => {
                  setOpenFilterModal(false);
                  setSelectedStatus(item);
                  setSelectedSkills(null);
                  setFilteredAttendance(
                    attendanceList?.attendances?.filter(
                      (ele) => ele.workerTypeId === item?.value
                    )
                  );
                }}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <View style={{ marginVertical: 5 }}>
                <Text
                  style={{ fontFamily: "Lexend-Medium", color: Colors.Black }}
                >
                  By Skills
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
                data={skillsList?.map((ele) => ({
                  label: ele?.name,
                  value: ele?.skillId,
                }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Skill"}
                value={selectedSkills}
                onChange={(item) => {
                  setOpenFilterModal(false);
                  setSelectedSkills(item);
                  setSelectedStatus(null);
                  dispatch(
                    getAllAttendanceAction(
                      token,
                      selectedProject?.projectId ||
                        projectsListSimple[0]?.projectId,
                      0,
                      count,
                      15,
                      item?.value,
                      0
                    )
                  );
                  setFilteredDataAttSource([]);
                  setMasterDataAttSource([]);
                  // console.log(skillsList)
                  // setFilteredAttendance(
                  //   attendanceList?.attendances?.filter(
                  //     (ele) => ele.sKillName === item?.value
                  //   )
                  // );
                }}
              />
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
                data={labourContractors?.map((ele) => ({
                  label: ele?.fullName,
                  value: ele?.userId,
                }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Contractor"}
                value={selectedContractor}
                onChange={(item) => {
                  setOpenFilterModal(false);
                  setSelectedContractor(item);
                  setSelectedStatus(null);
                  setSelectedSkills(null);
                  dispatch(
                    getAllAttendanceAction(
                      token,
                      selectedProject?.projectId ||
                        projectsListSimple[0]?.projectId,
                      item?.value,
                      count,
                      15,
                      "",
                      0
                    )
                  );
                  // setFilteredAttendance(
                  //   attendanceList?.filter(
                  //     (ele) => ele.sKillName === item?.value
                  //   )
                  // );
                }}
              />
            </View>
            {/* <View style={{ marginVertical: 10 }}>
              <View style={{ marginVertical: 5 }}>
                <Text
                  style={{ fontFamily: "Lexend-Medium", color: Colors.Black }}
                >
                  By Worker Name
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
                data={[
                  { label: "Ascending", value: 0 },
                  { label: "Descending", value: 1 },
                ]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Order"}
                value={selectedOrder}
                onChange={(item) => {
                  setOpenFilterModal(false);
                  setSelectedOrder(item);
                  setSelectedStatus(null);
                  setSelectedSkills(null);
                  dispatch(
                    getAllAttendanceAction(
                      token,
                      selectedProject?.projectId ||
                        projectsListSimple[0]?.projectId,
                      0,
                      count,
                      15,
                      "",
                      item?.value
                    )
                  );
                  setFilteredDataAttSource([]);
                  setMasterDataAttSource([]);
                  // setFilteredAttendance(
                  //   attendanceList?.filter(
                  //     (ele) => ele.sKillName === item?.value
                  //   )
                  // );
                }}
              />
            </View> */}
          </View>
        </View>
      </Modal>
    );
  };
  const renderDeListingModal = () => {
    return (
      <Modal
        isVisible={openDeListModal}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenDeListModal(!openDeListModal)}
      >
        <View
          style={[styles.filterModalContainer, { justifyContent: "center" }]}
        >
          <View style={[styles.filterInnerCon, { height: 370 }]}>
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
                  Remove Worker
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Cross
                  onPress={() => {
                    setOpenDeListModal(!openDeListModal);
                    setSelectedWorker(null);
                    setDelistReason(null);
                  }}
                  size={22}
                  color={Colors.Black}
                />
              </View>
            </View>
            <View style={{ marginVertical: 20 }}>
              {/* <View style={{ marginVertical: 5 }}>
                <Text
                  style={{ fontFamily: "Lexend-Medium", color: Colors.Black }}
                >
                  By Status
                </Text>
              </View> */}
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
                data={status}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Remove Worker"}
                value={delistReason}
                onChange={async (item) => {
                  setDelistReason(item);
                  const obj = {
                    jobId: selectedWorker?.jobId,
                    workerId: selectedWorker?.workerId,
                    reason: item?.value,
                  };
                  // console.log("item", obj);
                  const resp = await dispatch(markWorkerJob(token, obj));
                  console.log("resp", resp);
                  if (resp?.status === 200) {
                    setOpenDeListModal(false);
                    setDelistReason(null);
                    Toast.show({
                      type: "info",
                      text1: "Success",
                      text2: "Worker removed successfully!",
                      topOffset: 10,
                      position: "top",
                      visibilityTime: 4000,
                    });
                    dispatch(
                      getAllAttendanceAction(
                        token,
                        selectedProject?.projectId,
                        0,
                        count,
                        15,
                        "",
                        0
                      )
                    );
                  } else {
                    setOpenDeListModal(false);
                    setDelistReason(null);
                    Toast.show({
                      type: "error",
                      text1: "Error",
                      text2: "Some thing went wrong!",
                      topOffset: 10,
                      position: "top",
                      visibilityTime: 4000,
                    });
                  }
                  // setOpenFilterModal(false);
                  // setSelectedStatus(item);
                  // setSelectedSkills(null);
                  // setFilteredAttendance(
                  //   attendanceList?.filter(
                  //     (ele) => ele.workerTypeId === item?.value
                  //   )
                  // );
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
        <View
          style={{
            width: "35%",
          }}
        >
          <Text
            style={[
              styles.flatListText,
              { textAlign: "left", textTransform: "uppercase" },
            ]}
          >
            {item?.workerName}
          </Text>
        </View>
        <View style={{ width: "15%" }}>
          <Text style={styles.flatListText}>
            {item?.workingDays.length
              ? item?.workingDays.length
              : item?.workingDays}
          </Text>
        </View>
        <View style={{ width: "15%" }}>
          <Text style={styles.flatListText}>
            {item?.presentDays.length
              ? item?.presentDays.length
              : item?.presentDays}
          </Text>
        </View>
        <View style={{ width: "13%" }}>
          <Text style={styles.flatListText}>
            {item?.absentDays.length
              ? item?.absentDays.length
              : item?.absentDays}
          </Text>
        </View>
        <View style={{ width: "14%", margin: 5 }}>
          <Pressable
            onPress={() => {
              navigation.navigate("AttendanceMusterCard");
              // setTimeout(() => {
              dispatch(selectAttendanceAction(item));
              // }, 0);
            }}
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              // margin: 5,
              borderRadius: 2,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.smallButton}>View</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setOpenDeListModal(true);
              setSelectedWorker(item);
            }}
            style={{
              marginTop: 3,
              backgroundColor: "#ECE5FC",
              padding: 5,
              // margin: 5,
              borderRadius: 2,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[styles.smallButton, { color: "red", fontSize: 7 }]}>
              Remove
            </Text>
          </Pressable>
          {/* <Text
            style={{
              color: "red",
              fontSize: 10,
              fontFamily: "Lexend-Regular",
              textAlign: "center",
            }}
          >
            Remove
          </Text> */}
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
            // paddingVertical: 15,
            paddingHorizontal: 8,
            backgroundColor: Colors.White,
            height: 50,
            // borderRadius: 10
            borderTopLeftRadius: 10,
            borderTopRightRadius: 25,
          }}
        >
          <View style={{ width: "35%" }}>
            <Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
              Name
            </Text>
          </View>
          <View style={{ width: "20%" }}>
            <Text style={styles.flatListTextHeader}>Man-Days</Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text style={styles.flatListTextHeader}>Present</Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text style={styles.flatListTextHeader}>Absent</Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text style={styles.flatListTextHeader}>Action</Text>
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
              {selectedProject
                ? selectedProject?.name
                : projectsListSimple
                ? projectsListSimple[0]?.name
                : "Select a project"}
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
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
      </Pressable>
      <View style={{ alignItems: "flex-end", paddingRight: 20, width: "100%" }}>
        <Text style={{ fontSize: 10, textAlign: "right", color: Colors.White }}>
          Attendance is validated via two-factor authentication*{"\n"} i.e.
          worker Check-In & Geolocation Tracking during work hours.
        </Text>
      </View>
      {/* <ScrollView> */}
      {/* <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              dispatch(
                getAllAttendanceAction(
                  token,
                  selectedProject?.projectId ||
                    projectsListSimple[0]?.projectId,
                  0
                )
              );
            }}
            tintColor={Colors.Primary}
            colors={[Colors.Purple, Colors.Primary]}
          />
        }
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      > */}
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
        {/* {!attendanceList || attendanceList?.length === 0 ? (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={isLoading}
                  onRefresh={() => {
                    dispatch(
                      getAllAttendanceAction(
                        token,
                        selectedProject?.projectId ||
                        projectsListSimple[0]?.projectId, 0
                      )
                    );
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
          ) : ( */}
        {!filteredDataAttSource || filteredDataAttSource?.length === 0 ? (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => {
                  dispatch(
                    getAllAttendanceAction(
                      token,
                      selectedProject?.projectId ||
                        projectsListSimple[0]?.projectId,
                      0,
                      1,
                      15,
                      "",
                      0
                    )
                  );
                  setSelectedSkills(null);
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
                refreshing={isLoading}
                onRefresh={() => {
                  dispatch(
                    getAllAttendanceAction(
                      token,
                      selectedProject?.projectId ||
                        projectsListSimple[0]?.projectId,
                      0,
                      1,
                      15,
                      "",
                      0
                    )
                  );
                  // setFilteredDataAttSource([]);
                  // setMasterDataAttSource([]);
                  // if (attendanceList?.attendances?.length > 0) {
                  //   // setMasterDataAttSource((prev) => {
                  //   //   return [...(prev || []), ...(attendanceList?.attendances || [])];
                  //   // });

                  //   // console.log("attendanceList", filteredDataAttSource[0]);
                  //   // console.log("attendanceList", attendanceList?.attendances[0]);
                  // }
                  // setCount(1);
                  setSelectedSkills(null);
                  setSelectedContractor(null);
                }}
                tintColor={Colors.Primary}
                colors={[Colors.Purple, Colors.Primary]}
              />
            }
            // onEndReached={() => {
            //   setCount(count + 1);
            // }}
            // onEndReachedThreshold={0.7}
            data={filteredDataAttSource}
            renderItem={({ item, index }) => <Item item={item} index={index} />}
            keyExtractor={(item) => item.id}
            initialNumToRender={0}
            ListHeaderComponent={ListHeader}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
          />
        )}
        {/* )} */}
      </View>
      {/* </ScrollView> */}
      <Modal
        isVisible={openSearchModal}
        // animationType="none"
        useNativeDriver={true}
        backdropColor={Colors.WhiteGray}
        backdropOpacity={1}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenSearchModal(false)}
        // onRequestClose={() => {
        //   setOpenSearchModal(false);
        // }}
        // presentationStyle="fullScreen"
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
                    dispatch(
                      getAllAttendanceAction(
                        token,
                        item?.projectId,
                        0,
                        1,
                        15,
                        "",
                        0
                      )
                    );
                    setOpenSearchModal(false);
                    dispatch(saveProjectDataAction(item));
                    setFilteredDataAttSource([]);
                    setCount(1);
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
              extraData={filteredDataAttSource}
            />
          </View>
        </View>
      </Modal>
      {renderFilterModal()}
      {renderDeListingModal()}
      <SearchWorkerModal
        header={"Find by name"}
        openModal={openSearchUserModal}
        setOpenModal={setOpenSearchUserModal}
        searchFunction={(text) => searchFilterAttendanceFunction(text)}
        search={searchAttendance}
      />
    </View>
  );
};
export default Attendance;

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
    // paddingVertical: 5,
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
    fontSize: 12,
    color: Colors.ListItemText,
    textAlign: "center",
  },
  flatListTextHeader: {
    fontFamily: "Lexend-Medium",
    fontSize: 11,
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
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    elevation: 4,
    backgroundColor: Colors.White,
  },
  filterModalContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  filterInnerCon: {
    width: "100%",
    backgroundColor: Colors.White,
    height: "90%",
    borderRadius: 10,
    padding: 15,
  },
});
