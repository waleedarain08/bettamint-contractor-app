import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  FlatList,
  Dimensions,
  LogBox,
  Alert,
  Pressable,
  Modal,
  Animated,
  ActivityIndicator,
  PermissionsAndroid,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import { BackCircleIcon, LocationIcon, Picture } from "../../icons";
import Spacer from "../../components/Spacer";
import DropDownPicker from "react-native-dropdown-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useSelector, useDispatch } from "react-redux";
import {
  selectedProjectReducer,
  updateProjectAction,
} from "../../redux/slices/projectSlice";
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY, assetsUrl, mapUrl } from "../../utils/api_constants";
import MapViewGestures from "@dev-event/react-native-maps-draw";
import { TTouchPoint } from "@dev-event/react-native-maps-draw";
import WebView from "react-native-webview";
import { authToken } from "../../redux/slices/authSlice";
import Toast from "react-native-toast-message";
import Geolocation from "react-native-geolocation-service";
// const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
// import Geolocation from "@react-native-community/geolocation";
// import { PermissionsAndroid } from "react-native";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
LogBox.ignoreAllLogs();

const CreateNewProject = ({ navigation }) => {
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
  const [projectNameClick, setProjectNameClick] = useState(false);
  const [loader, setLoader] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [projectArea, setProjectArea] = useState(null);
  const token = useSelector(authToken);
  const dispatch = useDispatch();
  const mapRef = useRef();
  const project = useSelector(selectedProjectReducer);
  const geoArray = [
    {
      latitude: 26.04198067508024,
      longitude: 68.94373902912463,
    },
    {
      latitude: 26.04375434168726,
      longitude: 68.94556293125476,
    },
    {
      latitude: 26.042134908024217,
      longitude: 68.94873866672839,
    },
  ];
  useEffect(() => {
    getLocationPermission();
  }, []);
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
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  useEffect(() => {
    if (project) {
      setProjectImageUri(assetsUrl + project?.url);
      setProjectName(project?.name);
      setValue(project?.projectTypeId);
      setGeoFancingArray(project?.geofencingArray);
    }
  }, [project]);

  const submitHandler = async () => {
    const formData = new FormData();
    const projectId = project ? project?.projectId : 0;
    if (!value) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select project type.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!projectName) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter project name.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!projectArea) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter project area.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!projectImageUri) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please add project image.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (geoFancingArray.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please draw project coordinates.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
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
      formData.append("GeofencingArray", JSON.stringify(geoFancingArray));
      formData.append("Latitude", geoFancingArray[0].latitude);
      formData.append("Longitude", geoFancingArray[0].longitude);
      const response = await dispatch(updateProjectAction(token, formData));
      if (response.status === 200) {
        navigation.goBack();
        Toast.show({
          type: "info",
          text1: "Project Created",
          text2: "New project is created successfully.",
          topOffset: 10,
          position: "top",
          visibilityTime: 4000,
        });
      }
    }

    // if (projectName === "") {
    //   Alert.alert("Please enter project name");
    // } else if (projectType === "") {
    //   Alert.alert("Please enter project type");
    // } else if (projectLocation === "") {
    //   Alert.alert("Please enter project location");
    // } else if (projectImage === "") {
    //   Alert.alert("Please enter project image");
    // } else {
    //   dispatch(updateProjectAction(formData));
    //   navigation.navigate("Projects");
    // }
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
            setGeoFancingArray(JSON.parse(event?.nativeEvent?.data));
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
          geoFancingArray[0]?.latitude || currentPosition?.coords?.latitude,
        longitude:
          geoFancingArray[0]?.longitude || currentPosition?.coords?.longitude,
        latitudeDelta: geoFancingArray[0]?.latitude ? 0.006 : 0.2,
        longitudeDelta: geoFancingArray[0]?.longitude ? 0.001 : 20,
      },
      2000
    );
  }, 1000);
  return (
    <View style={styles.container}>
      {/* <Toast /> */}
      <View style={styles.header} />
      <View style={styles.graph}>
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
        {/* <View style={{position: 'absolute'}}> */}
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
            showsUserLocation
            showsMyLocationButton
            mapType="standard"
            loadingEnabled={true}
          >
            {geoFancingArray?.length !== 0 && (
              <Polygon
                coordinates={geoFancingArray}
                strokeColor={Colors.Purple}
                strokeWidth={3}
              />
            )}
          </MapView>
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
        </View>
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
          <Text style={styles.buttonText}>Create Project</Text>
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
