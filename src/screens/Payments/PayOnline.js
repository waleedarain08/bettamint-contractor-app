import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Colors } from "../../utils/Colors";

const PayOnline = ({ navigation, route }) => {
  const { paymentProcess } = usePayment();
  function handlePayment() {
    paymentProcess(
      route?.params?.selectedUser?.jobId,
      route?.params?.selectedUser?.workerId,
      "Online"
    ).then((res) => {
      if (res.response?.data?.error) {
        ToastAndroid.show("Payment Failed", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Payment Successful", ToastAndroid.SHORT);
      }
    });
  }

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", padding: 10 }}>
        <Text style={styles.heading}>Payment Summary</Text>
        <View style={styles.rowStyle}>
          <Text style={styles.text}>Description</Text>
          <Text style={styles.text}>Total</Text>
        </View>
        <View
          style={{
            width: "100%",
            borderColor: Colors.FormBorder,
            borderBottomWidth: 1,
            margin: 10,
          }}
        />
        <View style={styles.rowStyle}>
          <Text style={styles.text}>Wage Fees</Text>
          <Text
            style={[styles.text, { color: Colors.Primary }]}
          >{`₹ ${route?.params?.selectedUser?.dueAmount}`}</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.text}>Transaction Fees</Text>
          <Text style={[styles.text, { color: Colors.Primary }]}>₹ 0</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.text}>PF</Text>
          <Text style={[styles.text, { color: Colors.Primary }]}>₹ 0</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.text}>ESIC</Text>
          <Text style={[styles.text, { color: Colors.Primary }]}>₹ 0</Text>
        </View>
        <View style={styles.rowStyle}>
          <Text style={styles.text}>0% GST</Text>
          <Text style={[styles.text, { color: Colors.Primary }]}>₹ 0</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Text
          style={[styles.text, { textAlign: "right", color: Colors.Black }]}
        >
          Total Due
        </Text>
        <View
          style={{
            width: "100%",
            borderColor: Colors.Black,
            borderBottomWidth: 1,
            margin: 10,
          }}
        />
        <Text
          style={[
            styles.text,
            { textAlign: "right", color: Colors.Primary, fontSize: 30 },
          ]}
        >
          {`₹ ${route?.params?.selectedUser?.dueAmount}`}
        </Text>
        <View
          style={{
            width: "100%",
            borderColor: Colors.Black,
            borderBottomWidth: 1,
            margin: 10,
          }}
        />
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handlePayment()}
          >
            <Text style={styles.buttonText}>Process Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PayOnline;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontFamily: "Lexend-Medium",
    color: Colors.Primary,
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
    fontSize: 12,
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
});
