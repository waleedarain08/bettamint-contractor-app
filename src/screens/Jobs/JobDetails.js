import React from "react";
import { View, Text, StyleSheet, LogBox } from "react-native";
import { TextInput, ScrollView } from "react-native";
import { Colors } from "../../utils/Colors";
import { DateIcon, EditIcon, LocationIcon, RupeesIcon } from "../../icons";
import Spacer from "../../components/Spacer";
import CheckBox from "@react-native-community/checkbox";
import moment from "moment";
import { useJob } from "../../context/jobContext";
LogBox.ignoreAllLogs();

const JobDetails = ({}) => {
  const { selectedJob } = useJob();

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <ScrollView style={styles.graph} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10, marginTop: 14 }}>
          <Text style={styles.title}>Job title/skill set</Text>
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
              value={selectedJob?.jobName}
              placeholderTextColor={Colors.FormText}
              editable={false}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            width: "100%",
          }}
        >
          <View style={{ padding: 10, width: "50%" }}>
            <Text style={styles.title}>Required Workers</Text>
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
                value={selectedJob?.requiredWorkers.toString()}
              />
              <EditIcon color={Colors.Purple} size={20} />
            </View>
          </View>
          <View style={{ padding: 10, width: "50%" }}>
            <Text style={styles.title}>Skill Level</Text>
            <TextInput
              style={styles.inputField}
              placeholderTextColor={Colors.FormText}
              //   placeholder="Man Days"
              value={selectedJob?.skillTypeId}
              editable={false}
            />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Project Name</Text>
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
              value={selectedJob?.projectName}
              placeholderTextColor={Colors.FormText}
              //   placeholder="mm/dd/yyyy"
              editable={false}
            />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>SuperVisor</Text>
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
              value={selectedJob?.supervisorName || "N/A"}
              placeholderTextColor={Colors.FormText}
              //   placeholder="mm/dd/yyyy"
              editable={false}
            />
          </View>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Start Date</Text>
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
              placeholder="mm/dd/yyyy"
              value={moment(selectedJob?.startDate).format("DD MMM, YYYY")}
              editable={false}
            />
            <DateIcon color={Colors.FormBorder} size={22} />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Location</Text>
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
                fontFamily: "Lexend-Regular",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              value={selectedJob?.cityName}
              editable={false}
            />
            <LocationIcon color={Colors.FormBorder} size={25} />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Job Description</Text>
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
              style={styles.inputField}
              placeholder="Job Description"
              placeholderTextColor={Colors.FormText}
              value={selectedJob?.description}
            />
            <EditIcon color={Colors.Purple} size={20} />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            width: "100%",
          }}
        >
          <View style={{ padding: 10, width: "50%" }}>
            <Text style={styles.title}>Man Days</Text>
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
                placeholder="----"
                value={`${selectedJob?.manDays}`}
              />
              <EditIcon color={Colors.Purple} size={20} />
            </View>
          </View>
          <View style={{ padding: 10, width: "50%" }}>
            <Text style={styles.title}>Reporting Time</Text>
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
                placeholder="----"
                value={moment(selectedJob?.reportingTime).format("hh:mm A")}
                editable={false}
              />
              <EditIcon color={Colors.Purple} size={20} />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            width: "100%",
          }}
        >
          <View style={{ padding: 10, width: "50%" }}>
            <Text style={styles.title}>Total</Text>
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
                placeholder="----"
                value={`₹ ${selectedJob?.totalWage}`}
                editable={false}
              />
              <RupeesIcon color={Colors.FormBorder} size={20} />
            </View>
          </View>
          <View style={{ padding: 10, width: "50%" }}>
            <Text style={styles.title}>DAILY WAGE</Text>
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
                placeholder="----"
                value={`₹ ${selectedJob?.dailyWage}`}
                editable={false}
              />
              <RupeesIcon color={Colors.FormBorder} size={20} />
            </View>
          </View>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Contact Number</Text>
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
              style={styles.inputField}
              placeholder="Enter Contact Number"
              placeholderTextColor={Colors.FormText}
              value={`+${selectedJob?.contactNumber}`}
            />
            <EditIcon color={Colors.Purple} size={20} />
          </View>
        </View>
        <View
          style={{
            padding: 10,
            width: "90%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "40%" }}
          >
            <CheckBox
              tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              value={selectedJob?.isFood}
              //   onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            <Text
              style={{
                fontSize: 12,
                color: Colors.Black,
                fontFamily: "Lexend-Medium",
              }}
            >
              Food
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: "40%" }}
          >
            <CheckBox
              tintColors={{ true: Colors.Primary, false: Colors.Gray }}
              value={selectedJob?.isAccomodation}
            />
            <Text
              style={{
                fontSize: 12,
                color: Colors.Black,
                fontFamily: "Lexend-Medium",
              }}
            >
              Accomodation
            </Text>
          </View>
        </View>
        <Spacer bottom={20} />
      </ScrollView>
    </View>
  );
};
export default JobDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
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
    height: "93%",
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
    fontSize: 10,
    color: Colors.FormText,
    textTransform: "uppercase",
  },
  imgText: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.FormText,
    textTransform: "uppercase",
    // textDecorationLine: "underline",
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
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // fontFamily: "Lexend-Regular",
    // height: 40,
    // borderColor: "#C4C4C4",
    // borderWidth: 1,
    // borderRadius: 4,
    // marginTop: 15,
    // backgroundColor: Colors.White,
    // paddingLeft: 10,
    fontFamily: "Lexend-Medium",
    borderBottomWidth: 1,
    borderColor: Colors.FormBorder,
    // marginTop: 7,
    // borderRadius: 4,
    paddingRight: 7,
    fontSize: 12,
    height: 40,
    backgroundColor: Colors.White,
    // elevation: 3,
    color: Colors.Black,
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

  //   container: {
  //     flex: 1,
  //     backgroundColor: "#FFF",
  //   },
  //   header: {
  //     backgroundColor: Colors.Primary,
  //     height: "15%",
  //     borderBottomLeftRadius: 50,
  //     borderBottomRightRadius: 50,
  //     paddingHorizontal: 20,
  //   },
  //   headerLogo: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     marginTop: 25,
  //     width: "100%",
  //   },
  //   heading: {
  //     fontSize: 14,
  //     fontFamily: "Lexend-Medium",
  //     color: Colors.Black,
  //     textAlign: "left",
  //   },

  //   graph: {
  //     height: "88%",
  //     backgroundColor: Colors.White,
  //     marginTop: -80,
  //     margin: 15,
  //     shadowColor: "#000",
  //     shadowOffset: {
  //       width: 0,
  //       height: 2,
  //     },
  //     shadowOpacity: 0.2,
  //     shadowRadius: 5,
  //     elevation: 4,
  //     borderRadius: 10,
  //     padding: 10,
  //   },
  //   graphBottom: {
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     paddingHorizontal: 20,
  //     paddingTop: 20,
  //   },
  //   graphBottomText: {
  //     fontSize: 10,
  //     fontFamily: "Lexend-Regular",
  //     color: Colors.Black,
  //   },
  //   graphBottomTextBold: {
  //     fontSize: 32,
  //     fontFamily: "Lexend-Bold",
  //     color: Colors.Secondary,
  //     paddingLeft: 10,
  //   },
  //   graphBottomTabs: {
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //     backgroundColor: Colors.WhiteGray,
  //     borderRadius: 8,
  //     padding: 12,
  //   },
  //   item: {
  //     flex: 1,
  //     padding: 20,
  //     marginVertical: 8,
  //     marginHorizontal: 15,
  //     backgroundColor: Colors.White,
  //     shadowColor: "#000",
  //     shadowOffset: {
  //       width: 0,
  //       height: 2,
  //     },
  //     shadowOpacity: 0.2,
  //     shadowRadius: 5,
  //     elevation: 4,
  //     borderRadius: 10,
  //   },
  //   title: {
  //     fontFamily: "Lexend-Medium",
  //     fontSize: 11,
  //     color: Colors.FormText,
  //     textTransform: "uppercase",
  //   },
  //   imgText: {
  //     fontFamily: "Lexend-Medium",
  //     fontSize: 8,
  //     color: Colors.Primary,
  //     textTransform: "uppercase",
  //     textDecorationLine: "underline",
  //   },
  //   placeholderText: {
  //     flex: 1,
  //     fontFamily: "Lexend-Medium",
  //     fontSize: 11,
  //     textAlign: "left",
  //     color: Colors.LightGray,
  //   },
  //   scrollGraph: {
  //     height: "50%",
  //     backgroundColor: Colors.White,
  //     margin: 15,
  //     shadowColor: "#000",
  //     shadowOffset: {
  //       width: 0,
  //       height: 2,
  //     },
  //     shadowOpacity: 0.2,
  //     shadowRadius: 5,
  //     elevation: 4,
  //     borderRadius: 10,
  //   },
  //   inputField: {
  //     flexDirection: "row",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     fontFamily: "Lexend-Regular",
  //     height: 45,
  //     borderColor: "#C4C4C4",
  //     borderWidth: 1,
  //     borderRadius: 4,
  //     marginTop: 15,
  //     backgroundColor: Colors.White,
  //     paddingLeft: 10,
  //   },
  //   button: {
  //     backgroundColor: Colors.Primary,
  //     padding: 15,
  //     borderRadius: 4,
  //     marginTop: 15,
  //   },
  //   buttonText: {
  //     fontFamily: "Lexend-Regular",
  //     fontSize: 15,
  //     textAlign: "center",
  //     color: "white",
  //   },
  uploadBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.White,
    // borderRadius: 4,
    // margin: 10,
    padding: 15,
    width: "100%",
    // height: 150,
    // borderColor: "#C4C4C4",
    // borderWidth: 1,
    // backgroundColor: Colors.White,
  },
});
