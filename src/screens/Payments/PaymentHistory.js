import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
  FlatList,
  RefreshControl,
  Appearance,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../utils/Colors";
import DatePicker from "react-native-date-picker";
import moment from "moment";
import { DateIcon } from "../../icons";
import { Dropdown } from "react-native-element-dropdown";
// import {
//   getPaymentHistory,
//   loadingPayments,
//   paymentsListReducer,
// } from "../../redux/slices/paymentSlice";
import { useGeneralContext } from "../../context/generalContext";

const PaymentHistory = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Residential", value: "Residential" },
    { label: "Commercial", value: "Commercial" },
    { label: "Hospitality", value: "Hospitality" },
    { label: "Infrastructure", value: "Infrastructure" },
  ]);
  const { projects } = useGeneralContext();
  const [openStartDate, setStartOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [openEndDate, setEndOpen] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState(null);

  // const projectsList = useSelector(projectsListSimpleReducer);
  // const paymentHistoryList = useSelector(paymentsListReducer);
  const paymentHistoryList = [
    {
      id: "1",
      workerName: "John Doe",
      jobName: "Plumber",
      paidDate: "12/2020",
      transactionStatusId: "Paid",
      amount: "₹ 1000",
    },
    {
      id: "2",
      workerName: "John Doe",
      jobName: "Plumber",
      paidDate: "12/2020",
      transactionStatusId: "Paid",
      amount: "₹ 1000",
    },
    {
      id: "3",
      workerName: "John Doe",
      jobName: "Plumber",
      paidDate: "12/2020",
      transactionStatusId: "Paid",
      amount: "₹ 1000",
    },
  ];
  // const isLoading = useSelector(loadingPayments);
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === "dark";
  const textColor = isDarkMode ? "white" : "black";

  // useEffect(() => {
  //   dispatch(getAllProjectsSimpleAction(token));
  //   dispatch(getPaymentHistory(token));
  // }, []);

  const rowColors = ["#F3F4F4", "#FFFFFF"];
  const Item = ({ item, index }) => (
    <View style={[styles.item]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          backgroundColor: rowColors[index % rowColors?.length],
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}
      >
        <View
          style={{
            width: "20%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              styles.flatListText,
              {
                textAlign: "left",
                textTransform: "uppercase",
                fontSize: 10,
              },
            ]}
          >
            {item.workerName}
          </Text>
        </View>
        <View style={{ width: "20%" }}>
          <Text style={[styles.flatListText]}>{item.jobName}</Text>
        </View>
        <View style={{ width: "15%" }}>
          <Text style={styles.flatListText}>
            {item?.paidDate === null
              ? "-"
              : moment(item?.paidDate).format("DD/MM/YYYY")}
          </Text>
        </View>
        <View style={{ width: "15%" }}>
          <Text style={styles.flatListText}>{item?.transactionStatusId}</Text>
        </View>
        <View style={{ width: "15%" }}>
          <Text style={styles.flatListText}>{`₹ ${item?.amount}`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PaymentInvoice", {
              amount: item?.amount,
              selectedProject,
            });
          }}
          style={{
            backgroundColor: "#ECE5FC",
            padding: 5,
            margin: 5,
            borderRadius: 3,
            width: "12%",
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
            paddingHorizontal: 8,
            backgroundColor: Colors.White,
            height: 50,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 25,
          }}
        >
          <View
            style={{
              width: "20%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={[styles.flatListTextHeader, { textAlign: "left" }]}>
              Worker Name
            </Text>
          </View>
          <View style={{ width: "20%", alignItems: "center" }}>
            <Text style={[styles.flatListTextHeader]}>Job Name</Text>
          </View>
          <View style={{ width: "15%", alignItems: "center" }}>
            <Text style={styles.flatListTextHeader}>Paid Date</Text>
          </View>
          <View style={{ width: "15%", alignItems: "center" }}>
            <Text style={styles.flatListTextHeader}>Status</Text>
          </View>
          <View style={{ width: "15%", alignItems: "center" }}>
            <Text style={styles.flatListTextHeader}>Amount</Text>
          </View>
          <View style={{ width: "15%", alignItems: "center" }}>
            <Text style={styles.flatListTextHeader}>Action</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", padding: 10 }}>
        <Text style={styles.heading}>
          Payment History - Please select project name and date range to see the
          payment history
        </Text>

        <View style={{ width: "100%", padding: 10 }}>
          <Text style={styles.text}>Choose Project</Text>
          <View style={{ marginTop: 7 }}>
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
              data={
                projects?.length
                  ? projects?.map((ele) => ({
                      label: ele.name,
                      value: ele.projectId,
                    }))
                  : []
              }
              autoScroll={false}
              search
              searchPlaceholder="Search project"
              inputSearchStyle={{ color: Colors.Black }}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Project"}
              value={selectedProject}
              onChange={(item) => {
                setSelectedProject(item);
              }}
            />
          </View>
        </View>

        <View style={{ width: "100%", padding: 10 }}>
          <Text style={styles.text}>Select Date Range</Text>
          <View
            style={{
              marginTop: 7,
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View style={{ width: "45%" }}>
              <Text>Start Date</Text>
              <Pressable
                onPress={() => setStartOpen(true)}
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
                  placeholder="mm/dd/yyyy"
                  editable={false}
                  value={moment(startDate).format("DD/MM/YYYY")}

                  // onChangeText={(text) => setJobDate(text)}
                />
                <DateIcon
                  onPress={() => setStartOpen(true)}
                  color={Colors.FormBorder}
                  size={22}
                />
              </Pressable>
            </View>
            <View style={{ width: "45%" }}>
              <Text>End Date</Text>
              <Pressable
                onPress={() => setEndOpen(true)}
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
                  placeholder="mm/dd/yyyy"
                  editable={false}
                  value={moment(endDate).format("DD/MM/YYYY")}

                  // onChangeText={(text) => setJobDate(text)}
                />
                <DateIcon
                  onPress={() => setEndOpen(true)}
                  color={Colors.FormBorder}
                  size={22}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[
              styles.buttonLarge,
              {
                backgroundColor: !selectedProject ? Colors.Gray : Colors.Purple,
              },
            ]}
            disabled={!selectedProject}
            // onPress={() => {
            //   dispatch(
            //     getPaymentHistory(
            //       token,
            //       selectedProject.value,
            //       startDate?.toISOString(),
            //       endDate?.toISOString()
            //     )
            //   );
            // }}
          >
            <Text style={[styles.buttonText]}>Get Payment History</Text>
          </TouchableOpacity>
        </View>
        {paymentHistoryList ? (
          <FlatList
            refreshControl={
              <RefreshControl
                // refreshing={isLoading}
                // onRefresh={() => {
                //   dispatch(
                //     getPaymentHistory(
                //       token,
                //       selectedProject?.value,
                //       startDate?.toISOString(),
                //       endDate?.toISOString()
                //     )
                //   );
                // }}
                tintColor={Colors.Primary}
                colors={[Colors.Purple, Colors.Primary]}
              />
            }
            data={paymentHistoryList}
            renderItem={({ item, index }) => <Item item={item} index={index} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={ListHeader}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                // refreshing={isLoading}
                // onRefresh={() => {
                //   dispatch(
                //     getPaymentHistory(
                //       token,
                //       selectedProject?.value,
                //       startDate?.toISOString(),
                //       endDate?.toISOString()
                //     )
                //   );
                // }}
                tintColor={Colors.Primary}
                colors={[Colors.Purple, Colors.Primary]}
              />
            }
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text
              style={{
                color: Colors.LightGray,
                fontSize: 18,
                fontFamily: "Lexend-Medium",
              }}
            >
              No Record Found!
            </Text>
          </ScrollView>
        )}
      </View>

      <DatePicker
        modal
        mode="date"
        textColor={textColor}
        open={openEndDate}
        date={endDate}
        onConfirm={(date) => {
          setEndOpen(false);
          setEndDate(date);
        }}
        onCancel={() => {
          setEndOpen(false);
        }}
      />
      <DatePicker
        modal
        mode="date"
        textColor={textColor}
        open={openStartDate}
        date={startDate}
        onConfirm={(date) => {
          setStartOpen(false);
          setStartDate(date);
        }}
        onCancel={() => {
          setStartOpen(false);
        }}
      />
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // alignItems: "center",
  },
  heading: {
    fontSize: 16,
    fontFamily: "Lexend-Medium",
    color: Colors.Black,
    marginLeft: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: "Lexend-Regular",
    color: Colors.Gray,
  },
  rowStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  bottomContainer: {
    paddingTop: 30,
    backgroundColor: Colors.PrimaryLight,
    paddingRight: 10,
    paddingBottom: 30,
  },
  buttonText: {
    fontFamily: "Lexend-Regular",
    fontSize: 15,
    textAlign: "center",
    color: "white",
  },
  button: {
    width: "48%",
    padding: 12,
    backgroundColor: Colors.Primary,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    borderWidth: 1,
    borderColor: Colors.FormBorder,
    borderRadius: 4,
    height: 50,
    backgroundColor: Colors.White,
    elevation: 3,
  },
  item: {
    // paddingVertical: 5,
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
  smallButton: {
    fontFamily: "Lexend-SemiBold",
    fontSize: 10,
    color: Colors.Secondary,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    elevation: 4,
    backgroundColor: Colors.White,
  },
  placeholderStyle: {
    fontSize: 12,
    fontFamily: "Lexend-Regular",
    color: Colors.FormText,
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily: "Lexend-Regular",
    color: Colors.Black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  buttonLarge: {
    width: "97%",
    backgroundColor: Colors.Secondary,
    padding: 10,
    borderRadius: 4,
    marginTop: 15,
  },
});
