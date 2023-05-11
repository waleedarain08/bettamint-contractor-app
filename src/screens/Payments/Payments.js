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
  Pressable,
  Modal,
  RefreshControl,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
import { Building, Search, BackIcon, Cross } from "../../icons";
import { useSelector, useDispatch } from "react-redux";
import { Searchbar } from "react-native-paper";
import {
  getAllProjectsSimpleAction,
  projectsListSimpleReducer,
} from "../../redux/slices/projectSlice";
import {
  paymentsListReducer,
  getPaymentsAction,
  loadingPayments,
} from "../../redux/slices/paymentSlice";
import {
  getAllAttendanceAction,
  attendanceListReducer,
  saveProjectDataAction,
  selectAttendanceAction,
  loadingAttendance,
} from "../../redux/slices/attendanceSlice";
import CheckBox from "@react-native-community/checkbox";
import { authToken } from "../../redux/slices/authSlice";
import {
  getSkillsAction,
  skillsListReducer,
} from "../../redux/slices/workerSlice";
import { getUsersAction, usersListReducer } from "../../redux/slices/userSlice";
import { Dropdown } from "react-native-element-dropdown";
LogBox.ignoreAllLogs();
const Payments = ({ navigation }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBoxSep, setToggleCheckBoxSep] = useState(false);
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState("");
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [filteredAttendance, setFilteredAttendance] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState(null);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [labourContractors, setLabourContractors] = useState(null);
  const [paymentsList, setPaymentsList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  //   const payments = useSelector(paymentsListReducer);
  const attendanceList = useSelector(attendanceListReducer);
  const skillsList = useSelector(skillsListReducer);
  const usersList = useSelector(usersListReducer);
  const isLoading = useSelector(loadingPayments);
  const isLoadingAttendance = useSelector(loadingAttendance);
  const token = useSelector(authToken);
  const projectsListSimple = useSelector(projectsListSimpleReducer);

  const status = [
    { label: "Online", value: "Online" },
    { label: "Offline", value: "Offline" },
  ];

  useEffect(() => {
    dispatch(
      getAllAttendanceAction(
        token,
        selectedProject?.projectId || projectsListSimple[0]?.projectId,
        0
      )
    );
    if (attendanceList?.length) {
      setPaymentsList(attendanceList);
    }
  }, [selectedProject, attendanceList?.length]);

  useEffect(() => {
    dispatch(getSkillsAction(token));
    dispatch(getUsersAction(token));
    dispatch(getAllProjectsSimpleAction(token));
  }, []);

  useEffect(() => {
    setLabourContractors(
      usersList?.filter((ele) => ele?.leadTypeId === "LabourContractor")
    );
  }, [usersList]);

  useEffect(() => {
    setFilteredDataSource(projectsListSimple);
    setMasterDataSource(projectsListSimple);
  }, [projectsListSimple]);

  // useEffect(() => {
  // 	dispatch(getPaymentsAction());
  // }, [selectedProject]);
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
  const [data, setData] = useState({
    array: attendanceList,
  });
  //   for (let i = 0; i < data?.array?.length; i++) {
  // 	setData(data?.array[i].selected = false)
  // 	// myArray[i].gender = "unknown";
  //   }
//   console.log("DATA", data);
  const rowColors = ["#F3F4F4", "#FFFFFF"];

  const renderFilterModal = () => {
    return (
      <Modal
        animationType="slide"
        // transparent={true}
        presentationStyle="pageSheet"
        visible={openFilterModal}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setOpenFilterModal(!openFilterModal);
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            // justifyContent: "center",
            marginTop: 20,
            // backgroundColor: "rgba(0,0,0)",
            //   width: '90%',
            //   height: 200
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
                        0
                      )
                    );
                    setOpenFilterModal(false);
                    setFilteredAttendance(null);
                  }}
                  style={{ marginTop: 3 }}
                >
                  <Text style={{ fontFamily: "Lexend-Medium", fontSize: 10 }}>
                    Clear Filter
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={{ marginVertical: 10 }}>
              <View style={{ marginVertical: 5 }}>
                <Text
                  style={{ fontFamily: "Lexend-Medium", color: Colors.Gray }}
                >
                  By status
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
                    attendanceList?.filter(
                      (ele) => ele.workerTypeId === item?.value
                    )
                  );
                }}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <View style={{ marginVertical: 5 }}>
                <Text
                  style={{ fontFamily: "Lexend-Medium", color: Colors.Gray }}
                >
                  By skills
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
                  value: ele?.name,
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
                  setFilteredAttendance(
                    attendanceList?.filter(
                      (ele) => ele.sKillName === item?.value
                    )
                  );
                }}
              />
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
                  setSelectedStatus(null);
                  setSelectedSkills(null);
                  dispatch(
                    getAllAttendanceAction(
                      token,
                      selectedProject?.projectId ||
                        projectsListSimple[0]?.projectId,
                      item?.value
                    )
                  );
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const handleCheckbox = (workerId, jobId, isChecked) => {
    if (filteredAttendance?.length) {
      let data = filteredAttendance.map((item) => {
        if (item.workerId === workerId && item.jobId === jobId) {
          return {
            ...item,
            isChecked,
          };
        }
        return item;
      });
      setPaymentsList([...data]);
      return;
    }
    // if (!isChecked) {
    let data = attendanceList.map((item) => {
      if (item.workerId === workerId && item.jobId === jobId) {
        return {
          ...item,
          isChecked,
        };
      }
      return item;
    });
    console.log(workerId, jobId, isChecked);
    setPaymentsList([...data]);
  };
  const Item = ({ item, index }) => (
    <View style={[styles.item]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor: rowColors[index % rowColors?.length],
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}
      >
        <View
          style={{
            width: "30%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CheckBox
            disabled={false}
            value={item?.isChecked}
            onValueChange={(newValue) => {
              //   console.log(newValue);
              //   setToggleCheckBox(!toggleCheckBox);
              handleCheckbox(item?.workerId, item?.jobId, newValue);
              setSelectedUser(item);
              //   const updatedArray = data.array.map((newItem) => {
              //     if (newItem.id === item.id) {
              //       return {
              //         ...newItem,
              //         selected: newValue,
              //       };
              //     }
              //     return newItem;
              //   });
              //   const updatedData = { array: updatedArray };
              //   setData(updatedData);
              //   console.log(attendanceList[0]);
            }}
            tintColors={{ true: Colors.Primary, false: Colors.FormBorder }}
            // key={`${item.id}-${item.selected}`}
          />
          <Text
            style={[
              styles.flatListText,
              {
                textAlign: "left",
                textTransform: "uppercase",
                fontSize: 10,
              },
            ]}
          >
            {item?.workerName}
          </Text>
        </View>
        <View style={{ width: "20%" }}>
          <Text style={[styles.flatListText, { left: 15 }]}>
            {item?.workerTypeId}
          </Text>
        </View>
        <View style={{ width: "15%" }}>
          <Text style={styles.flatListText}>{item?.dueAmount}</Text>
        </View>
        <View style={{ width: "15%" }}>
          <Text style={styles.flatListText}>{item?.issuedAmount}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PaymentMusterCard");
            dispatch(selectAttendanceAction(item));
          }}
          style={{
            backgroundColor: "#ECE5FC",
            padding: 5,
            margin: 5,
            borderRadius: 3,
            width: "12%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.smallButton}>View</Text>
        </TouchableOpacity>
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
          <View
            style={{
              width: "30%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
              tintColors={{ true: Colors.Primary, false: Colors.FormBorder }}
            />
            <Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
              Name
            </Text>
          </View>
          <View style={{ width: "20%", alignItems: "center" }}>
            <Text style={[styles.flatListTextHeader, { left: 15 }]}>
              Status
            </Text>
          </View>
          <View style={{ width: "15%", alignItems: "center" }}>
            <Text style={styles.flatListTextHeader}>Due Amount</Text>
          </View>
          <View style={{ width: "15%", alignItems: "center" }}>
            <Text style={styles.flatListTextHeader}>Issued</Text>
          </View>
          <View style={{ width: "15%", alignItems: "center" }}>
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
        onPress={() => {
          // setOpenSearchModal(true);
        }}
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
      <View style={{ alignItems: "flex-end", width: "100%", paddingRight: 20 }}>
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
          //   paddingHorizontal: 8,
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
          // marginBottom: 10
        }}
      >
        {!attendanceList || attendanceList?.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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
          </View>
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isLoadingAttendance}
                onRefresh={() => {
                  dispatch(
                    getAllAttendanceAction(
                      selectedProject?.projectId || attendanceList[0]?.projectId
                    )
                  );
                }}
                tintColor={Colors.Primary}
                colors={[Colors.Purple, Colors.Primary]}
              />
            }
            data={filteredAttendance ? filteredAttendance : paymentsList}
            renderItem={({ item, index }) => <Item item={item} index={index} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <Spacer bottom={50} />
      <View
        style={{
          width: "93%",
          flexDirection: "row",
          justifyContent: "space-between",
          position: "absolute",
          bottom: 10,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PayOnline", {selectedUser, projectId: selectedProject?.projectId})}
        >
          <Text style={styles.buttonText}>Pay Online</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.Secondary }]}
        >
          <Text style={styles.buttonText}>Pay Offline</Text>
        </TouchableOpacity>
      </View>
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
                    setData();
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
      {renderFilterModal()}
    </View>
  );
};
export default Payments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Lexend-Regular",
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },
  button: {
    width: "48%",
    padding: 12,
    backgroundColor: Colors.Primary,
    borderRadius: 4,
    justifyContent: "center",
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
    fontSize: 11,
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
});
