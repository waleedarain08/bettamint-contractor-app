import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { Colors } from "../utils/Colors";
import { Cross, Search } from "../icons";
import { Searchbar } from "react-native-paper";

const SearchWorkerModal = ({
  openModal,
  setOpenModal,
  searchFunction,
  search,
  header,
}) => {
  return (
    <Modal
      isVisible={openModal}
      useNativeDriver={true}
      backdropColor={Colors.DarkGray}
      backdropOpacity={0.6}
      backdropTransitionInTiming={200}
      onBackdropPress={setOpenModal}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerText}>{header}</Text>
            </View>
            <View style={styles.closeIcon}>
              <Cross
                onPress={() => {
                  setOpenModal(!openModal);
                }}
                size={22}
                color={Colors.Black}
              />
            </View>
          </View>
          <View style={styles.searchCon}>
            <Searchbar
              style={styles.searchBar}
              placeholder="Search"
              placeholderTextColor={Colors.FormText}
              mode="bar"
              icon={() => <Search size={20} color={Colors.Black} />}
              clearIcon={() => <Cross size={20} color={Colors.FormText} />}
              onChangeText={searchFunction}
              value={search}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SearchWorkerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: "88%",
    backgroundColor: Colors.White,
    borderRadius: 10,
    padding: 15,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontFamily: "Lexend-Medium",
    color: Colors.Black,
    fontSize: 16,
  },
  closeIcon: { alignItems: "flex-end" },
  searchCon: { marginVertical: 10 },
  searchBar: {
    backgroundColor: Colors.WhiteGray,
    borderRadius: 4,
    borderWidth: 1,
    width: "100%",
    marginTop: 10,
    borderColor: Colors.LightGray,
  },
});
