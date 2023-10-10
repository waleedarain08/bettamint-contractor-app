// import { Pressable, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import Modal from "react-native-modal";
// import { Colors } from "../utils/Colors";
// import { Cross } from "../icons";

// const FilterModal = ({ openModal, setOpenModal, setStates }) => {
//   return (
//     <Modal
//       isVisible={openModal}
//       useNativeDriver={true}
//       backdropColor={Colors.DarkGray}
//       backdropOpacity={0.6}
//       backdropTransitionInTiming={200}
//       onBackdropPress={() => setOpenModal(!openModal)}
//     >
//       <View
//         style={{
//           flex: 1,
//           alignItems: "center",
//           marginTop: 30,
//         }}
//       >
//         <View
//           style={{
//             width: "100%",
//             backgroundColor: Colors.White,
//             height: "90%",
//             borderRadius: 10,
//             padding: 15,
//           }}
//         >
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <View>
//               <Text
//                 style={{
//                   fontFamily: "Lexend-Medium",
//                   color: Colors.Black,
//                   fontSize: 16,
//                   // marginBottom: 10,
//                 }}
//               >
//                 Filter
//               </Text>
//             </View>
//             <View style={{ alignItems: "flex-end" }}>
//               <Cross
//                 onPress={() => {
//                   setOpenModal(!openModal);
//                 }}
//                 size={22}
//                 color={Colors.Black}
//               />
//               <Pressable
//                 onPress={() => {
//                   setSelectedContractor(null);
//                   setSelectedSkills(null);
//                   setSelectedStatus(null);
//                   dispatch(
//                     getAllAttendanceAction(
//                       token,
//                       selectedProject?.projectId ||
//                         projectsListSimple[0]?.projectId,
//                       0
//                     )
//                   );
//                   setOpenFilterModal(false);
//                   setFilteredAttendance(null);
//                 }}
//                 style={{ marginTop: 3 }}
//               >
//                 <Text style={{ fontFamily: "Lexend-Medium", fontSize: 10 }}>
//                   Clear Filter
//                 </Text>
//               </Pressable>
//             </View>
//           </View>
//           <View style={{ marginVertical: 10 }}>
//             <View style={{ marginVertical: 5 }}>
//               <Text
//                 style={{ fontFamily: "Lexend-Medium", color: Colors.Black }}
//               >
//                 By Status
//               </Text>
//             </View>
//             <Dropdown
//               style={styles.dropdown}
//               placeholderStyle={styles.placeholderStyle}
//               selectedTextStyle={styles.selectedTextStyle}
//               itemTextStyle={{
//                 fontFamily: "Lexend-Regular",
//                 fontSize: 13,
//                 color: Colors.FormText,
//               }}
//               iconStyle={styles.iconStyle}
//               data={status}
//               maxHeight={300}
//               labelField="label"
//               valueField="value"
//               placeholder={"Select Status"}
//               value={selectedStatus}
//               onChange={(item) => {
//                 setOpenFilterModal(false);
//                 setSelectedStatus(item);
//                 setSelectedSkills(null);
//                 setFilteredAttendance(
//                   attendanceList?.filter(
//                     (ele) => ele.workerTypeId === item?.value
//                   )
//                 );
//               }}
//             />
//           </View>
//           <View style={{ marginVertical: 10 }}>
//             <View style={{ marginVertical: 5 }}>
//               <Text
//                 style={{ fontFamily: "Lexend-Medium", color: Colors.Black }}
//               >
//                 By Skills
//               </Text>
//             </View>
//             <Dropdown
//               style={styles.dropdown}
//               placeholderStyle={styles.placeholderStyle}
//               selectedTextStyle={styles.selectedTextStyle}
//               itemTextStyle={{
//                 fontFamily: "Lexend-Regular",
//                 fontSize: 13,
//                 color: Colors.FormText,
//               }}
//               iconStyle={styles.iconStyle}
//               data={skillsList?.map((ele) => ({
//                 label: ele?.name,
//                 value: ele?.name,
//               }))}
//               maxHeight={300}
//               labelField="label"
//               valueField="value"
//               placeholder={"Select Skill"}
//               value={selectedSkills}
//               onChange={(item) => {
//                 setOpenFilterModal(false);
//                 setSelectedSkills(item);
//                 setSelectedStatus(null);
//                 setFilteredAttendance(
//                   attendanceList?.filter((ele) => ele.sKillName === item?.value)
//                 );
//               }}
//             />
//           </View>
//           <View style={{ marginVertical: 10 }}>
//             <View style={{ marginVertical: 5 }}>
//               <Text
//                 style={{ fontFamily: "Lexend-Medium", color: Colors.Black }}
//               >
//                 By Contractor
//               </Text>
//             </View>
//             <Dropdown
//               style={styles.dropdown}
//               placeholderStyle={styles.placeholderStyle}
//               selectedTextStyle={styles.selectedTextStyle}
//               itemTextStyle={{
//                 fontFamily: "Lexend-Regular",
//                 fontSize: 13,
//                 color: Colors.FormText,
//               }}
//               iconStyle={styles.iconStyle}
//               data={labourContractors?.map((ele) => ({
//                 label: ele?.fullName,
//                 value: ele?.userId,
//               }))}
//               maxHeight={300}
//               labelField="label"
//               valueField="value"
//               placeholder={"Select Contractor"}
//               value={selectedContractor}
//               onChange={(item) => {
//                 setOpenFilterModal(false);
//                 setSelectedContractor(item);
//                 setSelectedStatus(null);
//                 setSelectedSkills(null);
//                 dispatch(
//                   getAllAttendanceAction(
//                     token,
//                     selectedProject?.projectId ||
//                       projectsListSimple[0]?.projectId,
//                     item?.value
//                   )
//                 );
//                 // setFilteredAttendance(
//                 //   attendanceList?.filter(
//                 //     (ele) => ele.sKillName === item?.value
//                 //   )
//                 // );
//               }}
//             />
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default FilterModal;

// const styles = StyleSheet.create({});
