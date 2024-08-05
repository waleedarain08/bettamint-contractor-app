import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../../utils/Colors";
import { HomeIcon, VectorIcon } from "../../../icons";

const CostProgress = ({ metrics }) => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View style={styles.innerContainer}>
        <View style={styles.cardView}>
          <View style={styles.innerCardView}>
            <Text style={styles.tileHeading}>{"Poor Workmanship"}</Text>
            <Text style={styles.costText}>
              ₹ {metrics?.workmanshipCost || 0}
            </Text>
          </View>
          <View style={styles.innerCardViewEnd}>
            <View style={styles.iconView}>
              <HomeIcon size={20} color={Colors.White} />
            </View>
          </View>
        </View>
        <View style={styles.cardView}>
          <View style={styles.innerCardView}>
            <Text style={styles.tileHeading}>{"Material Defects"}</Text>
            <Text style={styles.costText}>₹ {metrics?.qualityCost || 0}</Text>
          </View>
          <View style={styles.innerCardViewEnd}>
            <View style={styles.iconView}>
              <VectorIcon
                type={"AntDesign"}
                name={"disconnect"}
                size={20}
                color={Colors.White}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.cardView}>
          <View style={styles.innerCardView}>
            <Text style={styles.tileHeading}>{"Variations"}</Text>
            <Text style={styles.costText}>
              ₹ {metrics?.excessCost || 0}
            </Text>
          </View>
          <View style={styles.innerCardViewEnd}>
            <View style={styles.iconView}>
            <VectorIcon
                type={"AntDesign"}
                name={"dashboard"}
                size={20}
                color={Colors.White}
              />
            </View>
          </View>
        </View>
        <View style={styles.cardView}>
          <View style={styles.innerCardView}>
            <Text style={styles.tileHeading}>{"Change Requests"}</Text>
            <Text style={styles.costText}>₹ {metrics?.changeRequests || 0}</Text>
          </View>
          <View style={styles.innerCardViewEnd}>
            <View style={styles.iconView}>
              <VectorIcon
                type={"AntDesign"}
                name={"arrowsalt"}
                size={20}
                color={Colors.White}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CostProgress;

const styles = StyleSheet.create({
  innerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  cardView: {
    width: "45%",
    padding: 15,
    marginVertical: 6,
    backgroundColor: Colors.White,
    elevation: 4,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 90
  },
  innerCardView: {
    width: "70%",
  },
  costText: {
    color: Colors.Black,
    fontFamily: "Lexend-Medium",
    fontSize: 16,
  },
  innerCardViewEnd: {
    width: "30%",
    alignItems: "flex-end",
  },
  tileHeading: {
    fontFamily: "Lexend-Medium",
    color: Colors.LightGray,
    fontSize: 12,
  },
  iconView: {
    backgroundColor: Colors.Primary,
    width: 35,
    height: 35,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
