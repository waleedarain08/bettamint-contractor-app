import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  LogBox,
  RefreshControl,
  Linking,
  ToastAndroid,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { LocationIcon, Search, BackIcon, Cross } from "../../icons";
import { Building, Whatsapp } from "../../icons";
import { Searchbar } from "react-native-paper";
import moment from "moment";
import { Dropdown } from "react-native-element-dropdown";
import { useFocusEffect } from "@react-navigation/native";
import RestrictedScreen from "../../components/RestrictedScreen";
import { useAuth } from "../../context/authContext";
import { useGeneralContext } from "../../context/generalContext";
import { useJob } from "../../context/jobContext";
LogBox.ignoreAllLogs();

const Jobs = ({ navigation }) => {
  const { user } = useAuth();
  const { projects, skills, labourContractorList } = useGeneralContext();
  const { loading, jobs, getJobs, setSelectedJob, completeJob } = useJob();
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [filterJobs, setFilterJob] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState(null);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [openSearchUserModal, setOpenSearchUserModal] = useState(false);
  const [filteredDataAttSource, setFilteredDataAttSource] = useState([]);
  const [masterDataAttSource, setMasterDataAttSource] = useState([]);
  const [searchAttendance, setSearchAttendance] = useState("");

  const roles = user?.user?.role?.roleFeatureSets;
  const isJobsListPresent = roles.some(
    (item) => item.featureSet.name === "Jobs List"
  );

  const getData = async (contractorId = 0) => {
    getJobs(contractorId).catch((error) => {
      console.log(error);
    });
  };

  useFocusEffect(
    useCallback(() => {
      getData();
      return () => {};
    }, [])
  );

  useEffect(() => {
    setFilteredDataAttSource(jobs);
    setMasterDataAttSource(jobs);
  }, [jobs?.length]);

  const searchFilterAttendanceFunction = (text) => {
    if (text) {
      const newData = masterDataAttSource.filter(function (item) {
        const itemData = item.jobName
          ? item.jobName.toUpperCase()
          : "".toUpperCase();
        console.log(itemData);
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

  useEffect(() => {
    setFilteredDataSource(projects);
    setMasterDataSource(projects);
  }, [projects?.length]);

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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.2)",
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
            // backgroundColor: "rgba(0,0,0,0.2)",
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
                    setOpenFilterModal(false);
                    setFilterJob(null);
                    getData();
                    // dispatch(getAllJobsAction(token, 0));
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
                data={skills?.map((ele) => ({
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
                  setFilterJob(
                    jobs?.filter((ele) => ele.skillId === item?.value)
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
                data={labourContractorList?.map((ele) => ({
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
                  setSelectedSkills(null);
                  // dispatch(getAllJobsAction(token, item?.value));
                  getData(item?.value);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const Item = ({ item }) => (
    <Pressable
      style={styles.item}
      onPress={() => {
        // navigation.navigate("JobDetails");
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View style={{ width: "30%" }}>
          <Text style={[styles.flatlistHeading]}>{item?.jobName}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("JobDetails");
              // dispatch(selectedJobAction(item));
              setSelectedJob(item);
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 3,
              paddingHorizontal: 8,
              width: 60,
              height: 30,
            }}
          >
            <Text style={styles.smallButton}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              //   console.log(item);
              completeJob(item?.jobId)
                .then((res) => {
                  getData();
                })
                .catch((error) => {
                  console.log(error);
                  ToastAndroid.show(
                    "Something went wrong while completing job!",
                    ToastAndroid.SHORT
                  );
                });
              // dispatch(completeJob(token, item?.jobId));
            }}
            disabled={item?.isCompleted}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: item?.isCompleted ? "#C2C1CD" : "#8F8DA6",
              padding: 5,
              margin: 5,
              borderRadius: 3,
              paddingHorizontal: 10,
              // width: 6,
              height: 30,
            }}
          >
            <Text style={[styles.smallButton, { color: "white" }]}>
              {item?.isCompleted ? "Completed" : "End"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                `https://api.whatsapp.com/send?text=https://www.bettamint.com/jobs/job.php?id=${item?.jobId}`
              );
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#1BD741",
              padding: 5,
              paddingHorizontal: 7,
              margin: 5,
              borderRadius: 3,
              width: 60,
              height: 30,
            }}
          >
            <Whatsapp size={15} color={Colors.White} />
            <Spacer right={5} />
            <Text style={[styles.smallButton, { color: Colors.White }]}>
              Share
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.flatlistSubHeading}>Description</Text>
      <Text style={{ fontFamily: "Lexend-Regular" }}>{item?.description}</Text>
      <Spacer bottom={10} />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={[styles.flatlistSubHeading, { textAlign: "center" }]}>
            Required Workers
          </Text>
          <Text
            style={[
              styles.flatlistText,
              { textAlign: "center", marginTop: 6, fontSize: 9.5 },
            ]}
          >
            {item?.requiredWorkers}
          </Text>
        </View>
        <View>
          <Text style={[styles.flatlistSubHeading, { textAlign: "center" }]}>
            Start Date
          </Text>
          <Text
            style={[
              styles.flatlistText,
              { textAlign: "center", marginTop: 6, fontSize: 9.5 },
            ]}
          >
            {moment(item?.startDate).format("DD MMMM, YYYY")}
          </Text>
        </View>
        <View>
          <Text style={[styles.flatlistSubHeading, { textAlign: "center" }]}>
            Wage
          </Text>
          <Text
            style={[
              styles.flatlistText,
              { textAlign: "center", marginTop: 6, fontSize: 9.5 },
            ]}
          >
            {`Total: ₹${
              item?.dailyWage * item?.workingDays?.length
            } | Daily: ₹${item?.dailyWage}`}
          </Text>
        </View>
      </View>
      <Spacer bottom={20} />
      <View
        style={{
          borderTopColor: Colors.LightGray,
          borderTopWidth: 1,
          paddingTop: 10,
          borderStyle: "dashed",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "90%" }}>
          <Text style={styles.flatlistSubHeading}>Location</Text>
          <Text style={styles.flatlistText}>{item.cityName}</Text>
        </View>
        <View style={{ width: "5%" }}>
          <LocationIcon style={{ marginTop: 5 }} size={20} color={"#ADBAC3"} />
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      {isJobsListPresent ? (
        <>
          <View style={styles.graph}>
            <View
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
              <Pressable
                onPress={() => {
                  setOpenSearchModal(true);
                }}
              >
                <Text style={styles.selectText}>Select a Project</Text>
                <Text
                  style={[
                    styles.selectText,
                    { fontFamily: "Lexend-SemiBold", color: Colors.Black },
                  ]}
                >
                  {selectedProject ? selectedProject?.name : "Select a project"}
                </Text>
              </Pressable>
            </View>
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
            <Text style={styles.smallButton}>Submit</Text>
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
          </View>
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
            data={filterJobs ? filterJobs : filteredDataAttSource}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
          />
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
                        setSelectedProject(item);
                        setFilterJob(
                          jobs?.filter(
                            (ele) => ele?.projectId === item?.projectId
                          )
                        );
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
      {renderFilterModal()}
      {renderSearchModal()}
    </View>
  );
};
export default Jobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
    padding: 20,
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
  flatlistHeading: {
    fontFamily: "Lexend-Medium",
    fontSize: 13,
    textTransform: "uppercase",
    color: Colors.Black,
  },
  flatlistSubHeading: {
    fontFamily: "Lexend-Medium",
    fontSize: 9,
    color: Colors.LightGray,
    textTransform: "uppercase",
    // marginTop: 5
  },
  flatlistText: {
    fontFamily: "Lexend-SemiBold",
    fontSize: 10,
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
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Lexend-Regular",
    color: Colors.FormText,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "Lexend-Regular",
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
