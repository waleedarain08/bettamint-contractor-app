import {
  Appearance,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  FlatList,
  ImageBackground,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../utils/Colors";
import { Cross, Search, VectorIcon } from "../../icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Geolocation from "@react-native-community/geolocation";
import { GOOGLE_API_KEY } from "../../utils/api_constants";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { Searchbar } from "react-native-paper";
import { launchCamera } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGeneralContext } from "../../context/generalContext";
import { useFieldNote } from "../../context/fieldNoteContext";

const NewCreateFieldNotes = () => {
  const { scopeList, projects, labourContractorList } = useGeneralContext();
  const { fieldNote, createFieldNote, getFieldNoteCost, costList } =
    useFieldNote();
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === "dark";
  const textColor = isDarkMode ? "white" : "black";

  const navigation = useNavigation();
  // States
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [openScope, setOpenScope] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [openContractor, setOpenContractor] = useState(false);
  const [openCost, setOpenCost] = useState(false);
  const [selectedScope, setSelectedScope] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCostCode, setSelectedCostCode] = useState(null);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [SOWList, setSOWList] = useState([]); // [SOWList, setSOWList
  const [projectList, setProjectList] = useState([]); // [SOWList, setSOWList
  const [contractorList, setContractorList] = useState([]); // [SOWList, setSOWList
  const [search, setSearch] = useState("");
  const [fieldPic, setFieldPic] = useState(null);
  const [fieldPicForm, setFieldPicForm] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [openRemarks, setOpenRemarks] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [openLocation, setOpenLocation] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setSOWList(scopeList);
  }, [scopeList]);
  useEffect(() => {
    setProjectList(projects);
  }, [projects.length]);
  useEffect(() => {
    setContractorList(labourContractorList);
  }, [labourContractorList]);

  useFocusEffect(
    React.useCallback(() => {
      launchCameraHandler();
      return () => {};
    }, [])
  );

  const getAsyncData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("fieldNote");
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue);
        setSelectedContractor(data.contractor);
        setSelectedProject(data.project);
        setSelectedScope(data.scope);
        setSelectedCostCode(data.costCode);
        setRemarks(data.remarks);
        setQuantity(data.quantity);
        setCurrentLocation(data.currentLocation);
        setDescription(data.description);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLocationPermission();
    getAsyncData();
  }, []);

  const storeDataOnAsyncStorage = async (value) => {
    try {
      const data = {
        contractor: selectedContractor || null,
        project: selectedProject || null,
        scope: selectedScope || null,
        costCode: selectedCostCode || null,
        remarks: remarks || null,
        quantity: quantity || null,
        currentLocation: currentLocation || null,
        description: description || null,
      };
      await AsyncStorage.setItem("fieldNote", JSON.stringify(data));
    } catch (e) {
      console.log(e);
    }
  };

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
        setCurrentPosition(position);
        console.log("position", position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const launchCameraHandler = async () => {
    launchCamera(
      {
        mediaType: "photo",
        quality: 0.5,
        saveToPhotos: true,
        cameraType: "back",
      },
      (response) => {
        console.log(response);
        if (response?.assets?.length > 0) {
          setFieldPicForm(response);
          setFieldPic(response?.assets[0]?.uri);
        }
      }
    );
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
    } else if (!selectedScope) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select scope of work.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!selectedContractor) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select contractor.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!selectedProject) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select project.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!description) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Description.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!currentLocation) {
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
    } else {
      formData.append(
        "ScopeOfWorkId",
        parseInt(selectedScope?.scopeOfWorkId, 10)
      );
      formData.append("ContractorId", parseInt(selectedContractor?.userId, 10));
      formData.append("ProjectId", parseInt(selectedProject?.projectId, 10));
      formData.append(
        "ContractorBOQProgressId",
        parseInt(selectedCostCode?.contractorBOQId, 10)
      );
      formData.append("Location", currentLocation);
      formData.append("Description", description);
      fieldNote &&
        formData.append("FieldNoteId", parseInt(fieldNote?.fieldNoteId, 10));
      !fieldNote &&
        formData.append("Image", {
          name: fieldPicForm?.assets[0]?.fileName,
          type: fieldPicForm?.assets[0]?.type,
          uri: fieldPicForm?.assets[0]?.uri, //Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });
      formData.append("DateTime", `${moment(date).format("YYYY-MM-DD HH:mm")}`);
      console.log("FORMDATA", formData);
      createFieldNote(formData)
        .then((res) => {
          console.log("res", res);
          if (res.status === 200) {
            navigation.goBack();
            ToastAndroid.show(
              fieldNote ? "Field Note Updates" : "Field Note Created",
              ToastAndroid.SHORT
            );
          }
        })
        .catch((err) => {
          console.log("Error----->>>>", err);
          ToastAndroid.show(
            err.message || "Something went wrong!",
            ToastAndroid.SHORT
          );
        });
      // const response = await dispatch(createFieldNoteEntry(token, formData));
      // if (response.status === 200) {
      //   console.log("Field Note Created", response.status);
      //   navigation.goBack();
      //   Toast.show({
      //     type: "info",
      //     text1: fieldNote ? "Field Note Updates" : "Field Note Created",
      //     text2: fieldNote
      //       ? "Field Note is updated successfully."
      //       : "New Field Note is created successfully.",
      //     topOffset: 10,
      //     position: "top",
      //     visibilityTime: 4000,
      //   });
      // } else {
      //   Toast.show({
      //     type: "error",
      //     text1: "Error",
      //     text2: "Something went wrong, please try again.",
      //     topOffset: 10,
      //     position: "top",
      //     visibilityTime: 3000,
      //   });
      // }
    }
  };

  useEffect(() => {
    const getCurrentCity = () => {
      if (
        currentPosition?.coords?.latitude &&
        currentPosition?.coords?.longitude
      ) {
        const locationPublish = `${currentPosition?.coords?.latitude}, ${currentPosition?.coords?.longitude}`;

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationPublish}&sensor=true&key=${GOOGLE_API_KEY}`;
        fetch(url)
          .then((response) => response.json())
          .then((response) => {
            const address = response.results[0].formatted_address;
            console.log("address", address);
            setCurrentLocation(address);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };
    getCurrentCity();
  }, [currentPosition]);

  const renderSOWList = () => {
    return (
      <Modal
        visible={openScope}
        animationType="slide"
        onRequestClose={() => {
          setOpenScope(false);
        }}
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerModalContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => setOpenScope(false)}>
                  <Cross size={30} color={Colors.White} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Scope of Work</Text>
              </View>
              <Text style={styles.doneText}>DONE</Text>
            </View>
            <View>
              <Searchbar
                style={styles.searchbarStyle}
                placeholder="Search"
                placeholderTextColor={"#FFFFFF"}
                mode="bar"
                icon={() => <Search size={20} color={"#8E8E93"} />}
                clearIcon={() => <Cross size={20} color={"#8E8E93"} />}
                onChangeText={(text) => {
                  setSearch(text);
                  if (text) {
                    const filteredList = scopeList.filter((item) =>
                      item.name.toLowerCase().includes(text.toLowerCase())
                    );
                    setSOWList(filteredList);
                  } else {
                    setSOWList(scopeList);
                  }
                }}
                value={search}
              />
            </View>

            <View style={styles.marginTop} />
            <FlatList
              data={SOWList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  style={styles.flatlistItem}
                  onPress={() => {
                    setSelectedScope(item);
                    setOpenScope(false);
                    setSearch("");
                  }}
                >
                  <View style={styles.flatlistItemInner}>
                    <View
                      style={[
                        styles.flatlistItemIndicator,
                        {
                          backgroundColor:
                            selectedScope === item
                              ? Colors.Primary
                              : Colors.Black,
                        },
                      ]}
                    />
                    <Text style={styles.flatlistItemText}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const renderProjectList = () => {
    return (
      <Modal
        visible={openProject}
        animationType="slide"
        onRequestClose={() => {
          setOpenProject(false);
        }}
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerModalContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => setOpenProject(false)}>
                  <Cross size={30} color={Colors.White} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Project</Text>
              </View>
              <Text style={styles.doneText}>DONE</Text>
            </View>
            <View>
              <Searchbar
                style={styles.searchbarStyle}
                placeholder="Search"
                placeholderTextColor={"#FFFFFF"}
                mode="bar"
                icon={() => <Search size={20} color={"#8E8E93"} />}
                clearIcon={() => <Cross size={20} color={"#8E8E93"} />}
                onChangeText={(text) => {
                  setSearch(text);
                  if (text) {
                    const filteredList = projects.filter((item) =>
                      item.name.toLowerCase().includes(text.toLowerCase())
                    );
                    setProjectList(filteredList);
                  } else {
                    setProjectList(scopeList);
                  }
                }}
                value={search}
              />
            </View>

            <View style={styles.marginTop} />
            <FlatList
              data={projectList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  style={styles.flatlistItem}
                  onPress={() => {
                    setSelectedProject(item);
                    setOpenProject(false);
                    setSearch("");
                    console.log("selectedProject", item);
                    console.log("selectedScope", selectedScope);
                    console.log("selectedContractor", selectedContractor);
                    getFieldNoteCost(
                      item?.projectId,
                      selectedScope?.scopeOfWorkId,
                      selectedContractor?.userId
                    ).catch((err) => {
                      console.log("Error----->>>>", err);
                      ToastAndroid.show(
                        err.message || "Something went wrong!",
                        ToastAndroid.SHORT
                      );
                    });
                    // dispatch(
                    //   getFieldNoteCost(
                    //     token,
                    //     item?.projectId,
                    //     selectedScope?.scopeOfWorkId,
                    //     selectedContractor?.userId
                    //   )
                    // );
                  }}
                >
                  <View style={styles.flatlistItemInner}>
                    <View
                      style={[
                        styles.flatlistItemIndicator,
                        {
                          backgroundColor:
                            selectedProject === item
                              ? Colors.Primary
                              : Colors.Black,
                        },
                      ]}
                    />
                    <Text style={styles.flatlistItemText}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  };
  const renderContractorList = () => {
    return (
      <Modal
        visible={openContractor}
        animationType="slide"
        onRequestClose={() => {
          setOpenContractor(false);
        }}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerModalContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => setOpenContractor(false)}>
                  <Cross size={30} color={Colors.White} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Select Contractor</Text>
              </View>
              {/* <Text style={styles.doneText}>DONE</Text> */}
            </View>
            <View>
              <Searchbar
                style={styles.searchbarStyle}
                placeholder="Search"
                placeholderTextColor={"#FFFFFF"}
                mode="bar"
                icon={() => <Search size={20} color={"#8E8E93"} />}
                clearIcon={() => <Cross size={20} color={"#8E8E93"} />}
                onChangeText={(text) => {
                  setSearch(text);
                  if (text) {
                    const filteredList = labourContractorList.filter((item) =>
                      item.fullName.toLowerCase().includes(text.toLowerCase())
                    );
                    setContractorList(filteredList);
                  } else {
                    setContractorList(scopeList);
                  }
                }}
                value={search}
              />
            </View>

            <View style={styles.marginTop} />
            <FlatList
              data={contractorList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  style={styles.flatlistItem}
                  onPress={() => {
                    setSelectedContractor(item);
                    setOpenContractor(false);
                    setSearch("");
                  }}
                >
                  <View style={styles.flatlistItemInner}>
                    <View
                      style={[
                        styles.flatlistItemIndicator,
                        {
                          backgroundColor:
                            selectedContractor === item
                              ? Colors.Primary
                              : Colors.Black,
                        },
                      ]}
                    />
                    <Text style={styles.flatlistItemText}>{item.fullName}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const renderCostCodeList = () => {
    return (
      <Modal
        visible={openCost}
        animationType="slide"
        onRequestClose={() => {
          setOpenCost(false);
        }}
        transparent
      >
        <View style={{ width: "100%", backgroundColor: "#00000090", flex: 1 }}>
          <View style={styles.innerModalContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => setOpenCost(false)}>
                  <Cross size={30} color={Colors.White} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Select Cost Code</Text>
              </View>
            </View>
            <View style={styles.marginTop} />
            <FlatList
              data={costList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  style={styles.flatlistItem}
                  onPress={() => {
                    setSelectedCostCode(item);
                    setOpenCost(false);
                    setSearch("");
                  }}
                >
                  <View style={styles.flatlistItemInner}>
                    <View
                      style={[
                        styles.flatlistItemIndicator,
                        {
                          backgroundColor:
                            selectedCostCode === item
                              ? Colors.Primary
                              : Colors.Black,
                        },
                      ]}
                    />
                    <Text style={styles.flatlistItemText}>{item.costCode}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const renderRemarksTextfieldModal = () => {
    return (
      <Modal
        visible={openRemarks}
        animationType="slide"
        onRequestClose={() => {
          setOpenRemarks(false);
        }}
        transparent
      >
        <View style={{ width: "100%", backgroundColor: "#00000090", flex: 1 }}>
          <View style={styles.innerModalContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => setOpenRemarks(false)}>
                  <Cross size={30} color={Colors.White} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Remarks</Text>
              </View>
              <Text
                onPress={() => setOpenRemarks(false)}
                style={styles.doneText}
              >
                DONE
              </Text>
            </View>
            <View>
              <TextInput
                onChangeText={(text) => setRemarks(text)}
                value={remarks}
                multiline
                numberOfLines={4}
                placeholder="Enter Remarks"
                placeholderTextColor={"#FFFFFF"}
                style={{ color: Colors.White, padding: 10, fontSize: 16 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const renderDesTextfieldModal = () => {
    return (
      <Modal
        visible={openDescription}
        animationType="slide"
        onRequestClose={() => {
          setOpenDescription(false);
        }}
        transparent
      >
        <View style={{ width: "100%", backgroundColor: "#00000090", flex: 1 }}>
          <View style={styles.innerModalContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => setOpenDescription(false)}>
                  <Cross size={30} color={Colors.White} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Description</Text>
              </View>
              <Text
                onPress={() => setOpenDescription(false)}
                style={styles.doneText}
              >
                DONE
              </Text>
            </View>
            <View>
              <TextInput
                onChangeText={(text) => setDescription(text)}
                value={description}
                multiline
                numberOfLines={4}
                placeholder="Enter Description"
                placeholderTextColor={"#FFFFFF"}
                style={{ color: Colors.White, padding: 10, fontSize: 16 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const renderLocationTextfieldModal = () => {
    return (
      <Modal
        visible={openLocation}
        animationType="slide"
        onRequestClose={() => {
          setOpenLocation(false);
        }}
        transparent
      >
        <View style={{ width: "100%", backgroundColor: "#00000090", flex: 1 }}>
          <View style={styles.innerModalContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => setOpenLocation(false)}>
                  <Cross size={30} color={Colors.White} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Location</Text>
              </View>
              <Text
                onPress={() => setOpenLocation(false)}
                style={styles.doneText}
              >
                DONE
              </Text>
            </View>
            <View>
              <TextInput
                onChangeText={(text) => setCurrentLocation(text)}
                value={currentLocation}
                multiline
                numberOfLines={4}
                placeholder="Enter Location"
                placeholderTextColor={"#FFFFFF"}
                style={{ color: Colors.White, padding: 10, fontSize: 16 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <ImageBackground
      source={{ uri: fieldPic }}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {openContractor ||
      openLocation ||
      openCost ||
      openProject ||
      openScope ||
      openRemarks ||
      openDescription ? (
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}></View>
          <View style={{ flex: 5, width: "100%" }}></View>
          <View style={styles.outerContainer}></View>
        </View>
      ) : (
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <View style={styles.innerTopContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={styles.iconContainer}
              >
                <VectorIcon
                  type={"AntDesign"}
                  name={"close"}
                  color={Colors.White}
                  size={30}
                />
              </TouchableOpacity>
              <View style={styles.userContainer}>
                <VectorIcon
                  type={"Ionicons"}
                  name={"person-circle-sharp"}
                  color={Colors.White}
                  size={35}
                />
                <View>
                  <Text
                    onPress={() => setOpenContractor(true)}
                    style={styles.textContainer}
                  >
                    {selectedContractor?.fullName || "Assign To"}
                  </Text>
                  <Text
                    onPress={() => setOpenLocation(true)}
                    style={styles.locationContainer}
                  >
                    {currentLocation || "Location"}
                  </Text>
                </View>
              </View>
              <View style={styles.dateContainer}>
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Text style={styles.dateText}>
                    {moment(date).format("DD MMM, YYYY")}
                  </Text>
                  <VectorIcon
                    name={"calendar"}
                    type={"AntDesign"}
                    color={Colors.White}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ flex: 5, width: "100%" }}>
            <View
              style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
                padding: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                }}
                onPress={() => setOpenScope(true)}
              >
                <Image
                  source={require("../../assets/icons/Shape-3.png")}
                  style={styles.image}
                />
                <Text style={styles.text}>
                  {selectedScope?.name || "SCOPE OF WORK"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                }}
                onPress={() => setOpenProject(true)}
              >
                <Image
                  source={require("../../assets/icons/Shape-4.png")}
                  style={styles.image}
                />
                <Text style={styles.text}>
                  {selectedProject?.name || "PROJECT"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                }}
                onPress={() => setOpenCost(true)}
              >
                <Image
                  source={require("../../assets/icons/Shape-5.png")}
                  style={styles.image}
                />
                <Text style={styles.text}>
                  {selectedCostCode?.costCode || "COST CODE"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                }}
                onPress={() => setOpenDescription(true)}
              >
                <Image
                  source={require("../../assets/icons/Shape-5.png")}
                  style={styles.image}
                />
                <Text style={styles.text}>{description || "Description"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.outerContainer}>
            <View style={styles.innerOuterContainer}>
              <View style={styles.remarksContainer}>
                <TouchableOpacity
                  onPress={() => setOpenRemarks(true)}
                  style={styles.button}
                >
                  <Image
                    source={require("../../assets/icons/Shape.png")}
                    style={styles.image}
                  />
                  <Text
                    numberOfLines={1}
                    style={[styles.text, { width: "60%" }]}
                  >
                    {remarks || "REMARKS"}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.button}>
                  <Image
                    source={require("../../assets/icons/Shape-2.png")}
                    style={styles.image}
                  />
                  <KeyboardAvoidingView style={{ width: "100%" }}>
                    <TextInput
                      placeholder="QUANTITY"
                      placeholderTextColor={Colors.White}
                      keyboardType="numeric"
                      onChangeText={(text) => setQuantity(text)}
                      value={quantity}
                      style={{
                        color: Colors.White,
                        fontFamily: "Lexend-Regular",
                        fontSize: 12,
                        width: "100%",
                        // padding: 10,
                      }}
                    />
                  </KeyboardAvoidingView>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    storeDataOnAsyncStorage();
                    submitHandler();
                  }}
                  style={styles.arrowButton}
                >
                  <VectorIcon
                    name={"arrowright"}
                    type={"AntDesign"}
                    size={30}
                    color={Colors.White}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
      <DatePicker
        modal
        mode="date"
        textColor={textColor}
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          setSelectedDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      {renderSOWList()}
      {renderProjectList()}
      {renderContractorList()}
      {renderCostCodeList()}
      {renderRemarksTextfieldModal()}
      {renderLocationTextfieldModal()}
      {renderDesTextfieldModal()}
    </ImageBackground>
  );
};

export default NewCreateFieldNotes;

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: Colors.FormBorder,
    flexDirection: "column",
    flex: 1,
    width: "100%",
  },
  topContainer: {
    flex: 0.5,
    width: "100%",
    flexDirection: "row",
    padding: 10,
  },
  innerTopContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: "10%",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  textContainer: {
    color: Colors.White,
    fontFamily: "Lexend-Medium",
    fontSize: 12,
  },
  locationContainer: {
    color: Colors.White,
    fontFamily: "Lexend-Regular",
    fontSize: 12,
  },
  dateContainer: {
    width: "40%",
    alignItems: "flex-end",
  },
  dateText: {
    fontFamily: "Lexend-Regular",
    color: Colors.White,
    fontSize: 12,
    marginRight: 5,
  },
  outerContainer: {
    flex: 0.7,
    width: "100%",
  },
  innerOuterContainer: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  remarksContainer: {
    width: "38%",
    // height: 60,
  },
  quantityContainer: {
    width: "40%",
    height: 60,
  },
  buttonContainer: {
    width: "20%",
    alignItems: "flex-end",
  },
  button: {
    width: "100%",
    backgroundColor: "#00000080",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 30,
    height: 60,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  text: {
    color: Colors.White,
    fontFamily: "Lexend-Regular",
    fontSize: 12,
  },
  arrowButton: {
    width: 60,
    height: 60,
    backgroundColor: Colors.Primary,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#00000080",
    flex: 1,
  },
  innerModalContainer: {
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontFamily: "Lexend-Medium",
    fontSize: 18,
    color: Colors.White,
  },
  doneText: {
    fontFamily: "Lexend-Regular",
    fontSize: 14,
    color: Colors.White,
  },
  searchbarStyle: {
    backgroundColor: "#262626",
    borderRadius: 10,
    marginHorizontal: 10,
  },
  marginTop: {
    marginTop: 20,
  },
  flatlistItem: {
    backgroundColor: Colors.Black,
    marginBottom: 8,
    height: 55,
    justifyContent: "center",
  },
  flatlistItemInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  flatlistItemIndicator: {
    width: 10,
    height: 55,
  },
  flatlistItemText: {
    fontFamily: "Lexend-Regular",
    fontSize: 14,
    color: Colors.White,
    marginLeft: 10,
  },
});
