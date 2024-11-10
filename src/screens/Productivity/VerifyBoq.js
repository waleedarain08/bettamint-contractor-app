import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  RefreshControl,
  SectionList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ToastAndroid,
} from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../../utils/Colors";
import { useSelector, useDispatch } from "react-redux";
import {
  projectsListSimpleReducer,
  getAllProjectsSimpleAction,
} from "../../redux/slices/projectSlice";
import {
  Building,
  Search,
  Cross,
  VectorIcon,
  DateIcon,
  ClockIcon,
  Picture,
} from "../../icons";
import { useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { authToken } from "../../redux/slices/authSlice";
import {
  getLabourContactorAction,
  labourContractorReducer,
} from "../../redux/slices/userSlice";
import {
  getBOQListGC,
  getListOfBOQV2,
  productivityReducer,
  rejectBOQProgress,
} from "../../redux/slices/productivitySlice";
import CheckBox from "@react-native-community/checkbox";
import { RadioButton } from "react-native-radio-buttons-group";
import Button from "../../components/Button";
import { launchImageLibrary } from "react-native-image-picker";
import moment from "moment";
import Toast from "react-native-toast-message";
import { useGeneralContext } from "../../context/generalContext";
import { useProductivity } from "../../context/productivityContext";

const VerifyBoq = ({ navigation }) => {
  const { projects, labourContractorList, scopeList } = useGeneralContext();
  const { getBOQListGC, boqListGC, loading } = useProductivity();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [boqItem, setBoqItem] = useState(null);
  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [rejectModal, setRejectModal] = useState(false);
  const [radioButton, setRadioButton] = useState({
    poorWorkmanship: false,
    materialDefects: false,
  });
  const [fieldNoteData, setFieldNoteData] = useState({
    description: "",
    location: "",
    date: "",
    time: "",
    contractor: "",
    scope: "",
    project: "",
    costCode: "",
    image: null,
    boqId: null,
  });
  const [openFieldNote, setOpenFieldNote] = useState(false);
  const [rejectedQuantity, setRejectedQuantity] = useState(null);
  const [location, setLocation] = useState("");
  const [remarks, setRemarks] = useState("");
  const [measurement, setMeasurement] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  //   const getTotalAmount = (data) => {
  //     const reduceTotal = data.map((boq) => {
  //       return boq.titles.map((b) => {
  //         return b.descriptions.reduce((acc, curr) => acc + curr.amount, 0);
  //       });
  //     });

  //     const total = reduceTotal.reduce(
  //       (acc, curr) => Number(acc) + Number(curr),
  //       0
  //     );
  //     return total;
  //   };

  const transformedArray = boqListGC.map((item) => ({
    title: {
      sow: item.scopeOfWork,
      workOrder: item.scopeOfWorkId,
      //   totalAmount: getTotalAmount(item?.dtoboqList),
    },
    data: item.dtoboqList.map((boq) => boq),
  }));

  const getData = async (projectId = 0) => {
    if (projects.length) {
      setSelectedProject(projectId);
      getBOQListGC(projectId).catch((error) => {
        console.log("error", error);
        ToastAndroid.show(
          error.message || "Something went wrong while getting BOQ list!",
          ToastAndroid.SHORT
        );
      });
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getData(projects[0]?.projectId);
      return () => {};
    }, [])
  );

  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
      selectionLimit: 1,
    });
    if (result?.assets?.length > 0) {
      setFieldNoteData({
        ...fieldNoteData,
        image: result.assets[0],
      });
    }
  };
  useEffect(() => {
    if (boqItem) {
      const contractor =
        labourContractorList &&
        labourContractorList?.find(
          (ele) => ele.userId === boqItem?.contractorId
        );
      setRemarks(boqItem?.remarks);
      setFieldNoteData({
        ...fieldNoteData,
        description: boqItem?.description,
        date: moment(new Date()).format("MM/DD/YYYY"),
        time: moment(new Date()).format("hh:mm a"),
        contractor: contractor?.fullName,
        scope: boqItem?.scopeOfWorkName,
        project: selectedProject?.name,
        costCode: boqItem?.boqCode,
        boqId: boqItem?.boqId,
      });
    }
  }, [boqItem]);

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

  const c = {
    actionHistory: [],
    amount: 2000,
    billingCost: 120,
    boqCode: "1.1.1",
    boqId: 3,
    boqMeasurementActionBy: "",
    boqMeasurementActionTimestamp: null,
    boqMeasurementApprovedStatus: null,
    boqMeasurementRejectStatus: null,
    boqNumber: "202401PTPI1",
    boqProgressImage: "",
    boqQualityActionBy: "",
    boqQualityActionTimestamp: null,
    boqQualityRejectStatus: null,
    budgetedQuantity: 0,
    contractorBOQProgressId: 320,
    contractorId: 79,
    createdOn: "2024-06-11T20:18:37.303",
    description: "please do it",
    endDate: "2024-01-30T23:09:52",
    fieldNote: {
      contractorName: null,
      dateTime: null,
      description: null,
      fieldNoteId: null,
      imageUrl: null,
      location: null,
      projectName: null,
      quantity: null,
      remarks: null,
      scopeOfWorkName: null,
      verifiedImageUrl: null,
    },
    isMeasurementApproved: false,
    isQualityApproved: false,
    measurementLeft: 94,
    percentage: 6,
    quantity: 6,
    rate: 20,
    rejectedQuantity: null,
    remainingQuantity: 0,
    remarks: "done",
    scopeOfWorkId: 1,
    scopeOfWorkName: "Earthwork",
    status: null,
    title: "earthing",
    totalQuantity: 100,
    unitName: "ft",
    workOrderNumber: "23412",
  };

  const renderFieldNotes = () => {
    const b = {
      actionHistory: [],
      amount: 2000,
      billingCost: 120,
      boqCode: "1.1.1",
      boqId: 3,
      boqMeasurementActionBy: "",
      boqMeasurementActionTimestamp: null,
      boqMeasurementApprovedStatus: null,
      boqMeasurementRejectStatus: null,
      boqNumber: "202401PTPI1",
      boqProgressImage: "",
      boqQualityActionBy: "",
      boqQualityActionTimestamp: null,
      boqQualityRejectStatus: null,
      budgetedQuantity: 0,
      contractorBOQProgressId: 320,
      contractorId: 79,
      createdOn: "2024-06-11T20:18:37.303",
      description: "please do it",
      endDate: "2024-01-30T23:09:52",
      fieldNote: {
        contractorName: null,
        dateTime: null,
        description: null,
        fieldNoteId: null,
        imageUrl: null,
        location: null,
        projectName: null,
        quantity: null,
        remarks: null,
        scopeOfWorkName: null,
        verifiedImageUrl: null,
      },
      isMeasurementApproved: false,
      isQualityApproved: false,
      measurementLeft: 94,
      percentage: 6,
      quantity: 6,
      rate: 20,
      rejectedQuantity: null,
      remainingQuantity: 0,
      remarks: "done",
      scopeOfWorkId: 1,
      scopeOfWorkName: "Earthwork",
      status: null,
      title: "earthing",
      totalQuantity: 100,
      unitName: "ft",
      workOrderNumber: "23412",
    };

    const handleFieldNote = async () => {
      Toast.show({
        type: "info",
        text1: "Success",
        text2: "Field Note added successfully!",
        topOffset: 10,
      });
      setOpenFieldNote(false);
      setRejectModal(false);
      setMeasurement(true);
      // console.log("fieldNoteData", );
      // const obj = {
      //   boqProgressId: boqItem?.contractorBOQProgressId,
      //   boqVerificationType: "Quality",
      //   qualityRejectStatus: radioButton.poorWorkmanship ? "PoorWorkmanship" : "QualityDefects",
      //   rejectedQuantity: rejectedQuantity,
      // };
      // let resp = await dispatch(rejectBOQProgress(token, obj));
      // console.log("resp", resp);
      // if (resp.status === 200) {
      //   dispatch(
      //     getBOQListGC(
      //       token,
      //       selectedProject?.projectId
      //     )
      //   );
      //   Toast.show({
      //     type: "info",
      //     text1: "Success",
      //     text2: "Quantity Rejected successfully!",
      //     topOffset: 10,
      //     position: "top",
      //     visibilityTime: 4000,
      //   });
      //   setOpenVerifyModal(false);
      //   setRejectModal(false);
      //   setRadioButton({
      //     poorWorkmanship: false,
      //     materialDefects: false,
      //   });
      //   setRejectedQuantity(null);
      //   setOpenFieldNote(false);
      //   setFieldNoteData({
      //     description: "",
      //     location: "",
      //     date: "",
      //     time: "",
      //     contractor: "",
      //     scope: "",
      //     project: "",
      //     costCode: "",
      //     image: null,
      //     boqId: null,
      //   });
      // } else {
      //   Toast.show({
      //     type: "Error",
      //     text1: "Error",
      //     text2: "Something went wrong!",
      //     topOffset: 10,
      //     position: "top",
      //     visibilityTime: 4000,
      //   });
      // }
    };
    return (
      <Modal
        isVisible={openFieldNote}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={1200}
        onBackdropPress={() => setOpenFieldNote(!openFieldNote)}
      >
        <View style={styles.fieldNoteModalContainer}>
          <ScrollView contentContainerStyle={{}}>
            <Text
              style={{
                fontFamily: "Lexend-Medium",
                fontSize: 16,
                color: Colors.Black,
              }}
            >
              BOQ # {fieldNoteData?.boqId}
            </Text>
            <View style={styles.fieldInnerContainer}>
              <Pressable
                onPress={() => {
                  handleImagePicker();
                }}
                style={{ width: "28%" }}
              >
                {fieldNoteData.image ? (
                  <Image
                    source={{ uri: fieldNoteData?.image?.uri }}
                    style={styles.fieldImage}
                  />
                ) : (
                  <View style={styles.fieldDummyImage}>
                    <Picture size={38} color={"#D1E0EE"} />
                    <Text style={styles.addPictureText}>Add Picture</Text>
                  </View>
                )}
              </Pressable>
              <View style={{ width: "68%" }}>
                <Text style={styles.titleNote}>Scope of work</Text>
                <TextInput
                  style={styles.fieldNoteInput}
                  editable={false}
                  value={fieldNoteData?.scope}
                  placeholderTextColor={Colors.FormText}
                  placeholder="Enter SOW"
                />
              </View>
            </View>
            <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
              <Text style={styles.titleNote}>Description</Text>
              <TextInput
                style={styles.fieldNoteInput}
                value={fieldNoteData?.description}
                placeholderTextColor={Colors.FormText}
                placeholder="Enter Description"
                editable={false}
                numberOfLines={1}
              />
            </View>
            <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
              <Text style={styles.titleNote}>Assign to</Text>
              <View style={{ marginTop: 7 }}>
                <TextInput
                  style={styles.fieldNoteInput}
                  value={fieldNoteData?.contractor}
                  placeholderTextColor={Colors.FormText}
                  placeholder="Enter Contractor"
                  editable={false}
                  numberOfLines={1}
                />
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                paddingBottom: 15,
              }}
            >
              <Text style={styles.titleNote}>Select Project</Text>
              <View style={{ marginTop: 7 }}>
                <TextInput
                  style={styles.fieldNoteInput}
                  value={fieldNoteData?.project}
                  placeholderTextColor={Colors.FormText}
                  placeholder="Enter Project"
                  editable={false}
                  numberOfLines={1}
                />
              </View>
            </View>
            <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
              <Text style={styles.titleNote}>Location</Text>
              <TextInput
                style={styles.fieldNoteInput}
                onChangeText={(e) => setLocation(e)}
                value={location}
                placeholderTextColor={Colors.FormText}
                placeholder="Enter Location"
              />
            </View>
            <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
              <Text style={styles.titleNote}>Remarks</Text>
              <TextInput
                style={styles.fieldNoteInput}
                onChangeText={(e) => setRemarks(e)}
                value={remarks}
                placeholderTextColor={Colors.FormText}
                placeholder="Enter Remarks"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingHorizontal: 15,
                paddingBottom: 15,
              }}
            >
              <View style={{ width: "48%" }}>
                <Text style={styles.titleNote}>Select Date</Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
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
                      color: Colors.Black,
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
                    value={fieldNoteData?.date}
                  />
                  <DateIcon
                    onPress={() => setOpen(true)}
                    color={Colors.FormBorder}
                    size={22}
                  />
                </View>
              </View>
              <View style={{ width: "48%" }}>
                <Text style={styles.titleNote}>Select TIME</Text>
                <Pressable
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
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
                      color: Colors.Black,
                    },
                  ]}
                  onPress={() => setOpenTime(true)}
                >
                  <TextInput
                    style={{
                      fontFamily: "Lexend-Regular",
                      color: Colors.Black,
                      fontSize: 12,
                      width: "80%",
                    }}
                    placeholderTextColor={Colors.FormText}
                    placeholder="----"
                    value={fieldNoteData?.time}
                  />
                  <ClockIcon
                    onPress={() => setOpenTime(true)}
                    color={Colors.FormBorder}
                    size={20}
                  />
                </Pressable>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 20,
              width: "100%",
            }}
          >
            <Button
              title={"Create Note"}
              onPress={() => {
                handleFieldNote();
              }}
              width="55%"
              backgroundColor={Colors.Primary}
            />
            <Button
              title={"Cancel"}
              onPress={() => {
                setOpenFieldNote(false);
              }}
              width="40%"
              backgroundColor={Colors.Purple}
            />
          </View>
        </View>
      </Modal>
    );
  };
  const renderVerifyModal = () => {
    return (
      <Modal
        isVisible={openVerifyModal}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        animationIn={"bounceIn"}
        animationOut={"bounceOut"}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenVerifyModal(!openVerifyModal)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalInnerContainer}>
            <View style={styles.modalHeader}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {rejectModal && (
                  <View>
                    <VectorIcon
                      size={30}
                      color={Colors.Black}
                      name={"chevron-back-outline"}
                      type={"Ionicons"}
                      onPress={() => {
                        setRejectModal(false);
                        setRadioButton({
                          poorWorkmanship: false,
                          materialDefects: false,
                        });
                      }}
                    />
                  </View>
                )}
                <View>
                  <Text style={styles.modalHeaderText}>
                    {measurement ? "Measurement" : "Quality"}
                  </Text>
                  {!rejectModal && (
                    <Text style={styles.modalHeaderSubText}>
                      {measurement ? "Step - 2 of 2" : "Step - 1 of 2"}
                    </Text>
                  )}
                </View>
              </View>
              <VectorIcon
                size={30}
                color={Colors.Black}
                name={"circle-with-cross"}
                type={"Entypo"}
                onPress={() => {
                  setOpenVerifyModal(false);
                  setRejectModal(false);
                  setRadioButton({
                    poorWorkmanship: false,
                    materialDefects: false,
                  });
                }}
              />
            </View>
            {rejectModal ? (
              <View style={{ marginTop: 20 }}>
                <Text style={[styles.selectText, { fontSize: 16 }]}>
                  Please select a reason given below to reject this progress!
                </Text>
                <Text
                  style={{
                    fontFamily: "Lexend-Medium",
                    fontSize: 14,
                    color: Colors.Gray,
                    marginTop: 10,
                  }}
                >
                  Total Quantity:{" "}
                  <Text
                    style={{
                      fontFamily: "Lexend-Bold",
                      fontSize: 14,
                      color: Colors.Black,
                    }}
                  >
                    {boqItem?.quantity}
                  </Text>
                </Text>
                <View
                  style={{
                    marginVertical: 10,
                  }}
                >
                  <RadioButton
                    label={
                      measurement ? "Incorrect Measurement" : "Poor Workmanship"
                    }
                    labelStyle={styles.radioText}
                    color={Colors.Primary}
                    selected={radioButton.poorWorkmanship}
                    onPress={() => {
                      setRadioButton({
                        poorWorkmanship: true,
                        materialDefects: false,
                      });
                    }}
                  />
                  {radioButton.poorWorkmanship && (
                    <View style={styles.rejectTextContainer}>
                      <TextInput
                        placeholder="Please Enter Rejected"
                        placeholderTextColor={Colors.Gray}
                        onChangeText={(text) => setRejectedQuantity(text)}
                        keyboardType="numeric"
                        style={styles.rejectedTextInput}
                        value={rejectedQuantity}
                      />
                    </View>
                  )}
                  <RadioButton
                    label={
                      measurement ? "Variation Disapproved" : "Material Defects"
                    }
                    labelStyle={styles.radioText}
                    color={Colors.Primary}
                    selected={radioButton.materialDefects}
                    onPress={() => {
                      setRadioButton({
                        poorWorkmanship: false,
                        materialDefects: true,
                      });
                    }}
                  />
                  {radioButton.materialDefects && (
                    <View style={styles.rejectTextContainer}>
                      <TextInput
                        placeholder="Please Enter Rejected"
                        placeholderTextColor={Colors.Gray}
                        onChangeText={(text) => setRejectedQuantity(text)}
                        keyboardType="numeric"
                        style={styles.rejectedTextInput}
                        value={rejectedQuantity}
                      />
                    </View>
                  )}
                </View>
                <View>
                  {measurement ? (
                    <Button
                      title={"Reject Measurement"}
                      disabled={
                        (!radioButton.poorWorkmanship &&
                          !radioButton.materialDefects) ||
                        !rejectedQuantity
                      }
                      backgroundColor={
                        (!radioButton.poorWorkmanship &&
                          !radioButton.materialDefects) ||
                        !rejectedQuantity
                          ? Colors.Gray
                          : Colors.Primary
                      }
                      onPress={() => {
                        setOpenFieldNote(false);
                        setOpenVerifyModal(false);
                        setMeasurement(false);
                        Toast.show({
                          type: "info",
                          text1: "Success",
                          text2: "Measurement Rejected successfully!",
                          topOffset: 10,
                        });
                        setRejectModal(false);
                        setRadioButton({
                          poorWorkmanship: false,
                          materialDefects: false,
                        });
                        setRejectedQuantity(null);
                      }}
                    />
                  ) : (
                    <Button
                      title={"Add Field Note"}
                      disabled={
                        (!radioButton.poorWorkmanship &&
                          !radioButton.materialDefects) ||
                        !rejectedQuantity
                      }
                      backgroundColor={
                        (!radioButton.poorWorkmanship &&
                          !radioButton.materialDefects) ||
                        !rejectedQuantity
                          ? Colors.Gray
                          : Colors.Primary
                      }
                      onPress={() => {
                        setOpenFieldNote(true);
                      }}
                    />
                  )}
                </View>
              </View>
            ) : (
              <>
                <View style={styles.documentIconContainer}>
                  <VectorIcon
                    name={"document-text"}
                    type={"Ionicons"}
                    size={100}
                    color={Colors.FormText}
                  />
                  <Text
                    style={[
                      styles.selectText,
                      { textAlign: "center", marginTop: 10, fontSize: 16 },
                    ]}
                  >
                    Please select preferred{"\n"}value of the{" "}
                    {measurement ? "Measurement" : "Quality"}!
                  </Text>
                </View>
                <View style={styles.modalBtnContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      if (measurement) {
                        // setOpenVerifyModal(false);
                        setRejectModal(true);
                        setRadioButton({
                          poorWorkmanship: false,
                          materialDefects: false,
                        });
                        setRejectedQuantity(null);
                      } else {
                        setRejectedQuantity(null);
                        setRadioButton({
                          poorWorkmanship: false,
                          materialDefects: false,
                        });
                        setRejectModal(true);
                      }
                    }}
                    style={styles.rejectBtn}
                  >
                    <Text style={styles.rejectText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (measurement) {
                        setRejectModal(false);
                        setRadioButton({
                          poorWorkmanship: false,
                          materialDefects: false,
                        });
                        setRejectedQuantity(null);
                        setMeasurement(false);
                        setOpenVerifyModal(false);
                        Toast.show({
                          type: "info",
                          text1: "Success",
                          text2: "Measurement Approved successfully!",
                          topOffset: 10,
                        });
                      } else {
                        Toast.show({
                          type: "info",
                          text1: "Success",
                          text2: "Quality Approved successfully!",
                          topOffset: 10,
                        });
                        setOpenVerifyModal(false);
                        setMeasurement(false);
                        setRejectModal(false);
                        setRadioButton({
                          poorWorkmanship: false,
                          materialDefects: false,
                        });
                        setRejectedQuantity(null);
                      }
                    }}
                    style={[
                      styles.rejectBtn,
                      { backgroundColor: Colors.Primary },
                    ]}
                  >
                    <Text style={styles.rejectText}>Accept</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  if (initialLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.White,
        }}
      >
        <ActivityIndicator size="large" color={Colors.Primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.graph}>
          <View style={styles.header}>
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
                itemTextStyle={styles.dropdownListText}
                showsVerticalScrollIndicator={false}
                iconStyle={styles.iconStyle}
                data={
                  projects.length
                    ? projects?.map((ele) => ({
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
                    getData(item.value);
                  } else {
                    setSelectedProject(projects[0]?.value);
                    getData(projects[0]?.projectId);
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
        {boqListGC.length === 0 ? (
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
            refreshControl={
              <RefreshControl
                onRefresh={() => getData(selectedProject?.projectId)}
                refreshing={loading}
                tintColor={Colors.Primary}
                colors={[Colors.Primary, Colors.Purple]}
              />
            }
            pagingEnabled={true}
            contentContainerStyle={{ paddingBottom: 150 }}
            style={{ width: "100%" }}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) => (
              <View style={styles.mainView}>
                <View style={styles.workOrderCon}>
                  <Text style={styles.workOrderText}>
                    WORKORDER # {item?.workOrder}
                  </Text>
                  <Text style={styles.workOrderAmount}>
                    ₹{" "}
                    {item?.titles[0]?.descriptions.reduce(
                      (acc, curr) => acc + curr.amount,
                      0
                    ) >= 100000
                      ? `${Math.round(
                          item?.titles[0]?.descriptions.reduce(
                            (acc, curr) => acc + curr.amount,
                            0
                          ) / 100000
                        )} Lakhs`
                      : item?.titles[0]?.descriptions.reduce(
                          (acc, curr) => acc + curr.amount,
                          0
                        )}
                  </Text>
                </View>
                {item?.titles.map((title, titleIndex) =>
                  title?.descriptions.map((desc, descIndex) => (
                    <View
                      key={`${titleIndex}-${descIndex}`}
                      style={styles.itemDesCon}
                    >
                      <View style={styles.desCon}>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>Cost Code: </Text>
                          <Text style={styles.itemDesText}>{desc.boqCode}</Text>
                        </View>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>
                            Title:{" "}
                            <Text
                              onPress={() => {
                                // console.log("idx", index, descIndex, titleIndex);
                                if (descIndex === 0) {
                                  setShowMore(!showMore);
                                }
                              }}
                              style={{
                                color: Colors.Purple,
                                fontFamily: "Lexend-Bold",
                                fontSize: 12,
                              }}
                            >
                              Show {showMore ? "Less" : "More"}
                            </Text>
                          </Text>
                          {showMore ? (
                            <Text style={styles.itemDesText}>
                              {descIndex === 0 ? title.title : ""}
                            </Text>
                          ) : (
                            <Text numberOfLines={1} style={styles.itemDesText}>
                              {descIndex === 0 ? title.title : ""}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={styles.desCon}>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>
                            Description:{" "}
                          </Text>
                          <Text numberOfLines={1} style={styles.itemDesText}>
                            {desc.description}
                          </Text>
                        </View>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>Unit: </Text>
                          <Text style={styles.itemDesText}>
                            {desc.unitName}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.desCon}>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>Quantity: </Text>
                          <Text numberOfLines={1} style={styles.itemDesText}>
                            {desc.quantity}
                          </Text>
                        </View>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>Rate: </Text>
                          <Text style={styles.itemDesText}>₹ {desc.rate}</Text>
                        </View>
                      </View>
                      <View style={styles.desCon}>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>Amount: </Text>
                          <Text numberOfLines={1} style={styles.itemDesText}>
                            ₹{" "}
                            {desc.amount >= 100000
                              ? `${Math.round(desc.amount / 100000)} Lakhs`
                              : desc.amount}
                          </Text>
                        </View>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>Percentage: </Text>
                          <Text style={styles.itemDesText}>
                            {desc.percentage} %
                          </Text>
                        </View>
                      </View>
                      <View style={styles.desCon}>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>Verify:</Text>
                          <TouchableOpacity
                            onPress={() => {
                              setOpenVerifyModal(true);
                              setBoqItem(desc);
                            }}
                            style={styles.verifyBtn}
                          >
                            <Text style={styles.verifyText}>Verify</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>
                            Field Notes:{" "}
                          </Text>
                          <Text
                            style={{ ...styles.itemDesText, marginTop: 15 }}
                          >
                            N/A
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))
                )}
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
                  {/* <Text style={styles.headerAccordianText}>
                    ₹
                    {title.totalAmount >= 100000
                      ? `${Math.round(title.totalAmount / 100000)} Lakhs`
                      : title.totalAmount}
                  </Text> */}
                </View>
              </View>
            )}
          />
        )}
      </View>
      {renderVerifyModal()}
      {renderFieldNotes()}
    </View>
  );
};

export default VerifyBoq;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    alignItems: "center",
  },
  innerContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.Primary,
    paddingTop: 10,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
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
  verifyBtn: {
    backgroundColor: Colors.PrimaryLight,
    borderRadius: 3,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    height: 35,
  },
  verifyText: {
    fontFamily: "Lexend-Medium",
    fontSize: 12,
    color: Colors.Primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalInnerContainer: {
    width: "88%",
    backgroundColor: Colors.White,
    // height: 400,
    borderRadius: 10,
    padding: 15,
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalHeaderText: {
    fontFamily: "Lexend-Medium",
    fontSize: 16,
    color: Colors.Black,
  },
  modalHeaderSubText: {
    fontFamily: "Lexend-Regular",
    fontSize: 12,
    color: Colors.Gray,
  },
  modalBtnContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  rejectBtn: {
    backgroundColor: Colors.Purple,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
  },
  rejectText: {
    fontFamily: "Lexend-Medium",
    fontSize: 14,
    color: Colors.White,
  },
  dropdownListText: {
    fontFamily: "Lexend-Regular",
    fontSize: 13,
    color: Colors.FormText,
  },
  documentIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  radioText: {
    fontFamily: "Lexend-Regular",
    fontSize: 16,
    color: Colors.Black,
  },
  rejectedTextInput: {
    borderBottomWidth: 1,
    borderColor: Colors.Gray,
    padding: 5,
    width: "85%",
    color: Colors.Black,
  },
  rejectTextContainer: {
    width: "100%",
    marginBottom: 10,
    alignItems: "flex-end",
  },
  fieldNoteModalContainer: {
    width: "100%",
    backgroundColor: Colors.White,
    height: "90%",
    borderRadius: 10,
    padding: 15,
  },
  fieldInnerContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 20,
    paddingBottom: 15,
  },
  fieldImage: { width: "100%", height: 82, borderRadius: 5 },
  fieldDummyImage: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.FormBorder,
    borderStyle: "dashed",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    height: 82,
  },
  addPictureText: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.Primary,
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
  titleNote: {
    fontFamily: "Lexend-Medium",
    fontSize: 11,
    color: Colors.FormText,
    textTransform: "uppercase",
  },
  fieldNoteInput: {
    fontFamily: "Lexend-Regular",
    borderWidth: 1,
    borderColor: Colors.FormBorder,
    marginTop: 7,
    borderRadius: 4,
    paddingHorizontal: 7,
    fontSize: 14,
    height: 40,
    backgroundColor: Colors.White,
    elevation: 3,
    color: Colors.Black,
  },
});
