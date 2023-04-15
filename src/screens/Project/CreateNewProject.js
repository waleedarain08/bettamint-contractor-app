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
import { updateProjectAction } from "../../redux/slices/projectSlice";
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../utils/api_constants";
import MapViewGestures from "@dev-event/react-native-maps-draw";
import { TTouchPoint } from "@dev-event/react-native-maps-draw";
import WebView from "react-native-webview";

const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

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
  const [projectName, setProjectName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectImageUri, setProjectImageUri] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [openMapModal, setOpenMapModal] = useState(false);
  const dispatch = useDispatch();
  const mapRef = useRef();
  const webview = useRef();
  const initialPolygon = useRef({
    polygons: [],
    distance: 0,
    lastLatLng: undefined,
    initialLatLng: undefined,
    centerLatLng: undefined,
  });

  const polygonOptions = {
    clickable: false,
    fillColor: "#303030",
    fillOpacity: 0.1,
    strokeColor: "#000000",
    strokeWeight: 4,
    strokeOpacity: 1,
  };
  const [isActiveDraw, setDrawMode] = useState(false);
  const [polygon, setPolygon] = useState(initialPolygon.current);
  const [isReady, setIsReady] = useState(false);
  const [points, setPoints] = useState(TTouchPoint);
  const handleMapReady = useCallback(
    () => mapRef.current && setIsReady(true),
    []
  );

  const convertByPoint = async (item) => {
    await mapRef.current?.coordinateForPoint(item);
  };
  const handleRemovePolygon = () => {
    setPolygon(initialPolygon.current);
  };
  const handleCanvasEndDraw = useCallback((locations) => {
    setPolygon(locations);
    setDrawMode(false);
  }, []);

  const handlePolygon = useCallback(
    (_, index) => console.log(index),
    // <AnimatedPolygon
    //   key={index}
    //   coordinates={polygon.polygons}
    //   fillColor="red"
    //   strokeColor="black"
    //   strokeWidth={2}
    // />
    [polygon.polygons]
  );

  // console.log("Polygon", polygon);
  const isVisiblePolygons = useMemo(
    () => isReady && polygon.polygons && polygon.polygons.length > 0,
    [isReady, polygon.polygons]
  );
  const submitHandler = async () => {
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
    const formData = new FormData();
    formData.append("Name", projectName);
    formData.append("ProjectTypeId", value);
    formData.append("DeveloperId", 0);
    formData.append("ProjectId", 0);
    formData.append("Image", {
      name: projectImage?.assets[0]?.fileName,
      type: projectImage?.assets[0]?.type,
      uri: projectImage?.assets[0]?.uri, //Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
    formData.append("GeofencingArray", JSON.stringify(geoArray));
    dispatch(updateProjectAction(formData));

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
          source={{ uri: "https://tiagocavaco.github.io/google-maps-draw-shape-react/" }}
          style={{ flex: 1 }}
          onMessage={(event) => {
            console.log(JSON.parse(event?.nativeEvent?.data));
            setOpenMapModal(false);
          }}
          injectedJavaScript={runFirst}
        />
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
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
            }}
            onChangeText={(e) => setProjectName(e)}
            placeholderTextColor={Colors.FormText}
            placeholder="Enter Project Name"
          />
        </View>
        <Pressable
          onPress={() => {
            // console.log("test");
            setOpenMapModal(true);
          }}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: 280,
          }}
        >
          {/* <Pressable style={{ backgroundColor: "red" }}>
            <Text>BUTTON</Text>
          </Pressable> */}
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            mapType="standard"
            loadingEnabled={true}
            region={{
              latitude: selectedPosition?.lat || 0,
              longitude: selectedPosition?.lng || 0,
              latitudeDelta: selectedPosition?.lat ? 0.2 : 100,
              longitudeDelta: selectedPosition?.lng ? 0.08 : 100,
            }}
          ></MapView>
        </Pressable>
      </View>
      <Spacer top={-20} />
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
