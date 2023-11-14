import React, { useEffect, useId, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  LogBox,
  Pressable,
  RefreshControl,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Appearance,
  TouchableHighlight,
} from "react-native";
import Modal from "react-native-modal";
import Menu from "../../assets/icons/Menu.png";
import { Colors } from "../../utils/Colors";
import Spacer from "../../components/Spacer";
import { Searchbar } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAttendanceAction,
  attendanceListReducer,
  saveProjectDataAction,
  selectAttendanceAction,
  loadingAttendance,
  removeMusterData,
} from "../../redux/slices/attendanceSlice";
import {
  projectsListSimpleReducer,
  getAllProjectsSimpleAction,
} from "../../redux/slices/projectSlice";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
import {
  Building,
  Search,
  BackIcon,
  Cross,
  EditIcon,
  DeleteIcon,
  HomeIcon,
  HatIcon,
  PlusSquareIcon,
  PlusIcon,
  PlusCircleIcon,
  Picture,
  DateIcon,
  ClockIcon,
  ChatIcon,
  DotIcon,
} from "../../icons";
import { authToken } from "../../redux/slices/authSlice";
import {
  getSkillsAction,
  skillsListReducer,
} from "../../redux/slices/workerSlice";
import { Dropdown } from "react-native-element-dropdown";
import {
  getLabourContactorAction,
  getUsersAction,
  labourContractorReducer,
  usersListReducer,
} from "../../redux/slices/userSlice";
import {
  assignContractorFieldNote,
  createFieldNoteEntry,
  deleteFieldNote,
  editFieldNoteAction,
  fieldNoteReducer,
  getFieldNoteList,
  markFieldNoteAction,
} from "../../redux/slices/fieldNoteSlice";
import { Image } from "react-native";
import { assetsUrl } from "../../utils/api_constants";
import moment from "moment";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {
  getUnitList,
  getScopeList,
  productivityReducer,
  addBOQ,
  getBOQList,
  addProgress,
  getScopeListDetail,
  getBOQProgress,
  getBOQMetrics,
  getProjectProgressGraph,
  getFinancialProgressData,
  getProjectBudget,
} from "../../redux/slices/productivitySlice";
import DatePicker from "react-native-date-picker";
import { launchImageLibrary } from "react-native-image-picker";
import { BarChart } from "react-native-gifted-charts";
import Tooltip from "react-native-walkthrough-tooltip";

LogBox.ignoreAllLogs();

const DescriptionRow = ({
  title,
  desc,
  descIndex,
  rowItem,
  addTitleDescription,
  deleteTitleDescription,
  unitList,
  updateTitleDescValue,
}) => {
  return (
    <View
      style={{
        width: "100%",
        borderBottomColor: Colors.LightGray,
        borderBottomWidth: 0.5,
        paddingBottom: 15,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "48%" }}></View>
        <View
          style={{
            width: "48%",
          }}
        ></View>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 7,
          borderRadius: 4,
          paddingLeft: 10,
          height: 45,
          backgroundColor: "#F1F1F1",
          color: Colors.Black,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "90%" }}>
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Description
          </Text>
          <TextInput
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.Black,
              width: "100%",
              bottom: 8,
            }}
            value={desc.description}
            onChangeText={(value) => {
              updateTitleDescValue(
                rowItem.rowId,
                title.id,
                desc.id,
                "description",
                value
              );
            }}
            placeholder="Enter Description"
            placeholderTextColor={Colors.Black}
          />
        </View>
        {descIndex === title.descriptions.length - 1 && (
          <Pressable
            style={{ top: 14, width: "10%" }}
            onPress={() => {
              addTitleDescription(rowItem.rowId, title.id);
            }}
          >
            <PlusCircleIcon size={15} color={Colors.FormText} />
          </Pressable>
        )}
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "48%",
            marginTop: 7,
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: "#F1F1F1",
            color: Colors.Black,
          }}
        >
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Quantity*
          </Text>
          <TextInput
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.Black,
              width: "100%",
              bottom: 6,
            }}
            value={desc.quantity}
            onChangeText={(value) => {
              updateTitleDescValue(
                rowItem.rowId,
                title.id,
                desc.id,
                "quantity",
                value
              );
            }}
            placeholder="Enter Quantity"
            placeholderTextColor={Colors.Black}
          />
        </View>
        <View
          style={{
            width: "48%",
            marginTop: 7,
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: "#F1F1F1",
            color: Colors.Black,
          }}
        >
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Unit*
          </Text>
          <Dropdown
            style={{
              paddingRight: 10,
              flex: 1,
            }}
            placeholderStyle={{
              fontSize: 13,
              fontFamily: "Lexend-Regular",
              color: Colors.Black,
            }}
            selectedTextStyle={{
              fontSize: 10,
              fontFamily: "Lexend-Regular",
              color: Colors.Black,
            }}
            itemTextStyle={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.FormText,
            }}
            iconStyle={styles.iconStyle}
            data={unitList?.map((ele) => ({
              label: ele?.name,
              value: ele?.unitId,
            }))}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={"Unit"}
            value={desc.unitId}
            onChange={(item) => {
              updateTitleDescValue(
                rowItem.rowId,
                title.id,
                desc.id,
                "unitId",
                item
              );
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 7,
        }}
      >
        <View
          style={{
            width: "40%",
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: "#F1F1F1",
            color: Colors.Black,
          }}
        >
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Rate*
          </Text>
          <TextInput
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.Black,
              width: "100%",
              bottom: 6,
            }}
            onChangeText={(value) => {
              updateTitleDescValue(
                rowItem.rowId,
                title.id,
                desc.id,
                "rate",
                value
              );
            }}
            value={desc.rate}
            placeholder="---"
            placeholderTextColor={Colors.Black}
          />
        </View>
        <View
          style={{
            width: "40%",
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: "#F1F1F1",
            color: Colors.Black,
          }}
        >
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Amount*
          </Text>
          <TextInput
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.Black,
              width: "100%",
              bottom: 6,
            }}
            value={(desc.rate * desc.quantity).toString().toLocaleString()}
            placeholder="---"
            placeholderTextColor={Colors.Black}
          />
        </View>
        <View style={{ width: "15%" }}>
          <Pressable
            onPress={() => {
              deleteTitleDescription(rowItem.rowId, title.id, desc.id);
            }}
            style={{
              width: 45,
              height: 45,
              backgroundColor: "#F6F7F9",
              borderRadius: 4,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DeleteIcon size={23} color={Colors.Black} />
          </Pressable>

          {/* {index === 0 && rowIndex !== 0 && (
            <Pressable
              onPress={() => {
                deleteRow(rowItem.rowId);
              }}
              style={{
                width: 45,
                height: 45,
                backgroundColor: "#F6F7F9",
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DeleteIcon size={23} color={Colors.Black} />
            </Pressable>
          )} */}
        </View>
      </View>
    </View>
  );
};

const TitleRow = (props) => {
  const {
    unitList,
    rowItem,
    addTitle,
    scopeList,
    addTitleDescription,
    classes,
    index,
    title,
    deleteRow,
    rowIndex,
    deleteTitle,
    updateScopeWorkValue,
    updateTitleValue,
  } = props;
  return (
    <View
      style={{
        width: "100%",
        borderBottomColor: Colors.LightGray,
        borderBottomWidth: 0.5,
        paddingBottom: 15,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "48%" }}>
          {index === 0 ? (
            <Dropdown
              style={{
                height: 40,
                backgroundColor: Colors.White,
              }}
              placeholderStyle={{
                fontSize: 14,
                fontFamily: "Lexend-Regular",
                color: Colors.Black,
              }}
              selectedTextStyle={{
                fontSize: 14,
                fontFamily: "Lexend-Regular",
                color: Colors.Black,
              }}
              itemTextStyle={{
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.FormText,
              }}
              iconStyle={styles.iconStyle}
              data={scopeList?.map((ele) => ({
                label: ele?.name,
                value: ele?.scopeOfWorkId,
              }))}
              maxHeight={400}
              labelField="label"
              valueField="value"
              placeholder={"Scope of work"}
              value={rowItem.scopeOfWorkId}
              onChange={(item) => {
                updateScopeWorkValue(rowItem.rowId, item.value);
              }}
            />
          ) : null}
        </View>
        <View
          style={{
            width: "48%",
            marginTop: 7,
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: "#F1F1F1",
            color: Colors.Black,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "80%" }}>
            <Text
              style={{
                color: Colors.FormText,
                fontSize: 10,
                top: 4,
              }}
            >
              Title*
            </Text>
            <TextInput
              style={{
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.Black,
                width: "100%",
                bottom: 6,
              }}
              value={title.title}
              onChangeText={(value) => {
                updateTitleValue(rowItem.rowId, title.id, "title", value);
              }}
              placeholder="Enter Title"
              placeholderTextColor={Colors.Black}
            />
          </View>
          {rowItem.titles.length - 1 === index && (
            <Pressable
              style={{ top: 14, width: "20%" }}
              onPress={() => {
                addTitle(rowItem.rowId);
              }}
            >
              <PlusCircleIcon size={15} color={Colors.FormText} />
            </Pressable>
          )}
        </View>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 7,
          borderRadius: 4,
          paddingLeft: 10,
          height: 45,
          backgroundColor: "#F1F1F1",
          color: Colors.Black,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "90%" }}>
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Description
          </Text>
          <TextInput
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.Black,
              width: "100%",
              bottom: 8,
            }}
            value={title.description}
            onChangeText={(value) => {
              updateTitleValue(rowItem.rowId, title.id, "description", value);
            }}
            placeholder="Enter Description"
            placeholderTextColor={Colors.Black}
          />
        </View>
        {title.descriptions.length === 0 && (
          <Pressable
            style={{ top: 14, width: "10%" }}
            onPress={() => {
              addTitleDescription(rowItem.rowId, title.id);
            }}
          >
            <PlusCircleIcon size={15} color={Colors.FormText} />
          </Pressable>
        )}
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "48%",
            marginTop: 7,
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: "#F1F1F1",
            color: Colors.Black,
          }}
        >
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Quantity*
          </Text>
          <TextInput
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.Black,
              width: "100%",
              bottom: 6,
            }}
            value={title.quantity}
            onChangeText={(value) => {
              updateTitleValue(rowItem.rowId, title.id, "quantity", value);
            }}
            placeholder="Enter Quantity"
            placeholderTextColor={Colors.Black}
          />
        </View>
        <View
          style={{
            width: "48%",
            marginTop: 7,
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: "#F1F1F1",
            color: Colors.Black,
          }}
        >
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Unit*
          </Text>
          <Dropdown
            style={{
              paddingRight: 10,
            }}
            placeholderStyle={{
              fontSize: 13,
              fontFamily: "Lexend-Regular",
              color: Colors.Black,
            }}
            selectedTextStyle={{
              fontSize: 13,
              fontFamily: "Lexend-Regular",
              color: Colors.Black,
            }}
            itemTextStyle={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.FormText,
            }}
            iconStyle={styles.iconStyle}
            data={unitList?.map((ele) => ({
              label: ele?.name,
              value: ele?.unitId,
            }))}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={"Unit"}
            value={title.unitId}
            onChange={(item) => {
              updateTitleValue(rowItem.rowId, title.id, "unitId", item.value);
            }}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 7,
        }}
      >
        <View
          style={{
            width: "40%",
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: "#F1F1F1",
            color: Colors.Black,
          }}
        >
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Rate*
          </Text>
          <TextInput
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.Black,
              width: "100%",
              bottom: 6,
            }}
            onChangeText={(value) => {
              updateTitleValue(rowItem.rowId, title.id, "rate", value);
            }}
            value={title.rate}
            placeholder="---"
            placeholderTextColor={Colors.Black}
          />
        </View>
        <View
          style={{
            width: "40%",
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: "#F1F1F1",
            color: Colors.Black,
          }}
        >
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Amount*
          </Text>
          <TextInput
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.Black,
              width: "100%",
              bottom: 6,
            }}
            value={(title.rate * title.quantity).toString().toLocaleString()}
            placeholder="---"
            placeholderTextColor={Colors.Black}
          />
        </View>
        <View style={{ width: "15%" }}>
          {index !== 0 && (
            <Pressable
              onPress={() => {
                deleteTitle(rowItem.rowId, title.id);
              }}
              style={{
                width: 45,
                height: 45,
                backgroundColor: "#F6F7F9",
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DeleteIcon size={23} color={Colors.Black} />
            </Pressable>
          )}
          {index === 0 && rowIndex !== 0 && (
            <Pressable
              onPress={() => {
                deleteRow(rowItem.rowId);
              }}
              style={{
                width: 45,
                height: 45,
                backgroundColor: "#F6F7F9",
                borderRadius: 4,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <DeleteIcon size={23} color={Colors.Black} />
            </Pressable>
          )}
        </View>
      </View>
      {title.descriptions.length > 0 &&
        title.descriptions.map((desc, i) => (
          <DescriptionRow key={desc.id} desc={desc} descIndex={i} {...props} />
        ))}
    </View>
  );
};

const ProgressRow = (props) => {
  const {
    unitList,
    scopeList,
    rowItem,
    setRowList,
    rowList,
    addProgressEntery,
    openFieldNote,
    setOpenUpdateProgressModal,
  } = props;
  const [progressValue, setProgressValue] = useState(0);
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
        borderBottomColor: Colors.LightGray,
        borderBottomWidth: 0.5,
        paddingBottom: 15,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "48%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Lexend-Regular",
              color: Colors.Black,
              // height: 40,
              backgroundColor: Colors.White,
            }}
          >
            {rowItem.scopeOfWorkName || "Scope of work"}
          </Text>
        </View>
        <View
          style={{
            width: "48%",
            marginTop: 7,
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: Colors.White,
            color: Colors.Black,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "80%" }}>
            <Text
              style={{
                color: Colors.FormText,
                fontSize: 10,
                top: 4,
              }}
            >
              Title*
            </Text>
            <Text
              style={{
                fontFamily: "Lexend-Regular",
                fontSize: 13,
                color: Colors.Black,
                width: "100%",
                marginTop: 5,
              }}
            >
              {rowItem.title || "N/A"}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 7,
          borderRadius: 4,
          paddingLeft: 10,
          height: 45,
          backgroundColor: Colors.White,
          color: Colors.Black,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ width: "90%" }}>
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Description
          </Text>
          <Text
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.Black,
              width: "100%",
              marginTop: 5,
            }}
          >
            {rowItem.description || "N/A"}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "48%",
            marginTop: 7,
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: Colors.White,
            color: Colors.Black,
          }}
        >
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Quantity*
          </Text>
          <Text
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.Black,
              width: "100%",
              marginTop: 5,
            }}
          >
            {rowItem.remainingQuantity || "0"}
          </Text>
        </View>
        <View
          style={{
            width: "48%",
            marginTop: 7,
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: Colors.White,
            color: Colors.Black,
          }}
        >
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Unit*
          </Text>
          <Text
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.Black,
              width: "100%",
              marginTop: 5,
            }}
          >
            {rowItem.unitName || "N/A"}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 7,
        }}
      >
        <View
          style={{
            width: "48%",
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: Colors.White,
            color: Colors.Black,
          }}
        >
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Rate*
          </Text>
          <Text
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.Black,
              width: "100%",
              marginTop: 5,
            }}
          >
            {rowItem.rate || "N/A"}
          </Text>
        </View>
        <View
          style={{
            width: "48%",
            borderRadius: 4,
            paddingLeft: 10,
            height: 45,
            backgroundColor: Colors.White,
            color: Colors.Black,
          }}
        >
          <Text
            style={{
              color: Colors.FormText,
              fontSize: 10,
              top: 4,
            }}
          >
            Amount*
          </Text>
          <Text
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 13,
              color: Colors.Black,
              width: "100%",
              marginTop: 5,
            }}
          >
            {rowItem.amount || "N/A"}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          marginTop: 7,
          borderRadius: 4,
          paddingLeft: 10,
          height: 45,
          backgroundColor: "#F1F1F1",
          color: Colors.Black,
          // flexDirection: "row",
          // justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: Colors.FormText,
            fontSize: 10,
            top: 4,
          }}
        >
          Today's Progress
        </Text>
        <TextInput
          style={{
            fontFamily: "Lexend-Regular",
            fontSize: 13,
            color: Colors.Black,
            width: "100%",
            bottom: 8,
          }}
          value={progressValue}
          onChangeText={(value) => {
            setProgressValue(value);
          }}
          placeholder="Enter Progress"
          placeholderTextColor={Colors.Black}
        />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            addProgressEntery(rowItem.boqId, progressValue);
          }}
          style={{
            width: "48%",
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              rowItem?.remainingQuantity === 0 ? Colors.Gray : Colors.Purple,
            borderRadius: 4,
          }}
          disabled={rowItem?.remainingQuantity === 0}
        >
          <Text
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 14,
              color: Colors.White,
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            openFieldNote();
            setOpenUpdateProgressModal();
          }}
          style={{
            width: "48%",
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors.Primary,
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "Lexend-Regular",
              fontSize: 14,
              color: Colors.White,
            }}
          >
            Add Field Note
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Row = (props) => {
  let { rowItem } = props;
  return (
    <View>
      {rowItem.titles?.length &&
        rowItem.titles.map((item, index) => (
          <TitleRow key={item.id} index={index} title={item} {...props} />
        ))}
    </View>
  );
};

const Productivity = ({ navigation }) => {
  const [openMainProjectModal, setOpenMainProject] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openUpdateProgressModal, setOpenUpdateProgressModal] = useState(false);
  const [openFieldNote, setOpenFieldNote] = useState(false);
  const [contractor, setContractor] = useState(null);
  const [project, setProject] = useState(null);
  const [currentProjectProgress, setCurrentProjectProgress] = useState(null);
  const [LabourContractorProgress, setLabourContractorProgress] = useState(0);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  //Field notes state
  const [scopeValue, setScopeValue] = useState(null);
  const [contractorValue, setContractorValue] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  // const [date, setDateNote] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  // const [open, setOpen] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [openContractorModal, setOpenContractorModal] = useState(null);
  const [time, setTime] = useState(null);
  const [openTime, setOpenTime] = useState(false);
  const [fieldPic, setFieldPic] = useState("");
  const [fieldPicForm, setFieldPicForm] = useState("");
  const [selectedProjectNote, setSelectedProjectNote] = useState(null);
  const colorScheme = Appearance.getColorScheme();
  const isDarkMode = colorScheme === "dark";
  const textColor = isDarkMode ? "white" : "black";

  // Graphs
  const [currentProject, setCurrentProject] = useState(null);
  const [currentProjectDetail, setCurrentProjectDetail] = useState(null);
  const [currentProjectBOQ, setCurrentProjectBOQ] = useState(null);
  const [currentProjectFinancial, setCurrentProjectFinancial] = useState(null);
  const [currentProjectProgressGraph, setCurrentProjectProgressGraph] =
    useState(null);
  const [currentProjectBudget, setCurrentProjectBudget] = useState(null);

  const [purpleTooltip, setPurpleTooltip] = useState(false);
  const [greenTooltip, setGreenTooltip] = useState(false);
  // const projectsList = useSelector(projectsListSimpleReducer);
  const { selectedNote } = useSelector(fieldNoteReducer);
  // const labourContractorList = useSelector(labourContractorReducer);

  const dispatch = useDispatch();
  const {
    unitList,
    scopeList,
    loading,
    boqList,
    boqProgress,
    boqProgressLoading,
    metrics,
    projectProgressData,
    projectProgressDataLoading,
    projectBudgetData,
    projectBudgetLoading,
    financialGraphData,
    financialGraphLoading,
  } = useSelector(productivityReducer);
  // const { fieldNoteList, loading } = useSelector(fieldNoteReducer);
  const projectsListSimple = useSelector(projectsListSimpleReducer);
  const token = useSelector(authToken);
  const labourContractorList = useSelector(labourContractorReducer);
  const randomId = Math.floor(100000 + Math.random() * 900000);
  // console.log("BOQ Progress--->>>", financialGraphData);

  const [rowList, setRowList] = useState([
    {
      rowId: 1,
      boqId: 0,
      scopeOfWorkId: scopeList[0]?.scopeOfWorkId,

      titles: [
        {
          id: randomId,
          scopeOfWorkDetailId: "",
          title: "",
          description: "",
          unitId: 0,
          rate: 0,
          quantity: 0,
          timeline: 0,
          scopeListDetail: [],
          descriptions: [],
        },
      ],
    },
  ]);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getSkillsAction(token));
      dispatch(getUsersAction(token));
      dispatch(getAllProjectsSimpleAction(token));
      dispatch(selectAttendanceAction(null));
      dispatch(removeMusterData());
      dispatch(getFieldNoteList(token));
      dispatch(getScopeList(token));
      dispatch(
        getLabourContactorAction(token, projectsListSimple[0]?.projectId)
      );
      dispatch(getUnitList(token));
      return () => {};
    }, [])
  );

  useEffect(() => {
    // setFilteredDataSource(projectsListSimple);
    // setMasterDataSource(projectsListSimple);
    dispatch(getBOQList(token, projectsListSimple[0]?.projectId));
  }, [projectsListSimple]);

  useEffect(() => {
    if (projectsListSimple.length > 0) {
      setCurrentProjectProgress(projectsListSimple[0]?.projectId);
      setCurrentProjectDetail(projectsListSimple[0]);
      setCurrentProject(projectsListSimple[0]?.projectId);
      setProject(projectsListSimple[0]?.projectId);
      setCurrentProjectBOQ(projectsListSimple[0]?.projectId);
      dispatch(getBOQProgress(token, projectsListSimple[0]?.projectId));
      // dispatch(getContractors(projectClassificationList[0]?.projectId));
      // dispatch(getBOQList(projectClassificationList[0]?.projectId));
      dispatch(getBOQMetrics(token, projectsListSimple[0]?.projectId));
      setCurrentProjectProgressGraph(projectsListSimple[0]?.projectId);
      dispatch(
        getProjectProgressGraph(token, projectsListSimple[0]?.projectId)
      );
      dispatch(getProjectBudget(token, projectsListSimple[0]?.projectId));
      setCurrentProjectBudget(projectsListSimple[0]?.projectId);
      setCurrentProjectFinancial(projectsListSimple[0]?.projectId);
      dispatch(
        getFinancialProgressData(token, projectsListSimple[0]?.projectId)
      );
      // call(projectClassificationList[0]);
    }
  }, [projectsListSimple?.length]);

  const getFinancialProgressGraphData = () => {
    let resultArray = [];
    if (financialGraphData.length) {
      financialGraphData?.forEach((item) => {
        const month = item.month;
        const labelToCostMap = {};
        // console.log("Item--->>>", item);
        if (Array.isArray(item?.costbySOW)) {
          if (item?.costbySOW?.length) {
            item?.costbySOW?.forEach((costItem) => {
              const label = costItem?.label;
              const actualCost = costItem?.actualCost;
              console.log(actualCost);
              if (!labelToCostMap[label]) {
                labelToCostMap[label] = actualCost;
              } else {
                labelToCostMap[label] += actualCost;
              }
            });
          }
        }

        const stacks = [];

        for (const label in labelToCostMap) {
          // console.log("stack", labelToCostMap[label]);
          stacks.push({
            value: labelToCostMap[label],
            color: getColorForLabel(label),
          });
        }

        resultArray.push({ stacks, label: month });
      });
    }
    //   const arr = resultArray.map((item) => {
    //     item.stacks.length === 0&& (
    //   item.stacks.push({value: 0, color: "gray"
    // })));
    const arr = resultArray?.map((item) => {
      if (item?.stacks?.length === 0) {
        item?.stacks?.push({ value: 0, color: "white" });
      }
      return item;
    });

    return arr;
  };

  function getColorForLabel(label) {
    // Define your color logic based on the label here
    // You can use a switch or other logic to assign colors
    // For simplicity, I'm using some example colors
    const colorMap = {
      Earthwork: "orange",
      "Civil Works": "#4ABFF4",
      Finishes: "green",
      "Electrical Works - LT": "red",
      "Electrical Works - HT": "yellow",
      "Plumbing Works": "blue",
      "HVAC Works": "pink",
      Glazing: "purple",
      "Fixed Millworks": "brown",
      "Swimming Pools & Water Bodies": "gray",
      "Mechanical Works": "black",
      Miscellaneous: "cyan",
      "General & NMR": "magenta",
    };
    return colorMap[label] || "gray"; // Default to gray if no color is defined
  }
  // console.log("Financial Graph Data--->>>", getFinancialProgressGraphData());
  const budgetGraphsData = () => {
    return projectBudgetData?.graphData?.flatMap((item) => [
      {
        value: item.budgetedCost || 0,
        label: item.label,
        spacing: 2,
        labelWidth: 30,
        labelTextStyle: { color: Colors.Black, fontSize: 10 },
        frontColor: Colors.Primary,
      },
      {
        value: item.actualCost || 0,
        frontColor: Colors.Purple,
      },
    ]);
  };
  const getBudgetMaxValue = () => {
    let maxCost = 100; // Initialize with negative infinity to ensure any value in the array will be greater

    // if (!projectBudgetData?.graphData) {
    for (const item of projectBudgetData?.graphData || []) {
      maxCost = Math.max(maxCost, item.actualCost, item.budgetedCost);
    }
    // }
    let attendanceMax = roundToNearestMultiple(maxCost, 100);
    return attendanceMax;
  };

  // console.log("Maximum cost:", getBudgetMaxValue());
  // console.log("Budget Graphs Data--->>>", getBudgetMaxValue());
  const projectProgressGraphsData = () => {
    return projectProgressData?.graphData?.flatMap((item) => [
      {
        value: item?.overallProgress < 0 ? 0 : item?.overallProgress,
        label: item.label,
        // spacing: 20,
        labelWidth: 20,
        labelTextStyle: { color: Colors.Black, fontSize: 10 },
        frontColor: Colors.Primary,
      },
    ]);
  };
  function roundToNearestMultiple(number, multiple) {
    return Math.ceil(number / multiple) * multiple;
  }
  const getProjectProgressMaxValue = () => {
    let progressMax = 100;
    if (projectProgressData?.graphData) {
      let progressValues =
        projectProgressData?.graphData &&
        projectProgressData?.graphData?.map((item) => item?.overallProgress);
      // Find the maximum value from the array
      const progressMaxValue = Math?.max(...progressValues);
      progressMax = roundToNearestMultiple(progressMaxValue, 50);
    }
    return progressMax;
  };
  // console.log(
  //   "Project Progress Graphs Data--->>>",
  //   getProjectProgressMaxValue()
  // );
  const pushNewRow = () => {
    setRowList([
      ...rowList,
      {
        rowId: rowList[rowList.length - 1].rowId + 1,
        boqId: 0,
        scopeOfWorkId: scopeList[0]?.scopeOfWorkId,
        titles: [
          {
            id: randomId,
            scopeOfWorkDetailId: "",
            title: "",
            description: "",
            unitId: 0,
            rate: 0,
            quantity: 0,
            timeline: 0,
            scopeListDetail: [],
            descriptions: [],
          },
        ],
      },
    ]);
  };
  const addTitle = (rowId) => {
    let updatedData = rowList.map((row) => {
      if (row.rowId === rowId) {
        return {
          ...row,
          titles: [
            ...row.titles,
            {
              id: randomId,
              scopeOfWorkDetailId: "",
              title: "",
              description: "",
              unitId: 0,
              rate: 0,
              quantity: 0,
              timeline: 0,
              scopeListDetail: [],
              descriptions: [],
            },
          ],
        };
      }
      return row;
    });

    setRowList(updatedData);
  };

  const addTitleDescription = (rowId, titleId) => {
    let updatedList = rowList.map((item) => {
      if (item.rowId === rowId) {
        return {
          ...item,
          titles: item.titles.map((title) => {
            if (title.id === titleId) {
              return {
                ...title,
                descriptions: [
                  ...title.descriptions,
                  {
                    id: randomId,
                    boqId: 0,
                    scopeOfWorkId: 0,
                    scopeOfWorkDetailId: "",
                    description: "",
                    unitId: 0,
                    rate: 0,
                    quantity: 0,
                    timeline: 0,
                  },
                ],
              };
            }
            return title;
          }),
        };
      }
      return item;
    });
    setRowList(updatedList);
  };

  const updateScopeWorkValue = (rowId, value) => {
    let updatedArray = rowList.map((item) => {
      if (item.rowId === rowId) {
        return {
          ...item,
          scopeOfWorkId: value,
        };
      }
      return item;
    });
    setRowList(updatedArray);
  };

  const deleteRow = (rowId) => {
    let updatedData = rowList.filter((item) => item.rowId !== rowId);
    setRowList(updatedData);
  };

  const deleteTitle = (rowId, titleId) => {
    let updatedData = rowList.map((item) => {
      if (item.rowId === rowId) {
        return {
          ...item,
          titles: item.titles.filter((title) => title.id !== titleId),
        };
      }
      return item;
    });
    setRowList(updatedData);
  };

  const deleteTitleDescription = (rowId, titleId, descId) => {
    let updatedData = rowList.map((row) => {
      if (row.rowId === rowId) {
        return {
          ...row,
          titles: row.titles.map((title) => {
            if (title.id === titleId) {
              return {
                ...title,
                descriptions: title.descriptions.filter(
                  (desc) => desc.id !== descId
                ),
              };
            }
            return title;
          }),
        };
      }
      return row;
    });
    setRowList(updatedData);
  };

  const updateTitleValue = (rowId, titleId, valueName, value) => {
    let updatedData = rowList.map((row) => {
      if (row.rowId === rowId) {
        return {
          ...row,
          titles: row.titles.map((title) => {
            if (title.id === titleId) {
              return {
                ...title,
                [valueName]: value,
              };
            }
            return title;
          }),
        };
      }
      return row;
    });

    setRowList(updatedData);
  };

  const updateTitleDescValue = (rowId, titleId, descId, valueName, value) => {
    let updatedData = rowList.map((row) => {
      if (row.rowId === rowId) {
        return {
          ...row,
          titles: row.titles.map((title) => {
            if (title.id === titleId) {
              return {
                ...title,
                descriptions: title.descriptions.map((description) => {
                  if (description.id === descId) {
                    return {
                      ...description,
                      [valueName]: value,
                    };
                  }
                  return description;
                }),
              };
            }
            return title;
          }),
        };
      }
      return row;
    });

    setRowList(updatedData);
  };

  const addProgressEntery = async (boqId, value) => {
    let obj = {
      boqProgressId: 0,
      quantity: value,
      boqId,
    };

    let resp = await dispatch(addProgress(token, obj));

    if (resp?.status === 200) {
      let resp = await dispatch(
        getBOQList(token, currentProjectProgress, LabourContractorProgress)
      );
      if (resp?.status === 200) {
        Toast.show({
          type: "info",
          text1: "Success",
          text2: "Progress marked successfully!",
          topOffset: 10,
          position: "top",
          visibilityTime: 4000,
        });
      }
    } else {
      // toast.failure("Something went wrong!");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong!",
        topOffset: 10,
        position: "top",
        visibilityTime: 4000,
      });
    }
  };
  const handleSubmitBOQ = async () => {
    let changedRowList = [];

    rowList.forEach((item) => {
      // Process titles first
      item?.titles?.forEach((title) => {
        changedRowList.push({
          contractorBOQId: 0,
          scopeOfWorkId: item.scopeOfWorkId,
          unitId: title.unitId,
          description: title.description,
          title: title.title,
          rate: parseInt(title.rate),
          quantity: parseInt(title.quantity),
        });

        // Then process descriptions if they exist
        if (title.descriptions) {
          title.descriptions.forEach((desc) => {
            changedRowList.push({
              contractorBOQId: 0,
              scopeOfWorkId: item.scopeOfWorkId,
              unitId: desc.unitId,
              description: desc.description,
              title: title.title,
              rate: parseInt(desc.rate),
              quantity: parseInt(desc.quantity),
            });
          });
        }
      });
    });

    if (!contractor) {
      return Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select contractor.",
        topOffset: 10,
        position: "top",
        visibilityTime: 4000,
      });
    }
    let schemaObject = {
      boqList: changedRowList,
      projectId: project,
      contractorId: contractor,
      endDate: date,
    };
    // console.log("schemaObject", schemaObject);

    let resp = await dispatch(addBOQ(token, schemaObject));
    if (resp?.status === 200) {
      Toast.show({
        type: "info",
        text1: "Success",
        text2: "BOQ created successfully.",
        topOffset: 10,
        position: "top",
        visibilityTime: 4000,
      });
      setRowList([
        {
          rowId: 1,
          boqId: 0,
          scopeOfWorkId: scopeList[0]?.scopeOfWorkId,
          titles: [
            {
              id: randomId,
              scopeOfWorkDetailId: "",
              title: "",
              description: "",
              unitId: 0,
              rate: 0,
              quantity: 0,
              timeline: 0,
              scopeListDetail: [],
              descriptions: [],
            },
          ],
        },
      ]);
      setProject(null);
      setContractor(null);
      setDate(new Date());
      setOpenFilterModal(false);
    } else if (resp?.status === 404) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: resp?.data?.error,
        topOffset: 10,
        position: "top",
        visibilityTime: 4000,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Some Went Wrong While Saving BOQ's",
        topOffset: 10,
        position: "top",
        visibilityTime: 4000,
      });
    }
  };
  const handleImagePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
      selectionLimit: 1,
    });
    if (result?.assets?.length > 0) {
      setFieldPicForm(result);
      setFieldPic(result?.assets[0]?.uri);
    }
  };

  const submitHandler = async () => {
    const formData = new FormData();
    if (!fieldPic) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select image.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!scopeValue) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select scope of work.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!description) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter description.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!contractorValue) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select contractor.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!selectedProjectNote) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select project.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!location) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter location.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!date) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select date.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else if (!time) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please select time.",
        topOffset: 10,
        position: "top",
        visibilityTime: 3000,
      });
    } else {
      formData.append("ScopeOfWorkId", parseInt(scopeValue, 10));
      formData.append("ContractorId", parseInt(contractorValue, 10));
      formData.append("ProjectId", parseInt(selectedProjectNote, 10));
      formData.append("Description", description);
      formData.append("Location", location);
      formData.append("Image", {
        name: fieldPicForm?.assets[0]?.fileName,
        type: fieldPicForm?.assets[0]?.type,
        uri: fieldPicForm?.assets[0]?.uri, //Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
      formData.append(
        "DateTime",
        `${moment(date).format("YYYY-MM-DD")} ${moment(time).format("HH:mm")}`
      );
      // console.log("FORMDATA", formData);
      const response = await dispatch(createFieldNoteEntry(token, formData));
      if (response.status === 200) {
        setOpenFieldNote(false);
        Toast.show({
          type: "info",
          text1: "Field Note Created",
          text2: selectedNote
            ? "Field Note is updated successfully."
            : "New Field Note is created successfully.",
          topOffset: 10,
          position: "top",
          visibilityTime: 4000,
        });
      }
    }
  };

  const renderFilterModal = () => {
    return (
      <Modal
        isVisible={openFilterModal}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenFilterModal(!openFilterModal)}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: Colors.White,
              height: "90%",
              borderRadius: 10,
              padding: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Lexend-Medium",
                    color: Colors.Black,
                    fontSize: 16,
                    // marginBottom: 10,
                  }}
                >
                  Insert BOQ's
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Cross
                  onPress={() => {
                    setOpenFilterModal(!openFilterModal);
                    setRowList([
                      {
                        rowId: 1,
                        boqId: 0,
                        scopeOfWorkId: scopeList[0]?.scopeOfWorkId,
                        titles: [
                          {
                            id: randomId,
                            scopeOfWorkDetailId: "",
                            title: "",
                            description: "",
                            unitId: 0,
                            rate: 0,
                            quantity: 0,
                            timeline: 0,
                            scopeListDetail: [],
                            descriptions: [],
                          },
                        ],
                      },
                    ]);
                    setProject(null);
                    setSelectedProject(null);
                    setSelectedContractor(null);
                    setContractor(null);
                  }}
                  size={22}
                  color={Colors.Black}
                />
              </View>
            </View>
            <View
              style={{
                width: "100%",
                marginVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: 10,
                borderBottomWidth: 0.4,
                borderBottomColor: Colors.LightGray,
              }}
            >
              <View style={{ width: "35%" }}>
                <Pressable
                  onPress={() => setOpenProjectModal(true)}
                  style={styles.insertProject}
                >
                  <View style={{ width: "30%" }}>
                    <View style={styles.smallBuildingIcon}>
                      <Building size={15} color={Colors.LightGray} />
                    </View>
                  </View>
                  <View style={{ width: "65%" }}>
                    <Text style={styles.selectProjectInsert}>
                      Select Project
                    </Text>
                    <Text
                      style={[
                        {
                          fontFamily: "Lexend-Medium",
                          color: Colors.Black,
                          fontSize: 10,
                        },
                      ]}
                    >
                      {selectedProject
                        ? `${selectedProject?.label?.substring(0, 10)}...`
                        : projectsListSimple
                        ? `${projectsListSimple[0]?.name?.substring(0, 10)}...`
                        : "Select a project"}
                    </Text>
                    {/* <Dropdown
                      style={{
                        height: 20,
                        backgroundColor: Colors.White,
                        marginVertical: 2,
                      }}
                      placeholderStyle={{
                        fontSize: 10,
                        fontFamily: "Lexend-Regular",
                        color: Colors.Black,
                      }}
                      selectedTextStyle={{
                        fontSize: 10,
                        fontFamily: "Lexend-Regular",
                        color: Colors.Black,
                      }}
                      itemTextStyle={{
                        fontFamily: "Lexend-Regular",
                        fontSize: 13,
                        color: Colors.FormText,
                      }}
                      itemContainerStyle={{ width: 250 }}
                      containerStyle={{ width: 250 }}
                      iconStyle={styles.iconStyle}
                      data={projectsListSimple?.map((ele) => ({
                        label: `${ele?.name
                          ?.split(" ")
                          ?.slice(0, 1)
                          .join(" ")}...`,
                        // label: `${ele?.name.split(" ")[0]} ${
                        //   ele?.name.split(" ")[1] === undefined
                        //     ? ""
                        //     : ele?.name.split(" ")[1]
                        // }${ele?.name.split(" ").length > 2 ? "..." : ""}`,
                        value: ele?.projectId,
                      }))}
                      maxHeight={400}
                      labelField="label"
                      valueField="value"
                      placeholder={"Project"}
                      value={project ? project : projectsListSimple[0]?.name}
                      onChange={(item) => {
                        // setOpenFilterModal(false);
                        setProject(item.value);
                        dispatch(getLabourContactorAction(token, item.value));
                      }}
                    /> */}
                  </View>
                </Pressable>
              </View>
              <View style={{ width: "30%" }}>
                <Pressable
                  onPress={() => setOpenContractorModal(true)}
                  style={styles.insertProject}
                >
                  <View style={{ width: "33%" }}>
                    <View style={styles.smallBuildingIcon}>
                      <Building size={15} color={Colors.LightGray} />
                    </View>
                  </View>
                  <View style={{ width: "60%" }}>
                    <Text style={styles.selectProjectInsert}>Contractor</Text>
                    <Text
                      style={[
                        {
                          fontFamily: "Lexend-Medium",
                          color: Colors.Black,
                          fontSize: 10,
                        },
                      ]}
                    >
                      {selectedContractor
                        ? `${selectedContractor?.label?.substring(0, 8)}...`
                        : "Name"}
                    </Text>
                  </View>
                </Pressable>
              </View>
              <View style={{ width: "35%" }}>
                <View style={styles.insertProject}>
                  <View style={{ width: "30%" }}>
                    <View style={styles.smallBuildingIcon}>
                      <Building size={15} color={Colors.LightGray} />
                    </View>
                  </View>
                  <View style={{ width: "70%" }}>
                    <Text style={styles.selectProjectInsert}>
                      Project End Date
                    </Text>
                    <Text
                      onPress={() => setOpen(true)}
                      style={{
                        fontSize: 10,
                        fontFamily: "Lexend-Regular",
                        color: Colors.Black,
                      }}
                    >
                      {moment(date).format("DD-MM-YYYY")}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <ScrollView>
              {rowList?.map((item, index) => (
                <Row
                  key={item.rowId}
                  rowIndex={index}
                  rowItem={item}
                  updateScopeWorkValue={updateScopeWorkValue}
                  //! DATA
                  unitList={unitList}
                  scopeList={scopeList}
                  rowList={rowList}
                  setRowList={setRowList}
                  // //! METHODS
                  addTitle={addTitle}
                  addTitleDescription={addTitleDescription}
                  deleteRow={deleteRow}
                  deleteTitle={deleteTitle}
                  deleteTitleDescription={deleteTitleDescription}
                  updateTitleDescValue={updateTitleDescValue}
                  updateTitleValue={updateTitleValue}
                />
              ))}
            </ScrollView>
            <View
              style={{
                width: "100%",
                bottom: 0,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "35%" }}>
                <Pressable
                  style={{
                    backgroundColor: "#F6F7F9",
                    flexDirection: "row",
                    padding: 10,
                    alignItems: "center",
                    borderRadius: 5,
                    borderStyle: "dashed",
                    borderWidth: 0.5,
                  }}
                  onPress={pushNewRow}
                >
                  <PlusSquareIcon size={15} color={"blue"} />
                  <Text
                    style={{
                      fontFamily: "Lexend-Medium",
                      color: Colors.Black,
                      fontSize: 14,
                      marginLeft: 5,
                    }}
                  >
                    Add SOW
                  </Text>
                </Pressable>
              </View>
              <View style={{ width: "35%" }}>
                <Pressable
                  onPress={() => {
                    handleSubmitBOQ();
                  }}
                  style={{
                    backgroundColor: Colors.Purple,
                    flexDirection: "row",
                    padding: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Lexend-Medium",
                      color: Colors.White,
                      fontSize: 14,
                      marginLeft: 5,
                    }}
                  >
                    Submit
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const renderProjectSelectModal = () => {
    return (
      <Modal
        isVisible={openProjectModal}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenProjectModal(!openProjectModal)}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: Colors.White,
            height: "60%",
            borderRadius: 10,
            padding: 15,
          }}
        >
          <View style={styles.filterInnerContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Lexend-Bold",
                    color: Colors.LightGray,
                    fontSize: 16,
                  }}
                >
                  Project
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Cross
                  onPress={() => {
                    setOpenProjectModal(!openProjectModal);
                  }}
                  size={22}
                  color={Colors.Black}
                />
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              {/* <View style={{ marginVertical: 5 }}>
                <Text style={styles.contactorText}>By Contractor</Text>
              </View> */}
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={{
                  fontSize: 14,
                  fontFamily: "Lexend-Regular",
                  color: Colors.Black,
                }}
                selectedTextStyle={{
                  fontSize: 14,
                  fontFamily: "Lexend-Regular",
                  color: Colors.Black,
                }}
                itemTextStyle={{
                  fontFamily: "Lexend-Regular",
                  fontSize: 13,
                  color: Colors.FormText,
                }}
                iconStyle={styles.iconStyle}
                data={projectsListSimple?.map((ele) => ({
                  label: ele?.name,
                  value: ele?.projectId,
                }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Project"}
                value={project}
                onChange={(item) => {
                  setOpenProjectModal(false);
                  setSelectedProject(item);
                  setProject(item.value);
                  dispatch(getLabourContactorAction(token, item.value));
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const renderMainProjectSelectModal = () => {
    return (
      <Modal
        isVisible={openMainProjectModal}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenMainProject(!openMainProjectModal)}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: Colors.White,
            height: "60%",
            borderRadius: 10,
            padding: 15,
          }}
        >
          <View style={styles.filterInnerContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Lexend-Bold",
                    color: Colors.LightGray,
                    fontSize: 16,
                  }}
                >
                  Project
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Cross
                  onPress={() => {
                    setOpenProjectModal(!openProjectModal);
                  }}
                  size={22}
                  color={Colors.Black}
                />
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={{
                  fontSize: 14,
                  fontFamily: "Lexend-Regular",
                  color: Colors.Black,
                }}
                selectedTextStyle={{
                  fontSize: 14,
                  fontFamily: "Lexend-Regular",
                  color: Colors.Black,
                }}
                itemTextStyle={{
                  fontFamily: "Lexend-Regular",
                  fontSize: 13,
                  color: Colors.FormText,
                }}
                iconStyle={styles.iconStyle}
                data={projectsListSimple?.map((ele) => ({
                  label: ele?.name,
                  value: ele?.projectId,
                  ...ele,
                }))}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Project"}
                value={currentProject}
                onChange={(item) => {
                  setOpenMainProject(false);
                  if (item) {
                    setCurrentProject(item.value);
                    setCurrentProjectDetail(item);
                    dispatch(getBOQProgress(token, item.value));
                    dispatch(getBOQMetrics(token, item.value));
                  } else {
                    dispatch(
                      getBOQProgress(token, projectsListSimple[0]?.projectId)
                    );
                    setCurrentProjectDetail(projectsListSimple[0]);
                    setCurrentProject(projectsListSimple[0]?.projectId);
                    dispatch(getBOQMetrics(projectsListSimple[0]?.projectId));
                  }
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderContractorSelectModal = () => {
    return (
      <Modal
        isVisible={openContractorModal}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenContractorModal(!openContractorModal)}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: Colors.White,
            height: "60%",
            borderRadius: 10,
            padding: 15,
          }}
        >
          <View style={styles.filterInnerContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Lexend-Bold",
                    color: Colors.LightGray,
                    fontSize: 16,
                  }}
                >
                  Contractor
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Cross
                  onPress={() => {
                    setOpenContractorModal(!openContractorModal);
                  }}
                  size={22}
                  color={Colors.Black}
                />
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              {/* <View style={{ marginVertical: 5 }}>
                <Text style={styles.contactorText}>By Contractor</Text>
              </View> */}
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={{
                  fontSize: 14,
                  fontFamily: "Lexend-Regular",
                  color: Colors.Black,
                }}
                selectedTextStyle={{
                  fontSize: 14,
                  fontFamily: "Lexend-Regular",
                  color: Colors.Black,
                }}
                itemTextStyle={{
                  fontFamily: "Lexend-Regular",
                  fontSize: 13,
                  color: Colors.FormText,
                }}
                iconStyle={styles.iconStyle}
                data={
                  labourContractorList?.length
                    ? labourContractorList?.map((ele) => ({
                        label: ele?.fullName,
                        value: ele?.userId,
                      }))
                    : []
                }
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={"Select Contractor"}
                value={contractor}
                onChange={(item) => {
                  setOpenContractorModal(false);
                  setSelectedContractor(item);
                  setContractor(item.value);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const renderUpdateProgressModal = () => {
    return (
      <Modal
        isVisible={openUpdateProgressModal}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() =>
          setOpenUpdateProgressModal(!openUpdateProgressModal)
        }
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: Colors.White,
              height: "90%",
              borderRadius: 10,
              padding: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "Lexend-Medium",
                    color: Colors.Black,
                    fontSize: 16,
                    // marginBottom: 10,
                  }}
                >
                  Update Today's Progress
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Cross
                  onPress={() => {
                    setOpenUpdateProgressModal(!openUpdateProgressModal);
                    // setRowList([
                    //   {
                    //     rowId: 1,
                    //     boqId: 0,
                    //     scopeOfWorkId: scopeList[0]?.scopeOfWorkId,
                    //     titles: [
                    //       {
                    //         id: randomId,
                    //         scopeOfWorkDetailId: "",
                    //         title: "",
                    //         description: "",
                    //         unitId: 0,
                    //         rate: 0,
                    //         quantity: 0,
                    //         timeline: 0,
                    //         scopeListDetail: [],
                    //         descriptions: [],
                    //       },
                    //     ],
                    //   },
                    // ]);
                    // setProject(null);
                    // setContractor(null);
                  }}
                  size={22}
                  color={Colors.Black}
                />
              </View>
            </View>
            <View
              style={{
                width: "100%",
                marginVertical: 10,
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-between",
                paddingBottom: 10,
                borderBottomWidth: 0.4,
                borderBottomColor: Colors.LightGray,
              }}
            >
              <View style={styles.insertProject}>
                <View style={{ width: "13%" }}>
                  <View style={styles.smallBuildingIcon}>
                    <Building size={15} color={Colors.LightGray} />
                  </View>
                </View>
                <View style={{ width: "65%" }}>
                  <Text style={styles.selectProjectInsert}>Select Project</Text>
                  <Dropdown
                    style={{
                      height: 20,
                      backgroundColor: Colors.White,
                    }}
                    placeholderStyle={{
                      fontSize: 10,
                      fontFamily: "Lexend-Regular",
                      color: Colors.Black,
                    }}
                    selectedTextStyle={{
                      fontSize: 10,
                      fontFamily: "Lexend-Regular",
                      color: Colors.Black,
                    }}
                    itemTextStyle={{
                      fontFamily: "Lexend-Regular",
                      fontSize: 13,
                      color: Colors.FormText,
                    }}
                    iconStyle={styles.iconStyle}
                    data={projectsListSimple?.map((ele) => ({
                      label: ele?.name,
                      value: ele?.projectId,
                    }))}
                    maxHeight={400}
                    labelField="label"
                    valueField="value"
                    placeholder={"Project"}
                    value={project}
                    onChange={(item) => {
                      // setOpenFilterModal(false);
                      setProject(item.value);
                      setLabourContractorProgress(0);
                      dispatch(getLabourContactorAction(token, item.value));
                      // setListForProgressModal(null);
                      if (item) {
                        dispatch(getBOQList(token, item.value));
                        setCurrentProjectProgress(item.value);
                        // dispatch(getContractors(project?.projectId));
                      } else {
                        dispatch(
                          getBOQList(token, projectsListSimple[0]?.projectId)
                        );

                        setCurrentProjectProgress(
                          projectsListSimple[0]?.projectId
                        );
                        // dispatch(getContractors(projectClassificationList[0]?.projectId));
                      }
                    }}
                  />
                </View>
              </View>
            </View>
            <ScrollView>
              {loading ? (
                <Text
                  style={{
                    color: Colors.Black,
                    fontFamily: "Lexend-Medium",
                    fontSize: 14,
                  }}
                >
                  Loading...
                </Text>
              ) : !boqList || boqList?.length === 0 ? (
                <Text
                  style={{
                    color: Colors.Black,
                    fontFamily: "Lexend-Medium",
                    fontSize: 14,
                  }}
                >
                  No BOQ Found!
                </Text>
              ) : (
                boqList?.map((item) => (
                  <ProgressRow
                    key={item}
                    rowItem={item}
                    // classes={classes}
                    // icon={general}
                    unitList={unitList}
                    scopeList={scopeList}
                    setRowList={setRowList}
                    rowList={rowList}
                    addProgressEntery={addProgressEntery}
                    openFieldNote={() => {
                      setOpenFieldNote(true);
                    }}
                    setOpenUpdateProgressModal={() => {
                      setOpenUpdateProgressModal(false);
                    }}
                  />
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };
  // console.log("BOQ--->>>", boqProgress);
  const renderFieldNotes = () => {
    return (
      <Modal
        isVisible={openFieldNote}
        useNativeDriver={true}
        backdropColor={Colors.DarkGray}
        backdropOpacity={0.6}
        backdropTransitionInTiming={200}
        onBackdropPress={() => setOpenFieldNote(!openFieldNote)}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: Colors.White,
            height: "90%",
            borderRadius: 10,
            padding: 15,
          }}
        >
          <ScrollView contentContainerStyle={{}}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 15,
                marginTop: 20,
                paddingBottom: 15,
              }}
            >
              <Pressable
                onPress={() => {
                  handleImagePicker();
                }}
                style={{ width: "28%" }}
              >
                {fieldPic ? (
                  <Image
                    source={{ uri: fieldPic }}
                    style={{ width: "100%", height: 82, borderRadius: 5 }}
                  />
                ) : (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      borderColor: Colors.FormBorder,
                      borderStyle: "dashed",
                      borderWidth: 1,
                      borderRadius: 5,
                      width: "100%",
                      height: 82,
                    }}
                  >
                    <Picture size={38} color={"#D1E0EE"} />
                    <Text style={styles.imgText}>Add Picture</Text>
                  </View>
                )}
              </Pressable>
              <View style={{ width: "68%" }}>
                <Text style={styles.titleNote}>Scope of work</Text>
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
                    autoScroll={false}
                    inputSearchStyle={{ color: Colors.Black }}
                    data={scopeList?.map((ele) => ({
                      label: ele?.name,
                      value: ele?.scopeOfWorkId,
                    }))}
                    maxHeight={500}
                    labelField="label"
                    valueField="value"
                    placeholder={"Select Scope"}
                    value={scopeValue}
                    onChange={(item) => {
                      setScopeValue(item.value);
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
              <Text style={styles.titleNote}>Description</Text>
              <TextInput
                style={{
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
                }}
                onChangeText={(e) => setDescription(e)}
                value={description}
                placeholderTextColor={Colors.FormText}
                placeholder="Enter Description"
              />
            </View>
            <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
              <Text style={styles.titleNote}>Select Contractor</Text>
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
                    labourContractorList?.length
                      ? labourContractorList?.map((ele) => ({
                          label: ele?.fullName,
                          value: ele?.userId,
                        }))
                      : []
                  }
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={"Select Contractor"}
                  value={contractorValue}
                  onChange={(item) => {
                    setContractorValue(item.value);
                  }}
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
                  data={projectsListSimple.map((ele) => ({
                    label: ele.name,
                    value: ele.projectId,
                  }))}
                  autoScroll={false}
                  search
                  searchPlaceholder="Search project"
                  inputSearchStyle={{ color: Colors.Black }}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={"Select Project"}
                  value={selectedProjectNote}
                  onChange={(item) => {
                    setSelectedProjectNote(item.value);
                    // dispatch(getLabourContactorAction(token, item.value));
                  }}
                />
              </View>
            </View>
            <View style={{ paddingHorizontal: 15, paddingBottom: 15 }}>
              <Text style={styles.titleNote}>Location</Text>
              <TextInput
                style={{
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
                }}
                onChangeText={(e) => setLocation(e)}
                value={location}
                placeholderTextColor={Colors.FormText}
                placeholder="Enter Location"
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
                    onPressIn={() => setOpen(true)}
                    placeholderTextColor={Colors.FormText}
                    placeholder="mm/dd/yyyy"
                    value={
                      date ? moment(date).format("MM/DD/YYYY") : "mm/dd/yyyy"
                    }
                    // onChangeText={(text) => setJobDate(text)}
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
                    onPressIn={() => setOpenTime(true)}
                    placeholderTextColor={Colors.FormText}
                    placeholder="----"
                    value={time ? moment(time).format("hh:mm A") : "----"}
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
            <TouchableOpacity
              style={[styles.button, { width: "60%" }]}
              onPress={() => {
                submitHandler();
                // console.log('CLICK')
              }}
            >
              <Text style={styles.buttonText}>
                {selectedNote ? "Update Note" : "Create Note"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { width: "35%", backgroundColor: Colors.Secondary },
              ]}
              onPress={() => {
                setOpenFieldNote(false);
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <View style={styles.graph}>
        <Pressable
          onPress={() => {
            setOpenMainProject(true);
          }}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#F7F8F9",
              borderRadius: 50,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Building size={20} color={Colors.LightGray} />
          </View>
          <View>
            <Text style={[styles.selectText, { paddingLeft: 7 }]}>
              Select a Project
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontFamily: "Lexend-Regular",
                color: Colors.Black,
                paddingLeft: 7,
              }}
            >
              {currentProjectDetail
                ? currentProjectDetail?.name
                : "Select a Project"}
            </Text>
          </View>
        </Pressable>
        <View style={{ flexDirection: "row" }}>
          <Pressable
            onPress={() => {
              setOpenFilterModal(true);
            }}
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 3,
              paddingHorizontal: 9,
              paddingVertical: 7,
            }}
          >
            <Text style={styles.smallButton}>Insert BoQ's</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setOpenUpdateProgressModal(true);
            }}
            style={{
              backgroundColor: "#ECE5FC",
              padding: 5,
              margin: 5,
              borderRadius: 3,
              paddingHorizontal: 9,
              paddingVertical: 7,
            }}
          >
            <Text style={styles.smallButton}>Update Progress</Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{ width: "93%", flexDirection: "row", alignItems: "center" }}
      >
        <View style={{ width: "25%" }}>
          <Image
            source={{
              uri: currentProjectDetail?.url
                ? assetsUrl + currentProjectDetail?.url
                : "https://sandbox.bettamint.com/static/media/dummyProjectImageForProductivity.0c507095.png",
            }}
            style={{ width: 80, height: 80, borderRadius: 20 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "65%",
          }}
        >
          <View style={{ width: "50%" }}>
            <Text
              style={{
                fontFamily: "Lexend-Bold",
                fontSize: 15,
                color: Colors.White,
              }}
            >
              {currentProjectDetail?.name || "N/A"}
            </Text>
            <Text
              style={{
                fontFamily: "Lexend-Regular",
                fontSize: 12,
                color: Colors.White,
              }}
            >
              {currentProjectDetail?.projectTypeId || "N/A"}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "Lexend-Bold",
                fontSize: 24,
                color: Colors.White,
                textAlign: "center",
              }}
            >
              {isNaN(
                (boqProgress?.result?.completedMeasurement /
                  boqProgress?.result?.totalMeasurement) *
                  100
              )
                ? 0
                : `${(
                    (boqProgress?.result?.completedMeasurement /
                      boqProgress?.result?.totalMeasurement) *
                    100
                  ).toFixed(0)}%`}
            </Text>
            <Text
              style={{
                fontFamily: "Lexend-Regular",
                fontSize: 10,
                color: Colors.White,
                textAlign: "center",
              }}
            >
              Work Done
            </Text>
          </View>
        </View>
      </View>
      <View style={{ width: "90%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              fontSize: 12,
              color: Colors.White,
            }}
          >
            0%
          </Text>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              fontSize: 12,
              color: Colors.White,
            }}
          >
            100%
          </Text>
        </View>
        <Pressable
          onPress={() => {
            setPurpleTooltip(false);
            setGreenTooltip(false);
          }}
          style={{
            width: "100%",
            height: 40,
            backgroundColor: Colors.White,
            borderRadius: 25,
            elevation: 5,
            marginVertical: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}
        >
          <Pressable
            onPress={() => {
              setPurpleTooltip(!purpleTooltip);
              setGreenTooltip(false);
            }}
            style={{
              width: boqProgress?.result?.completedMeasurement
                ? (boqProgress?.result?.completedMeasurement /
                    boqProgress?.result?.totalMeasurement) *
                    100 +
                  "%"
                : 0,
              height: 33,
              backgroundColor: Colors.Purple,
              position: "absolute",
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
              left: 5,
            }}
          ></Pressable>
          <Pressable
            onPress={() => {
              setGreenTooltip(!greenTooltip);
              setPurpleTooltip(false);
            }}
            style={{
              width: boqProgress?.result?.todaysMeasurement
                ? (boqProgress?.result?.todaysMeasurement /
                    boqProgress?.result?.totalMeasurement) *
                    100 +
                  "%"
                : 0,
              height: 25,
              position: "absolute",
              backgroundColor: Colors.PrimaryLight,
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
              left: 7,
            }}
          ></Pressable>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              fontSize: 12,
              color: Colors.Black,
            }}
          >
            {boqProgress?.result?.totalMeasurement ? "0" : "-"}
          </Text>
          <Text
            style={{
              fontFamily: "Lexend-Medium",
              fontSize: 12,
              color: Colors.Black,
            }}
          >
            {boqProgress?.result?.totalMeasurement
              ? boqProgress?.result?.totalMeasurement
              : "-"}
          </Text>
        </Pressable>
        {purpleTooltip && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 70,
              left: 50,
            }}
          >
            <View
              style={{
                width: 90,
                height: 40,
                backgroundColor: Colors.PurpleOpacity,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.Black,
                  fontFamily: "Lexend-SemiBold",
                  fontSize: 10,
                }}
              >{`${
                (
                  (boqProgress?.result?.completedMeasurement /
                    boqProgress?.result?.totalMeasurement) *
                  100
                ).toFixed(0) + "%"
              } | ${boqProgress?.result?.completedMeasurement}`}</Text>
              <Text
                style={{
                  color: Colors.Black,
                  fontFamily: "Lexend-Regular",
                  fontSize: 9,
                }}
              >
                Total Work Done
              </Text>
            </View>
            <View
              style={{
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderLeftWidth: 10,
                borderRightWidth: 10,
                borderBottomWidth: 0,
                borderTopWidth: 15,
                borderTopColor: Colors.PurpleOpacity,
                alignItems: "center",
                justifyContent: "center",
              }}
            ></View>
          </View>
        )}
        {greenTooltip && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: 70,
              left: 10,
            }}
          >
            <View
              style={{
                width: 90,
                height: 40,
                backgroundColor: Colors.PrimaryLight,
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.Black,
                  fontFamily: "Lexend-SemiBold",
                  fontSize: 10,
                }}
              >{`${
                (
                  (boqProgress?.result?.todaysMeasurement /
                    boqProgress?.result?.totalMeasurement) *
                  100
                ).toFixed(0) + "%"
              } | ${boqProgress?.result?.todaysMeasurement}`}</Text>
              <Text
                style={{
                  color: Colors.Black,
                  fontFamily: "Lexend-Regular",
                  fontSize: 9,
                }}
              >
                Today's Update
              </Text>
            </View>
            <View
              style={{
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                borderStyle: "solid",
                borderLeftWidth: 10,
                borderRightWidth: 10,
                borderBottomWidth: 0,
                borderTopWidth: 15,
                borderTopColor: Colors.PrimaryLight,
                alignItems: "center",
                justifyContent: "center",
              }}
            ></View>
          </View>
        )}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              color: Colors.Black,
              fontSize: 12,
              fontFamily: "Lexend-Medium",
            }}
          >
            {boqProgress?.result?.startDate
              ? moment(boqProgress?.result?.startDate).format("DD MMM YYYY")
              : ""}
          </Text>
          <Text
            style={{
              color: Colors.Black,
              fontSize: 12,
              fontFamily: "Lexend-Medium",
            }}
          >
            {boqProgress?.result?.endDate
              ? moment(boqProgress?.result?.endDate).format("DD MMM YYYY")
              : ""}
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", flex: 1 }}>
        <ScrollView contentContainerStyle={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
            }}
          >
            <View style={styles.tiles}>
              <View>
                <Text style={styles.tileHeading}>{"Quality Issues Cost"}</Text>
                <Text
                  style={{
                    color: Colors.Black,
                    fontFamily: "Lexend-Medium",
                    fontSize: 16,
                  }}
                >
                  ₹ {metrics?.qualityCost || 0}
                </Text>
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: Colors.Primary,
                    width: 35,
                    height: 35,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HomeIcon size={20} color={Colors.White} />
                </View>
              </View>
            </View>
            <View style={styles.tiles}>
              <View>
                <Text style={styles.tileHeading}>
                  {"Material Defects Cost"}
                </Text>
                <Text
                  style={{
                    color: Colors.Black,
                    fontFamily: "Lexend-Medium",
                    fontSize: 16,
                  }}
                >
                  ₹ {metrics?.defectsCost || 0}
                </Text>
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: Colors.Primary,
                    width: 35,
                    height: 35,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HatIcon size={20} color={Colors.White} />
                </View>
              </View>
            </View>
            <View style={styles.tiles}>
              <View>
                <Text style={styles.tileHeading}>{"Variation Cost"}</Text>
                <Text
                  style={{
                    color: Colors.Black,
                    fontFamily: "Lexend-Medium",
                    fontSize: 16,
                  }}
                >
                  ₹ {metrics?.excessCost || 0}
                </Text>
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: Colors.Primary,
                    width: 35,
                    height: 35,
                    borderRadius: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ChatIcon size={20} color={Colors.White} />
                </View>
              </View>
            </View>
          </View>
          <View style={styles.scrollGraph}>
            <View style={styles.graphsHeader}>
              <Text style={styles.graphHeadingText}>Project Progress</Text>
              <View style={styles.graphSubHeader}>
                <View style={styles.selectProjectButton}>
                  <View style={styles.buildingIconBg}>
                    <Building size={15} color={Colors.LightGray} />
                  </View>
                  <View>
                    <Text style={styles.selectText}>Select a Project</Text>
                    <Dropdown
                      style={{
                        height: 20,
                        marginTop: 3,
                        width: 200,
                        ...styles.selectText,
                      }}
                      placeholderStyle={{
                        fontSize: 10,
                        fontFamily: "Lexend-Regular",
                        color: Colors.Black,
                      }}
                      selectedTextStyle={{
                        fontSize: 10,
                        fontFamily: "Lexend-Regular",
                        color: Colors.Black,
                      }}
                      containerStyle={{ width: 250 }}
                      itemTextStyle={{
                        fontFamily: "Lexend-Regular",
                        fontSize: 13,
                        color: Colors.FormText,
                      }}
                      iconStyle={styles.iconStyle}
                      data={projectsListSimple?.map((ele) => ({
                        label: ele?.name,
                        value: ele?.projectId,
                        ...ele,
                      }))}
                      maxHeight={400}
                      labelField="label"
                      valueField="value"
                      placeholder={"Project"}
                      value={currentProjectProgressGraph}
                      onChange={(item) => {
                        if (item) {
                          setCurrentProjectProgressGraph(item.value);
                          dispatch(getProjectProgressGraph(token, item.value));
                        } else {
                          setCurrentProjectProgressGraph(
                            projectsListSimple[0]?.projectId
                          );
                          dispatch(
                            getProjectProgressGraph(
                              token,
                              projectsListSimple[0]?.projectId
                            )
                          );
                        }
                      }}
                    />
                  </View>
                </View>
                {/* <Pressable
                  onPress={() => {
                    // setOpen(true);
                    // setSelectedGraph("Attendance");
                  }}
                  style={styles.selectDateButton}
                >
                  <View style={styles.buildingIconBg}>
                    <DateIcon size={15} color={Colors.LightGray} />
                  </View>
                  <View>
                    <Text style={styles.selectText}>Select Date</Text>
                    <Text
                      style={[
                        styles.selectText,
                        {
                          fontFamily: "Lexend-SemiBold",
                          color: Colors.Black,
                        },
                      ]}
                    >
                      {"MM/DD/YYYY"}
                    </Text>
                  </View>
                </Pressable> */}
              </View>
            </View>
            {/* <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <DotIcon color={Colors.Primary} size={40} />
              <Text style={styles.attendanceSubText}>Present</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <DotIcon color={Colors.Purple} size={40} />
              <Text style={styles.attendanceSubText}>Absent</Text>
            </View>
          </View> */}
            <View style={styles.barChart}>
              <BarChart
                data={projectProgressGraphsData()}
                barWidth={10}
                spacing={30}
                roundedTop
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisTextStyle={{ color: "gray" }}
                xAxisTextStyle={{ color: "gray" }}
                noOfSections={5}
                maxValue={getProjectProgressMaxValue()}
                frontColor={Colors.Black}
                height={180}
                width={260}
              />
            </View>
          </View>
          <View style={styles.scrollGraph}>
            <View style={styles.graphsHeader}>
              <Text style={styles.graphHeadingText}>Financial Progress</Text>
              <View style={styles.graphSubHeader}>
                <View style={styles.selectProjectButton}>
                  <View style={styles.buildingIconBg}>
                    <Building size={15} color={Colors.LightGray} />
                  </View>
                  <View>
                    <Text style={styles.selectText}>Select a Project</Text>
                    <Dropdown
                      style={{
                        height: 20,
                        marginTop: 3,
                        width: 200,
                        ...styles.selectText,
                      }}
                      placeholderStyle={{
                        fontSize: 10,
                        fontFamily: "Lexend-Regular",
                        color: Colors.Black,
                      }}
                      selectedTextStyle={{
                        fontSize: 10,
                        fontFamily: "Lexend-Regular",
                        color: Colors.Black,
                      }}
                      containerStyle={{ width: 250 }}
                      itemTextStyle={{
                        fontFamily: "Lexend-Regular",
                        fontSize: 13,
                        color: Colors.FormText,
                      }}
                      iconStyle={styles.iconStyle}
                      data={projectsListSimple?.map((ele) => ({
                        label: ele?.name,
                        value: ele?.projectId,
                        ...ele,
                      }))}
                      maxHeight={400}
                      labelField="label"
                      valueField="value"
                      placeholder={"Project"}
                      value={currentProjectFinancial}
                      onChange={(item) => {
                        if (item) {
                          setCurrentProjectFinancial(item);
                          dispatch(
                            getFinancialProgressData(token, item?.value)
                          );
                        } else {
                          setCurrentProjectFinancial(
                            projectsListSimple[0]?.projectId
                          );
                          dispatch(
                            getFinancialProgressData(
                              token,
                              projectsListSimple[0]?.projectId
                            )
                          );
                        }
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              nestedScrollEnabled={true}
              contentContainerStyle={[
                styles.barChart,
                {
                  paddingBottom: 60,
                  marginTop: 40,
                  width: 560,
                },
              ]}
            >
              <BarChart
                height={180}
                barWidth={20}
                xAxisLabelTextStyle={{ color: "gray" }}
                yAxisTextStyle={{ color: "gray" }}
                frontColor={Colors.Black}
                noOfSections={4}
                maxValue={2000}
                stackData={getFinancialProgressGraphData()}
                renderTooltip={(e) => {
                  // console.log("TOOLTIP", e);
                  return (
                    <View>
                      {e.stacks.map((item) => (
                        <Text
                          style={{
                            color: Colors.Black,
                            fontFamily: "Lexend-Regular",
                            fontSize: 12,
                            marginVertical: 5,
                            marginLeft: 10,
                          }}
                        >
                          {item.value}
                        </Text>
                      ))}
                    </View>
                  );
                }}
                // stackData={[
                //   {
                //     stacks: [
                //       { value: 10, color: "orange" },
                //       { value: 20, color: "#4ABFF4", marginBottom: 2 },
                //     ],
                //     label: "Jan",
                //   },
                //   {
                //     stacks: [
                //       { value: 10, color: "#4ABFF4" },
                //       { value: 11, color: "orange", marginBottom: 2 },
                //       { value: 15, color: "#28B2B3", marginBottom: 2 },
                //     ],
                //     label: "Mar",
                //   },
                //   {
                //     stacks: [
                //       { value: 14, color: "orange" },
                //       { value: 18, color: "#4ABFF4", marginBottom: 2 },
                //     ],
                //     label: "Feb",
                //   },
                // ]}
                width={800}
              />
            </ScrollView>
          </View>
          <View style={styles.scrollGraph}>
            <View style={styles.graphsHeader}>
              <Text style={styles.graphHeadingText}>
                Budgeted VS Actual Cost
              </Text>
              <View style={styles.graphSubHeader}>
                <View style={styles.selectProjectButton}>
                  <View style={styles.buildingIconBg}>
                    <Building size={15} color={Colors.LightGray} />
                  </View>
                  <View>
                    <Text style={styles.selectText}>Select a Project</Text>
                    <Dropdown
                      style={{
                        height: 20,
                        marginTop: 3,
                        width: 200,
                        ...styles.selectText,
                      }}
                      placeholderStyle={{
                        fontSize: 10,
                        fontFamily: "Lexend-Regular",
                        color: Colors.Black,
                      }}
                      selectedTextStyle={{
                        fontSize: 10,
                        fontFamily: "Lexend-Regular",
                        color: Colors.Black,
                      }}
                      containerStyle={{ width: 250 }}
                      itemTextStyle={{
                        fontFamily: "Lexend-Regular",
                        fontSize: 13,
                        color: Colors.FormText,
                      }}
                      iconStyle={styles.iconStyle}
                      data={projectsListSimple?.map((ele) => ({
                        label: ele?.name,
                        value: ele?.projectId,
                        ...ele,
                      }))}
                      maxHeight={400}
                      labelField="label"
                      valueField="value"
                      placeholder={"Project"}
                      value={currentProjectBudget}
                      onChange={(item) => {
                        if (item) {
                          setCurrentProjectBudget(item);
                          dispatch(getProjectBudget(token, item?.value));
                        } else {
                          setCurrentProjectBudget(
                            projectsListSimple[0]?.projectId
                          );
                          dispatch(
                            getProjectBudget(
                              token,
                              projectsListSimple[0]?.projectId
                            )
                          );
                        }
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <DotIcon color={Colors.Primary} size={40} />
                <Text style={styles.attendanceSubText}>Budget Cost</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <DotIcon color={Colors.Purple} size={40} />
                <Text style={styles.attendanceSubText}>Actual Cost</Text>
              </View>
            </View>
            <View style={styles.barChart}>
              <BarChart
                data={budgetGraphsData()}
                barWidth={6}
                spacing={30}
                roundedTop
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisTextStyle={{ color: "gray" }}
                xAxisTextStyle={{ color: "gray" }}
                noOfSections={5}
                maxValue={getBudgetMaxValue()}
                frontColor={Colors.Black}
                height={180}
                renderTooltip={(e) => {
                  return (
                    <View>
                      <Text
                        style={{
                          color: Colors.Black,
                          fontFamily: "Lexend-Regular",
                          fontSize: 12,
                        }}
                      >
                        {e.value}
                      </Text>
                    </View>
                  );
                }}
                width={260}
              />
            </View>
          </View>
          <DatePicker
            modal
            mode="date"
            textColor={textColor}
            open={open}
            date={date}
            onConfirm={(date) => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <DatePicker
            modal
            mode="time"
            textColor={textColor}
            open={openTime}
            date={date}
            onConfirm={(date) => {
              setOpenTime(false);
              setTime(date);
            }}
            onCancel={() => {
              setOpenTime(false);
            }}
          />
        </ScrollView>
      </View>
      {renderFilterModal()}
      {renderUpdateProgressModal()}
      {renderFieldNotes()}
      {renderProjectSelectModal()}
      {renderContractorSelectModal()}
      {renderMainProjectSelectModal()}
      {/* {renderSearchModal()} */}
      {/* {renderActionModal()} */}
      {/* {renderAssignContractorModal()} */}
    </View>
  );
};

export default Productivity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    alignItems: "center",
  },
  header: {
    backgroundColor: Colors.Primary,
    height: "29%",
    width: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.White,
    opacity: 0.9,
    marginTop: -190,
    padding: 10,
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
    paddingHorizontal: 5,
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
  title: {
    fontFamily: "Lexend-Bold",
    fontSize: 16,
    color: Colors.Black,
  },
  num: {
    fontFamily: "Lexend-Medium",
    fontSize: 12,
    color: Colors.LightGray,
  },
  stat: {
    fontFamily: "Lexend-Medium",
    fontSize: 6,
    textAlign: "right",
    color: Colors.LightGray,
  },

  selectText: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.Gray,
    paddingLeft: 10,
  },
  smallButton: {
    fontFamily: "Lexend-SemiBold",
    fontSize: 8,
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
  tiles: {
    padding: 15,
    marginVertical: 6,
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
    // width: 340,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tileHeading: {
    fontFamily: "Lexend-Medium",
    color: Colors.LightGray,
    fontSize: 12,
  },
  insertProject: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  smallBuildingIcon: {
    backgroundColor: "#F7F8F9",
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  selectProjectInsert: {
    fontFamily: "Lexend-Regular",
    color: Colors.LightGray,
    fontSize: 10,
  },
  imgText: {
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
  scrollGraph: {
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
    width: "93%",
    paddingBottom: 10,
    alignItems: "center",
    flex: 1,
  },
  graphsHeader: {
    width: "100%",
    marginTop: 15,
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  graphHeadingText: {
    fontFamily: "Lexend-SemiBold",
    fontSize: 16,
    color: Colors.LightGray,
  },
  graphSubHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectProjectButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 25,
  },
  buildingIconBg: {
    backgroundColor: "#F7F8F9",
    borderRadius: 25,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  selectDateButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  attendanceSubText: {
    fontSize: 13,
    fontFamily: "Lexend-Regular",
    color: Colors.Black,
  },
  barChart: {
    // flex: 1,
    width: "70%",
    // paddingHorizontal: 10,
    marginTop: 10,
    alignItems: "center",
    // padding: 0
    paddingBottom: 10,
  },
});
