import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  Dimensions,
  LogBox,
  Modal,
  Pressable,
  RefreshControl,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
import { Building, Cross, Search } from "../../icons";
import { OptionsButton } from "react-native-options-button";
import { useSelector, useDispatch } from "react-redux";
import {
  getAttendanceReportAction,
  attendanceReportReducer,
  projectDataReducer,
  getAllAttendanceAction,
  attendanceListReducer,
  getAttendanceApproveAction,
  loadingAttendance,
} from "../../redux/slices/attendanceSlice";
import { projectsListSimpleReducer } from "../../redux/slices/projectSlice";
import moment from "moment";
import { authToken } from "../../redux/slices/authSlice";
import { Dropdown } from "react-native-element-dropdown";
import { Searchbar } from "react-native-paper";
import { usersListReducer } from "../../redux/slices/userSlice";
LogBox.ignoreAllLogs();
const ApproveAttendance = ({ navigation, route }) => {
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [approveStatus, setApproveStatus] = useState(null);
  const [filterAttendance, setFilterAttendance] = useState(null);
  const [openSearchUserModal, setOpenSearchUserModal] = useState(false);
  const [filteredDataAttSource, setFilteredDataAttSource] = useState([]);
  const [masterDataAttSource, setMasterDataAttSource] = useState([]);
  const [searchAttendance, setSearchAttendance] = useState("");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filteredAttendance, setFilteredAttendance] = useState(null);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [labourContractors, setLabourContractors] = useState(null);
  const [currentFilterState, setCurrentFilterState] = useState("");
  const token = useSelector(authToken);
  const isLoading = useSelector(loadingAttendance);
  const dispatch = useDispatch();
  const projectData = useSelector(projectDataReducer);
  const attendance = useSelector(attendanceListReducer);
  const projectsListSimple = useSelector(projectsListSimpleReducer);
  const usersList = useSelector(usersListReducer);

  const [openDropdown, setOpenDropdown] = useState(false);
  // console.log("PROJECT DATA", projectData)
  const handleDropdownOpen = () => {
    setOpenDropdown(true);
  };
  useEffect(() => {
    setLabourContractors(
      usersList?.filter((ele) => ele?.leadTypeId === "LabourContractor")
    );
  }, [usersList]);
  const handleDropdownClose = () => {
    setOpenDropdown(false);
  };

  const modalHeight = openDropdown ? "60%" : "20%";
  // console.log('------ATTENDANCE',  attendance[0]);
  useEffect(() => {
    dispatch(
      getAllAttendanceAction(
        token,
        projectData?.projectId || projectsListSimple[0]?.projectId
      )
    );
  }, [projectData]);

  // Convert UTC time to Indian Standard Time
  const convertTimeToIST = (time) => {
    let indianTime;
    if (time) {
      const utcTime = moment.utc(time);
      indianTime = utcTime.utcOffset("+05:30").format("MMM DD YYYY, hh:mm A");
    }
    return indianTime;
  };

  const attendanceOptions = [
    { label: "P", value: 8 },
    { label: "1/2 P", value: 4 },
    { label: "P1", value: 9 },
    { label: "P2", value: 10 },
    { label: "P3", value: 11 },
    { label: "P4", value: 12 },
    { label: "P5", value: 13 },
    { label: "P6", value: 14 },
    { label: "P7", value: 15 },
    { label: "PP", value: 16 },
  ];

  const rowColors = ["#F3F4F4", "#FFFFFF"];
  useEffect(() => {
    setFilteredDataAttSource(attendance);
    setMasterDataAttSource(attendance);
  }, [attendance]);
  const searchFilterAttendanceFunction = (text) => {
    // Check if searched text is not blank
    console.log("TEXT", text);
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

  const renderFilterModal = () => {
    return (
      <Modal
        animationType="slide"
        // transparent={true}
        visible={openFilterModal}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setOpenFilterModal(openFilterModal);
        }}
        presentationStyle="pageSheet"
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            // justifyContent: "center",
            // backgroundColor: "rgba(0,0,0)",
            //   width: '90%',
            //   height: 200
            marginTop: 30,
          }}
        >
          <View
            style={{
              width: "100%",
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
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <View style={{ marginVertical: 5 }}>
                <Text
                  style={{ fontFamily: "Lexend-Medium", color: Colors.Gray }}
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
                  dispatch(
                    getAllAttendanceAction(
                      token,
                      projectData?.projectId ||
                        projectsListSimple[0]?.projectId,
                      item?.value
                    )
                  );
                  setFilteredAttendance(
                    attendance?.filter((ele) => ele.sKillName === item?.value)
                  );
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderSearchModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openSearchUserModal}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setOpenSearchUserModal(!openSearchUserModal);
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.2)",
            //   width: '90%',
            //   height: 200
          }}
        >
          <View
            style={{
              width: "80%",
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
                  Find by name
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
                {/* <Pressable
                  onPress={() => {
                    setSelectedContractor(null);
                    setOpenFilterModal(false);
                    setUserFilter(null);
                  }}
                  style={{ marginTop: 3 }}
                >
                  <Text style={{ fontFamily: "Lexend-Medium", fontSize: 10 }}>
                    Clear Filter
                  </Text>
                </Pressable> */}
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Searchbar
                style={{
                  backgroundColor: Colors.WhiteGray,
                  borderRadius: 4,
                  borderWidth: 1,
                  width: "100%",
                  // height: 50,
                  marginTop: 10,
                  borderColor: Colors.LightGray,
                }}
                placeholder="Search"
                placeholderTextColor={Colors.FormText}
                mode="bar"
                icon={() => <Search size={20} color={Colors.Black} />}
                clearIcon={() => <Cross size={20} color={Colors.FormText} />}
                onChangeText={(text) => searchFilterAttendanceFunction(text)}
                value={searchAttendance}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const renderApproveModal = () => (
    <Modal
      animationType="slide"
      // transparent={true}
      visible={openApproveModal}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setOpenApproveModal(!openApproveModal);
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
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0)",
            }}
          >
            <View
              style={{
                width: "100%",
                backgroundColor: "white",
                // height: modalHeight,
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
                      color: "black",
                      fontSize: 16,
                      marginBottom: 10,
                    }}
                  >
                    Approve Attendance
                  </Text>
                </View>
                <View>
                  <Cross
                    onPress={() => {
                      setOpenApproveModal(!openApproveModal);
                    }}
                    size={22}
                    color="black"
                    style={{ marginBottom: 8 }}
                  />
                </View>
              </View>
              <View style={{ marginVertical: 10 }}>
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
                  data={attendanceOptions}
                  maxHeight={600}
                  labelField="label"
                  valueField="value"
                  placeholder={"Approve"}
                  value={approveStatus}
                  onFocus={handleDropdownOpen}
                  onBlur={handleDropdownClose}
                  onChange={(item) => {
                    setOpenApproveModal(false);
                    setApproveStatus(item);
                    // console.log(item);
                    dispatch(
                      getAttendanceApproveAction(
                        token,
                        selectedAttendance?.jobId,
                        selectedAttendance?.workerId,
                        new Date().toISOString(),
                        item?.value
                      )
                    );
                    setTimeout(() => {
                      dispatch(
                        getAllAttendanceAction(
                          token,
                          projectData?.projectId ||
                            projectsListSimple[0]?.projectId
                        )
                      );
                      setApproveStatus(null);
                    }, 2000);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  const Item = ({ item, index }) => (
    <View style={[styles.item]}  key={item.key}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
         // backgroundColor: rowColors[index % rowColors?.length],
          backgroundColor: "#ffffff",
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}
      >
        <View
          style={{
            width: "30%",
          }}
        >
          <Text
            style={[
              styles.flatListText,
              {
                textAlign: "left",
                textTransform: "uppercase",
                fontSize: 10,
                color: Colors.ListItemText,
              },
            ]}
          >
            {item?.workerName}
          </Text>
          <Text
            style={[
              styles.flatListText,
              {
                textAlign: "left",
                textTransform: "uppercase",
                fontSize: 9,
                color: Colors.ListItemText,
              },
            ]}
          >
            {item?.sKillName || "Skill"}
          </Text>
        </View>
        <View style={{ width: "12%" }}>
          <Text style={[styles.flatListText, { color: Colors.Black }]}>
            {item?.workerTypeId}
          </Text>
        </View>
        <View style={{ width: "18%" }}>
          <Text style={styles.flatListText}>
            {item?.todayCheckIn ? convertTimeToIST(item?.todayCheckIn) : "--"}
            {/* {item?.todayCheckIn
              ? moment(item?.todayCheckIn).format("MMM DD YYYY, hh:mm A")
            : "--"} */}
          </Text>
        </View>
        <View style={{ width: "18%" }}>
          <Text style={styles.flatListText}>
            {item?.todayCheckOut ? convertTimeToIST(item?.todayCheckOut) : "--"}
            {/* {item?.todayCheckOut
              ? moment(item?.todayCheckOut).format("MMM DD YYYY, hh:mm A")
              : "--"} */}
          </Text>
        </View>
        <View style={{ width: "18%" }}>
          <TouchableOpacity
            onPress={() => {
              setOpenApproveModal(true);
              setSelectedAttendance(item);
            }}
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 3,
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[styles.smallButton]}>Approve</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  const ListHeader = () => {
    return (
      <View style={[styles.item]}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setFilterAttendance(
                filteredDataAttSource?.filter(
                  (ele) => ele.workerTypeId === "Online"
                )
              );
              setCurrentFilterState("Online");
            }}
            style={{
              backgroundColor:
                currentFilterState === "Online" ? "#A179F2" : "#ECE5FC",
              padding: 5,
              width: "25%",
              marginLeft: 8,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              // margin: 5,
              // borderRadius: 5,
            }}
          >
            <Text
              style={[
                styles.smallButton,
                {
                  color:
                    currentFilterState === "Online"
                      ? Colors.White
                      : Colors.Secondary,
                  textAlign: "center",
                },
              ]}
            >{`Online-${
              filteredDataAttSource?.filter(
                (ele) => ele.workerTypeId === "Online"
              )?.length
            }`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilterAttendance(
                filteredDataAttSource?.filter(
                  (ele) => ele.workerTypeId === "Offline"
                )
              );
              setCurrentFilterState("Offline");
            }}
            style={{
              backgroundColor:
                currentFilterState === "Offline" ? "#A179F2" : "#ECE5FC",
              padding: 5,
              width: "25%",
              // margin: 5,
              // borderRadius: 5,
            }}
          >
            <Text
              style={[
                styles.smallButton,
                {
                  color:
                    currentFilterState === "Offline"
                      ? Colors.White
                      : Colors.Secondary,
                  textAlign: "center",
                },
              ]}
            >{`Offline-${
              filteredDataAttSource?.filter(
                (ele) => ele.workerTypeId === "Offline"
              )?.length
            }`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilterAttendance(
                filteredDataAttSource?.filter((ele) => ele.isOnline === true)
              );
              setCurrentFilterState("Present");
            }}
            style={{
              backgroundColor:
                currentFilterState === "Present" ? "#A179F2" : "#ECE5FC",

              padding: 5,
              width: "20%",
              // margin: 5,
              // borderRadius: 5,
            }}
          >
            <Text
              style={[
                styles.smallButton,
                {
                  color:
                    currentFilterState === "Present"
                      ? Colors.White
                      : Colors.Secondary,
                  textAlign: "center",
                },
              ]}
            >{`Present-${
              filteredDataAttSource?.filter((ele) => ele.isOnline === true)
                ?.length
            }`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilterAttendance(
                filteredDataAttSource?.filter((ele) => ele.isOnline === false)
              );
              setCurrentFilterState("Absent");
            }}
            style={{
              backgroundColor:
                currentFilterState === "Absent" ? "#A179F2" : "#ECE5FC",
              padding: 5,
              width: "25%",
              marginRight: 8,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              // margin: 5,
              // borderRadius: 5,
            }}
          >
            <Text
              style={[
                styles.smallButton,
                {
                  color:
                    currentFilterState === "Absent"
                      ? Colors.White
                      : Colors.Secondary,
                  textAlign: "center",
                },
              ]}
            >{`Absent-${
              filteredDataAttSource?.filter((ele) => ele.isOnline === false)
                ?.length
            }`}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
            // paddingVertical: 15,
            paddingHorizontal: 8,
            backgroundColor: Colors.White,
            height: 30,
            // borderRadius: 10
            borderTopLeftRadius: 10,
            borderTopRightRadius: 25,
          }}
        >
          <View style={{ width: "30%" }}>
            <Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
              Name & Skill Set
            </Text>
          </View>
          <View style={{ width: "12%" }}>
            <Text style={styles.flatListTextHeader}>Status</Text>
          </View>
          <View style={{ width: "18%" }}>
            <Text style={styles.flatListTextHeader}>Check-In</Text>
          </View>
          <View style={{ width: "18%" }}>
            <Text style={styles.flatListTextHeader}>Check Out</Text>
          </View>
          <View style={{ width: "18%" }}>
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
            <Text style={styles.selectText}>Contractor Name</Text>
            <Text
              style={[
                styles.selectText,
                { fontFamily: "Lexend-SemiBold", color: Colors.Black },
              ]}
            >
              {selectedContractor
                ? selectedContractor.label
                : "Select a Contractor"}
              {/* {selectedProject
                ? selectedProject?.name
                : projectsListSimple
                ? projectsListSimple[0]?.name
                : "Select a project"} */}
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
      {/* <View style={styles.graph}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          
          <TouchableOpacity
            onPress={() => {
              setFilterAttendance(
                filteredDataAttSource?.filter(
                  (ele) => ele.workerTypeId === "Online"
                )
              );
            }}
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <Text style={styles.smallButton}>{`Online-${
              filteredDataAttSource?.filter(
                (ele) => ele.workerTypeId === "Online"
              )?.length
            }`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilterAttendance(
                filteredDataAttSource?.filter(
                  (ele) => ele.workerTypeId === "Offline"
                )
              );
            }}
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <Text style={styles.smallButton}>{`Offline-${
              filteredDataAttSource?.filter(
                (ele) => ele.workerTypeId === "Offline"
              )?.length
            }`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilterAttendance(
                filteredDataAttSource?.filter((ele) => ele.isOnline === true)
              );
            }}
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <Text style={styles.smallButton}>{`Present-${
              filteredDataAttSource?.filter((ele) => ele.isOnline === true)
                ?.length
            }`}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setFilterAttendance(
                filteredDataAttSource?.filter((ele) => ele.isOnline === false)
              );
            }}
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <Text style={styles.smallButton}>{`Absent-${
              filteredDataAttSource?.filter((ele) => ele.isOnline === false)
                ?.length
            }`}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => setOpenSearchUserModal(true)}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <Search size={15} color={Colors.Secondary} />
          </TouchableOpacity>
        </View>
      </View> */}
      <View
        style={{ alignItems: "flex-end", marginHorizontal: 0, width: "93%" }}
      >
        <Text style={{ fontSize: 10, textAlign: "right", color: Colors.White }}>
          Attendance is validated via two-factor authentication*{"\n"} i.e.
          worker Check-In & Geolocation Tracking during work hours.
        </Text>
      </View>
      {/* <ScrollView> */}
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
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                dispatch(getAllAttendanceAction(token, projectData?.projectId));
              }}
              tintColor={Colors.Primary}
              colors={[Colors.Purple, Colors.Primary]}
            />
          }
          data={!filterAttendance ? filteredDataAttSource : filterAttendance}
          renderItem={({ item, index }) => <Item item={item} index={index} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* </ScrollView> */}
      {renderApproveModal()}
      {renderSearchModal()}
      {renderFilterModal()}
    </View>
  );
};
export default ApproveAttendance;
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
    fontSize: 9,
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
    color: Colors.Black,
    textAlign: "center",
  },
  flatListTextHeader: {
    fontFamily: "Lexend-Medium",
    fontSize: 11,
    color: Colors.ListHeaderText,
    textAlign: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    top: 200,
    // left: 250,
    width: "40%",
    height: "60%",
    borderRadius: 10,
    padding: 5,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    elevation: 4,
    backgroundColor: Colors.White,
  },
});
