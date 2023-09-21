import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
  LogBox,
  Pressable,
  RefreshControl,
  Appearance,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { BarChart, PieChart } from "react-native-gifted-charts";
import Modal from "react-native-modal";
import {
  countsReducer,
  getCountsData,
  loadingUsers,
} from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { authToken, userData } from "../../redux/slices/authSlice";
import { getSkillsAction } from "../../redux/slices/workerSlice";
import {
  getAllProjectsSimpleAction,
  projectsListSimpleReducer,
} from "../../redux/slices/projectSlice";
import RestrictedScreen from "../../components/RestrictedScreen";
import {
  BackIcon,
  Building,
  Cross,
  DateIcon,
  DotIcon,
  Search,
} from "../../icons";
import { Searchbar } from "react-native-paper";
import {
  countReducer,
  getAttendanceTrendline,
  getContractorsStats,
  getPayments,
  getWorkerSkills,
} from "../../redux/slices/countsSlice";
import moment from "moment";
import DatePicker from "react-native-date-picker";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

LogBox.ignoreAllLogs();

const Dashboard = ({ navigation }) => {
  // Local States
  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGraph, setSelectedGraph] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  // Attendance Graph
  const [attendanceSelectedDate, setAttendanceSelectedDate] = useState(
    new Date()
  );
  const [selectedAttendanceProject, setSelectedAttendanceProject] =
    useState(null);

  //Payment Graph
  const [selectedPaymentProject, setSelectedPaymentProject] = useState(null);
  const [paymentsSelectedDate, setPaymentsSelectedDate] = useState(new Date());

  // Contractor Graph
  const [selectedContractorProject, setSelectedContractorProject] =
    useState(null);
  const [pieSelectedDate, setPieSelectedDate] = useState(new Date());

  // Worker Skills Graph
  const [selectedSkillProject, setSelectedSkillProject] = useState(null);

  // Color Scheme
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === "dark";
  const textColor = isDarkMode ? "white" : "black";

  //! INSTANCES
  const dispatch = useDispatch();

  //! SELECTORS
  const token = useSelector(authToken);
  const counts = useSelector(countsReducer);
  const isLoading = useSelector(loadingUsers);
  const projectsListSimple = useSelector(projectsListSimpleReducer);
  const { workerSkill, attendanceTrendline, contractorsStats, payments } =
    useSelector(countReducer);
  const userInfo = useSelector(userData);

  // User Role instance
  const roles = userInfo?.user?.role?.roleFeatureSets;
  const isDashboardPresent = roles.some(
    (item) => item.featureSet.name === "Dashboard"
  );

  function roundToNearestMultiple(number, multiple) {
    return Math.ceil(number / multiple) * multiple;
  }

  /**
   * Restructured attendance graph array
   *
   * @returns Array
   */
  const attendanceGraphsData = () => {
    return attendanceTrendline?.flatMap((item) => [
      {
        value: item.Present || 0,
        label: item.Day,
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: Colors.Black, fontSize: 10 },
        frontColor: Colors.Primary,
      },
      {
        value: item.Absent || 0,
        frontColor: Colors.Purple,
      },
    ]);
  };

  const getAttendanceMaxValue = () => {
    let attendanceMax = 100;
    if (attendanceTrendline) {
      let attendanceValues =
        attendanceTrendline &&
        attendanceTrendline?.map((item) => item.Present || item.Absent);

      // Find the maximum value from the array
      const attendanceMaxValue = Math?.max(...attendanceValues);
      attendanceMax = roundToNearestMultiple(attendanceMaxValue, 100);
    }
    return attendanceMax;
  };

  /**
   * Restructured Payment graph array
   *
   * @returns Array
   */
  const paymentGraphData = () => {
    return payments?.map((item) => ({
      value: item?.DueAmount <= 0 ? 0 : item?.DueAmount,
      label: item?.Day,
      labelTextStyle: { color: Colors.Black, fontSize: 10 },
    }));
  };

  const getPaymentMaxValue = () => {
    let paymentMax = 2000;
    if (payments) {
      let paymentValues = payments && payments?.map((item) => item.DueAmount);

      // Find the maximum value from the array
      const paymentMaxValue = Math?.max(...paymentValues);
      paymentMax = roundToNearestMultiple(paymentMaxValue, 1000);
    }
    return paymentMax;
  };

  /**
   * Restructured Contractor graph array
   *
   * @returns Array
   */
  const contractorGraphData = () => {
    return (
      contractorsStats &&
      Object?.values(contractorsStats)[0]?.map((item, index) => ({
        label: item?.contractor,
        value: item.present || 0,
      }))
    );
  };

  /**
   * Restructured Worker skills graph array
   *
   * @returns Array
   */
  const getSkillGraphData = () => {
    return (
      workerSkill &&
      workerSkill?.map((item, index) => ({
        label: item?.skill,
        stacks: item?.data?.map((ele) => ({
          value: ele?.count,
          color:
            ele?.skillType === "Helper"
              ? "#737373"
              : ele?.skillType === "Supervisor"
              ? Colors.Purple
              : Colors.Primary,
        })),
      }))
    );
  };

  const getSkillMaxValue = () => {
    let skillMax = 100;
    if (workerSkill) {
      for (const skill of workerSkill) {
        const skillSum = skill?.data?.reduce(
          (acc, curr) => acc + curr.count,
          0
        );
        if (skillSum > skillMax) {
          skillMax = roundToNearestMultiple(skillSum, 100);
        }
      }
    }
    return skillMax;
  };

  // Set projects list initially
  useEffect(() => {
    setFilteredDataSource(projectsListSimple);
    setMasterDataSource(projectsListSimple);
  }, [projectsListSimple]);

  //! LIFE-CYCLE-METHODS --------------------------------
  useEffect(() => {
    dispatch(getSkillsAction(token));
    dispatch(getAllProjectsSimpleAction(token));
    setSelectedAttendanceProject(null);
    setAttendanceSelectedDate(new Date());
    setSelectedPaymentProject(null);
    setPaymentsSelectedDate(new Date());
    setSelectedContractorProject(null);
    setPieSelectedDate(new Date());
    if (projectsListSimple) {
      dispatch(
        getAttendanceTrendline(
          token,
          projectsListSimple[0]?.projectId,
          moment().startOf("week").format("YYYY-MM-DD HH:mm:ss"),
          moment().endOf("week").format("YYYY-MM-DD HH:mm:ss")
        )
      );
      dispatch(
        getPayments(
          token,
          projectsListSimple[0]?.projectId,
          moment().startOf("week").format("YYYY-MM-DD HH:mm:ss"),
          moment().endOf("week").format("YYYY-MM-DD HH:mm:ss")
        )
      );
      dispatch(
        getContractorsStats(
          token,
          projectsListSimple[0]?.projectId,
          moment().format("YYYY-MM-DD")
        )
      );
      dispatch(
        getWorkerSkills(
          token,
          "2022-08-31T19:00:00Z",
          moment().utc().format(),
          projectsListSimple[0]?.projectId
        )
      );
    }
    dispatch(getCountsData(token));
  }, []);

  //! GET GRAPHS DATA WHILE SELECTING PROJECTS
  const getGraphsData = (item) => {
    if (selectedGraph === "Attendance") {
      dispatch(
        getAttendanceTrendline(
          token,
          item?.projectId,
          moment().startOf("week").format("YYYY-MM-DD HH:mm:ss"),
          moment().endOf("week").format("YYYY-MM-DD HH:mm:ss")
        )
      );
    } else if (selectedGraph === "Payment") {
      dispatch(
        getPayments(
          token,
          item?.projectId,
          moment().startOf("week").format("YYYY-MM-DD HH:mm:ss"),
          moment().endOf("week").format("YYYY-MM-DD HH:mm:ss")
        )
      );
    } else if (selectedGraph === "Contractor") {
      dispatch(
        getContractorsStats(
          token,
          item?.projectId,
          moment().format("YYYY-MM-DD")
        )
      );
    } else {
      dispatch(
        getWorkerSkills(
          token,
          "2022-08-31T19:00:00Z",
          moment().utc().format(),
          item?.projectId
        )
      );
    }
  };

  let currentPresent = attendanceTrendline?.filter((item) => {
    if (moment().format("ddd").toUpperCase() === item?.Day) {
      return item;
    }
  });

  let currentAbsent = attendanceTrendline?.filter((item) => {
    if (moment().format("ddd").toUpperCase() === item.Day) {
      return item;
    }
  });

  const onChangeDateAttendance = (date) => {
    // Calculate the start and end of the week
    const startOfWeek = moment(date).startOf("week"); // Sunday
    const endOfWeek = moment(date).endOf("week"); // Saturday

    if (date) {
      dispatch(
        getAttendanceTrendline(
          token,
          selectedAttendanceProject?.projectId
            ? selectedAttendanceProject?.projectId
            : projectsListSimple[0]?.projectId,
          startOfWeek.format("YYYY-MM-DD HH:mm:ss"),
          endOfWeek.format("YYYY-MM-DD HH:mm:ss")
        )
      );
    } else {
      dispatch(
        getAttendanceTrendline(
          token,
          selectedAttendanceProject?.projectId
            ? selectedAttendanceProject?.projectId
            : projectsListSimple[0]?.projectId,
          moment().startOf("week").format("YYYY-MM-DD HH:mm:ss"),
          moment().endOf("week").format("YYYY-MM-DD HH:mm:ss")
        )
      );
    }
  };

  const onChangeDatePayments = (date) => {
    const startOfWeek = moment(date).startOf("week"); // Sunday
    const endOfWeek = moment(date).endOf("week"); // Saturday
    dispatch(
      getPayments(
        token,
        selectedPaymentProject?.projectId
          ? selectedPaymentProject?.projectId
          : projectsListSimple[0]?.projectId,
        startOfWeek.format("YYYY-MM-DD HH:mm:ss"),
        endOfWeek.format("YYYY-MM-DD HH:mm:ss")
      )
    );
  };

  const onChangePieDate = (date) => {
    setPieSelectedDate(date);
    dispatch(
      getContractorsStats(
        token,
        selectedContractorProject?.projectId
          ? selectedContractorProject?.projectId
          : projectsListSimple[0]?.projectId,
        moment(date).format("YYYY-MM-DD")
      )
    );
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

  const renderSearchProjectModal = () => {
    return (
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
                    if (selectedGraph === "Attendance") {
                      setSelectedAttendanceProject(item);
                    } else if (selectedGraph === "Payment") {
                      setSelectedPaymentProject(item);
                    } else if (selectedGraph === "Contractor") {
                      setSelectedContractorProject(item);
                    } else {
                      setSelectedSkillProject(item);
                    }
                    setOpenSearchModal(false);
                    getGraphsData(item);
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
              keyExtractor={(item) => item?.projectId}
              extraData={filteredDataSource}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header} />
      {isDashboardPresent ? (
        <View style={styles.graph}>
          <ScrollView
            contentContainerStyle={{}}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => {
                  dispatch(getCountsData(token));
                  if (projectsListSimple) {
                    dispatch(
                      getAttendanceTrendline(
                        token,
                        projectsListSimple[0]?.projectId,
                        moment().startOf("week").format("YYYY-MM-DD HH:mm:ss"),
                        moment().endOf("week").format("YYYY-MM-DD HH:mm:ss")
                      )
                    );
                    dispatch(
                      getPayments(
                        token,
                        projectsListSimple[0]?.projectId,
                        moment().startOf("week").format("YYYY-MM-DD HH:mm:ss"),
                        moment().endOf("week").format("YYYY-MM-DD HH:mm:ss")
                      )
                    );
                    dispatch(
                      getContractorsStats(
                        token,
                        projectsListSimple[0]?.projectId,
                        moment().format("YYYY-MM-DD")
                      )
                    );
                    dispatch(
                      getWorkerSkills(
                        token,
                        "2022-08-31T19:00:00Z",
                        moment().utc().format(),
                        projectsListSimple[0]?.projectId
                      )
                    );
                  }
                }}
                tintColor={Colors.Primary}
                colors={[Colors.Purple, Colors.Primary]}
              />
            }
          >
            <View>
              <View style={styles.projectsCard}>
                <View style={styles.item}>
                  <Text style={styles.title}>{"Total Project"}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../../assets/images/totalprojects.png")}
                      style={styles.projectImageIcon}
                    />
                    <Spacer right={10} />
                    <Text style={styles.num}>{counts?.totalProjects}</Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <Text style={styles.title}>{"Total Contractors"}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../../assets/images/totalprojects.png")}
                      style={styles.projectImageIcon}
                    />
                    <Spacer right={10} />
                    <Text style={styles.num}>{counts?.totalContractor}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.projectsCard}>
                <View style={styles.item}>
                  <Text style={styles.title}>{"Worker Present"}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../../assets/images/totalprojects.png")}
                      style={styles.projectImageIcon}
                    />
                    <Spacer right={10} />
                    <Text style={styles.num}>{counts?.workerPresent}</Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <Text style={styles.title}>{"Worker Absent"}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../../assets/images/totalprojects.png")}
                      style={styles.projectImageIcon}
                    />
                    <Spacer right={10} />
                    <Text style={styles.num}>{counts?.workerAbsent}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.scrollGraph}>
              <View style={styles.graphsHeader}>
                <Text style={styles.graphHeadingText}>Attendance</Text>
                <View style={styles.graphSubHeader}>
                  <Pressable
                    onPress={() => {
                      setOpenSearchModal(true);
                      setSelectedGraph("Attendance");
                    }}
                    style={styles.selectProjectButton}
                  >
                    <View style={styles.buildingIconBg}>
                      <Building size={15} color={Colors.LightGray} />
                    </View>
                    <View>
                      <Text style={styles.selectText}>Select a Project</Text>
                      <Text
                        style={[
                          styles.selectText,
                          {
                            fontFamily: "Lexend-SemiBold",
                            color: Colors.Black,
                          },
                        ]}
                      >
                        {selectedAttendanceProject
                          ? selectedAttendanceProject?.name
                          : projectsListSimple
                          ? projectsListSimple[0]?.name
                          : "Select a project"}
                      </Text>
                    </View>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setOpen(true);
                      setSelectedGraph("Attendance");
                    }}
                    style={styles.selectDateButton}
                  >
                    <View style={styles.buildingIconBg}>
                      <DateIcon size={15} color={Colors.LightGray} />
                    </View>
                    <View>
                      <Text style={styles.selectText}>Select Date</Text>
                      <Text
                        style={[
                          styles.selectText,
                          {
                            fontFamily: "Lexend-SemiBold",
                            color: Colors.Black,
                          },
                        ]}
                      >
                        {moment(attendanceSelectedDate).format("MM/DD/YYYY")}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <DotIcon color={Colors.Primary} size={40} />
                  <Text style={styles.attendanceSubText}>Present</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <DotIcon color={Colors.Purple} size={40} />
                  <Text style={styles.attendanceSubText}>Absent</Text>
                </View>
              </View>
              <View style={styles.barChart}>
                <BarChart
                  data={attendanceGraphsData()}
                  barWidth={6}
                  spacing={17}
                  roundedTop
                  xAxisThickness={0}
                  yAxisThickness={0}
                  yAxisTextStyle={{ color: "gray" }}
                  xAxisTextStyle={{ color: "gray" }}
                  noOfSections={5}
                  maxValue={getAttendanceMaxValue()}
                  frontColor={Colors.Black}
                  height={180}
                  width={260}
                />
              </View>
              <View style={styles.graphBottom}>
                <View style={[styles.graphBottomTabs]}>
                  <Text style={styles.graphBottomText}>
                    Present{"\n"}Workers Today{" "}
                  </Text>
                  <Text style={[styles.graphBottomTextBold]}>
                    {" "}
                    {currentPresent?.length > 0
                      ? currentPresent[0]?.Present
                      : 0}
                  </Text>
                </View>
                <View style={styles.graphBottomTabs}>
                  <Text style={styles.graphBottomText}>
                    Absent{"\n"}Workers Today{" "}
                  </Text>
                  <Text
                    style={[
                      styles.graphBottomTextBold,
                      { color: Colors.Purple },
                    ]}
                  >
                    {currentAbsent?.length > 0 ? currentAbsent[0]?.Absent : 0}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "90%",
                  alignItems: "flex-end",
                  marginVertical: 10,
                }}
              >
                <Pressable
                  onPress={() => navigation.navigate("Attendance")}
                  style={{
                    backgroundColor: Colors.PurpleOpacity,
                    width: "40%",
                    paddingHorizontal: 5,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Lexend-Regular",
                      color: Colors.Purple,
                      fontSize: 12,
                    }}
                  >
                    View Attendance
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.scrollGraph}>
              <View style={[styles.graphsHeader]}>
                <Text style={styles.graphHeadingText}>Payment</Text>
                <View style={[styles.graphSubHeader, {marginBottom: 30}]}>
                  <TouchableOpacity
                    onPress={() => {
                      setOpenSearchModal(true);
                      setSelectedGraph("Payment");
                    }}
                    style={styles.selectProjectButton}
                  >
                    <View style={styles.buildingIconBg}>
                      <Building size={15} color={Colors.LightGray} />
                    </View>
                    <View>
                      <Text style={styles.selectText}>Select a Project</Text>
                      <Text
                        style={[
                          styles.selectText,
                          {
                            fontFamily: "Lexend-SemiBold",
                            color: Colors.Black,
                          },
                        ]}
                      >
                        {selectedPaymentProject
                          ? selectedPaymentProject?.name
                          : projectsListSimple
                          ? projectsListSimple[0]?.name
                          : "Select a project"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Pressable
                    onPress={() => {
                      setOpen(true);
                      setSelectedGraph("Payment");
                    }}
                    style={styles.selectDateButton}
                  >
                    <View style={styles.buildingIconBg}>
                      <DateIcon size={15} color={Colors.LightGray} />
                    </View>
                    <View>
                      <Text style={styles.selectText}>Select Date</Text>
                      <Text
                        style={[
                          styles.selectText,
                          {
                            fontFamily: "Lexend-SemiBold",
                            color: Colors.Black,
                          },
                        ]}
                      >
                        {moment(paymentsSelectedDate).format("MM/DD/YYYY")}
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.barChart]}>
                <BarChart
                  data={paymentGraphData()}
                  barWidth={17}
                  spacing={13}
                  // hideRules
                  xAxisThickness={0}
                  yAxisThickness={0}
                  yAxisTextStyle={{ color: "gray" }}
                  xAxisTextStyle={{ color: "gray" }}
                  noOfSections={7}
                  maxValue={getPaymentMaxValue()}
                  frontColor={Colors.Primary}
                  height={180}
                  width={260}
                />
              </View>
              <View
                style={{
                  width: "90%",
                  alignItems: "flex-end",
                  marginVertical: 10,
                }}
              >
                <Pressable
                  onPress={() => navigation.navigate("Payments")}
                  style={{
                    backgroundColor: Colors.Primary,
                    width: "40%",
                    paddingHorizontal: 5,
                    height: 30,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Lexend-Regular",
                      color: Colors.White,
                      fontSize: 12,
                    }}
                  >
                    View Payments
                  </Text>
                </Pressable>
              </View>
            </View>
            {userInfo?.user?.leadTypeId !== "LabourContractor" && (
              <View style={styles.scrollGraph}>
                {/* <ScrollView
                  contentContainerStyle={{ flex: 1 }}
                  nestedScrollEnabled={true}
                > */}
                <View style={styles.graphsHeader}>
                  <Text style={styles.graphHeadingText}>Contractors Data</Text>
                  <View style={styles.graphSubHeader}>
                    <Pressable
                      onPress={() => {
                        setOpenSearchModal(true);
                        setSelectedGraph("Contractor");
                      }}
                      style={styles.selectProjectButton}
                    >
                      <View style={styles.buildingIconBg}>
                        <Building size={15} color={Colors.LightGray} />
                      </View>
                      <View>
                        <Text style={styles.selectText}>Select a Project</Text>
                        <Text
                          style={[
                            styles.selectText,
                            {
                              fontFamily: "Lexend-SemiBold",
                              color: Colors.Black,
                            },
                          ]}
                        >
                          {selectedContractorProject
                            ? selectedContractorProject?.name
                            : projectsListSimple
                            ? projectsListSimple[0]?.name
                            : "Select a project"}
                        </Text>
                      </View>
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        setOpen(true);
                        setSelectedGraph("Contractor");
                      }}
                      style={styles.selectDateButton}
                    >
                      <View style={styles.buildingIconBg}>
                        <DateIcon size={15} color={Colors.LightGray} />
                      </View>
                      <View>
                        <Text style={styles.selectText}>Select Date</Text>
                        <Text
                          style={[
                            styles.selectText,
                            {
                              fontFamily: "Lexend-SemiBold",
                              color: Colors.Black,
                            },
                          ]}
                        >
                          {moment(pieSelectedDate).format("MM/DD/YYYY")}
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
                <View style={{ width: "100%", padding: 15 }}>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        width: "25%",
                        fontSize: 12,
                        fontFamily: "Lexend-SemiBold",
                        color: Colors.ListHeaderText,
                      }}
                    >
                      Contractors
                    </Text>
                    <Text
                      style={{
                        width: "72%",
                        fontSize: 12,
                        fontFamily: "Lexend-SemiBold",
                        color: Colors.ListHeaderText,
                        textAlign: "center",
                      }}
                    >
                      Workers Present
                    </Text>
                  </View>
                  {contractorGraphData()?.map((ele) => (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginVertical: 2,
                      }}
                    >
                      <Text
                        style={{
                          width: "25%",
                          fontFamily: "Lexend-Regular",
                          fontSize: 12,
                          color: Colors.Gray,
                        }}
                      >
                        {ele?.label.split(" ")[0]}
                      </Text>
                      <View style={{ width: "72%" }}>
                        {ele?.value === 0 ? (
                          <Text
                            style={{
                              color: "black",
                              fontFamily: "Lexend-Regular",
                              fontSize: 10,
                              paddingLeft: 5,
                            }}
                          >
                            0
                          </Text>
                        ) : (
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                width: ele?.value,
                                backgroundColor: Colors.Primary,
                                height: 20,
                                justifyContent: "center",
                              }}
                            />

                            <Text
                              style={{
                                color: "black",
                                fontFamily: "Lexend-Regular",
                                fontSize: 10,
                                paddingLeft: 5,
                              }}
                            >
                              {ele?.value}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
            <View style={styles.scrollGraph}>
              <View style={styles.graphsHeader}>
                <Text style={styles.graphHeadingText}>Workers by Skills</Text>
                <Pressable
                  onPress={() => {
                    setOpenSearchModal(true);
                    setSelectedGraph("Skill");
                  }}
                  style={styles.selectProjectButton}
                >
                  <View style={styles.buildingIconBg}>
                    <Building size={15} color={Colors.LightGray} />
                  </View>
                  <View>
                    <Text style={styles.selectText}>Select a Project</Text>
                    <Text
                      style={[
                        styles.selectText,
                        { fontFamily: "Lexend-SemiBold", color: Colors.Black },
                      ]}
                    >
                      {selectedSkillProject
                        ? selectedSkillProject?.name
                        : projectsListSimple
                        ? projectsListSimple[0]?.name
                        : "Select a project"}
                    </Text>
                  </View>
                </Pressable>
              </View>
              <View style={styles.skillSubHeader}>
                <View style={styles.skillInnerHeader}>
                  <Text
                    style={{
                      fontFamily: "Lexend-Regular",
                      fontSize: 12,
                      color: Colors.Gray,
                    }}
                  >
                    Supervisor:{" "}
                    {workerSkill
                      ?.map((item) =>
                        item.data.find(
                          (skill) => skill.skillType === "Supervisor"
                        )
                      )
                      .filter((item) => item !== undefined)
                      .reduce((total, value) => total + value.count, 0) ?? 0}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Lexend-Regular",
                      fontSize: 12,
                      color: Colors.Gray,
                    }}
                  >
                    Skilled:{" "}
                    {workerSkill
                      ?.map((item) =>
                        item.data.find((skill) => skill.skillType === "Skilled")
                      )
                      .filter((item) => item !== undefined)
                      .reduce((total, value) => total + value.count, 0) ?? 0}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Lexend-Regular",
                      fontSize: 12,
                      color: Colors.Gray,
                    }}
                  >
                    Helper:{" "}
                    {workerSkill
                      ?.map((item) =>
                        item.data.find((skill) => skill.skillType === "Helper")
                      )
                      .filter((item) => item !== undefined)
                      .reduce((total, value) => total + value.count, 0) ?? 0}
                  </Text>
                </View>
                <View style={styles.skillInnerHeader}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <DotIcon color={Colors.Purple} size={40} />
                    <Text style={styles.attendanceSubText}>Supervisor</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <DotIcon color={Colors.Primary} size={40} />
                    <Text style={styles.attendanceSubText}>Skilled</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <DotIcon color={"#737373"} size={40} />
                    <Text style={styles.attendanceSubText}>Helper</Text>
                  </View>
                </View>
              </View>
              <View style={styles.skillBarChart}>
                <BarChart
                  height={180}
                  maxValue={getSkillMaxValue()}
                  barWidth={20}
                  xAxisLabelTextStyle={{ color: "gray", fontSize: 8 }}
                  yAxisTextStyle={{ color: "gray" }}
                  frontColor={Colors.Black}
                  rotateLabel
                  noOfSections={getSkillGraphData()?.length || 5}
                  stackData={getSkillGraphData()}
                  width={250}
                />
              </View>
            </View>
            <DatePicker
              modal
              mode="date"
              textColor={textColor}
              open={open}
              date={date}
              onConfirm={(date) => {
                setOpen(false);
                if (selectedGraph === "Attendance") {
                  setAttendanceSelectedDate(date);
                  onChangeDateAttendance(date);
                } else if (selectedGraph === "Payment") {
                  setPaymentsSelectedDate(date);
                  onChangeDatePayments(date);
                } else if (selectedGraph === "Contractor") {
                  setPieSelectedDate(date);
                  onChangePieDate(date);
                }
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </ScrollView>
        </View>
      ) : (
        <RestrictedScreen />
      )}
      {renderSearchProjectModal()}
    </View>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
  },
  projectsCard: {
    width: "96%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: Colors.Primary,
    height: "45%",
    width: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
  },
  graph: {
    margin: 15,
    bottom: 140,
    width: "96%",
  },
  graphBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    width: "100%",
  },
  graphBottomText: {
    fontSize: 10,
    fontFamily: "Lexend-Regular",
    color: Colors.Black,
  },
  graphBottomTextBold: {
    fontSize: 20,
    fontFamily: "Lexend-Bold",
    color: Colors.Primary,
    paddingLeft: 5,
  },
  graphBottomTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.WhiteGray,
    borderRadius: 8,
    padding: 12,
    width: "45%",
  },
  item: {
    width: "43%",
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
    fontSize: 12,
    color: Colors.LightGray,
  },
  num: {
    fontFamily: "Lexend-Medium",
    fontSize: 26,
    color: Colors.Black,
  },
  scrollGraph: {
    backgroundColor: Colors.White,
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
    width: "90%",
    paddingBottom: 10,
    alignItems: "center",
    flex: 1,
  },
  selectText: {
    fontFamily: "Lexend-Medium",
    fontSize: 9,
    color: Colors.Gray,
    paddingLeft: 10,
  },
  graphSubHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  projectImageIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  graphsHeader: {
    width: "100%",
    marginTop: 15,
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  graphHeadingText: {
    fontFamily: "Lexend-SemiBold",
    fontSize: 16,
    color: Colors.LightGray,
  },
  selectProjectButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  buildingIconBg: {
    backgroundColor: "#F7F8F9",
    borderRadius: 25,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  selectDateButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  attendanceSubText: {
    fontSize: 13,
    fontFamily: "Lexend-Regular",
    color: Colors.Black,
  },
  barChart: {
    // flex: 1,
    width: "70%",
    // paddingHorizontal: 10,
    marginTop: 10,
    alignItems: "center",
    // padding: 0
  },
  paymentBarChart: {
    width: "80%",
    paddingHorizontal: 10,
    alignItems: "center",
    marginTop: 15,
    paddingBottom: 10,
    height: 240,
  },
  skillSubHeader: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    alignSelf: "center",
    marginTop: 10,
  },
  skillInnerHeader: {
    width: "90%",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
  skillBarChart: {
    width: "80%",
    paddingHorizontal: 10,
    marginTop: 10,
    paddingBottom: 40,
    alignItems: "center",
  },
});
