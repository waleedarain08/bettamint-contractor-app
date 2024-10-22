import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  LogBox,
  TouchableOpacity,
  Modal,
  RefreshControl,
  ToastAndroid,
} from "react-native";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { TickIcon, SquareCheckBox, DotIcon, Cross } from "../../icons";
import { assetsUrl } from "../../utils/api_constants";
import { Dropdown } from "react-native-element-dropdown";
import { useAttendance } from "../../context/attendanceContext";
LogBox.ignoreAllLogs();

const AttendanceMusterCard = ({}) => {
  const {
    loading,
    selectedAttendance,
    mustercardAttendance,
    getMusterCardAttendance,
    approveAttendance,
  } = useAttendance();
  const [selectedDate, setSelectedDate] = useState("");
  const [openApproveModal, setOpenApproveModal] = useState(false);
  const [approveStatus, setApproveStatus] = useState(null);
  const attendance = mustercardAttendance?.attendance;
  const attendanceOptions = [
    { label: "P", value: 8 },
    { label: "1/2 P", value: 4 },
    { label: "P1", value: 9 },
    { label: "P2", value: 10 },
    { label: "P3", value: 11 },
    { label: "P4", value: 12 },
    { label: "P5", value: 13 },
    { label: "P6", value: 14 },
    { label: "P7", value: 15 },
    { label: "PP", value: 16 },
  ];

  const getData = (
    workerId = selectedAttendance?.workerId,
    jobId = selectedAttendance?.jobId
  ) => {
    getMusterCardAttendance(workerId, jobId).catch((error) => {
      ToastAndroid.show(error.message, ToastAndroid.SHORT);
    });
  };
  useEffect(() => {
    getData();
  }, [selectedAttendance]);

  const rowColors = ["#F3F4F4", "#FFFFFF"];

  const renderApproveModal = () => (
    <Modal
      animationType="slide"
      visible={openApproveModal}
      onRequestClose={() => setOpenApproveModal(!openApproveModal)}
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.headerModal}>
            <Text style={styles.modalTitle}>Approve Attendance</Text>
            <Cross
              onPress={() => setOpenApproveModal(!openApproveModal)}
              size={22}
              color={Colors.Black}
              style={styles.crossIcon}
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemTextStyle}
              iconStyle={styles.iconStyle}
              data={attendanceOptions}
              maxHeight={600}
              labelField="label"
              valueField="value"
              placeholder={"Approve"}
              value={approveStatus}
              onChange={(item) => {
                setOpenApproveModal(false);
                setApproveStatus(item);
                approveAttendance(
                  selectedAttendance?.jobId,
                  selectedAttendance?.workerId,
                  selectedDate,
                  item?.value
                )
                  .then((res) => {
                    if (res) {
                      ToastAndroid.show(
                        "Attendance Approved",
                        ToastAndroid.SHORT
                      );
                      getData(
                        selectedAttendance?.workerId,
                        selectedAttendance?.jobId
                      );
                      setApproveStatus(null);
                    } else {
                      ToastAndroid.show(
                        "Something went wrong",
                        ToastAndroid.SHORT
                      );
                    }
                  })
                  .catch((error) => {
                    ToastAndroid.show(error.message, ToastAndroid.SHORT);
                  });
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  const Item = ({ item, index }) => (
    <View style={styles.item}>
      <View
        style={[
          styles.row,
          { backgroundColor: rowColors[index % rowColors?.length] },
        ]}
      >
        <View style={styles.dateContainer}>
          <Text style={[styles.flatListText, styles.textAlignLeft]}>
            {item?.date}
          </Text>
        </View>
        <View style={styles.abbreviationContainer}>
          <Text
            style={[
              styles.flatListText,
              {
                color: item?.hoursAbbreviation === "A" ? "red" : Colors.Primary,
              },
            ]}
          >
            {item?.hoursAbbreviation}
          </Text>
          <DotIcon
            size={25}
            color={item?.hoursAbbreviation === "A" ? "red" : Colors.Primary}
          />
        </View>
        <View style={styles.advanceContainer}>
          <Text style={styles.flatListText}>{item?.advance}</Text>
        </View>
        <View style={styles.approvalContainer}>
          {item?.isApproved ? (
            <TickIcon size={20} color={Colors.Primary} />
          ) : (
            <Cross size={20} color={"red"} />
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            setOpenApproveModal(true);
            const [month, day, year] = item?.date.split("/");
            const dateInUTC = Date.UTC(year, month - 1, day);
            setSelectedDate(new Date(dateInUTC).toISOString());
          }}
          style={styles.approveButton}
        >
          <Text style={styles.smallButton}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ListHeader = () => {
    return (
      <View style={[styles.item]}>
        <View style={styles.itemHeader}>
          <View style={{ width: "15%" }}>
            <Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
              Date
            </Text>
          </View>
          <View style={{ width: "20%", alignItems: "center" }}>
            <Text style={styles.flatListTextHeader}>Attendance</Text>
          </View>
          <View style={{ width: "15%", alignItems: "center" }}>
            <Text style={styles.flatListTextHeader}>Advance</Text>
          </View>
          <View style={{ width: "15%", alignItems: "center" }}>
            <Text style={styles.flatListTextHeader}>Verified</Text>
          </View>
          <View style={{ width: "18%", alignItems: "center" }}>
            <Text style={[styles.flatListTextHeader, {}]}>Action</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.graph}>
        <View style={styles.topContainer}>
          <View style={{ width: "27%" }}>
            <Image
              style={{ width: 92, height: 90, borderRadius: 15 }}
              source={
                mustercardAttendance?.profilePicture
                  ? { uri: assetsUrl + mustercardAttendance?.profilePicture }
                  : {
                      uri: "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=",
                    }
              }
            />
          </View>

          <View style={{ width: "70%", bottom: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.title, { paddingRight: 10 }]}>
                {mustercardAttendance?.workerName}
              </Text>
              <SquareCheckBox
                size={20}
                color={Colors.Primary}
                style={{ borderRadius: 10 }}
              />
            </View>
            <Text style={styles.typeText}>{mustercardAttendance?.jobName}</Text>
          </View>
        </View>
        <View style={styles.projectImage}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 4 }}
            source={{ uri: assetsUrl + mustercardAttendance?.projectImage }}
          />
          <Spacer right={10} />
          <View>
            <Text style={[styles.title, { fontSize: 13 }]}>
              {mustercardAttendance?.projectName}
            </Text>
            <Text
              style={[
                styles.typeText,
                { color: Colors.SubHeading, fontSize: 11 },
              ]}
            >
              {mustercardAttendance?.cityName}
            </Text>
          </View>
        </View>
        <View style={styles.flatlistContainer}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => {
                  getData(
                    selectedAttendance?.workerId,
                    selectedAttendance?.jobId
                  );
                }}
                tintColor={Colors.Primary}
                colors={[Colors.Purple, Colors.Primary]}
              />
            }
            data={attendance}
            renderItem={({ item, index }) => <Item item={item} index={index} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      {renderApproveModal()}
    </View>
  );
};
export default AttendanceMusterCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    alignItems: "center",
  },
  projectImage: {
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    padding: 10,
  },
  dateText: {
    fontFamily: "Lexend-Regular",
    color: Colors.Black,
    fontSize: 10,
    width: "80%",
  },
  header: {
    backgroundColor: Colors.Primary,
    height: "35%",
    width: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.2,
    borderColor: Colors.FormBorder,
    borderRadius: 4,
    paddingHorizontal: 7,
    fontSize: 12,
    height: 32,
    backgroundColor: "#F0F1F3",
    elevation: 1,
    color: Colors.Black,
  },
  flatlistContainer: {
    width: "100%",
    marginTop: 10,
    borderTopWidth: 0.4,
    borderTopColor: "#E5EAED",
    backgroundColor: Colors.White,
  },
  topContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
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
    backgroundColor: Colors.White,
    bottom: 230,
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
    // padding: 10,
    backgroundColor: Colors.White,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  title: {
    fontFamily: "Lexend-Medium",
    fontSize: 16,
    color: Colors.Black,
  },
  num: {
    fontFamily: "Lexend-Medium",
    fontSize: 12,
    color: Colors.LightGray,
  },
  typeText: {
    fontFamily: "Lexend-Regular",
    fontSize: 12,
    color: Colors.Black,
  },

  selectText: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.Gray,
    paddingLeft: 10,
  },
  smallButton: {
    fontFamily: "Lexend-SemiBold",
    fontSize: 9,
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
  flatListTextHeader: {
    fontFamily: "Lexend-Medium",
    fontSize: 11,
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
  itemHeader: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 8,
    backgroundColor: Colors.White,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 25,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  dateContainer: {
    width: "20%",
  },
  textAlignLeft: {
    textAlign: "left",
  },
  abbreviationContainer: {
    width: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  advanceContainer: {
    width: "20%",
  },
  approvalContainer: {
    width: "15%",
    alignItems: "center",
  },
  approveButton: {
    backgroundColor: "#ECE5FC",
    padding: 5,
    borderRadius: 2,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0)",
    marginTop: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 15,
  },
  headerModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontFamily: "Lexend-Medium",
    color: Colors.Black,
    fontSize: 16,
    marginBottom: 10,
  },
  crossIcon: {
    marginBottom: 8,
  },
  dropdownContainer: {
    marginVertical: 10,
  },
  itemTextStyle: {
    fontFamily: "Lexend-Regular",
    fontSize: 13,
    color: Colors.FormText,
  },
});
