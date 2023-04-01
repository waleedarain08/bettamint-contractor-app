import React, { useEffect, useState } from "react";
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
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import { CardIcon, Picture } from "../../icons";
import Spacer from "../../components/Spacer";
import DropDownPicker from "react-native-dropdown-picker";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
LogBox.ignoreAllLogs();

const CreateNewWorker = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [openJob, setOpenJob] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    // { label: "Banana", value: "banana" },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <ScrollView style={styles.graph}>
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
          <View style={{ width: "28%" }}>
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
              <Picture size={38} color={Colors.FormBorder} />
              <Text style={styles.imgText}>Add Picture</Text>
            </View>
          </View>
          <View style={{ width: "68%" }}>
            <Text style={styles.title}>Select Skill</Text>
            <View style={{ marginTop: 7 }}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="Select"
                placeholderStyle={{ color: Colors.FormText, fontSize: 13 }}
                listItemContainerStyle={{ borderColor: Colors.FormBorder }}
                dropDownContainerStyle={{
                  backgroundColor: "#dfdfdf",
                  borderColor: Colors.FormBorder,
                }}
                // itemSeparatorStyle={{
                //   backgroundColor: "red",
                // }}
                // selectedItemContainerStyle={{fo}}
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
        <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
          <Text style={styles.title}>Full Name</Text>
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
            placeholderTextColor={Colors.FormText}
            placeholder="Enter Name"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
          <Text style={styles.title}>Project</Text>
          <View style={{ marginTop: 7 }}>
            <DropDownPicker
              open={openProject}
              value={value}
              items={items}
              setOpen={setOpenProject}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select Project"
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
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: 15,
            marginTop: openProject ? 30 : 0,
          }}
        >
          <Text style={styles.title}>Job</Text>
          <View style={{ marginTop: 7 }}>
            <DropDownPicker
              open={openJob}
              value={value}
              items={items}
              setOpen={setOpenJob}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select Job"
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
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: 15,
            marginTop: openJob ? 30 : 0,
          }}
        >
          <Text style={styles.title}>Contact Number</Text>
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
            placeholderTextColor={Colors.FormText}
            placeholder="Enter Contact Number"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
          <Text style={styles.title}>Bank Name</Text>
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
            placeholderTextColor={Colors.FormText}
            placeholder="Enter Bank Name"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
          <Text style={styles.title}>Bank Account Number</Text>
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
            placeholderTextColor={Colors.FormText}
            placeholder="Enter Bank Account Number"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 20 }}>
          <Text style={styles.title}>IFSC Code</Text>
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
            placeholderTextColor={Colors.FormText}
            placeholder="Enter Code"
          />
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 20 }}>
          <View
            style={{
              width: "100%",
              backgroundColor: Colors.White,
              borderWidth: 0.5,
              borderColor: Colors.FormBorder,
              height: 200,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 4,
              elevation: 3,
            }}
          >
            <CardIcon color={Colors.FormBorder} size={40} />
            <Text
              style={{
                fontFamily: "Lexend-Regular",
                fontSize: 12,
                color: Colors.Primary,
              }}
            >
              Upload Aadhar Card
            </Text>
          </View>
        </View>
        {/* <Spacer top={20} /> */}
      </ScrollView>
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
          onPress={() => alert("Worker Created")}
        >
          <Text style={styles.buttonText}>Create Worker</Text>
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
    </View>
  );
};
export default CreateNewWorker;

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
});
