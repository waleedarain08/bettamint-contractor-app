import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  LogBox,
  Pressable,
  Modal,
  ActivityIndicator,
  PermissionsAndroid,
  ToastAndroid,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import { Picture } from "../../icons";
import Spacer from "../../components/Spacer";
import DropDownPicker from "react-native-dropdown-picker";
import { launchImageLibrary } from "react-native-image-picker";
import MapView, { PROVIDER_GOOGLE, Polygon } from "react-native-maps";
import { assetsUrl, mapUrl } from "../../utils/api_constants";
import WebView from "react-native-webview";
import Geolocation from "react-native-geolocation-service";
import { useAuth } from "../../context/authContext";
import { useProject } from "../../context/projectContext";
import { useGeneralContext } from "../../context/generalContext";
LogBox.ignoreAllLogs();

const CreateNewProject = ({ navigation }) => {
  const { user } = useAuth();
  const { scopeList } = useGeneralContext();
  const { loading, selectedProject, createProject } = useProject();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Residential", value: "Residential" },
    { label: "Commercial", value: "Commercial" },
    { label: "Hospitality", value: "Hospitality" },
    { label: "Infrastructure", value: "Infrastructure" },
  ]);
  const [projectName, setProjectName] = useState(null);
  const [projectImage, setProjectImage] = useState(null);
  const [geoFancingArray, setGeoFancingArray] = useState([]);
  const [projectImageUri, setProjectImageUri] = useState(null);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [projectArea, setProjectArea] = useState(null);
  const [sow, setSow] = useState([]);
  const [geoFancingList, setGeoFancingList] = useState([]);
  const mapRef = useRef();
  const roles = user?.user?.role?.roleFeatureSets;

  const projectBudgetAccess = roles.some(
    (item) =>
      item.featureSet.route === "PROJECT_BUDGET" &&
      Number(item.accessRightId) !== 1
  );
  const projectBoundariesAccess = roles.some(
    (item) =>
      item.featureSet.route === "PROJECT_BOUNDARY" &&
      Number(item.accessRightId) !== 1
  );

  useEffect(() => {
    getLocationPermission();
  }, []);
  useEffect(() => {
    if (scopeList.length > 0) {
      const sowObject = convertScopeList(scopeList);
      setSow(sowObject);
    }
  }, [scopeList]); // eslint-disable-line

  function convertScopeList() {
    const scopeObject = {};
    scopeList.forEach((scope) => {
      const retrievedScope = selectedProject?.scopeOfWorks?.find(
        (projectScope) => projectScope.scopeOfWorkId === scope.scopeOfWorkId
      );

      // const retrievedUnit = unitList.find(
      //   (unit) => unit.unitId === retrievedScope?.unitId
      // );

      scopeObject[scope.name] = createScopeObject({
        scope,
        retrievedScope,
        // retrievedUnit,
      });
    });
    return scopeObject;
  }

  function createScopeObject({ scope, retrievedScope, retrievedUnit = null }) {
    const measurement = retrievedScope?.costPerSqFeet || "";
    const touched = Boolean(measurement);
    // const unit = retrievedUnit;
    // const touched = Boolean(measurement) || Boolean(unit);
    // const error = touched && (!measurement || !unit);

    return {
      measurement,
      touched,
      icon: scope.imageUrl,
      iconKey: scope.imageKey,
      scopeOfWorkId: scope.scopeOfWorkId,
      // unit,
      // error,
    };
  }

  function getFormattedScopeOfWorks() {
    const scopeOfWorkArray = [];

    Object.keys(sow).forEach((sowLabel) => {
      const scope = sow[sowLabel];

      // if (scope.unit && scope.measurement) {
      if (scope.measurement) {
        const scopeObject = createFormattedScopeObject(scope);
        scopeOfWorkArray.push(scopeObject);
      }
    });

    return scopeOfWorkArray;
  }

  function createFormattedScopeObject(scope) {
    return {
      projectId: selectedProject?.projectId,
      scopeOfWorkId: scope.scopeOfWorkId,
      costPerSqFeet: Number(scope.measurement),
    };
  }
  function handleMeasurementChange(label, value) {
    setSow((prevState) => ({
      ...prevState,
      [label]: {
        ...prevState[label],
        measurement: value,
      },
    }));
  }
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
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  useEffect(() => {
    if (selectedProject) {
      setProjectImageUri(assetsUrl + selectedProject?.url);
      setProjectName(selectedProject?.name);
      setValue(selectedProject?.projectTypeId);
      setGeoFancingArray(selectedProject?.geofencingArray);
    }
  }, [selectedProject]);

  const submitHandler = async () => {
    const formattedScopeOfWOrk = getFormattedScopeOfWorks();
    const formData = new FormData();
    const projectId = selectedProject ? selectedProject?.projectId : 0;
    if (!value) {
      ToastAndroid.show("Please select project type.", ToastAndroid.SHORT);
    } else if (!projectName) {
      ToastAndroid.show("Please enter project name.", ToastAndroid.SHORT);
    } else if (!projectArea) {
      ToastAndroid.show("Please enter project area.", ToastAndroid.SHORT);
    } else if (!projectImageUri) {
      ToastAndroid.show("Please select project image.", ToastAndroid.SHORT);
    } else if (geoFancingArray.length === 0) {
      ToastAndroid.show("Please draw project boundaries.", ToastAndroid.SHORT);
    } else if (Object.keys(sow)?.every((label) => !sow[label].measurement)) {
      ToastAndroid.show(
        "Please enter at least one scope of work.",
        ToastAndroid.SHORT
      );
    } else {
      formData.append("Name", projectName);
      formData.append("ProjectArea", projectArea);
      formData.append("ProjectTypeId", value);
      formData.append("DeveloperId", 0);
      formData.append("ProjectId", projectId);
      formData.append("Image", {
        name: projectImage?.assets[0]?.fileName,
        type: projectImage?.assets[0]?.type,
        uri: projectImage?.assets[0]?.uri, //Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
      formData.append("geofencingList", JSON.stringify(geoFancingList));
      formData.append("Latitude", geoFancingArray[0][0].latitude);
      formData.append("Longitude", geoFancingArray[0][0].longitude);
      formData.append("scopeOfWorks", JSON.stringify(formattedScopeOfWOrk));

      createProject(formData)
        .then((response) => {
          if (response.status === 200) {
            navigation.goBack();
            ToastAndroid.show("Project Created", ToastAndroid.SHORT);
          } else {
            ToastAndroid.show(
              "Something went wrong. Please try again.",
              ToastAndroid.SHORT
            );
          }
        })
        .catch((error) => {
          ToastAndroid.show(
            error.message || "Something went wrong. Please try again.",
            ToastAndroid.SHORT
          );
        });
    }
  };
  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
      selectionLimit: 1,
    });
    if (result?.assets?.length > 0) {
      setProjectImage(result);
      setProjectImageUri(result?.assets[0]?.uri);
    }
  };

  const renderMapModal = () => {
    const runFirst = `
      true; // note: this is required, or you'll sometimes get silent failures
    `;
    return (
      <Modal
        visible={openMapModal}
        animationType="slide"
        onRequestClose={() => {
          setOpenMapModal(false);
        }}
        presentationStyle="pageSheet"
      >
        <WebView
          source={{ uri: mapUrl }}
          style={{ flex: 1 }}
          onMessage={(event) => {
            const newArray =
              JSON.parse(event?.nativeEvent?.data) &&
              JSON.parse(event?.nativeEvent?.data)?.map((area) =>
                area.boundary.map((point) => ({
                  latitude: point.latitude,
                  longitude: point.longitude,
                }))
              );
            setGeoFancingArray(newArray);
            setGeoFancingList(JSON.parse(event?.nativeEvent?.data));
            setOpenMapModal(false);
          }}
          injectedJavaScript={runFirst}
          geolocationEnabled={true}
          onLoad={() => setLoader(false)}
        />
        {loader && (
          <ActivityIndicator
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
            }}
            size="large"
            color={Colors.Primary}
          />
        )}
      </Modal>
    );
  };

  setTimeout(() => {
    mapRef?.current?.animateToRegion(
      {
        latitude:
          (geoFancingArray[0] && geoFancingArray[0][0]?.latitude) ||
          currentPosition?.coords?.latitude,
        longitude:
          (geoFancingArray[0] && geoFancingArray[0][0]?.longitude) ||
          currentPosition?.coords?.longitude,
        latitudeDelta:
          geoFancingArray[0] && geoFancingArray[0][0]?.latitude ? 0.006 : 0.2,
        longitudeDelta:
          geoFancingArray[0] && geoFancingArray[0][0]?.longitude ? 0.001 : 20,
      },
      2000
    );
  }, 1000);
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.graph}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 20,
            }}
          >
            <Pressable
              onPress={() => handleImagePicker()}
              style={{ width: "28%" }}
            >
              {projectImageUri ? (
                <Image
                  source={{ uri: projectImageUri }}
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
                  <Text style={styles.imgText}>Add Picture</Text>
                </View>
              )}
            </Pressable>
            <View style={{ width: "68%" }}>
              <Text style={styles.title}>Project Type</Text>
              <View style={{ marginTop: 7 }}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  placeholder="Select"
                  // maxHeight={80}
                  placeholderStyle={{ color: Colors.FormText, fontSize: 13 }}
                  listItemContainerStyle={{ borderColor: Colors.FormBorder }}
                  dropDownContainerStyle={{
                    backgroundColor: "#dfdfdf",
                    borderColor: Colors.FormBorder,
                  }}
                  selectedItemLabelStyle={{
                    fontWeight: "bold",
                  }}
                  style={{
                    borderColor: Colors.FormBorder,
                    borderRadius: 4,
                    height: 50,
                    backgroundColor: Colors.White,
                    elevation: 3,
                  }}
                  arrowIconStyle={{ height: 20, width: 10 }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 18,
              paddingBottom: 20,
              marginTop: open ? 120 : 0,
            }}
          >
            <Text style={styles.title}>Project Name</Text>
            {/* <Pressable
            onPress={() => {
              setProjectNameClick(!projectNameClick);
            }}
          > */}
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
                color: "black",
              }}
              onChangeText={(e) => setProjectName(e)}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter Project Name"
              value={projectName}
            />
            {/* </Pressable> */}
          </View>
          <View
            style={{
              paddingHorizontal: 18,
              paddingBottom: 20,
              // marginTop: open ? 120 : 0,
            }}
          >
            <Text style={styles.title}>Project Area In SQFTS</Text>
            {/* <Pressable
            onPress={() => {
              setProjectNameClick(!projectNameClick);
            }}
          > */}
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
                color: "black",
              }}
              keyboardType="numeric"
              onChangeText={(e) => setProjectArea(e)}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter Project Area"
              value={projectArea}
            />
            {/* </Pressable> */}
          </View>
          {(user?.user?.role?.name === "SuperAdmin" || projectBudgetAccess) && (
            <View
              style={{
                paddingHorizontal: 18,
                paddingBottom: 20,
              }}
            >
              <Text style={styles.title}>Add Scope Of Works</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {Object.keys(sow)?.length !== 0 &&
                  Object.keys(sow)?.map((item) => (
                    <View
                      style={{
                        width: "50%",
                        paddingHorizontal: 10,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          width: "100%",
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Lexend-Regular",
                            color: Colors.FormText,
                            fontSize: 12,
                          }}
                        >
                          {item}
                        </Text>
                      </View>
                      <View style={{ width: "100%" }}>
                        <View
                          style={{
                            fontFamily: "Lexend-Regular",
                            borderWidth: 1,
                            width: "100%",
                            borderColor: Colors.FormBorder,
                            marginTop: 3,
                            borderRadius: 4,
                            paddingHorizontal: 7,
                            fontSize: 12,
                            height: 40,
                            backgroundColor: Colors.White,
                            elevation: 3,
                            color: "black",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <TextInput
                            placeholder="--"
                            placeholderTextColor={Colors.FormText}
                            keyboardType="numeric"
                            onChangeText={(target) =>
                              handleMeasurementChange(item, target)
                            }
                            value={sow[item]?.measurement}
                            style={{
                              fontFamily: "Lexend-Regular",
                              width: "80%",
                              fontSize: 12,
                              backgroundColor: Colors.White,
                              color: "black",
                            }}
                          />
                          <Text
                            style={{
                              fontFamily: "Lexend-Regular",
                              color: Colors.FormText,
                              fontSize: 12,
                            }}
                          >
                            /sqft
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
          )}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 280,
            }}
          >
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              ref={mapRef}
              zoomControlEnabled
              showsUserLocation
              showsMyLocationButton
              mapType="standard"
              loadingEnabled={true}
            >
              {geoFancingArray?.length !== 0 &&
                geoFancingArray.map((item, index) => (
                  <Polygon
                    coordinates={item}
                    strokeColor={Colors.Purple}
                    strokeWidth={3}
                  />
                ))}
            </MapView>
            {(user?.user?.role?.name === "SuperAdmin" ||
              projectBoundariesAccess) && (
              <View
                style={{
                  flex: 1,
                  // flexDirection: "row",
                  position: "absolute",
                  top: 10,
                  left: 20,
                  alignSelf: "center",
                  // justifyContent: "space-between",
                  backgroundColor: "transparent",
                  borderWidth: 0.5,
                  borderRadius: 20,
                }}
              >
                <Pressable
                  onPress={() => {
                    setOpenMapModal(true);
                  }}
                  style={{
                    backgroundColor: Colors.Black,
                    padding: 5,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        color: Colors.White,
                        fontFamily: "Lexend-Medium",
                        fontSize: 14,
                        textAlign: "center",
                      }}
                    >
                      Draw Boundaries
                    </Text>
                  </View>
                </Pressable>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      {/* </View> */}
      <Spacer top={-35} />
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
          onPress={() => submitHandler()}
        >
          {loading ? (
            <ActivityIndicator size="small" color={Colors.White} />
          ) : (
            <Text style={styles.buttonText}>Create Project</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { width: "35%", backgroundColor: Colors.Secondary },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      {renderMapModal()}
      {/* {renderSOWModal()} */}
    </View>
  );
};
export default CreateNewProject;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    backgroundColor: Colors.Primary,
    height: "15%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
  },
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "100%",
  },
  graph: {
    height: "88%",
    backgroundColor: Colors.White,
    marginTop: -90,
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
    // padding: 20,
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
    flex: 1,
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
    fontFamily: "Lexend-Medium",
    fontSize: 11,
    color: Colors.FormText,
    textTransform: "uppercase",
  },
  imgText: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.Primary,
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
  stat: {
    fontFamily: "Lexend-Medium",
    fontSize: 6,
    textAlign: "right",
    color: Colors.LightGray,
  },
  scrollGraph: {
    height: "50%",
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
  },
  inputField: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Lexend-Regular",
    height: 40,
    borderColor: "#C4C4C4",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 15,
    backgroundColor: Colors.White,
    paddingLeft: 10,
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
  map: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
