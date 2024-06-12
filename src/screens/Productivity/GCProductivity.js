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
  DocumentIcon,
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
  getScopeList,
  productivityReducer,
  rejectBOQProgress,
  verifyBOQProgress,
} from "../../redux/slices/productivitySlice";
import Toast from "react-native-toast-message";
import { launchImageLibrary } from "react-native-image-picker";
import DatePicker from "react-native-date-picker";

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
  const [openActionModal2, setOpenActionModal2] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openSearchUserModal, setOpenSearchUserModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [contractor, setContractor] = useState(null);
  const [rejectQuality, setRejectQuality] = useState(null);
  const [rejectMeasurement, setRejectMeasure] = useState(null);
  const [approveMeasurement, setApproveMeasurement] = useState(null);
  const [scope, setScope] = useState(null);
  const [currFieldNote, setCurrFieldNote] = useState(null);
  const [currBoq, setCurrBoq] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [openFieldNote, setOpenFieldNote] = useState(false);
  const [fieldPic, setFieldPic] = useState("");
  const [fieldPicForm, setFieldPicForm] = useState("");
  const [scopeValue, setScopeValue] = useState(null);
  const [contractorValue, setContractorValue] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [selectedProjectNote, setSelectedProjectNote] = useState(null);
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
  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
      selectionLimit: 1,
    });
    if (result?.assets?.length > 0) {
      setFieldPicForm(result);
      setFieldPic(result?.assets[0]?.uri);
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

  const submitHandler = async () => {
    const formData = new FormData();
    if (!fieldPic) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select image.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!scopeValue) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select scope of work.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!description) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter description.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!contractorValue) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select contractor.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!selectedProjectNote) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select project.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!location) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter location.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!date) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select date.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!time) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select time.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else {
      formData.append("ScopeOfWorkId", parseInt(scopeValue, 10));
      formData.append("ContractorId", parseInt(contractorValue, 10));
      formData.append("ProjectId", parseInt(selectedProjectNote, 10));
      formData.append("Description", description);
      formData.append("Location", location);
      formData.append("Image", {
        name: fieldPicForm?.assets[0]?.fileName,
        type: fieldPicForm?.assets[0]?.type,
        uri: fieldPicForm?.assets[0]?.uri, //Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
      formData.append(
        "DateTime",
        `${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm")}`
      );

      const response = await dispatch(createFieldNoteEntry(token, formData));
      if (response.status === 200) {
        setOpenFieldNote(false);
        Toast.show({
          type: "info",
          text1: "Field Note Created",
          text2: "New Field Note is created successfully.",
          topOffset: 10,
          position: "top",
          visibilityTime: 4000,
        });
        setScopeValue(null);
        setContractorValue(null);
        setDescription("");
        setLocation("");
        setFieldPic("");
        setFieldPicForm("");
        setDate(new Date());
        setTime(null);
        setSelectedProjectNote(null);
      }
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
                  Quality
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                <Cross
                  onPress={() => {
                    setOpenActionModal(!openActionModal);
                    setRejectQuality(null);
                  }}
                  size={22}
                  color={Colors.Black}
                />
              </View>
            </View>
            <View>
              <DocumentIcon size={50} color={Colors.Black} />
            </View>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                onPress={async () => {
                  const obj = {
                    boqProgressId: currBoq?.contractorBOQProgressId,
                    boqVerificationType: "Quality",
                  };
                  let resp = await dispatch(verifyBOQProgress(token, obj));
                  if (resp.status === 200) {
                    dispatch(
                      getBOQListGC(
                        token,
                        selectedProject?.projectId
                        // LabourContractor?.userId
                      )
                    );
                    setOpenActionModal(false);
                    Toast.show({
                      type: "info",
                      text1: "Success",
                      text2: "Quantity approved successfully!",
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
                  }
                }}
                disabled={currBoq?.isQualityApproved ? true : false}
                style={{
                  width: "100%",
                  backgroundColor: currBoq?.isQualityApproved
                    ? Colors.Gray
                    : "#81B733",
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
            </View>
            {/* <View style={{ marginTop: 10 }}>
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
                  data={[
                    { value: "PoorWorkmanship", label: "Poor Workmanship" },
                    { value: "MaterialDefects", label: "Material Defects" },
                  ]}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={"Reject Reason"}
                  value={rejectQuality}
                  disable={currBoq?.boqQualityRejectStatus ? true : false}
                  onChange={async (item) => {
                    setRejectQuality(item.value);
                    const obj = {
                      boqProgressId: currBoq?.contractorBOQProgressId,
                      boqVerificationType: "Quality",
                      qualityRejectStatus: item.value,
                    };
                    let resp = await dispatch(rejectBOQProgress(token, obj));
                    if (resp.status === 200) {
                      dispatch(
                        getBOQListGC(
                          token,
                          selectedProject?.projectId
                          // LabourContractor?.userId
                        )
                      );
                      setOpenActionModal(false);
                      setRejectQuality(null);
                      Toast.show({
                        type: "info",
                        text1: "Success",
                        text2: "Quantity Rejected successfully!",
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
                    }
                  }}
                />
              </View> */}
          </View>
        </View>
      </Modal>
    );
  };
  const renderMeasurementModal = () => {
    return (
      <Modal
        isVisible={openActionModal2}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenActionModal2(!openActionModal2)}
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
                  Measurement
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                <Cross
                  onPress={() => {
                    setOpenActionModal2(!openActionModal2);
                    setRejectMeasure(null);
                  }}
                  size={22}
                  color={Colors.Black}
                />
              </View>
            </View>
            <View style={{ marginTop: 20 }}>
              {/* <TouchableOpacity
                onPress={async () => {
                  const obj = {
                    boqProgressId: currBoq?.contractorBOQProgressId,
                    boqVerificationType: "Measurement",
                  };
                  let resp = await dispatch(verifyBOQProgress(token, obj));
                  if (resp.status === 200) {
                    dispatch(
                      getBOQListGC(
                        token,
                        selectedProject?.projectId
                        // LabourContractor?.userId
                      )
                    );
                    setOpenActionModal2(false);
                    Toast.show({
                      type: "info",
                      text1: "Success",
                      text2: "Measurement approved successfully!",
                      topOffset: 10,
                      position: "top",
                      visibilityTime: 4000,
                    });
                  } else {
                    Toast.show({
                      type: "Error",
                      text1: "Error",
                      text2: "Something went wrong!",
                      topOffset: 10,
                      position: "top",
                      visibilityTime: 4000,
                    });
                  }
                }}
                disabled={currBoq?.isMeasurementApproved ? true : false}
                style={{
                  width: "100%",
                  backgroundColor: currBoq?.isMeasurementApproved
                    ? Colors.Gray
                    : "#81B733",
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
              </TouchableOpacity> */}
              <View style={{ marginTop: 10 }}>
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
                  data={[
                    {
                      value: "DesignChange",
                      label: "Design Change",
                    },
                    {
                      value: "IncorrectEstimation",
                      label: "Incorrect Estimation",
                    },
                    {
                      value: "Rework",
                      label: "Rework",
                    },
                  ]}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={"Approve Reason"}
                  value={approveMeasurement}
                  disable={currBoq?.isMeasurementApproved ? true : false}
                  onChange={async (item) => {
                    setApproveMeasurement(item.value);
                    const obj = {
                      boqProgressId: currBoq?.contractorBOQProgressId,
                      measurementApprovedStatus: item.value,
                    };
                    let resp = await dispatch(
                      approveBOQMeasurementReason(token, obj)
                    );
                    if (resp.status === 200) {
                      dispatch(
                        getBOQListGC(
                          token,
                          selectedProject?.projectId
                          // LabourContractor?.userId
                        )
                      );
                      setOpenActionModal2(false);
                      setApproveMeasurement(null);
                      Toast.show({
                        type: "info",
                        text1: "Success",
                        text2: "Measurement Approved successfully!",
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
                    }
                  }}
                />
              </View>
              <View style={{ marginTop: 10 }}>
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
                  data={[
                    {
                      value: "VariationDisapproved",
                      label: "Variation Disapproved",
                    },
                    {
                      value: "IncorrectMeasurement",
                      label: "Incorrect Measurement",
                    },
                  ]}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={"Reject Reason"}
                  value={rejectMeasurement}
                  disable={currBoq?.boqMeasurementRejectStatus ? true : false}
                  onChange={async (item) => {
                    setRejectMeasure(item.value);
                    const obj = {
                      boqProgressId: currBoq?.contractorBOQProgressId,
                      boqVerificationType: "Measurement",
                      measurementRejectStatus: item.value,
                    };
                    let resp = await dispatch(rejectBOQProgress(token, obj));
                    if (resp.status === 200) {
                      dispatch(
                        getBOQListGC(
                          token,
                          selectedProject?.projectId
                          // LabourContractor?.userId
                        )
                      );
                      setOpenActionModal2(false);
                      setRejectMeasure(null);
                      Toast.show({
                        type: "info",
                        text1: "Success",
                        text2: "Measurement Rejected successfully!",
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
                    }
                  }}
                />
              </View>
              {/* <TextInput
                style={styles.dropdown}
                placeholder="Remarks"
                placeholderTextColor={Colors.LightGray}
                multiline={true}
                value={remarks}
                onChangeText={(text) => setRemarks(text)}
                editable={currBoq?.status === "Approved" ? false : true}
              /> */}
              {/* <View style={{ marginTop: 20 }}>
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
              </View> */}
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

  const renderFieldNotes = () => {
    return (
      <Modal
        isVisible={openFieldNote}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenFieldNote(!openFieldNote)}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: Colors.White,
            height: "90%",
            borderRadius: 10,
            padding: 15,
          }}
        >
          <ScrollView contentContainerStyle={{}}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                marginTop: 20,
                paddingBottom: 15,
              }}
            >
              <Pressable
                onPress={() => {
                  handleImagePicker();
                }}
                style={{ width: "28%" }}
              >
                {fieldPic ? (
                  <Image
                    source={{ uri: fieldPic }}
                    style={{ width: "100%", height: 82, borderRadius: 5 }}
                  />
                ) : (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      borderColor: Colors.FormBorder,
                      borderStyle: "dashed",
                      borderWidth: 1,
                      borderRadius: 5,
                      width: "100%",
                      height: 82,
                    }}
                  >
                    <Picture size={38} color={"#D1E0EE"} />
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        fontSize: 10,
                        color: Colors.Primary,
                        textTransform: "uppercase",
                        textDecorationLine: "underline",
                      }}
                    >
                      Add Picture
                    </Text>
                  </View>
                )}
              </Pressable>
              <View style={{ width: "68%" }}>
                <Text style={styles.titleNote}>Scope of work</Text>
                <View style={{ marginTop: 7 }}>
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
                    data={scopeList?.map((ele) => ({
                      label: ele?.name,
                      value: ele?.scopeOfWorkId,
                    }))}
                    maxHeight={500}
                    labelField="label"
                    valueField="value"
                    placeholder={"Select Scope"}
                    value={scopeValue}
                    onChange={(item) => {
                      setScopeValue(item.value);
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
              <Text style={styles.titleNote}>Description</Text>
              <TextInput
                style={{
                  fontFamily: "Lexend-Regular",
                  borderWidth: 1,
                  borderColor: Colors.FormBorder,
                  marginTop: 7,
                  borderRadius: 4,
                  paddingHorizontal: 7,
                  fontSize: 12,
                  height: 50,
                  backgroundColor: Colors.White,
                  elevation: 3,
                  color: Colors.Black,
                }}
                onChangeText={(e) => setDescription(e)}
                value={description}
                placeholderTextColor={Colors.FormText}
                placeholder="Enter Description"
              />
            </View>
            <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
              <Text style={styles.titleNote}>Select Contractor</Text>
              <View style={{ marginTop: 7 }}>
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
                  value={contractorValue}
                  onChange={(item) => {
                    setContractorValue(item.value);
                  }}
                />
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                paddingBottom: 15,
              }}
            >
              <Text style={styles.titleNote}>Select Project</Text>
              <View style={{ marginTop: 7 }}>
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
                  data={projectsListSimple.map((ele) => ({
                    label: ele.name,
                    value: ele.projectId,
                  }))}
                  autoScroll={false}
                  search
                  searchPlaceholder="Search project"
                  inputSearchStyle={{ color: Colors.Black }}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={"Select Project"}
                  value={selectedProjectNote}
                  onChange={(item) => {
                    setSelectedProjectNote(item.value);
                    // dispatch(getLabourContactorAction(token, item.value));
                  }}
                />
              </View>
            </View>
            <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
              <Text style={styles.titleNote}>Location</Text>
              <TextInput
                style={{
                  fontFamily: "Lexend-Regular",
                  borderWidth: 1,
                  borderColor: Colors.FormBorder,
                  marginTop: 7,
                  borderRadius: 4,
                  paddingHorizontal: 7,
                  fontSize: 12,
                  height: 50,
                  backgroundColor: Colors.White,
                  elevation: 3,
                  color: Colors.Black,
                }}
                onChangeText={(e) => setLocation(e)}
                value={location}
                placeholderTextColor={Colors.FormText}
                placeholder="Enter Location"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: 15,
                paddingBottom: 15,
              }}
            >
              <View style={{ width: "48%" }}>
                <Text style={styles.titleNote}>Select Date</Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontFamily: "Lexend-Regular",
                      borderWidth: 1,
                      borderColor: Colors.FormBorder,
                      marginTop: 7,
                      borderRadius: 4,
                      paddingHorizontal: 7,
                      fontSize: 12,
                      height: 50,
                      backgroundColor: Colors.White,
                      elevation: 3,
                      color: Colors.Black,
                    },
                  ]}
                >
                  <TextInput
                    style={{
                      fontFamily: "Lexend-Regular",
                      color: Colors.Black,
                      fontSize: 12,
                      width: "80%",
                    }}
                    onPressIn={() => setOpen(true)}
                    placeholderTextColor={Colors.FormText}
                    placeholder="mm/dd/yyyy"
                    value={
                      date ? moment(date).format("MM/DD/YYYY") : "mm/dd/yyyy"
                    }
                    // onChangeText={(text) => setJobDate(text)}
                  />
                  <DateIcon
                    onPress={() => setOpen(true)}
                    color={Colors.FormBorder}
                    size={22}
                  />
                </View>
              </View>
              <View style={{ width: "48%" }}>
                <Text style={styles.titleNote}>Select TIME</Text>
                <Pressable
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontFamily: "Lexend-Regular",
                      borderWidth: 1,
                      borderColor: Colors.FormBorder,
                      marginTop: 7,
                      borderRadius: 4,
                      paddingHorizontal: 7,
                      fontSize: 12,
                      height: 50,
                      backgroundColor: Colors.White,
                      elevation: 3,
                      color: Colors.Black,
                    },
                  ]}
                  onPress={() => setOpenTime(true)}
                >
                  <TextInput
                    style={{
                      fontFamily: "Lexend-Regular",
                      color: Colors.Black,
                      fontSize: 12,
                      width: "80%",
                    }}
                    onPressIn={() => setOpenTime(true)}
                    placeholderTextColor={Colors.FormText}
                    placeholder="----"
                    value={time ? moment(time).format("hh:mm A") : "----"}
                  />
                  <ClockIcon
                    onPress={() => setOpenTime(true)}
                    color={Colors.FormBorder}
                    size={20}
                  />
                </Pressable>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={[styles.button, { width: "60%" }]}
              onPress={() => {
                submitHandler();
              }}
            >
              <Text style={styles.buttonText}>{"Create Note"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { width: "35%", backgroundColor: Colors.Secondary },
              ]}
              onPress={() => {
                setOpenFieldNote(false);
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  const Item = ({ item, index }) => (
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
        <View style={{ width: "40%" }}>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              fontSize: 12,
              color: Colors.FormBorder,
            }}
          >
            BOQ ID:{" "}
            <Text style={{ color: Colors.Black }}>
              {item?.boqNumber || "0"}
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
            <Text style={{ color: Colors.Black }}>{item?.boqCode || "0"}</Text>
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
              {item?.workOrderNumber || "0"}
            </Text>
          </Text>
        </View>
        <View
          style={{
            width: "60%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Pressable
            style={{
              backgroundColor: Colors.PrimaryLight,
              paddingHorizontal: 5,
              borderRadius: 3,
              paddingVertical: 2,
              width: "45%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setOpenActionModal(true);
              setCurrBoq(item);
              setRemarks(item?.remarks);
              setRejectQuality(item?.boqQualityRejectStatus);
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: Colors.Primary,
                fontFamily: "Lexend-Medium",
              }}
            >
              Verify
            </Text>
          </Pressable>
          {/* <Pressable
            style={{
              backgroundColor: Colors.PrimaryLight,
              paddingHorizontal: 5,
              borderRadius: 3,
              paddingVertical: 2,
              width: "38%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setOpenActionModal2(true);
              setCurrBoq(item);
              setRejectMeasure(item?.boqMeasurementRejectStatus);
            }}
          >
            <Text style={{ fontSize: 10, color: Colors.Primary }}>
              Measurement
            </Text>
          </Pressable> */}
          {/* <Pressable
            style={{
              backgroundColor: Colors.PrimaryLight,
              paddingHorizontal: 5,
              borderRadius: 3,
              paddingVertical: 2,
              width: "34%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              setOpenFieldNote(true);
            }}
          >
            <Text style={{ fontSize: 10, color: Colors.Primary }}>
              Field Notes
            </Text>
          </Pressable> */}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <View style={{ width: "40%" }}>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              fontSize: 18,
              color: Colors.Black,
            }}
            numberOfLines={1}
          >
            {item?.scopeOfWorkName || "N/A"}
          </Text>
        </View>
        <View style={{ width: "60%" }}>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              fontSize: 12,
              color: Colors.FormBorder,
            }}
          >
            DESCRIPTION
          </Text>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              fontSize: 12,
              color: Colors.Black,
            }}
            numberOfLines={1}
          >
            {item?.description || "N/A"}
          </Text>
        </View>
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
        <View style={{ width: "30%", alignItems: "center" }}>
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
            {item?.title || "N/A"}
          </Text>
        </View>
        <View style={{ width: "35%", alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Lexend-SemiBold",
              fontSize: 12,
              color: Colors.Gray,
            }}
          >
            QUANTITY
          </Text>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              fontSize: 12,
              color: Colors.Black,
              marginTop: 5,
            }}
          >
            {item?.quantity || "N/A"}
          </Text>
        </View>
        <View style={{ width: "30%", alignItems: "center" }}>
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
            {item?.unitName || "N/A"}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ width: "30%", alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Lexend-SemiBold",
              fontSize: 12,
              color: Colors.Gray,
            }}
          >
            PERCENTAGE
          </Text>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              fontSize: 12,
              color: Colors.Black,
              marginTop: 5,
            }}
          >
            {item?.percentage.toFixed(2) || "N/A"}
          </Text>
        </View>
        <View style={{ width: "35%", alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Lexend-SemiBold",
              fontSize: 12,
              color: Colors.Gray,
              textAlign: "center",
            }}
          >
            QTY LEFT
          </Text>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              fontSize: 12,
              color: Colors.Black,
              marginTop: 5,
            }}
          >
            {item?.measurementLeft || "N/A"}
          </Text>
        </View>
        <View style={{ width: "30%", alignItems: "center" }}>
          <Text
            style={{
              fontFamily: "Lexend-SemiBold",
              fontSize: 12,
              color: Colors.Gray,
            }}
          >
            BILLING COST
          </Text>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              fontSize: 12,
              color: Colors.Black,
              marginTop: 5,
            }}
          >
            {item?.billingCost || "N/A"}
          </Text>
        </View>
      </View>
    </View>
    // <View style={[styles.item]} key={item.key}>
    //   <View
    //     style={{
    //       flexDirection: "row",
    //       alignItems: "center",
    //       width: "100%",
    //       justifyContent: "space-between",
    //       backgroundColor: "#ffffff",
    //       paddingHorizontal: 8,
    //       paddingVertical: 4,
    //     }}
    //   >
    //     <View style={{ width: "7%" }}>
    //       <Text style={styles.flatListText}>{item?.boqId || "0"}</Text>
    //     </View>
    //     <View
    //       style={{
    //         width: "17%",
    //       }}
    //     >
    //       <View
    //         style={{
    //           flexDirection: "row",
    //           width: "100%",
    //           alignItems: "center",
    //         }}
    //       >
    //         <View>
    //           <Text
    //             numberOfLines={1}
    //             style={{
    //               fontFamily: "Lexend-SemiBold",
    //               color: Colors.Black,
    //               fontSize: 11,
    //             }}
    //           >
    //             {item?.scopeOfWorkName || "N/A"}
    //           </Text>
    //           <Text
    //             style={{
    //               fontFamily: "Lexend-Regular",
    //               color: Colors.Black,
    //               fontSize: 9,
    //             }}
    //           >
    //             {item?.title || "N/A"}
    //           </Text>
    //         </View>
    //       </View>
    //     </View>
    //     <View style={{ width: "10%" }}>
    //       <Text style={styles.flatListText}>{item?.quantity || "N/A"}</Text>
    //     </View>
    //     <View style={{ width: "15%" }}>
    //       <Text numberOfLines={1} style={styles.flatListText}>
    //         {item?.description || "N/A"}
    //       </Text>
    //     </View>
    //     {/* <View style={{ width: "15%" }}>
    //       <Text numberOfLines={1} style={styles.flatListText}>{item?.description || "N/A"}</Text>
    //     </View> */}
    //     {/* <View style={{ width: "10%" }}>
    //       <Text style={styles.flatListText}>{item?.unitName || "N/A"}</Text>
    //     </View> */}
    //     <View style={{ width: "14%" }}>
    //       <Pressable
    //         onPress={() => {
    //           setOpenActionModal(true);
    //           setCurrBoq(item);
    //           setRemarks(item?.remarks);
    //         }}
    //         style={{
    //           width: "100%",
    //           backgroundColor:
    //             item?.status === "Approved" ? Colors.Gray : "#81B733",
    //           height: 20,
    //           borderRadius: 3,
    //           alignItems: "center",
    //           justifyContent: "center",
    //           borderWidth: item?.action === null ? 0.5 : 0,
    //         }}
    //       >
    //         <Text
    //           style={[
    //             styles.flatListText,
    //             {
    //               fontSize: 9,
    //               color: Colors.White,
    //             },
    //           ]}
    //         >
    //           {"Approve"}
    //         </Text>
    //       </Pressable>
    //       <Pressable
    //         onPress={() => {
    //           setOpenActionModal(true);
    //           setCurrBoq(item);
    //           setRemarks(item?.remarks);
    //         }}
    //         disabled
    //         style={{
    //           width: "100%",
    //           backgroundColor: "#FF6247",
    //           // backgroundColor: Colors.Gray,
    //           height: 20,
    //           borderRadius: 3,
    //           alignItems: "center",
    //           justifyContent: "center",
    //           borderWidth: item?.action === null ? 0.5 : 0,
    //           marginTop: 5,
    //         }}
    //       >
    //         <Text
    //           style={[
    //             styles.flatListText,
    //             {
    //               fontSize: 9,
    //               color: Colors.White,
    //             },
    //           ]}
    //         >
    //           {"Reject"}
    //         </Text>
    //       </Pressable>
    //     </View>
    //     {/* <View style={{ width: "10%" }}>
    //       <Text numberOfLines={1} style={styles.flatListText}>
    //         {item?.amount || "N/A"}
    //       </Text>
    //     </View> */}

    //     <View style={{ width: "14%" }}>
    //       <Pressable
    //         onPress={() => {
    //           // setOpenActionModal(true);
    //           // setCurrBoq(item);
    //           // setRemarks(item?.remarks);
    //         }}
    //         style={{
    //           width: "100%",
    //           // backgroundColor: "#81B733",
    //           backgroundColor: Colors.Gray,
    //           height: 20,
    //           borderRadius: 3,
    //           alignItems: "center",
    //           justifyContent: "center",
    //           borderWidth: item?.action === null ? 0.5 : 0,
    //         }}
    //       >
    //         <Text
    //           style={[
    //             styles.flatListText,
    //             {
    //               fontSize: 9,
    //               color: Colors.White,
    //             },
    //           ]}
    //         >
    //           {"Approve"}
    //         </Text>
    //       </Pressable>
    //       <Pressable
    //         onPress={() => {
    //           setOpenActionModal(true);
    //           setCurrBoq(item);
    //           setRemarks(item?.remarks);
    //         }}
    //         disabled
    //         style={{
    //           width: "100%",
    //           backgroundColor: "#FF6247",
    //           // backgroundColor: Colors.Gray,
    //           height: 20,
    //           borderRadius: 3,
    //           alignItems: "center",
    //           justifyContent: "center",
    //           borderWidth: item?.action === null ? 0.5 : 0,
    //           marginTop: 5,
    //         }}
    //       >
    //         <Text
    //           style={[
    //             styles.flatListText,
    //             {
    //               fontSize: 9,
    //               color: Colors.White,
    //             },
    //           ]}
    //         >
    //           {"Reject"}
    //         </Text>
    //       </Pressable>
    //     </View>
    //   </View>
    // </View>
  );

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
        </View>
      </Pressable>
      <View
        style={{
          // backgroundColor: Colors.White,
          alignItems: "center",
          margin: 10,
          borderRadius: 10,
          // shadowColor: "#000",
          // shadowOffset: {
          //   width: 0,
          //   height: 2,
          // },
          // shadowOpacity: 0.2,
          // shadowRadius: 5,
          // elevation: 4,
          width: "93%",
          // flex: 1,
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
          <View style={{ width: "100%", paddingBottom: 130 }}>
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
              renderItem={({ item, index }) => (
                <Item item={item} index={index} />
              )}
              keyExtractor={(item) => item.id}
              // initialNumToRender={0}
              // ListHeaderComponent={ListHeader}
              // extraData={fieldNoteList?.length}
              // stickyHeaderIndices={[0]}
              showsVerticalScrollIndicator={false}
            />
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
      {renderMeasurementModal()}
      {renderFieldNotes()}
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
});
