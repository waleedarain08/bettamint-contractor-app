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
  Picture,
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
  getScopeList,
  markFieldNoteAction,
  verifyFieldNote,
} from "../../redux/slices/fieldNoteSlice";
import { Image } from "react-native";
import { assetsUrl } from "../../utils/api_constants";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { launchImageLibrary } from "react-native-image-picker";

LogBox.ignoreAllLogs();

const FieldNotes = ({ navigation }) => {
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
  const [verifyImage, setVerifyImage] = useState(null);
  const [verifyImageUri, setVerifyImageUri] = useState(null);
  const dispatch = useDispatch();

  const { fieldNoteList, loading, scopeList } = useSelector(fieldNoteReducer);
  const projectsListSimple = useSelector(projectsListSimpleReducer);
  const token = useSelector(authToken);
  const labourContractorList = useSelector(labourContractorReducer);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getSkillsAction(token));
      dispatch(getUsersAction(token));
      dispatch(getAllProjectsSimpleAction(token));
      dispatch(selectAttendanceAction(null));
      dispatch(removeMusterData());
      dispatch(getFieldNoteList(token));
      dispatch(getScopeList(token));
      dispatch(getLabourContactorAction(token));
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

  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
      selectionLimit: 1,
    });
    if (result?.assets?.length > 0) {
      setVerifyImage(result);
      setVerifyImageUri(result?.assets[0]?.uri);
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
              height: 400,
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
                  Action
                </Text>
              </View>
              <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
                <Pressable
                  onPress={() => {
                    let res = dispatch(
                      deleteFieldNote(token, currFieldNote?.fieldNoteId)
                    );
                    setOpenActionModal(false);
                    setTimeout(() => {
                      dispatch(getFieldNoteList(token));
                    }, 1000);
                  }}
                >
                  <DeleteIcon
                    color={"red"}
                    size={22}
                    style={{ marginRight: 5 }}
                  />
                </Pressable>
                <Pressable
                  onPress={() => {
                    navigation.navigate("CreateFieldNotes");
                    dispatch(editFieldNoteAction(currFieldNote));
                    setOpenActionModal(false);
                  }}
                >
                  <EditIcon
                    color={Colors.Purple}
                    size={22}
                    style={{ marginRight: 5 }}
                  />
                </Pressable>
                <Cross
                  onPress={() => {
                    setOpenActionModal(!openActionModal);
                    setVerifyImage(null);
                    setVerifyImageUri(null);
                    setSelectedAction(null);
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
                data={[
                  { label: "Resolved", value: "MarkAsResolved" },
                  { label: "Rework", value: "ReworkRequired" },
                  { label: "Pending", value: "DecisionPending" },
                ]}
                maxHeight={500}
                labelField="label"
                valueField="value"
                placeholder={"Select Action"}
                value={selectedAction}
                onChange={async (item) => {
                  setSelectedAction(item.value);
                  // let resp = await dispatch(
                  //   markFieldNoteAction(
                  //     token,
                  //     currFieldNote?.fieldNoteId,
                  //     item?.value
                  //   )
                  // );
                  // if (resp?.status === 200) {
                  //   dispatch(getFieldNoteList(token));
                  //   setOpenActionModal(false);
                  // }
                }}
              />
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 50,
              }}
            >
              <Pressable
                onPress={() => {
                  handleImagePicker();
                }}
                style={{
                  width: "100%",
                  height: 140,
                  borderWidth: 1,
                  borderColor: Colors.FormBorder,
                  borderStyle: "dashed",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {verifyImageUri ? (
                  <Image
                    source={{ uri: verifyImageUri }}
                    style={{ width: "100%", height: 140, borderRadius: 10 }}
                  />
                ) : (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Picture size={50} color={"#D1E0EE"} />
                    <Text
                      style={{
                        fontFamily: "Lexend-Medium",
                        color: Colors.FormText,
                        fontSize: 12,
                      }}
                    >
                      Upload Picture
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "flex-end",
                justifyContent: "center",
                marginTop: 50,
              }}
            >
              <Pressable
                onPress={async () => {
                  const formData = new FormData();
                  formData.append("Action", selectedAction);
                  formData.append("VerificationImage", verifyImage?.assets[0]);
                  let resp = await dispatch(
                    markFieldNoteAction(
                      token,
                      currFieldNote?.fieldNoteId,
                      formData
                    )
                  );
                  if (resp?.status === 200) {
                    dispatch(getFieldNoteList(token));
                    setOpenActionModal(false);
                  }
                }}
                disabled={!selectedAction || !verifyImageUri}
                style={{
                  width: 100,
                  height: 40,
                  backgroundColor:
                    !selectedAction || !verifyImageUri
                      ? "#ccc"
                      : Colors.Secondary,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Lexend-Medium",
                    color: Colors.White,
                    fontSize: 14,
                  }}
                >
                  Mark
                </Text>
              </Pressable>
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
        onBackdropPress={() => setOpenSearchModal(!openFilterModal)}
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
              height: "90%",
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
                    dispatch(getFieldNoteList(token));
                    setOpenFilterModal(false);
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
                maxHeight={400}
                labelField="label"
                valueField="value"
                placeholder={"Select Scope of work"}
                value={scope}
                onChange={(item) => {
                  setOpenFilterModal(false);
                  setScope(item.value);
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
            width: "28%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "85%",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: item?.imageUrl
                  ? assetsUrl + item.imageUrl
                  : "https://iau.edu.lc/wp-content/uploads/2016/09/dummy-image.jpg",
              }}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                marginRight: 5,
              }}
            />
            <View>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: "Lexend-SemiBold",
                  color: Colors.Black,
                  fontSize: 11,
                }}
              >
                {item?.description || "N/A"}
              </Text>
              <Text
                style={{
                  fontFamily: "Lexend-Regular",
                  color: Colors.Black,
                  fontSize: 9,
                }}
              >
                {item?.location || "N/A"}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "14%" }}>
          <Text style={styles.flatListText}>
            {item?.scopeOfWork?.name || "N/A"}
          </Text>
        </View>
        {/* <View style={{ width: "15%" }}>
          <Text numberOfLines={1} style={styles.flatListText}>{item?.description || "N/A"}</Text>
        </View> */}
        <View
          style={{
            width: "14%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Text style={styles.flatListText}>
            {moment(item?.dateTime).format("DD-MM-YY") || "N/A"}
          </Text> */}
          {item?.verifiedImageUrl ? (
            <Image
              source={{ uri: assetsUrl + item?.verifiedImageUrl }}
              style={{ width: 25, height: 25, borderRadius: 13 }}
              resizeMode="contain"
            />
          ) : (
            <Text style={styles.flatListText}>N/A</Text>
          )}
        </View>
        <View style={{ width: "16%" }}>
          <Text
            onPress={() => {
              setOpenAssignModal(true);
              setCurrFieldNote(item);
            }}
            numberOfLines={1}
            style={styles.flatListText}
          >
            {item?.contractor?.fullName || "N/A"}
          </Text>
        </View>
        <View style={{ width: "14%" }}>
          <Pressable
            onPress={() => {
              console.log(item?.action);
              setOpenActionModal(true);
              setCurrFieldNote(item);
            }}
            style={{
              width: "100%",
              backgroundColor:
                item?.action === "MarkAsResolved"
                  ? Colors.PurpleOpacity
                  : item?.action === "DecisionPending"
                  ? Colors.Gray
                  : item?.action === "ReworkRequired"
                  ? Colors.PrimaryLight
                  : Colors.White,
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
                  color:
                    item?.action === "MarkAsResolved"
                      ? Colors.Purple
                      : item?.action === "DecisionPending"
                      ? Colors.White
                      : item?.action === "ReworkRequired"
                      ? Colors.Primary
                      : Colors.Black,
                },
              ]}
            >
              {item?.action === "MarkAsResolved"
                ? "Resolved"
                : item?.action === "DecisionPending"
                ? "Pending"
                : item?.action === "ReworkRequired"
                ? "Rework"
                : "Action"}
            </Text>
          </Pressable>
          <Pressable
            style={{
              width: "100%",
              backgroundColor: item?.verifiedAction ? "#ccc" : Colors.Primary,
              paddingVertical: 2,
              marginTop: 3,
              borderRadius: 3,
            }}
            onPress={async () => {
              console.log("VERIFY", item?.fieldNoteId);
              let res = await dispatch(
                verifyFieldNote(token, item?.fieldNoteId)
              );
              console.log("RES", res);
              if (res?.status === 200) {
                dispatch(getFieldNoteList(token));
              }
            }}
            disabled={item?.verifiedAction}
          >
            <Text
              style={[
                styles.flatListText,
                { color: Colors.White, fontSize: 9 },
              ]}
            >
              Verify
            </Text>
          </Pressable>
        </View>
        {/* <Pressable
          onPress={() => {
            navigation.navigate("AttendanceMusterCard");
            // setTimeout(() => {
            dispatch(selectAttendanceAction(item));
            // }, 0);
          }}
          style={{
            backgroundColor: "#ECE5FC",
            padding: 5,
            margin: 5,
            borderRadius: 2,
            width: "13%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.smallButton}>View</Text>
        </Pressable> */}
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
          <View style={{ width: "28%" }}>
            <Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
              Field Notes Detail
            </Text>
          </View>
          <View style={{ width: "14%" }}>
            <Text style={styles.flatListTextHeader}>SOW</Text>
          </View>
          <View style={{ width: "14%" }}>
            <Text style={styles.flatListTextHeader}>Date</Text>
          </View>
          <View style={{ width: "16%" }}>
            <Text style={styles.flatListTextHeader}>Assigned</Text>
          </View>
          <View style={{ width: "14%" }}>
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
        {!fieldNoteList || fieldNoteList?.length === 0 ? (
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
                  dispatch(getFieldNoteList(token));
                  setSelectedProject(null);
                }}
                tintColor={Colors.Primary}
                colors={[Colors.Purple, Colors.Primary]}
              />
            }
            data={filteredDataNoteSource}
            renderItem={({ item, index }) => <Item item={item} index={index} />}
            keyExtractor={(item) => item.id}
            initialNumToRender={0}
            ListHeaderComponent={ListHeader}
            extraData={fieldNoteList?.length}
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
                    dispatch(saveProjectDataAction(item));
                    dispatch(getFieldNoteList(token, item?.projectId));
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
              extraData={filteredDataSource.length}
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

export default FieldNotes;

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
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    elevation: 4,
    backgroundColor: Colors.White,
  },
});
