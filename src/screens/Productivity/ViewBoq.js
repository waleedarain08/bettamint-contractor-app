import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  RefreshControl,
  SectionList,
} from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../../utils/Colors";
import { useSelector, useDispatch } from "react-redux";
import {
  projectsListSimpleReducer,
  getAllProjectsSimpleAction,
} from "../../redux/slices/projectSlice";
import { Building, Search, Cross, VectorIcon } from "../../icons";
import { useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { authToken } from "../../redux/slices/authSlice";
import {
  getLabourContactorAction,
  labourContractorReducer,
} from "../../redux/slices/userSlice";
import {
  getListOfBOQ,
  getListOfBOQV2,
  productivityReducer,
} from "../../redux/slices/productivitySlice";

const ViewBoq = ({ navigation }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const dispatch = useDispatch();
  const projectsListSimple = useSelector(projectsListSimpleReducer);
  const token = useSelector(authToken);
  const labourContractorList = useSelector(labourContractorReducer);
  const { loading, boqListGCViewMode } = useSelector(productivityReducer);

  const transformedArray = boqListGCViewMode.map((item) => ({
    title: {
      sow: item.scopeOfWorkName,
      workOrder: item.scopeOfWorkId,
      totalAmount: item?.boQs[0]?.titles[0].totalAmount,
    },
    data: item.boQs.map((boq) => boq),
  }));

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getAllProjectsSimpleAction(token));
      dispatch(
        getLabourContactorAction(token, projectsListSimple[0]?.projectId)
      );
      setSelectedProject(projectsListSimple[0]?.projectId);
      dispatch(getListOfBOQ(token, projectsListSimple[0]?.projectId));
      dispatch(getListOfBOQV2(token, projectsListSimple[0]?.projectId));

      return () => {};
    }, [])
  );

  // const renderAssignContractorModal = () => {
  //   return (
  //     <Modal
  //       isVisible={openAssignModal}
  //       useNativeDriver={true}
  //       backdropColor={Colors.DarkGray}
  //       backdropOpacity={0.6}
  //       backdropTransitionInTiming={200}
  //       onBackdropPress={() => setOpenAssignModal(!openAssignModal)}
  //     >
  //       <View
  //         style={{
  //           flex: 1,
  //           alignItems: "center",
  //           justifyContent: "center",
  //         }}
  //       >
  //         <View
  //           style={{
  //             width: "88%",
  //             backgroundColor: Colors.White,
  //             height: 450,
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
  //                 Assign Contractor
  //               </Text>
  //             </View>
  //             <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
  //               <Cross
  //                 onPress={() => {
  //                   setOpenAssignModal(!openAssignModal);
  //                 }}
  //                 size={22}
  //                 color={Colors.Black}
  //               />
  //             </View>
  //           </View>
  //           <View style={{ marginTop: 15 }}>
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
  //               autoScroll={false}
  //               inputSearchStyle={{ color: Colors.Black }}
  //               data={
  //                 labourContractorList?.length
  //                   ? labourContractorList?.map((ele) => ({
  //                       label: ele?.fullName,
  //                       value: ele?.userId,
  //                     }))
  //                   : []
  //               }
  //               maxHeight={300}
  //               labelField="label"
  //               valueField="value"
  //               placeholder={"Select Contractor"}
  //               value={contractor}
  //               onChange={async (item) => {
  //                 setContractor(item.value);
  //                 let resp = await dispatch(
  //                   assignContractorFieldNote(
  //                     token,
  //                     currFieldNote?.fieldNoteId,
  //                     item?.value
  //                   )
  //                 );
  //                 if (resp?.status === 200) {
  //                   dispatch(getFieldNoteList(token));
  //                   setOpenAssignModal(false);
  //                   setContractor(null);
  //                   setSelectedProject(null);
  //                   Toast.show({
  //                     type: "info",
  //                     text1: "Contractor assigned",
  //                     text2: "Contractor assigned successfully.",
  //                     topOffset: 10,
  //                     position: "top",
  //                     visibilityTime: 4000,
  //                   });
  //                 }
  //               }}
  //             />
  //           </View>
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          backgroundColor: Colors.Primary,
          paddingTop: 10,
          paddingBottom: 30,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <View style={styles.graph}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                width: "15%",
              }}
            >
              <View style={styles.iconContainer}>
                <Building size={18} color={Colors.LightGray} />
              </View>
            </View>
            <View
              style={{
                width: "60%",
              }}
            >
              <Text style={styles.selectText}>Select a Project</Text>
              <Dropdown
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.dropdownItemText}
                showsVerticalScrollIndicator={false}
                iconStyle={styles.iconStyle}
                data={
                  projectsListSimple.length
                    ? projectsListSimple?.map((ele) => ({
                        label: ele?.name,
                        value: ele?.projectId,
                        ...ele,
                      }))
                    : []
                }
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select a Project"}
                value={selectedProject}
                onChange={(item) => {
                  if (item) {
                    setSelectedProject(item.value);
                    dispatch(getListOfBOQV2(token, item.value));
                  } else {
                    setSelectedProject(projectsListSimple[0]?.projectId);
                    dispatch(
                      getListOfBOQV2(token, projectsListSimple[0]?.projectId)
                    );
                  }
                }}
              />
            </View>
            <Pressable
              onPress={() => {
                setOpenFilterModal(true);
              }}
              style={styles.filterButton}
            >
              <Text style={styles.smallButton}>Filter</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: Colors.White,
        }}
      >
        {boqListGCViewMode.length === 0 ? (
          <View>
            <Text
              style={{
                fontFamily: "Lexend-Medium",
                fontSize: 14,
                color: Colors.Gray,
              }}
            >
              No Record Found!
            </Text>
          </View>
        ) : (
          <SectionList
            sections={transformedArray}
            contentContainerStyle={{ paddingBottom: 150 }}
            style={{ width: "100%" }}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <View style={styles.mainView}>
                <View style={styles.workOrderCon}>
                  <Text style={styles.workOrderText}>
                    WORKORDER # {item?.workOrder}
                  </Text>
                  <Text style={styles.workOrderAmount}>
                    ₹{" "}
                    {item?.titles[0]?.totalAmount >= 100000
                      ? `${Math.round(
                          item?.titles[0]?.totalAmount / 100000
                        )} Lakhs`
                      : item?.titles[0]?.totalAmount}
                  </Text>
                </View>
                <View style={styles.itemDesCon}>
                  <View style={styles.desCon}>
                    <View style={styles.width}>
                      <Text style={styles.itemDesHeader}>Cost Code: </Text>
                      <Text style={styles.itemDesText}>
                        {item?.titles[0]?.descriptions[0].boqCode}
                      </Text>
                    </View>
                    <View style={styles.width}>
                      <Text style={styles.itemDesHeader}>Title: </Text>
                      <Text style={styles.itemDesText}>
                        {item?.titles[0]?.title}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.desCon}>
                    <View style={styles.width}>
                      <Text style={styles.itemDesHeader}>Description: </Text>
                      <Text numberOfLines={1} style={styles.itemDesText}>
                        {item?.titles[0]?.descriptions[0].description}
                      </Text>
                    </View>
                    <View style={styles.width}>
                      <Text style={styles.itemDesHeader}>Unit: </Text>
                      <Text style={styles.itemDesText}>
                        {item?.titles[0]?.descriptions[0].unitCode}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.desCon}>
                    <View style={styles.width}>
                      <Text style={styles.itemDesHeader}>Quantity: </Text>
                      <Text numberOfLines={1} style={styles.itemDesText}>
                        {item?.titles[0]?.descriptions[0].quantity}
                      </Text>
                    </View>
                    <View style={styles.width}>
                      <Text style={styles.itemDesHeader}>Rate: </Text>
                      <Text style={styles.itemDesText}>
                        ₹ {item?.titles[0]?.descriptions[0].rate}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.desCon}>
                    <View style={styles.width}>
                      <Text style={styles.itemDesHeader}>Amount: </Text>
                      <Text numberOfLines={1} style={styles.itemDesText}>
                        ₹{" "}
                        {item?.titles[0]?.descriptions[0].amount >= 100000
                          ? `${Math.round(
                              item?.titles[0]?.descriptions[0].amount / 100000
                            )} Lakhs`
                          : item?.titles[0]?.descriptions[0].amount}
                      </Text>
                    </View>
                    <View style={styles.width}>
                      <Text style={styles.itemDesHeader}>
                        Actual Quantity:{" "}
                      </Text>
                      <Text style={styles.itemDesText}>
                        {item?.titles[0]?.descriptions[0].actualQuantity}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.desCon}>
                    <View style={styles.width}>
                      <Text style={styles.itemDesHeader}>Actual Amount: </Text>
                      <Text numberOfLines={1} style={styles.itemDesText}>
                        ₹{" "}
                        {item?.titles[0]?.descriptions[0].amount >= 100000
                          ? `${Math.round(
                              item?.titles[0]?.descriptions[0].amount / 100000
                            )} Lakhs`
                          : item?.titles[0]?.descriptions[0].amount}
                      </Text>
                    </View>
                    <View style={styles.width}>
                      <Text style={styles.itemDesHeader}>Percentage: </Text>
                      <Text style={styles.itemDesText}>
                        {(((item?.titles[0]?.descriptions[0].actualAmount /
                          item?.titles[0]?.descriptions[0].amount) *
                          item?.titles[0]?.descriptions[0].amount) /
                          item?.titles[0]?.descriptions[0].amount) *
                          100}{" "}
                        %
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.firstAccordionHeader}>
                <View style={styles.accordianContainerInner}>
                  <View style={styles.headerContainer}>
                    <Text style={styles.headerAccordianText}>
                      {title.workOrder}
                    </Text>
                  </View>
                  <Text style={styles.sowText}>{title.sow}</Text>
                </View>
                <View>
                  <Text style={styles.headerAccordianText}>
                    ₹
                    {title.totalAmount >= 100000
                      ? `${Math.round(title.totalAmount / 100000)} Lakhs`
                      : title.totalAmount}
                  </Text>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default ViewBoq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    alignItems: "center",
  },
  header: {
    backgroundColor: Colors.Primary,
    height: "28%",
    width: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
  },
  graph: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.White,
    padding: 10,
    elevation: 4,
    borderRadius: 10,
    width: "93%",
  },
  title: {
    fontFamily: "Lexend-Bold",
    fontSize: 16,
    color: Colors.Black,
  },
  smallButton: {
    fontFamily: "Lexend-SemiBold",
    fontSize: 10,
    color: Colors.Purple,
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
    // height: 40,
    maxHeight: 120,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    elevation: 4,
    backgroundColor: Colors.White,
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
  firstAccordionHeader: {
    width: "100%",
    paddingHorizontal: 5,
    backgroundColor: Colors.White,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    elevation: 5,
    paddingVertical: 10,
  },
  iconContainer: {
    backgroundColor: "#F7F8F9",
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  selectText: {
    fontFamily: "Lexend-Regular",
    fontSize: 14,
    color: Colors.Gray,
  },
  projectName: {
    fontFamily: "Lexend-SemiBold",
    color: Colors.Black,
  },
  row: {
    flexDirection: "row",
  },
  filterButton: {
    backgroundColor: Colors.PurpleOpacity,
    padding: 5,
    borderRadius: 3,
    paddingHorizontal: 9,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  desCon: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  itemDesHeader: {
    fontFamily: "Lexend-Medium",
    fontSize: 14,
    color: Colors.Gray,
  },
  itemDesText: {
    fontFamily: "Lexend-Bold",
    fontSize: 14,
    color: Colors.Black,
  },
  itemDesCon: {
    backgroundColor: Colors.White,
    width: "100%",
    // height: 100,
    elevation: 5,
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    paddingVertical: 15,
  },
  width: { width: "50%" },
  mainView: {
    width: "100%",
    paddingHorizontal: 20,
  },
  workOrderCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray,
  },
  workOrderText: {
    fontFamily: "Lexend-Medium",
    fontSize: 14,
    color: Colors.Gray,
  },
  workOrderAmount: {
    fontFamily: "Lexend-Medium",
    fontSize: 14,
    color: Colors.Gray,
  },
  accordianContainerInner: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
  },
  headerContainer: {
    backgroundColor: Colors.LightGray,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  headerAccordianText: {
    fontFamily: "Lexend-Medium",
    fontSize: 13,
    color: Colors.Black,
  },
  sowText: {
    fontFamily: "Lexend-SemiBold",
    fontSize: 14,
    color: Colors.Black,
    marginLeft: 10,
  },
});
