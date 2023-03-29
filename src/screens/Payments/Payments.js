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
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const screenWidth = Dimensions.get("window").width;
import { Building, Search } from "../../icons";
import CheckBox from "@react-native-community/checkbox";
LogBox.ignoreAllLogs();
const Payments = ({ navigation }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [toggleCheckBoxSep, setToggleCheckBoxSep] = useState(false);
  const [data, setData] = useState({
    array: [
      {
        id: 1,
        name: "Arvind Chauhan",
        status: "Online",
        due: "₹ 10,350",
        issued: "₹ 8,650",
        selected: false,
      },
      {
        id: 2,
        name: "Arvind Chauhan",
        status: "Online",
        due: "₹ 10,350",
        issued: "₹ 8,650",
        selected: false,
      },
      {
        id: 3,
        name: "Arvind Chauhan",
        status: "Online",
        due: "₹ 10,350",
        issued: "₹ 8,650",
        selected: false,
      },
      {
        id: 4,
        name: "Arvind Chauhan",
        status: "Online",
        due: "₹ 10,350",
        issued: "₹ 8,650",
        selected: false,
      },
      {
        id: 5,
        name: "Arvind Chauhan",
        status: "Online",
        due: "₹ 10,350",
        issued: "₹ 8,650",
        selected: false,
      },
      {
        id: 6,
        name: "Arvind Chauhan",
        status: "Online",
        due: "₹ 10,350",
        issued: "₹ 8,650",
        selected: false,
      },
      {
        id: 7,
        name: "Arvind Chauhan",
        status: "Online",
        due: "₹ 10,350",
        issued: "₹ 8,650",
        selected: false,
      },
      {
        id: 8,
        name: "Arvind Chauhan",
        status: "Online",
        due: "₹ 10,350",
        issued: "₹ 8,650",
        selected: false,
      },
      {
        id: 9,
        name: "Arvind Chauhan",
        status: "Online",
        due: "₹ 10,350",
        issued: "₹ 8,650",
        selected: false,
      },
      {
        id: 10,
        name: "Arvind Chauhan",
        status: "Online",
        due: "₹ 10,350",
        issued: "₹ 8,650",
        selected: false,
      },

      {
        id: 11,
        name: "Arvind Chauhan",
        status: "Online",
        due: "₹ 10,350",
        issued: "₹ 8,650",
        selected: false,
      },
      {
        id: 12,
        name: "Arvind Chauhan",
        status: "Online",
        due: "₹ 10,350",
        issued: "₹ 8,650",
        selected: false,
      },
    ],
  });
  const DATA = [
    {
      id: 1,
      name: "Arvind Chauhan",
      status: "Online",
      due: "₹ 10,350",
      issued: "₹ 8,650",
    },
    {
      id: 2,
      name: "Arvind Chauhan",
      status: "Online",
      due: "₹ 10,350",
      issued: "₹ 8,650",
    },
    {
      id: 3,
      name: "Arvind Chauhan",
      status: "Online",
      due: "₹ 10,350",
      issued: "₹ 8,650",
    },
    {
      id: 4,
      name: "Arvind Chauhan",
      status: "Online",
      due: "₹ 10,350",
      issued: "₹ 8,650",
    },
    {
      id: 5,
      name: "Arvind Chauhan",
      status: "Online",
      due: "₹ 10,350",
      issued: "₹ 8,650",
    },
    {
      id: 6,
      name: "Arvind Chauhan",
      status: "Online",
      due: "₹ 10,350",
      issued: "₹ 8,650",
    },
    {
      id: 7,
      name: "Arvind Chauhan",
      status: "Online",
      due: "₹ 10,350",
      issued: "₹ 8,650",
    },
    {
      id: 8,
      name: "Arvind Chauhan",
      status: "Online",
      due: "₹ 10,350",
      issued: "₹ 8,650",
    },
    {
      id: 9,
      name: "Arvind Chauhan",
      status: "Online",
      due: "₹ 10,350",
      issued: "₹ 8,650",
    },
    {
      id: 10,
      name: "Arvind Chauhan",
      status: "Online",
      due: "₹ 10,350",
      issued: "₹ 8,650",
    },

    {
      id: 11,
      name: "Arvind Chauhan",
      status: "Online",
      due: "₹ 10,350",
      issued: "₹ 8,650",
    },
    {
      id: 12,
      name: "Arvind Chauhan",
      status: "Online",
      due: "₹ 10,350",
      issued: "₹ 8,650",
    },
  ];
  const Item = ({ item, index }) => (
    <View style={[styles.item]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "25%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CheckBox
            disabled={false}
            value={toggleCheckBox ? toggleCheckBox : item.selected}
            onValueChange={(newValue) => {
              const newData = data?.array?.map((newItem) => {
                if (newItem.id == item.id) {
                  return {
                    ...newItem,
                    selected: newValue,
                  };
                }
                return newItem;
              });
              const updated = { array: newData };
              setData(updated);
            }}
            tintColors={{ true: Colors.Primary, false: Colors.Gray }}
          />
          <Text style={[styles.flatListText, { textAlign: "left" }]}>
            {item.name}
          </Text>
        </View>
        <View style={{ width: "20%" }}>
          <Text style={styles.flatListText}>{item.status}</Text>
        </View>
        <View style={{ width: "25%" }}>
          <Text style={styles.flatListText}>{item.due}</Text>
        </View>
        <View style={{ width: "15%" }}>
          <Text style={styles.flatListText}>{item.issued}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PaymentMusterCard");
          }}
          style={{
            backgroundColor: "#ECE5FC",
            padding: 5,
            margin: 5,
            borderRadius: 3,
            width: "13%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.smallButton}>View</Text>
        </TouchableOpacity>
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
          }}
        >
          <View
            style={{
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
            <Text style={[styles.flatListText, { textAlign: "left" }]}>
              Name
            </Text>
          </View>
          <View style={{ width: "20%" }}>
            <Text style={styles.flatListText}>Status</Text>
          </View>
          <View style={{ width: "25%" }}>
            <Text style={styles.flatListText}>Due Amount</Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text style={styles.flatListText}>Issued</Text>
          </View>
          <View style={{ width: "15%" }}>
            <Text style={styles.flatListText}>Action</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      {/* <View style={styles.headerLogo}>
          <Image source={Menu} style={{ height: 20, width: 20 }} />
          <Text style={styles.heading}>Projects</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Text>New Project</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={styles.graph}>
        <View
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
          <Text style={styles.selectText}>Select Project</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <Text style={styles.smallButton}>Sort by</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <Text style={styles.smallButton}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 5,
            }}
          >
            <Search size={15} color={Colors.Secondary} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            backgroundColor: Colors.White,
            alignItems: "center",
            margin: 10,
            padding: 10,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 4,
          }}
        >
          <FlatList
            data={data.array}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
          position: "absolute",
          bottom: 0,
        }}
      >
        <TouchableOpacity style={[styles.button, { width: "48%" }]}>
          <Text style={styles.buttonText}>Pay Online</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { width: "48%", backgroundColor: Colors.Secondary },
          ]}
        >
          <Text style={styles.buttonText}>Pay Offline</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Payments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
    padding: 10,
    backgroundColor: Colors.White,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
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
    fontFamily: "Lexend-Medium",
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
    fontSize: 11,
    color: Colors.Black,
    textAlign: "center",
  },
  button: {
    backgroundColor: Colors.Primary,
    justifyContent: "center",
    borderRadius: 4,
    marginTop: 15,
    height: 40,
  },
  buttonText: {
    fontFamily: "Lexend-Regular",
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },
});
