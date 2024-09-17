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
  ToastAndroid,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { BarChart, PieChart } from "react-native-gifted-charts";
import Modal from "react-native-modal";
import { loadingUsers } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { authToken, userData } from "../../redux/slices/authSlice";
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
  getFinancialProgressMetrics,
  getLabourExpenseMetrics,
  getLabourTurnoverMetrics,
  getPayments,
  getWorkerSkills,
  getWorkforceMetrics,
} from "../../redux/slices/countsSlice";
import moment from "moment";
import DatePicker from "react-native-date-picker";
import {
  getFinancialProgressData,
  getProjectBudget,
  productivityReducer,
} from "../../redux/slices/productivitySlice";
import { Dropdown } from "react-native-element-dropdown";
import { useAuth } from "../../context/authContext";
import { useGeneralContext } from "../../context/generalContext";
import { useFocusEffect } from "@react-navigation/native";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

LogBox.ignoreAllLogs();

const Dashboard = ({ navigation }) => {
  // Context instance
  const { user } = useAuth();
  const {
    projects,
    getStatsCount,
    statsCount,
    getAttendanceGraphData,
    attendanceGraphData,
    getPaymentsGraphData,
    paymentsGraphData,
    getContractorsGraphData,
    contractorsGraphData,
  } = useGeneralContext();

  // Initial Dates
  const startDate = moment().startOf("week").format("YYYY-MM-DD HH:mm:ss");
  const endDate = moment().endOf("week").format("YYYY-MM-DD HH:mm:ss");

  const getData = async () => {
    const promises = [];

    // Add getStatsCount to the promises array
    promises.push(
      getStatsCount().catch((error) => {
        ToastAndroid.show(error.message, ToastAndroid.SHORT);
      })
    );

    // Add getAttendanceGraphData only if projects exist
    if (projects !== null && projects.length > 0) {
      promises.push(
        getAttendanceGraphData(
          projects[0]?.projectId,
          startDate,
          endDate
        ).catch((error) => {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        })
      );
      promises.push(
        getPaymentsGraphData(projects[0]?.projectId, startDate, endDate).catch(
          (error) => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          }
        )
      );
      promises.push(
        getContractorsGraphData(projects[0]?.projectId, startDate).catch(
          (error) => {
            ToastAndroid.show(error.message, ToastAndroid.SHORT);
          }
        )
      );
    }

    // Execute all promises and wait for them to settle
    await Promise.allSettled(promises);
  };
  useEffect(() => {
    getData();
  }, [projects?.length]);

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

  const [currentProjectBudget, setCurrentProjectBudget] = useState(null);
  const [currentProjectFinancial, setCurrentProjectFinancial] = useState(null);
  const [currentProjectLabourTurnover, setCurrentProjectLabourTurnover] =
    useState(null);

  // Color Scheme
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === "dark";
  const textColor = isDarkMode ? "white" : "black";

  //! INSTANCES
  const dispatch = useDispatch();

  //! SELECTORS
  const token = useSelector(authToken);
  const isLoading = useSelector(loadingUsers);
  const projectsListSimple = useSelector(projectsListSimpleReducer);
  const {
    workerSkill,
    // attendanceGraphData,
    contractorsStats,
    payments,
    financialProgressMetrics,
    workforceMetrics,
    labourTurnoverMetrics,
    labourExpenseMetrics,
  } = useSelector(countReducer);
  const { projectBudgetData, financialGraphData } =
    useSelector(productivityReducer);
  // User Role instance
  const roles = user?.user?.role?.roleFeatureSets;
  const isDashboardPresent = roles.some(
    (item) => item.featureSet.name === "Dashboard"
  );

  function roundToNearestMultiple(number, multiple) {
    return Math.ceil(number / multiple) * multiple;
  }

  // Set projects list initially
  useFocusEffect(
    React.useCallback(() => {
      setFilteredDataSource(projects);
      setMasterDataSource(projects);
    }, [projects])
  );

  //! LIFE-CYCLE-METHODS --------------------------------
  useEffect(() => {
    // dispatch(getAllProjectsSimpleAction(token));
    setSelectedAttendanceProject(null);
    setAttendanceSelectedDate(new Date());
    setSelectedPaymentProject(null);
    setPaymentsSelectedDate(new Date());
    setSelectedContractorProject(null);
    setPieSelectedDate(new Date());
  }, []);

  useEffect(() => {
    if (projects) {
      // dispatch(
      //   getPayments(
      //     token,
      //     projects[0]?.projectId,
      //     moment().startOf("week").format("YYYY-MM-DD HH:mm:ss"),
      //     moment().endOf("week").format("YYYY-MM-DD HH:mm:ss")
      //   )
      // );
      // dispatch(
      //   getContractorsStats(
      //     token,
      //     projects[0]?.projectId,
      //     moment().format("YYYY-MM-DD")
      //   )
      // );
      dispatch(
        getWorkerSkills(
          token,
          "2022-08-31T19:00:00Z",
          moment().utc().format(),
          projects[0]?.projectId
        )
      );
      setCurrentProjectBudget(projects[0]?.projectId);
      setCurrentProjectFinancial(projects[0]?.projectId);
      setCurrentProjectLabourTurnover(projects[0]?.projectId);
      // Metrics
      dispatch(getFinancialProgressMetrics(token, projects[0]?.projectId));
      dispatch(getWorkforceMetrics(token, projects[0]?.projectId));
      dispatch(getLabourTurnoverMetrics(token, projects[0]?.projectId));
      dispatch(getProjectBudget(token, projects[0]?.projectId));
      dispatch(getFinancialProgressData(token, projects[0]?.projectId));
      dispatch(getLabourExpenseMetrics(token, projects[0]?.projectId));
    }
  }, [projects]);

  /**
   * Restructured attendance graph array
   *
   * @returns Array
   */
  const attendanceGraphsData = () => {
    return attendanceGraphData?.flatMap((item) => [
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
    if (attendanceGraphData) {
      let attendanceValues =
        attendanceGraphData &&
        attendanceGraphData?.map((item) => item.Present || item.Absent);

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
    return paymentsGraphData?.map((item) => ({
      value: item?.DueAmount <= 0 ? 0 : item?.DueAmount,
      label: item?.Day,
      labelTextStyle: { color: Colors.Black, fontSize: 10 },
    }));
  };

  const getPaymentMaxValue = () => {
    let paymentMax = 2000;
    if (paymentsGraphData) {
      let paymentValues =
        paymentsGraphData && paymentsGraphData?.map((item) => item.DueAmount);

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
      contractorsGraphData &&
      Object?.values(contractorsGraphData)[0]?.map((item, index) => ({
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

  const budgetGraphsData = () => {
    return projectBudgetData?.graphData?.flatMap((item) => [
      {
        value: item.budgetedCost || 0,
        label: item.label,
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: Colors.Black, fontSize: 10 },
        frontColor: Colors.Primary,
      },
      {
        value: item.actualCost || 0,
        frontColor: Colors.Purple,
      },
    ]);
  };

  const getBudgetMaxValue = () => {
    let maxCost = 100; // Initialize with negative infinity to ensure any value in the array will be greater

    // if (!projectBudgetData?.graphData) {
    for (const item of projectBudgetData?.graphData || []) {
      maxCost = Math.max(maxCost, item.actualCost, item.budgetedCost);
    }
    // }
    let attendanceMax = roundToNearestMultiple(maxCost, 100);
    return attendanceMax;
  };

  // Get financial progress graph data
  const getFinancialProgressGraphData = () => {
    let resultArray = [];
    if (financialGraphData && financialGraphData.length) {
      financialGraphData?.forEach((item) => {
        const month = item.month;
        const labelToCostMap = {};
        if (Array.isArray(item?.costbySOW)) {
          if (item?.costbySOW?.length) {
            item?.costbySOW?.forEach((costItem) => {
              const label = costItem?.label;
              const actualCost = costItem?.actualCost;
              if (!labelToCostMap[label]) {
                labelToCostMap[label] = actualCost;
              } else {
                labelToCostMap[label] += actualCost;
              }
            });
          }
        }

        const stacks = [];

        for (const label in labelToCostMap) {
          stacks.push({
            value: labelToCostMap[label],
            color: getColorForLabel(label),
          });
        }

        resultArray.push({ stacks, label: month });
      });
    }
    //   const arr = resultArray.map((item) => {
    //     item.stacks.length === 0&& (
    //   item.stacks.push({value: 0, color: "gray"
    // })));
    const arr = resultArray?.map((item) => {
      if (item?.stacks?.length === 0) {
        item?.stacks?.push({ value: 0, color: "white" });
      }
      return item;
    });

    return arr;
  };

  const highestValue = getFinancialProgressGraphData().reduce((max, item) => {
    const value = item.stacks[0].value;
    return value > max ? roundToNearestMultiple(value, 100) : max;
  }, 0);

  // Get color for the label
  function getColorForLabel(label) {
    // Define your color logic based on the label here
    // You can use a switch or other logic to assign colors
    // For simplicity, I'm using some example colors
    const colorMap = {
      Earthwork: "orange",
      "Civil Works": "#4ABFF4",
      Finishes: "green",
      "Electrical Works - LT": "red",
      "Electrical Works - HT": "yellow",
      "Plumbing Works": "blue",
      "HVAC Works": "pink",
      Glazing: "purple",
      "Fixed Millworks": "brown",
      "Swimming Pools & Water Bodies": "gray",
      "Mechanical Works": "black",
      Miscellaneous: "cyan",
      "General & NMR": "magenta",
    };
    return colorMap[label] || "gray"; // Default to gray if no color is defined
  }

  // const terminations = labourTurnoverMetrics && labourTurnoverMetrics?.terminations;
  // if (!terminations) {
  //   throw new Error("labourTurnoverMetrics.terminations is undefined");
  // }
  const allZero = ["jobEnded", "noShow", "misconduct", "tardiness"].every(
    (key) => labourTurnoverMetrics?.terminations[key] === 0
  );

  const data = allZero
    ? [
        {
          value: 100,
          color: Colors.Gray,
          text: "0%",
        },
      ]
    : [
        {
          value: labourTurnoverMetrics?.terminations.jobEnded || 0,
          color: Colors.Primary,
          text: `${labourTurnoverMetrics?.terminations.jobEnded || 0}%`,
        },
        {
          value: labourTurnoverMetrics?.terminations.noShow || 0,
          color: Colors.Purple,
          text: `${labourTurnoverMetrics?.terminations.noShow || 0}%`,
        },
        {
          value: labourTurnoverMetrics?.terminations.misconduct || 0,
          color: "#FFE6AE",
          text: `${labourTurnoverMetrics?.terminations.misconduct || 0}%`,
        },
        {
          value: labourTurnoverMetrics?.terminations.tardiness || 0,
          color: "#ABDFDF",
          text: `${labourTurnoverMetrics?.terminations.tardiness || 0}%`,
        },
      ];

  const allZeroVoluntary = [
    "takingBreak",
    "emergency",
    "delayedPayment",
    "betterWages",
  ].every((key) => labourTurnoverMetrics?.voluntaryExits[key] === 0);

  const voluntaryExitsData = allZeroVoluntary
    ? [
        {
          value: 100,
          color: Colors.Gray,
          text: "0%",
        },
      ]
    : [
        {
          value: labourTurnoverMetrics?.voluntaryExits?.takingBreak || 0,
          color: Colors.Primary,
          text: `${labourTurnoverMetrics?.voluntaryExits?.takingBreak || 0}%`,
        },
        {
          value: labourTurnoverMetrics?.voluntaryExits?.emergency || 0,
          color: Colors.Purple,
          text: `${labourTurnoverMetrics?.voluntaryExits?.emergency || 0}%`,
        },
        {
          value: labourTurnoverMetrics?.voluntaryExits?.delayedPayment || 0,
          color: "#FFE6AE",
          text: `${
            labourTurnoverMetrics?.voluntaryExits?.delayedPayment || 0
          }%`,
        },
        {
          value: labourTurnoverMetrics?.voluntaryExits?.betterWages || 0,
          color: "#ABDFDF",
          text: `${labourTurnoverMetrics?.voluntaryExits?.betterWages || 0}%`,
        },
      ];

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
      dispatch(getWorkforceMetrics(token, item?.projectId));
      dispatch(getLabourExpenseMetrics(token, item?.projectId));
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

  let currentPresent = attendanceGraphData?.filter((item) => {
    if (moment().format("ddd").toUpperCase() === item?.Day) {
      return item;
    }
  });

  let currentAbsent = attendanceGraphData?.filter((item) => {
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
            : projects[0]?.projectId,
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
            : projects[0]?.projectId,
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
          : projects[0]?.projectId,
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
          : projects[0]?.projectId,
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
                  if (projects) {
                    dispatch(
                      getAttendanceTrendline(
                        token,
                        projects[0]?.projectId,
                        moment().startOf("week").format("YYYY-MM-DD HH:mm:ss"),
                        moment().endOf("week").format("YYYY-MM-DD HH:mm:ss")
                      )
                    );
                    dispatch(
                      getPayments(
                        token,
                        projects[0]?.projectId,
                        moment().startOf("week").format("YYYY-MM-DD HH:mm:ss"),
                        moment().endOf("week").format("YYYY-MM-DD HH:mm:ss")
                      )
                    );
                    dispatch(
                      getContractorsStats(
                        token,
                        projects[0]?.projectId,
                        moment().format("YYYY-MM-DD")
                      )
                    );
                    dispatch(
                      getWorkerSkills(
                        token,
                        "2022-08-31T19:00:00Z",
                        moment().utc().format(),
                        projects[0]?.projectId
                      )
                    );
                    setCurrentProjectBudget(projects[0]?.projectId);
                    setCurrentProjectFinancial(projects[0]?.projectId);
                    setCurrentProjectLabourTurnover(projects[0]?.projectId);
                    // Metrics
                    dispatch(
                      getFinancialProgressMetrics(token, projects[0]?.projectId)
                    );
                    dispatch(
                      getWorkforceMetrics(token, projects[0]?.projectId)
                    );
                    dispatch(
                      getLabourExpenseMetrics(token, projects[0]?.projectId)
                    );
                    dispatch(
                      getLabourTurnoverMetrics(token, projects[0]?.projectId)
                    );
                    dispatch(getProjectBudget(token, projects[0]?.projectId));
                    dispatch(
                      getFinancialProgressData(
                        token,
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
                    <Text style={styles.num}>{statsCount?.totalProjects}</Text>
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
                    <Text style={styles.num}>
                      {statsCount?.totalContractor}
                    </Text>
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
                    <Text style={styles.num}>{statsCount?.workerPresent}</Text>
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
                    <Text style={styles.num}>{statsCount?.workerAbsent}</Text>
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
                <Text style={styles.graphHeadingText}>Labour Expense</Text>
                <View style={[styles.graphSubHeader, { marginBottom: 30 }]}>
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
              <View style={styles.graphBottom}>
                <View
                  style={[
                    styles.graphBottomTabs,
                    {
                      flexDirection: "column",
                      alignItems: "flex-start",
                    },
                  ]}
                >
                  <Text style={styles.graphBottomText}>
                    Average{"\n"}Daily Wage
                  </Text>
                  <Text style={[styles.graphBottomTextBold, { fontSize: 16 }]}>
                    {labourExpenseMetrics?.averageDailyWage
                      ? "₹" +
                        labourExpenseMetrics?.averageDailyWage?.toLocaleString()
                      : "0"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.graphBottomTabs,
                    {
                      flexDirection: "column",
                      alignItems: "flex-start",
                    },
                  ]}
                >
                  <Text style={[styles.graphBottomText]}>
                    Labour Cost{"\n"}Per Month{" "}
                  </Text>
                  <Text
                    style={[
                      styles.graphBottomTextBold,
                      { color: Colors.Purple, fontSize: 16 },
                    ]}
                  >
                    {labourExpenseMetrics?.totalExpenseForLast30Days
                      ? "₹" +
                        labourExpenseMetrics?.totalExpenseForLast30Days?.toLocaleString()
                      : "0"}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "90%",
                  // alignItems: "flex-end",
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    // width: "80%",
                    // justifyContent: "flex-start",
                    marginVertical: 15,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Lexend-Regular",
                      fontSize: 12,
                      color: Colors.Gray,
                    }}
                  >
                    Turnover{" "}
                  </Text>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: Colors.Primary,
                      borderRadius: 8,
                      padding: 5,
                      // width: "48%",
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Lexend-Regular",
                        fontSize: 12,
                        color: Colors.White,
                        paddingLeft: 5,
                        textAlign: "center",
                      }}
                    >
                      {workforceMetrics}
                    </Text>
                  </View>
                </View>
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
            {user?.user?.leadTypeId !== "LabourContractor" && (
              <View style={styles.scrollGraph}>
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
            <View style={styles.scrollGraph}>
              <View style={styles.graphsHeader}>
                <Text style={styles.graphHeadingText}>
                  Budgeted VS Actual Cost
                </Text>
                <View style={styles.graphSubHeader}>
                  <View style={styles.selectProjectButton}>
                    <View style={styles.buildingIconBg}>
                      <Building size={15} color={Colors.LightGray} />
                    </View>
                    <View>
                      <Text style={styles.selectText}>Select a Project</Text>
                      <Dropdown
                        style={{
                          height: 20,
                          marginTop: 3,
                          width: 200,
                          ...styles.selectText,
                        }}
                        placeholderStyle={{
                          fontSize: 10,
                          fontFamily: "Lexend-Regular",
                          color: Colors.Black,
                        }}
                        selectedTextStyle={{
                          fontSize: 10,
                          fontFamily: "Lexend-Regular",
                          color: Colors.Black,
                        }}
                        containerStyle={{ width: 250, height: 280 }}
                        itemTextStyle={{
                          fontFamily: "Lexend-Regular",
                          fontSize: 13,
                          color: Colors.FormText,
                        }}
                        iconStyle={styles.iconStyle}
                        data={
                          Array.isArray(projectsListSimple) &&
                          projectsListSimple.length > 0
                            ? projectsListSimple.map((ele) => ({
                                label: ele?.name,
                                value: ele?.projectId,
                                ...ele,
                              }))
                            : [
                                {
                                  label: "No Projects",
                                  value: "No Projects",
                                },
                              ]
                        }
                        maxHeight={400}
                        labelField="label"
                        valueField="value"
                        placeholder={"Project"}
                        value={currentProjectBudget}
                        onChange={(item) => {
                          if (item) {
                            setCurrentProjectBudget(item);
                            dispatch(getProjectBudget(token, item?.value));
                          } else {
                            setCurrentProjectBudget(
                              projectsListSimple[0]?.projectId
                            );
                            dispatch(
                              getProjectBudget(
                                token,
                                projectsListSimple[0]?.projectId
                              )
                            );
                          }
                        }}
                      />
                    </View>
                  </View>
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
                  <Text style={styles.attendanceSubText}>Budget Cost</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <DotIcon color={Colors.Purple} size={40} />
                  <Text style={styles.attendanceSubText}>Actual Cost</Text>
                </View>
              </View>
              <View style={styles.barChart}>
                <BarChart
                  data={projectBudgetData && budgetGraphsData()}
                  barWidth={6}
                  spacing={30}
                  roundedTop
                  xAxisThickness={0}
                  yAxisThickness={0}
                  yAxisTextStyle={{ color: "gray" }}
                  xAxisTextStyle={{ color: "gray" }}
                  noOfSections={5}
                  maxValue={projectBudgetData && getBudgetMaxValue()}
                  frontColor={Colors.Black}
                  height={180}
                  renderTooltip={(e) => {
                    return (
                      <View>
                        <Text
                          style={{
                            color: Colors.Black,
                            fontFamily: "Lexend-Regular",
                            fontSize: 12,
                          }}
                        >
                          {e.value}
                        </Text>
                      </View>
                    );
                  }}
                  width={260}
                />
              </View>
              <View style={styles.graphBottom}>
                <View style={[styles.graphBottomTabs]}>
                  <Text style={styles.graphBottomText}>
                    Budget
                    {"\n"}Cost{" "}
                  </Text>
                  <Text style={[styles.graphBottomTextBold, { fontSize: 14 }]}>
                    {`₹${
                      projectBudgetData?.budgetedCost?.toLocaleString() || "0"
                    }`}
                  </Text>
                </View>
                <View style={styles.graphBottomTabs}>
                  <Text style={styles.graphBottomText}>Actual{"\n"}Cost </Text>
                  <Text
                    style={[
                      styles.graphBottomTextBold,
                      { color: Colors.Purple, fontSize: 14 },
                    ]}
                  >
                    {`₹${
                      projectBudgetData?.actualCost?.toLocaleString() || "0"
                    }`}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  justifyContent: "flex-start",
                  marginVertical: 15,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Lexend-Regular",
                    fontSize: 12,
                    color: Colors.Gray,
                  }}
                >
                  Cost To Complete{" "}
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Colors.Primary,
                    borderRadius: 8,
                    padding: 5,
                    // width: "48%",
                    marginLeft: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Lexend-Regular",
                      fontSize: 12,
                      color: Colors.White,
                      paddingLeft: 5,
                    }}
                  >
                    {projectBudgetData &&
                    typeof projectBudgetData.budgetedCost === "number" &&
                    typeof projectBudgetData.actualCost === "number"
                      ? `₹${(
                          projectBudgetData?.budgetedCost -
                          projectBudgetData?.actualCost
                        ).toLocaleString()}`
                      : "0"}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.scrollGraph}>
              <View style={styles.graphsHeader}>
                <Text style={styles.graphHeadingText}>Financial Progress</Text>
                <View style={styles.graphSubHeader}>
                  <View style={styles.selectProjectButton}>
                    <View style={styles.buildingIconBg}>
                      <Building size={15} color={Colors.LightGray} />
                    </View>
                    <View>
                      <Text style={styles.selectText}>Select a Project</Text>
                      <Dropdown
                        style={{
                          height: 20,
                          marginTop: 3,
                          width: 200,
                          ...styles.selectText,
                        }}
                        placeholderStyle={{
                          fontSize: 10,
                          fontFamily: "Lexend-Regular",
                          color: Colors.Black,
                        }}
                        selectedTextStyle={{
                          fontSize: 10,
                          fontFamily: "Lexend-Regular",
                          color: Colors.Black,
                        }}
                        containerStyle={{ width: 250 }}
                        itemTextStyle={{
                          fontFamily: "Lexend-Regular",
                          fontSize: 13,
                          color: Colors.FormText,
                        }}
                        iconStyle={styles.iconStyle}
                        data={
                          Array.isArray(projectsListSimple) &&
                          projectsListSimple.length > 0
                            ? projectsListSimple.map((ele) => ({
                                label: ele?.name,
                                value: ele?.projectId,
                                ...ele,
                              }))
                            : [
                                {
                                  label: "No Projects",
                                  value: "No Projects",
                                },
                              ]
                        }
                        maxHeight={400}
                        labelField="label"
                        valueField="value"
                        placeholder={"Project"}
                        value={currentProjectFinancial}
                        onChange={(item) => {
                          if (item) {
                            setCurrentProjectFinancial(item);
                            dispatch(
                              getFinancialProgressData(token, item?.value)
                            );
                            dispatch(
                              getFinancialProgressMetrics(token, item?.value)
                            );
                          } else {
                            setCurrentProjectFinancial(
                              projectsListSimple[0]?.projectId
                            );
                            dispatch(
                              getFinancialProgressData(
                                token,
                                projectsListSimple[0]?.projectId
                              )
                            );
                            dispatch(
                              getFinancialProgressMetrics(
                                token,
                                projectsListSimple[0]?.projectId
                              )
                            );
                          }
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <ScrollView
                horizontal={true}
                nestedScrollEnabled={true}
                contentContainerStyle={[
                  styles.barChart,
                  {
                    paddingBottom: 60,
                    marginTop: 40,
                    width: 560,
                  },
                ]}
              >
                <BarChart
                  height={180}
                  barWidth={20}
                  xAxisLabelTextStyle={{ color: "gray" }}
                  yAxisTextStyle={{ color: "gray" }}
                  frontColor={Colors.Black}
                  noOfSections={4}
                  maxValue={highestValue || 100}
                  stackData={
                    financialGraphData && getFinancialProgressGraphData()
                  }
                  renderTooltip={(e) => {
                    return (
                      <View>
                        {e.stacks.map((item) => (
                          <Text
                            style={{
                              color: Colors.Black,
                              fontFamily: "Lexend-Regular",
                              fontSize: 12,
                              marginVertical: 5,
                              marginLeft: 10,
                            }}
                          >
                            {item.value}
                          </Text>
                        ))}
                      </View>
                    );
                  }}
                  width={800}
                />
              </ScrollView>
              <View style={styles.graphBottom}>
                <View
                  style={[
                    styles.graphBottomTabs,
                    {
                      flexDirection: "column",
                      alignItems: "flex-start",
                    },
                  ]}
                >
                  <Text style={styles.graphBottomText}>
                    Required{"\n"}Production Rate
                  </Text>
                  <Text style={[styles.graphBottomTextBold, { fontSize: 16 }]}>
                    {currentPresent?.length > 0
                      ? financialProgressMetrics?.requiredProductionRate
                        ? "₹" +
                          financialProgressMetrics?.requiredProductionRate?.toLocaleString()
                        : "0"
                      : 0}
                  </Text>
                </View>
                <View
                  style={[
                    styles.graphBottomTabs,
                    {
                      flexDirection: "column",
                      alignItems: "flex-start",
                    },
                  ]}
                >
                  <Text style={[styles.graphBottomText]}>
                    Actual{"\n"}Production Rate{" "}
                  </Text>
                  <Text
                    style={[
                      styles.graphBottomTextBold,
                      { color: Colors.Purple, fontSize: 16 },
                    ]}
                  >
                    {currentPresent?.length > 0
                      ? financialProgressMetrics?.actualProductionRate
                        ? "₹" +
                          financialProgressMetrics?.actualProductionRate?.toLocaleString()
                        : "0"
                      : 0}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.scrollGraph}>
              <View style={styles.graphsHeader}>
                <Text style={styles.graphHeadingText}>Labour Turnover</Text>
                <View style={styles.graphSubHeader}>
                  <View style={styles.selectProjectButton}>
                    <View style={styles.buildingIconBg}>
                      <Building size={15} color={Colors.LightGray} />
                    </View>
                    <View>
                      <Text style={styles.selectText}>Select a Project</Text>
                      <Dropdown
                        style={{
                          height: 20,
                          marginTop: 3,
                          width: 200,
                          ...styles.selectText,
                        }}
                        placeholderStyle={{
                          fontSize: 10,
                          fontFamily: "Lexend-Regular",
                          color: Colors.Black,
                        }}
                        selectedTextStyle={{
                          fontSize: 10,
                          fontFamily: "Lexend-Regular",
                          color: Colors.Black,
                        }}
                        containerStyle={{ width: 250, height: 280 }}
                        itemTextStyle={{
                          fontFamily: "Lexend-Regular",
                          fontSize: 13,
                          color: Colors.FormText,
                        }}
                        iconStyle={styles.iconStyle}
                        data={
                          Array.isArray(projectsListSimple) &&
                          projectsListSimple.length > 0
                            ? projectsListSimple.map((ele) => ({
                                label: ele?.name,
                                value: ele?.projectId,
                                ...ele,
                              }))
                            : [
                                {
                                  label: "No Projects",
                                  value: "No Projects",
                                },
                              ]
                        }
                        maxHeight={400}
                        labelField="label"
                        valueField="value"
                        placeholder={"Project"}
                        value={currentProjectLabourTurnover}
                        onChange={(item) => {
                          if (item) {
                            setCurrentProjectLabourTurnover(item);
                            dispatch(
                              getLabourTurnoverMetrics(token, item?.value)
                            );
                          } else {
                            setCurrentProjectLabourTurnover(
                              projectsListSimple[0]?.projectId
                            );
                            dispatch(
                              getLabourTurnoverMetrics(
                                token,
                                projectsListSimple[0]?.projectId
                              )
                            );
                          }
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "Lexend-Bold",
                      fontSize: 14,
                      color: Colors.Gray,
                    }}
                  >
                    Terminations
                  </Text>
                </View>
                {labourTurnoverMetrics &&
                labourTurnoverMetrics?.terminations?.jobEnded === 0 &&
                labourTurnoverMetrics?.terminations?.noShow === 0 &&
                labourTurnoverMetrics?.terminations?.misconduct === 0 &&
                labourTurnoverMetrics?.terminations?.tardiness === 0 ? (
                  <Text
                    style={{
                      fontFamily: "Lexend-Regular",
                      fontSize: 12,
                      color: Colors.Gray,
                    }}
                  >
                    No Data Available
                  </Text>
                ) : (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <DotIcon color={Colors.Primary} size={40} />
                        <Text
                          style={[
                            styles.attendanceSubText,
                            { color: Colors.Primary },
                          ]}
                        >
                          Job Ended:{" "}
                          {labourTurnoverMetrics?.terminations?.jobEnded}%
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <DotIcon color={Colors.Purple} size={40} />
                        <Text
                          style={[
                            styles.attendanceSubText,
                            { color: Colors.Purple },
                          ]}
                        >
                          No Show: {labourTurnoverMetrics?.terminations?.noShow}
                          %
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <DotIcon color={"yellow"} size={40} />
                        <Text
                          style={[
                            styles.attendanceSubText,
                            { color: "yellow" },
                          ]}
                        >
                          Misconduct:{" "}
                          {labourTurnoverMetrics?.terminations?.misconduct}%
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <DotIcon color={"#A1E7E6"} size={40} />
                        <Text
                          style={[
                            styles.attendanceSubText,
                            { color: "#A1E7E6" },
                          ]}
                        >
                          Tardiness:{" "}
                          {labourTurnoverMetrics?.terminations?.tardiness}%
                        </Text>
                      </View>
                    </View>
                  </>
                )}
                <View style={styles.barChart}>
                  <PieChart
                    donut
                    showText
                    textColor="black"
                    radius={100}
                    textSize={11}
                    showTextBackground
                    textBackgroundRadius={15}
                    data={data}
                  />
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "Lexend-Bold",
                      fontSize: 14,
                      color: Colors.Gray,
                    }}
                  >
                    Voluntary Exits
                  </Text>
                </View>
                {labourTurnoverMetrics &&
                labourTurnoverMetrics?.voluntaryExits?.takingBreak === 0 &&
                labourTurnoverMetrics?.voluntaryExits?.emergency === 0 &&
                labourTurnoverMetrics?.voluntaryExits?.delayedPayment === 0 &&
                labourTurnoverMetrics?.voluntaryExits?.betterWages === 0 ? (
                  <Text
                    style={{
                      fontFamily: "Lexend-Medium",
                      fontSize: 12,
                      color: Colors.Gray,
                      marginVertical: 10,
                    }}
                  >
                    No Data!
                  </Text>
                ) : (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <DotIcon color={Colors.Primary} size={40} />
                        <Text
                          style={[
                            styles.attendanceSubText,
                            { color: Colors.Primary },
                          ]}
                        >
                          Taking Break:{" "}
                          {labourTurnoverMetrics?.voluntaryExits?.takingBreak}%
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <DotIcon color={Colors.Purple} size={40} />
                        <Text
                          style={[
                            styles.attendanceSubText,
                            { color: Colors.Purple },
                          ]}
                        >
                          Emergency:{" "}
                          {labourTurnoverMetrics?.voluntaryExits?.emergency}%
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <DotIcon color={"yellow"} size={40} />
                        <Text
                          style={[
                            styles.attendanceSubText,
                            { color: "yellow" },
                          ]}
                        >
                          Payment Delayed:{" "}
                          {
                            labourTurnoverMetrics?.voluntaryExits
                              ?.delayedPayment
                          }
                          %
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <DotIcon color={"#A1E7E6"} size={40} />
                        <Text
                          style={[
                            styles.attendanceSubText,
                            { color: "#A1E7E6" },
                          ]}
                        >
                          Better Wages:{" "}
                          {labourTurnoverMetrics?.voluntaryExits?.betterWages}%
                        </Text>
                      </View>
                    </View>
                  </>
                )}
                <View style={styles.barChart}>
                  <PieChart
                    donut
                    // isThreeD
                    showText
                    textColor="black"
                    radius={100}
                    textSize={11}
                    showTextBackground
                    textBackgroundRadius={15}
                    data={voluntaryExitsData}
                  />
                </View>
              </View>

              <View style={styles.graphBottom}>
                <View style={[styles.graphBottomTabs]}>
                  <Text style={styles.graphBottomText}>
                    Average
                    {"\n"}Turnover Rate{" "}
                  </Text>
                  <Text style={[styles.graphBottomTextBold, { fontSize: 14 }]}>
                    {`${
                      labourTurnoverMetrics
                        ? labourTurnoverMetrics?.averageTurnOverRate?.toLocaleString()
                        : "0"
                    }`}
                  </Text>
                </View>
                <View style={styles.graphBottomTabs}>
                  <Text style={styles.graphBottomText}>
                    Workers{"\n"}Exited{" "}
                  </Text>
                  <Text
                    style={[
                      styles.graphBottomTextBold,
                      { color: Colors.Purple, fontSize: 14 },
                    ]}
                  >
                    {`${
                      labourTurnoverMetrics
                        ? labourTurnoverMetrics?.workersExited.toLocaleString()
                        : "0"
                    }`}
                  </Text>
                </View>
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
