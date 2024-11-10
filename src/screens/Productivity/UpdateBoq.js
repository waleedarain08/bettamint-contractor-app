import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  RefreshControl,
  SectionList,
  ActivityIndicator,
  ToastAndroid,
  TextInput,
} from "react-native";
import { Colors } from "../../utils/Colors";
import { Building, VectorIcon } from "../../icons";
import { useFocusEffect } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { useProductivity } from "../../context/productivityContext";
import { useGeneralContext } from "../../context/generalContext";
import { TouchableOpacity } from "react-native";
import DocumentPicker from "react-native-document-picker";

const UpdateBoq = () => {
  const { projects } = useGeneralContext();
  const { getListOfBOQV2, boqListGCViewMode, loading, addProgress } =
    useProductivity();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [progress, setProgress] = useState({});
  const [selectedBoq, setSelectedBoq] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const transformedArray = boqListGCViewMode.map((item) => ({
    title: {
      sow: item.scopeOfWorkName,
      workOrder: item.scopeOfWorkId,
      totalAmount: item?.boQs[0]?.titles[0].totalAmount,
    },
    data: item.boQs.map((boq) => boq),
  }));
  const getData = async (projectId = 0) => {
    if (projects.length) {
      setSelectedProject(projectId);
      getListOfBOQV2(projectId).catch((error) => {
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
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const pickFile = async () => {
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: false,
        transitionStyle: "flipHorizontal",
      });
      console.log("file", file);
      setSelectedFile(file[0]);
    } catch (error) {
      console.log("error", error);
      ToastAndroid.show(
        error.message || "Something went wrong while uploading file!",
        ToastAndroid.SHORT
      );
    }
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
                itemTextStyle={{
                  fontFamily: "Lexend-Regular",
                  fontSize: 13,
                  color: Colors.FormText,
                }}
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
                    setSelectedProject(projects[0]?.projectId);
                    getData(projects[0]?.projectId);
                  }
                }}
              />
            </View>
            <Pressable
              onPress={() => {
                // setOpenFilterModal(true);
              }}
              style={styles.filterButton}
              disabled={true}
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
            refreshControl={
              <RefreshControl
                onRefresh={() => getData(selectedProject)}
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
                    {item?.titles[0]?.totalAmount >= 100000
                      ? `${Math.round(
                          item?.titles[0]?.totalAmount / 100000
                        )} Lakhs`
                      : item?.titles[0]?.totalAmount}
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
                            {desc.unitCode}
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
                          <Text style={styles.itemDesHeader}>
                            Actual Quantity:{" "}
                          </Text>
                          <Text style={styles.itemDesText}>
                            {desc.actualQuantity}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.desCon}>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>
                            Actual Amount:{" "}
                          </Text>
                          <Text numberOfLines={1} style={styles.itemDesText}>
                            ₹{" "}
                            {desc.actualAmount >= 100000
                              ? `${Math.round(
                                  desc.actualAmount / 100000
                                )} Lakhs`
                              : desc.actualAmount}
                          </Text>
                        </View>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>Percentage: </Text>
                          <Text style={styles.itemDesText}>
                            {((desc.actualAmount / desc.amount) * 100).toFixed(
                              2
                            )}{" "}
                            %
                          </Text>
                        </View>
                      </View>
                      <View style={styles.desCon}>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>
                            Today's Progress:{" "}
                          </Text>
                          <TextInput
                            placeholder="Enter Today's Progress"
                            placeholderTextColor={Colors.FormText}
                            style={styles.remarksInput}
                            keyboardType="numeric"
                            value={progress[desc.boqCode]?.todayProgress || ""}
                            onChangeText={(text) => {
                              const numericValue = text;
                              setProgress((prev) => ({
                                ...prev,
                                [desc.boqCode]: {
                                  ...prev[desc.boqCode],
                                  todayProgress: numericValue,
                                },
                              }));
                            }}
                          />
                        </View>
                        <View style={styles.width}>
                          <Text style={styles.itemDesHeader}>Remarks: </Text>
                          <TextInput
                            placeholder="Enter Remarks"
                            placeholderTextColor={Colors.FormText}
                            style={styles.remarksInput}
                            value={progress[desc.boqCode]?.remarks || ""}
                            onChangeText={(text) => {
                              setProgress((prev) => ({
                                ...prev,
                                [desc.boqCode]: {
                                  ...prev[desc.boqCode],
                                  remarks: text,
                                },
                              }));
                            }}
                          />
                        </View>
                      </View>
                      <View style={styles.desCon}>
                        <View style={styles.width}>
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedBoq(desc.boqCode);
                              pickFile();
                            }}
                            style={styles.uploadBtn}
                          >
                            <VectorIcon
                              type={"Entypo"}
                              name="attachment"
                              size={20}
                              color={Colors.Primary}
                            />
                            <Text style={styles.uploadText}>
                              {selectedBoq === desc.boqCode
                                ? selectedFile
                                  ? selectedFile?.name.slice(0, 8)
                                  : "Upload"
                                : "Upload"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.width}>
                          <TouchableOpacity
                            onPress={() => {
                              let formData = new FormData();
                              formData.append("boqProgressId", 0);
                              formData.append(
                                "quantity",
                                parseInt(progress[desc.boqCode]?.todayProgress)
                              );
                              formData.append("boqId", item.boqId);
                              formData.append(
                                "remarks",
                                progress[desc.boqCode]?.remarks
                              );
                              formData.append("image", {
                                uri: selectedFile?.uri,
                                type: selectedFile?.type,
                                name: selectedFile?.name,
                              });
                              addProgress(formData)
                                .then((res) => {
                                  ToastAndroid.show(
                                    "Progress saved successfully!",
                                    ToastAndroid.SHORT
                                  );
                                  setProgress((prev) => ({
                                    ...prev,
                                    [desc.boqCode]: {
                                      todayProgress: "",
                                      remarks: "",
                                    },
                                  }));
                                  setSelectedFile(null);
                                })
                                .catch((err) => {
                                  ToastAndroid.show(
                                    err.message ||
                                      "Something went wrong while saving progress!",
                                    ToastAndroid.SHORT
                                  );
                                });
                            }}
                            style={styles.submitBtn}
                          >
                            {loading ? (
                              <ActivityIndicator
                                size="small"
                                color={Colors.White}
                              />
                            ) : (
                              <Text style={styles.submitText}>Save</Text>
                            )}
                          </TouchableOpacity>
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

export default UpdateBoq;

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
    color: Colors.White,
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
    backgroundColor: Colors.White,
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
  remarksInput: {
    fontFamily: "Lexend-Regular",
    fontSize: 12,
    color: Colors.Black,
    borderWidth: 2,
    borderColor: Colors.Gray,
    borderRadius: 5,
    padding: 5,
    width: "90%",
    height: 40,
    marginTop: 8,
    elevation: 5,
    backgroundColor: Colors.White,
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    borderColor: Colors.Gray,
    borderRadius: 5,
    // paddingLeft: 20,
    width: "90%",
    elevation: 5,
    backgroundColor: Colors.White,
    marginTop: 19,
    height: 50,
  },
  uploadText: {
    fontFamily: "Lexend-Medium",
    fontSize: 14,
    color: Colors.Primary,
    marginLeft: 15,
  },
  submitBtn: {
    backgroundColor: Colors.Primary,
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    elevation: 5,
    marginTop: 19,
  },
  submitText: {
    fontFamily: "Lexend-Medium",
    fontSize: 14,
    color: Colors.White,
  },
});
