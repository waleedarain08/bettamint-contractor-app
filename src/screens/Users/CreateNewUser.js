import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  LogBox,
  ToastAndroid,
} from "react-native";
import { TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Colors } from "../../utils/Colors";
import { User, Email } from "../../icons";
import Spacer from "../../components/Spacer";
import CheckBox from "@react-native-community/checkbox";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import { useGeneralContext } from "../../context/generalContext";
import { useUser } from "../../context/userContext";
LogBox.ignoreAllLogs();

const CreateNewUser = ({ navigation, route }) => {
  const { projects } = useGeneralContext();
  const { loading, roles, featuresList, userRights, createRole, createUser } =
    useUser();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUseRole] = useState(null);
  const [project, setProject] = useState([]);
  const [activeRolesAndRights, setActiveRolesAndRights] = useState({});
  const [roleName, setRoleName] = useState("");
  const [errors, setErrors] = useState(false);

  const handleSubmit = async () => {
    if (!roleName) {
      setErrors(true);
      return;
    }

    console.log("this is called");
    const featureListArray = [];
    featuresList.forEach((feature) => {
      const featureExtensible = JSON.parse(JSON.stringify(feature));
      if (activeRolesAndRights[featureExtensible.featureSetId]) {
        featureExtensible.accessRightList = [];
        featureExtensible.accessRightList =
          activeRolesAndRights[featureExtensible.featureSetId];
        delete featureExtensible.name;
        delete featureExtensible.route;
        featureListArray.push(featureExtensible);
      } else {
        featureExtensible.accessRightList = [1];
        delete featureExtensible.name;
        delete featureExtensible.route;
        featureListArray.push(featureExtensible);
      }
    });

    const role = {
      name: roleName,
      roleId: 0,
      featureSets: featureListArray,
    };
    console.log("ROLE--->>>", role);
    // let resp = await dispatch(createRole(role));
  };

  function generatePassword(length) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    return password;
  }
  const groupFeaturesByParent = (features) => {
    const parentMap = {
      Project: [
        "Project Information",
        "Project Budget",
        "Project Boundary",
        "Project Linking",
      ],
      User: ["User Rights Management"],
      Billing: [
        "Contact and Contractor Management",
        "Bill Management",
        "Payout Management",
      ],
      Productivity: [
        "Measurement Management",
        "Change Management",
        "Quality Management",
        "Variation Management",
      ],
      Inventory: [
        "Material Masters",
        "Material Indenting",
        "Material Issuance",
        "Material Receiving",
      ],
      Workforce: ["Worker Onboarding", "Attendance", "Payroll", "Payments"],
      Rewards: ["Goal Setting", "Goal Approval"],
      Communication: ["In App Chat Features"],
      Reports: ["Progress Reports", "Compliance Reports"],
    };

    const groupedFeatures = new Map();

    features.forEach((feature) => {
      Object.keys(parentMap).forEach((parent) => {
        if (parentMap[parent].includes(feature.name)) {
          if (!groupedFeatures.has(parent)) {
            groupedFeatures.set(parent, [feature]);
          } else {
            groupedFeatures.get(parent).push(feature);
          }
        }
      });
    });

    return groupedFeatures;
  };

  const groupedFeatures = groupFeaturesByParent(featuresList);

  const handleCheckbox = (featureSetId, accessRightId, value) => {
    setActiveRolesAndRights((prev) => {
      const deepCopy = { ...prev };
      deepCopy[featureSetId] = [accessRightId];
      return deepCopy;
    });
  };

  const renderUserRights = () => {
    return (
      <View style={styles.tableRow}>
        <View
          style={{
            width: "20%",
          }}
        >
          <Text style={styles.tableHeader}>Module</Text>
        </View>
        <View
          style={{
            width: "80%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {userRights.map((right) => (
            <Text style={styles.tableHeader} key={right.accessRightId}>
              {right.name}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const renderCheckbox = (featureSetId, accessRightId) => {
    const featureSetAccess = activeRolesAndRights[featureSetId] || [1];
    return (
      <CheckBox
        value={featureSetAccess[0] === accessRightId}
        onValueChange={(value) =>
          handleCheckbox(featureSetId, accessRightId, value)
        }
        disabled={[4, 5].includes(accessRightId)}
        tintColors={{ true: Colors.Primary, false: Colors.FormText }}
        // style={{ borderColor: 'red', borderRadius: 4}}
      />
    );
  };

  const renderRightsOptions = (featureSetId) => {
    return userRights.map((right) => (
      <View key={right.accessRightId} style={styles.tableCell}>
        {renderCheckbox(featureSetId, right.accessRightId)}
      </View>
    ));
  };

  const renderBody = () => {
    return (
      <FlatList
        data={Array.from(groupedFeatures.entries())}
        keyExtractor={(item) => item[0]}
        renderItem={({ item: [parent, childFeatures] }) => (
          <View
            key={parent}
            style={{
              width: "100%",
            }}
          >
            {childFeatures.map((feature, index) => (
              <View key={feature.featureSetId} style={styles.tableRow}>
                <View
                  style={{
                    width: "20%",
                  }}
                >
                  <Text style={styles.tableCell}>{feature.name}</Text>
                </View>
                <View
                  style={{
                    width: "80%",
                    flexDirection: "row",
                  }}
                >
                  {renderRightsOptions(feature.featureSetId)}
                </View>
              </View>
            ))}
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      {/* <Toast /> */}
      <ScrollView style={styles.graph}>
        <View
          style={{ paddingHorizontal: 15, paddingBottom: 13, marginTop: 20 }}
        >
          <Text style={styles.title}>Full Name</Text>
          <View
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
                fontFamily: "Lexend-Medium",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter Name"
              value={fullName}
              onChangeText={(e) => setFullName(e)}
              // value="₹ 56,000"
            />
            <User color={Colors.FormBorder} size={30} />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
          <Text style={styles.title}>Email</Text>
          <View
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
                fontFamily: "Lexend-Medium",
                color: Colors.Black,
                fontSize: 12,
                width: "80%",
              }}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter Email"
              value={email}
              onChangeText={(e) => setEmail(e)}

              // value="₹ 56,000"
            />
            <Email
              color={Colors.FormBorder}
              size={20}
              style={{ paddingRight: 5 }}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
          <Text style={styles.title}>Project</Text>
          <View style={{ marginTop: 7 }}>
            <MultiSelect
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
              data={
                projects?.length
                  ? projects?.map((ele) => ({
                      label: ele?.name,
                      value: ele.projectId,
                    }))
                  : []
              }
              maxHeight={500}
              labelField="label"
              valueField="value"
              placeholder={"Select Project"}
              value={project}
              onChange={(item) => {
                setProject(item);
              }}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 15, paddingBottom: 13 }}>
          <Text style={styles.title}>User Role</Text>
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
              search
              searchPlaceholder="Search Roles"
              inputSearchStyle={{ color: Colors.Black }}
              data={
                roles?.length
                  ? roles?.map((ele) => ({
                      label: ele?.name,
                      value: ele?.roleId,
                    }))
                  : []
              }
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={"Select Role"}
              value={userRole}
              onChange={(item) => {
                setUseRole(item?.value);
              }}
            />
          </View>
        </View>
        <View style={styles.rolesContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.title}>OR Enter New Role</Text>
            <TextInput
              style={[styles.inputField]}
              placeholderTextColor={Colors.FormText}
              placeholder="Enter New Role Name Here"
              value={roleName}
              onChangeText={(text) => {
                setRoleName(text);
                setErrors(false);
              }}
            />
            {errors && <Text style={styles.errorText}>Name is required</Text>}
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              <Text style={styles.tableHeader} colSpan={7}>
                User Rights
              </Text>
            </View>
            {renderUserRights()}
            {loading && <Text>Loading...</Text>}
            {renderBody()}
          </View>
          {/* <Button title="Submit" onPress={handleSubmit} /> */}
        </View>
        <Spacer top={20} />
      </ScrollView>
      <Spacer top={-20} />
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
          onPress={async () => {
            const password = generatePassword(8);
            if (!fullName) {
              ToastAndroid.show("Please enter full name.", ToastAndroid.SHORT);
            } else if (!email) {
              ToastAndroid.show("Please enter email.", ToastAndroid.SHORT);
            } else if (project?.length === 0) {
              ToastAndroid.show("Please select project.", ToastAndroid.SHORT);
            } else if (!userRole && !roleName) {
              ToastAndroid.show("Please select role.", ToastAndroid.SHORT);
            } else {
              if (!roleName) {
                setErrors(true);
                return;
              }
              console.log("this is called");
              const featureListArray = [];
              featuresList.forEach((feature) => {
                const featureExtensible = JSON.parse(JSON.stringify(feature));
                if (activeRolesAndRights[featureExtensible.featureSetId]) {
                  featureExtensible.accessRightList = [];
                  featureExtensible.accessRightList =
                    activeRolesAndRights[featureExtensible.featureSetId];
                  delete featureExtensible.name;
                  delete featureExtensible.route;
                  featureListArray.push(featureExtensible);
                } else {
                  featureExtensible.accessRightList = [1];
                  delete featureExtensible.name;
                  delete featureExtensible.route;
                  featureListArray.push(featureExtensible);
                }
              });
              const role = {
                name: roleName,
                roleId: 0,
                featureSets: featureListArray,
              };
              // console.log("ROLE--->>>", role);
              const response = await createRole(role);

              console.log("res===>>>", response);
              setTimeout(() => {
                console.log("res===>>>", response);
                if (response?.status === 200) {
                  const user = {
                    userId: 0,
                    username: email,
                    fullName: fullName,
                    password: password,
                    emailAddress: email,
                    userTypeId: 0,
                    roleId: roles[roles.length - 1].roleId + 1,
                    projectIds: project,
                  };
                  // const response = await dispatch(createUserAction(token, user));
                  const response = createUser(user);
                  if (response?.status === 200) {
                    navigation.goBack();
                    ToastAndroid.show(
                      "User created successfully.",
                      ToastAndroid.SHORT
                    );
                  } else {
                    ToastAndroid.show(
                      "User already exists.",
                      ToastAndroid.SHORT
                    );
                  }
                }
              }, 2000);
            }
          }}
        >
          <Text style={styles.buttonText}>Create User</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { width: "35%", backgroundColor: Colors.Secondary },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CreateNewUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    width: "100%",
    // alignItems: 'center'
  },
  header: {
    backgroundColor: Colors.Primary,
    height: "15%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingHorizontal: 20,
  },
  headerLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "100%",
  },
  heading: {
    fontSize: 13,
    fontFamily: "Lexend-Medium",
    color: Colors.Black,
    textAlign: "center",
  },

  graph: {
    height: "88%",
    backgroundColor: Colors.White,
    marginTop: -80,
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
    // padding: 20,
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
    flex: 1,
    padding: 20,
    marginVertical: 8,
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
  },
  title: {
    fontFamily: "Lexend-Medium",
    fontSize: 12,
    color: Colors.FormText,
  },
  imgText: {
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    color: Colors.Primary,
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
  placeholderText: {
    flex: 1,
    fontFamily: "Lexend-Medium",
    fontSize: 11,
    textAlign: "left",
    color: Colors.LightGray,
  },
  scrollGraph: {
    height: "50%",
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
  },
  inputField: {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // fontFamily: "Lexend-Regular",
    // height: 45,
    // borderColor: "#C4C4C4",
    // borderWidth: 1,
    // borderRadius: 4,
    // marginTop: 15,
    // backgroundColor: Colors.White,
    // paddingLeft: 10,

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
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    elevation: 4,
    backgroundColor: Colors.White,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    fontFamily: "Lexend-Regular",
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
  rolesContainer: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // padding: 8,
    width: "100%",
  },
  tableHeader: {
    flex: 1,
    fontFamily: "Lexend-Medium",
    fontSize: 10,
    textAlign: "center",
    color: Colors.Black,
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontFamily: "Lexend-Regular",
    fontSize: 12,
    color: Colors.Black,
    // width: "30%",
  },
});
