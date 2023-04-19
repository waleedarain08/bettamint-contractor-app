import React, { useState } from "react";
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
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import { Picture, RupeesIcon, User, Email, LockIcon } from "../../icons";
import Spacer from "../../components/Spacer";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
import CheckBox from "@react-native-community/checkbox";
import DropDownPicker from "react-native-dropdown-picker";
const screenWidth = Dimensions.get("window").width;
LogBox.ignoreAllLogs();

const CreateNewUser = ({ navigation }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [open, setOpen] = useState(false);
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
          style={{ paddingHorizontal: 15, paddingBottom: 13, marginTop: 20 }}
        >
          <Text style={styles.title}>Full Name</Text>
          <View
            style={[
              styles.inputField,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <TextInput
              style={{
                fontFamily: "Lexend-Medium",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter Name"
              // value="₹ 56,000"
            />
            <User color={Colors.FormBorder} size={30} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
          <Text style={styles.title}>Email</Text>
          <View
            style={[
              styles.inputField,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <TextInput
              style={{
                fontFamily: "Lexend-Medium",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter Email"
              // value="₹ 56,000"
            />
            <Email
              color={Colors.FormBorder}
              size={20}
              style={{ paddingRight: 5 }}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
          <Text style={styles.title}>User Name</Text>
          <View
            style={[
              styles.inputField,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <TextInput
              style={{
                fontFamily: "Lexend-Medium",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter User Name"
              // value="₹ 56,000"
            />
            <User color={Colors.FormBorder} size={30} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
          <Text style={styles.title}>Password</Text>
          <View
            style={[
              styles.inputField,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <TextInput
              style={{
                fontFamily: "Lexend-Medium",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              placeholder="*********"
              // value="₹ 56,000"
            />
            <LockIcon color={Colors.FormBorder} size={25} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
          <Text style={styles.title}>User Role</Text>
          {/* <View style={styles.inputField}></View> */}
          <View style={{ marginTop: 7 }}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              placeholder="Select User Roles"
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
        <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
          <Text style={styles.title}>OR Enter New Role</Text>
          <View
            style={[
              styles.inputField,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
          >
            <TextInput
              style={{
                fontFamily: "Lexend-Medium",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter new role name here"
              // value="₹ 56,000"
            />
            {/* <LockIcon color={Colors.FormBorder} size={25} /> */}
            <Pressable
              style={{
                width: "15%",
                backgroundColor: "#ECE5FC",
                alignItems: "center",
                padding: 4,
                borderRadius: 4,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Lexend-Regular",
                    fontSize: 12,
                    color: Colors.Purple,
                  }}
                >
                  Add
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, marginTop: 10 }}>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              color: Colors.Black,
              fontSize: 12,
              textTransform: "uppercase",
            }}
          >
            Select features to assign to this new role*
          </Text>
        </View>
        <View style={{ width: "100%", alignItems: "center", marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // flex: 1,
              width: "90%",
              alignItems: "center",
              // paddingHorizontal: 10,
              paddingBottom: 5,
              marginBottom: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: Colors.FormBorder,
            }}
          >
            <View style={{ width: "30%" }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: 14,
                    fontFamily: "Lexend-Regular",
                  },
                ]}
              >
                Dashboard
              </Text>
            </View>

            <View
              style={{
                // padding: 10,
                width: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>view</Text>
            </View>
            <View
              style={{
                // padding: 10,
                width: "35%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>
                Create/Edit
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // flex: 1,
              width: "90%",
              alignItems: "center",
              paddingBottom: 5,
              marginBottom: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: Colors.FormBorder,
            }}
          >
            <View style={{ width: "30%" }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: 14,
                    fontFamily: "Lexend-Regular",
                  },
                ]}
              >
                Project
              </Text>
            </View>

            <View
              style={{
                // padding: 10,
                width: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>view</Text>
            </View>
            <View
              style={{
                // padding: 10,
                width: "35%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>
                Create/Edit
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // flex: 1,
              width: "90%",
              alignItems: "center",
              paddingBottom: 5,
              marginBottom: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: Colors.FormBorder,
            }}
          >
            <View style={{ width: "30%" }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: 14,
                    fontFamily: "Lexend-Regular",
                  },
                ]}
              >
                Jobs
              </Text>
            </View>

            <View
              style={{
                // padding: 10,
                width: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>view</Text>
            </View>
            <View
              style={{
                // padding: 10,
                width: "35%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>
                Create/Edit
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // flex: 1,
              width: "90%",
              alignItems: "center",
              paddingBottom: 5,
              marginBottom: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: Colors.FormBorder,
            }}
          >
            <View style={{ width: "30%" }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: 14,
                    fontFamily: "Lexend-Regular",
                  },
                ]}
              >
                Attendance
              </Text>
            </View>

            <View
              style={{
                // padding: 10,
                width: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>view</Text>
            </View>
            <View
              style={{
                // padding: 10,
                width: "35%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>
                Create/Edit
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // flex: 1,
              width: "90%",
              alignItems: "center",
              paddingBottom: 5,
              marginBottom: 10,
              borderBottomWidth: 0.2,
              borderBottomColor: Colors.FormBorder,
            }}
          >
            <View style={{ width: "30%" }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: 14,
                    fontFamily: "Lexend-Regular",
                  },
                ]}
              >
                Worker
              </Text>
            </View>

            <View
              style={{
                // padding: 10,
                width: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>view</Text>
            </View>
            <View
              style={{
                // padding: 10,
                width: "35%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>
                Create/Edit
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // flex: 1,
              width: "90%",
              alignItems: "center",
              paddingBottom: 5,
              marginBottom: 20,
              borderBottomWidth: 0.2,
              borderBottomColor: Colors.FormBorder,
            }}
          >
            <View style={{ width: "30%" }}>
              <Text
                style={[
                  styles.title,
                  {
                    color: Colors.Black,
                    fontSize: 14,
                    fontFamily: "Lexend-Regular",
                  },
                ]}
              >
                User
              </Text>
            </View>

            <View
              style={{
                // padding: 10,
                width: "25%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>view</Text>
            </View>
            <View
              style={{
                // padding: 10,
                width: "35%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              />
              <Text style={[styles.title, { color: Colors.Black }]}>
                Create/Edit
              </Text>
            </View>
          </View>
        </View>
        {/* <Spacer top={20} /> */}
        {/* <View>
					<Text style={styles.heading}>
						Select features to assign to this new role*
					</Text>
				</View> */}
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
          onPress={() => alert("User Created")}
        >
          <Text style={styles.buttonText}>Create User</Text>
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
export default CreateNewUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    // alignItems: 'center'
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
  heading: {
    fontSize: 13,
    fontFamily: "Lexend-Medium",
    color: Colors.Black,
    textAlign: "center",
  },

  graph: {
    height: "88%",
    backgroundColor: Colors.White,
    marginTop: -80,
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
    fontSize: 12,
    color: Colors.FormText,
  },
  imgText: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.Primary,
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
  placeholderText: {
    flex: 1,
    fontFamily: "Lexend-Medium",
    fontSize: 11,
    textAlign: "left",
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
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // fontFamily: "Lexend-Regular",
    // height: 45,
    // borderColor: "#C4C4C4",
    // borderWidth: 1,
    // borderRadius: 4,
    // marginTop: 15,
    // backgroundColor: Colors.White,
    // paddingLeft: 10,

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
