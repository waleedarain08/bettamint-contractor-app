import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  LogBox,
  Modal,
  Pressable,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import { Building, Cross, Search } from "../../icons";
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";
import { Searchbar } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import Geolocation from "react-native-geolocation-service";
import { useAttendance } from "../../context/attendanceContext";
import { useGeneralContext } from "../../context/generalContext";

LogBox.ignoreAllLogs();

const ApproveAttendance = ({ navigation, route }) => {
  const {
    loading,
    getAttendance,
    attendance,
    markWorkerAttendance,
    approveAttendance,
  } = useAttendance();
  const {
    projects,
    skills,
    labourContractorList,
    getLabourContractors,
    setProject,
    project,
  } = useGeneralContext();
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [approveStatus, setApproveStatus] = useState(null);
  const [filterAttendance, setFilterAttendance] = useState(null);
  const [openSearchUserModal, setOpenSearchUserModal] = useState(false);
  const [filteredDataAttSource, setFilteredDataAttSource] = useState([]);
  const [masterDataAttSource, setMasterDataAttSource] = useState([]);
  const [searchAttendance, setSearchAttendance] = useState("");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [currentFilterState, setCurrentFilterState] = useState("Present");
  const [currentPosition, setCurrentPosition] = useState(null);

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
    { label: "A", value: 0 },
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

  console.log("Project", project);
  const getData = (
    projectId = project?.projectId,
    contractorId = 0,
    skillId = ""
  ) => {
    getAttendance(projectId, contractorId, skillId).catch((error) => {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    });
  };
  useFocusEffect(
    useCallback(() => {
      getData();
      getCurrentLocation();
      return () => {};
    }, [project])
  );

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition(position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    if (attendance) {
      setFilteredDataAttSource(attendance?.attendances);
      setMasterDataAttSource(attendance?.attendances);
    }
  }, [attendance?.attendances]);

  useEffect(() => {
    if (filteredDataAttSource?.length) {
      let filteredData;
      if (currentFilterState === "Present") {
        filteredData = filteredDataAttSource?.filter(
          (ele) => ele.isOnline === true
        );
      } else if (currentFilterState === "Offline") {
        filteredData = filteredDataAttSource?.filter(
          (ele) => ele.workerTypeId === "Offline"
        );
      } else if (currentFilterState === "Online") {
        filteredData = filteredDataAttSource?.filter(
          (ele) => ele.workerTypeId === "Online"
        );
      } else if (currentFilterState === "Absent") {
        filteredData = filteredDataAttSource?.filter(
          (ele) => ele.isOnline === false
        );
      }
      setFilterAttendance(filteredData);
    }
  }, [filteredDataAttSource?.length, currentFilterState]);

  const handleOfflineWorkerAttendance = async (
    workerId,
    jobId,
    attendanceType
  ) => {
    try {
      const response = await markWorkerAttendance({
        workerId,
        jobId,
        attendanceType,
        latitude: currentPosition?.coords?.latitude,
        longitude: currentPosition?.coords?.longitude,
      });
      if (response) {
        getData(project?.projectId, selectedContractor?.value || 0);
        ToastAndroid.show(
          "Attendance marked successfully!",
          ToastAndroid.SHORT
        );
        let key =
          attendanceType === "CheckIn" ? "todayCheckIn" : "todayCheckOut";
        let updatedArray = filterAttendance.map((item) =>
          item.workerId === workerId
            ? {
                ...item,
                [key]: moment.utc(),
              }
            : item
        );
        setFilterAttendance(updatedArray);
      }
    } catch (error) {
      console.log("error", error);
      // ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
    }
  };

  const searchFilterAttendanceFunction = (text) => {
    if (text) {
      const newData = masterDataAttSource.filter(function (item) {
        const itemData = item.workerName
          ? item.workerName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataAttSource(newData);
      setSearchAttendance(text);
    } else {
      setFilteredDataAttSource(masterDataAttSource);
      setSearchAttendance(text);
    }
  };

  const renderFilterModal = () => {
    return (
      <Modal
        animationType="slide"
        visible={openFilterModal}
        onRequestClose={() => {
          setOpenFilterModal(openFilterModal);
        }}
        presentationStyle="pageSheet"
      >
        <View style={styles.filterContainer}>
          <View style={styles.filterInnerContainer}>
            <View style={styles.filterHeaderCon}>
              <View>
                <Text style={styles.filterText}>Filter</Text>
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
                <Text style={styles.contactorText}>By Contractor</Text>
              </View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.dropdownItemText}
                iconStyle={styles.iconStyle}
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
                value={selectedContractor}
                onChange={(item) => {
                  setOpenFilterModal(false);
                  setSelectedContractor(item);
                  getData(project?.projectId, item?.value);
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
          setOpenSearchUserModal(!openSearchUserModal);
        }}
      >
        <View style={styles.searchModalContainer}>
          <View style={styles.searchInnerContainer}>
            <View style={styles.searchHeaderCon}>
              <View>
                <Text style={styles.findByText}>Find by name</Text>
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
                style={styles.searchBar}
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
      visible={openApproveModal}
      onRequestClose={() => {
        setOpenApproveModal(!openApproveModal);
      }}
      presentationStyle="pageSheet"
    >
      <View style={styles.approveModalContainer}>
        <View style={styles.approveInnerContainer}>
          <View style={styles.approveModal}>
            <View style={styles.approveHeader}>
              <View>
                <Text style={styles.approveText}>Approve Attendance</Text>
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
                itemTextStyle={styles.approveDropdownItem}
                iconStyle={styles.iconStyle}
                data={attendanceOptions}
                maxHeight={600}
                labelField="label"
                valueField="value"
                placeholder={"Approve"}
                value={approveStatus}
                onChange={(item) => {
                  setOpenApproveModal(false);
                  setApproveStatus(item);
                  approveAttendance(
                    selectedAttendance?.jobId,
                    selectedAttendance?.workerId,
                    new Date().toISOString(),
                    item?.value,
                    item?.label
                  )
                    .then((res) => {
                      if (res) {
                        ToastAndroid.show(
                          "Attendance Approved",
                          ToastAndroid.SHORT
                        );
                        getData(project?.projectId);
                        setApproveStatus(null);
                      } else {
                        ToastAndroid.show(
                          "Something went wrong",
                          ToastAndroid.SHORT
                        );
                      }
                    })
                    .catch((error) => {
                      ToastAndroid.show(error.message, ToastAndroid.SHORT);
                    });
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  const Item = ({ item, index }) => (
    <View style={[styles.item]} key={item.key}>
      <View style={styles.listItemCon}>
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
        <View style={{ width: "18%", alignItems: "center" }}>
          {currentFilterState === "Offline" ||
          currentFilterState === "Online" ||
          currentFilterState === "Absent" ? (
            <View>
              {item?.todayCheckIn ? (
                <Text style={styles.flatListText}>
                  {convertTimeToIST(item?.todayCheckIn)}
                </Text>
              ) : (
                <Pressable
                  style={styles.checkInButton}
                  onPress={() => {
                    handleOfflineWorkerAttendance(
                      item?.workerId,
                      item?.jobId,
                      "CheckIn"
                    );
                  }}
                >
                  <View>
                    <Text style={styles.checkInText}>Check-In</Text>
                  </View>
                </Pressable>
              )}
            </View>
          ) : (
            <Text style={styles.flatListText}>
              {item?.todayCheckIn ? convertTimeToIST(item?.todayCheckIn) : "--"}
            </Text>
          )}
        </View>
        <View style={{ width: "18%", alignItems: "center" }}>
          {currentFilterState === "Offline" ||
          currentFilterState === "Online" ||
          currentFilterState === "Absent" ||
          currentFilterState === "Present" ? (
            <View>
              {item?.todayCheckOut ? (
                <Text style={styles.flatListText}>
                  {convertTimeToIST(item?.todayCheckOut)}
                </Text>
              ) : item?.todayCheckIn ? (
                <Pressable
                  style={styles.checkOutButton}
                  onPress={() => {
                    handleOfflineWorkerAttendance(
                      item?.workerId,
                      item?.jobId,
                      "CheckOut"
                    );
                  }}
                >
                  <View>
                    <Text style={styles.checkOutText}>Check-Out</Text>
                  </View>
                </Pressable>
              ) : (
                <Text style={styles.flatListText}>-</Text>
              )}
            </View>
          ) : (
            <Text style={styles.flatListText}>
              {item?.todayCheckOut
                ? convertTimeToIST(item?.todayCheckOut)
                : "--"}
            </Text>
          )}
        </View>
        <View style={{ width: "18%" }}>
          {item?.todayCheckOut && item?.todayCheckIn ? (
            <TouchableOpacity
              onPress={() => {
                setOpenApproveModal(true);
                setSelectedAttendance(item);
              }}
              style={styles.approveButton}
            >
              <Text style={[styles.smallButton]}>Approve</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.flatListText}>-</Text>
          )}
        </View>
      </View>
    </View>
  );

  const ListHeader = () => {
    return (
      <View style={[styles.item]}>
        <View style={styles.listHeaderCon}>
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
              width: "25%",
              marginLeft: 8,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
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
            >
              {`Present-${attendance?.presentCount || 0}`}
            </Text>
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
            >
              {`Absent-${attendance?.absentCount || 0}`}
            </Text>
          </TouchableOpacity>
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
              width: "20%",
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
            >
              {`Online-${attendance?.onlineCount || 0}`}
            </Text>
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
              marginRight: 8,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
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
            >
              {`Offline-${attendance?.offlineCount || 0}`}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listHeadings}>
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
      <Pressable style={styles.graph}>
        <Pressable
          onPress={async () => {
            setOpenFilterModal(true);
            const projectId = project?.projectId
              ? project?.projectId
              : projects[0]?.projectId;
            await getLabourContractors(projectId);
          }}
          style={styles.contractorButton}
        >
          <View style={styles.buildingIcon}>
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
            </Text>
          </View>
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => setOpenSearchUserModal(true)}
            style={styles.searchIcon}
          >
            <Search size={13} color={Colors.Secondary} />
          </TouchableOpacity>
        </View>
      </Pressable>
      <View style={styles.descriptionTextCon}>
        <Text style={styles.descriptionText}>
          Attendance is validated via two-factor authentication*{"\n"} i.e.
          worker Check-In & Geolocation Tracking during work hours.
        </Text>
      </View>
      <View style={styles.flatListContainer}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                getData(project?.projectId);
              }}
              tintColor={Colors.Primary}
              colors={[Colors.Purple, Colors.Primary]}
            />
          }
          extraData={filterAttendance}
          data={!filterAttendance ? filteredDataAttSource : filterAttendance}
          renderItem={({ item, index }) => <Item item={item} index={index} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
  filterContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  filterInnerContainer: {
    width: "100%",
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 15,
  },
  filterHeaderCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterText: {
    fontFamily: "Lexend-Medium",
    color: Colors.Black,
    fontSize: 16,
  },
  contactorText: { fontFamily: "Lexend-Medium", color: Colors.Gray },
  dropdownItemText: {
    fontFamily: "Lexend-Regular",
    fontSize: 13,
    color: Colors.FormText,
  },
  searchModalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  searchInnerContainer: {
    width: "80%",
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 15,
  },
  searchHeaderCon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  findByText: {
    fontFamily: "Lexend-Medium",
    color: Colors.Black,
    fontSize: 16,
  },
  searchBar: {
    backgroundColor: Colors.WhiteGray,
    borderRadius: 4,
    borderWidth: 1,
    width: "100%",
    marginTop: 10,
    borderColor: Colors.LightGray,
  },
  approveModalContainer: {
    width: "100%",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  approveInnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0)",
  },
  approveModal: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
  approveHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  approveText: {
    fontFamily: "Lexend-Medium",
    color: "black",
    fontSize: 16,
    marginBottom: 10,
  },
  approveDropdownItem: {
    fontFamily: "Lexend-Regular",
    fontSize: 13,
    color: Colors.FormText,
  },
  listItemCon: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  checkInButton: {
    width: "90%",
    backgroundColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    borderRadius: 3,
    paddingVertical: 5,
  },
  checkInText: {
    fontSize: 8.5,
    fontFamily: "Lexend-Medium",
    color: Colors.White,
  },
  checkOutButton: {
    width: "95%",
    backgroundColor: Colors.PurpleOpacity,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    borderRadius: 3,
    paddingVertical: 5,
  },
  checkOutText: {
    fontSize: 8.5,
    fontFamily: "Lexend-Medium",
    color: Colors.Purple,
  },
  listHeaderCon: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  approveButton: {
    backgroundColor: "#ECE5FC",
    padding: 5,
    margin: 5,
    borderRadius: 3,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  listHeadings: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    backgroundColor: Colors.White,
    height: 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 25,
  },
  contractorButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buildingIcon: {
    backgroundColor: "#F7F8F9",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECE5FC",
    padding: 5,
    margin: 5,
    borderRadius: 3,
    paddingHorizontal: 7,
  },
  descriptionTextCon: {
    alignItems: "flex-end",
    marginHorizontal: 0,
    width: "93%",
  },
  descriptionText: { fontSize: 10, textAlign: "right", color: Colors.White },
  flatListContainer: {
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
  },
});
