import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
  ScrollView,
  TextInput,
  ActivityIndicator
} from "react-native";
import { Item, Picker, Textarea, Form } from "native-base";
import PagerView from "react-native-pager-view";
import FormInput from "../../components/FormInput";
import { validationService } from "../../util/validation";
import { editProfile } from "../../api/auth";
import firebase from "firebase";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authInputs: {
        username: {
          type: "genericRequired",
          value: "",
        },
        email: {
          type: "email",
          value: "",
        },
        phone: {
          type: "phone",
          value: ""
        },
        emergencyContact1: {
          type: "emergencyContact",
          value: "",
        },
        emergencyContact2: {
          type: "emergencyContact",
          value: "",
        },
        height: {
          type: "genericRequired",
          value: "",
        },
        weight: {
          type: "genericRequired",
          value: "",
        },
      },
      status: "",
      chronic: "",
      healthDesc: "",
      respiratory: "",
      allergies: "",
      password: this.props.route.params.password,
      validForm: true,
      loading: false,
      token: this.props.route.params.token,
      waiting: true
    };

    this.pagerRef = React.createRef();
    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
  }

  componentDidMount() {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .database()
          .ref("users/" + user.uid)
          .once("value")
          .then((snapshot) => {
            const {
              username,
              email,
              phoneNumber,
              emergency_contact_1,
              emergency_contact_2,
              medicalInfo
            } = snapshot.val();
            this.setState({
              waiting: false,
              authInputs: {
                username: {
                  value: username,
                },
                email: {
                  value: email,
                },
                phone: {
                  value: phoneNumber,
                },
                emergencyContact1: {
                  value: emergency_contact_1,
                },
                emergencyContact2: {
                  value: emergency_contact_2,
                },
                height: {
                  value: medicalInfo.height
                },
                weight: {
                  value: medicalInfo.weight
                }
              },
              status: medicalInfo.healthStatus,
              chronic: medicalInfo.chronicDisease,
              healthDesc: medicalInfo.healthDesc,
              respiratory: medicalInfo.respiratory,
              allergies: medicalInfo.allergies,
            });
          });
      }
    });
  }

  render() {
    const { 
      authInputs, 
      password, 
      token, 
      status,
      chronic,
      healthDesc,
      respiratory,
      allergies, } = this.state;

    const medInfo = {
      height: authInputs.height.value,
      weight: authInputs.weight.value,
      healthStatus: status,
      chronicDisease: chronic,
      healthDesc: healthDesc,
      respiratory: respiratory,
      allergies: allergies,
    };

    const handlePress = (pageNumber) => {
      Keyboard.dismiss();
      this.pagerRef.current.setPage(pageNumber);
      // this.resetUserInputs()
    };

    const handleDone = () => {
      this.getFormValidation({ obj: "authInputs" });
      if (this.state.validForm) {
        Keyboard.dismiss();
        // this.resetUserInputs();
        console.log(token);
        const userData = {
          username: authInputs.username.value,
          email: authInputs.email.value,
          phone: authInputs.phone.value,
          emergencyContact1: authInputs.emergencyContact1.value,
          emergencyContact2: authInputs.emergencyContact2.value,
          password: password,
          medInfo: medInfo,
          token: token,
        };
        console.log(userData);
        editProfile(userData);
      }
    };

    //const { first_name, last_name, email } = this.props.route.params

    if(this.state.waiting){
      return(
        <View style={{backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#32527B" />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <PagerView initialPage={0} ref={this.pagerRef} style={styles.pagerView}>
          <View key={1}>
            <View style={styles.topSection}>
              <Image
                source={require("../../assets/images/bgShape.png")}
                style={{
                  justifyContent: "flex-start",
                  width: 215,
                  height: 165,
                }}
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.header}>User Details</Text>
              <View style={{ marginHorizontal: 6 }}>
                <FormInput
                  textColor="#000"
                  borderColor="#000"
                  placeholder="Username"
                  activeBorderColor="#000"
                  error={this.renderError(
                    "authInputs",
                    "username",
                    "username"
                  )}
                  returnKeyType={"next"}
                  value={authInputs.username.value}
                  onChangeText={(value) => {
                    this.onInputChange({
                      field: "username",
                      value,
                      obj: "authInputs",
                    });
                  }}
                />
                <FormInput
                  textColor="#000"
                  borderColor="#000"
                  placeholder="E-mail"
                  activeBorderColor="#000"
                  error={this.renderError("authInputs", "email", "email")}
                  returnKeyType={"next"}
                  value={authInputs.email.value}
                  onChangeText={(value) => {
                    this.onInputChange({
                      field: "email",
                      value,
                      obj: "authInputs",
                    });
                  }}
                />
                <FormInput
                  textColor="#000"
                  borderColor="#000"
                  placeholder="Phone number"
                  activeBorderColor="#000"
                  error={this.renderError("authInputs", "phone", "phone")}
                  returnKeyType={"next"}
                  value={authInputs.phone.value}
                  onChangeText={(value) => {
                    this.onInputChange({
                      field: "phone",
                      value,
                      obj: "authInputs",
                    });
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.btn,
                      { borderWidth: 1, borderColor: "#32527B" },
                    ]}
                    onPress={() => this.props.navigation.goBack()}
                  >
                    <Text style={[styles.btnText, { color: "#32527B" }]}>
                      back
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#32527B" }]}
                    onPress={() => handlePress(1)}
                  >
                    <Text style={[styles.btnText, { color: "#FFFFFF" }]}>
                      Save & continue
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View key={2}>
            <View style={styles.topSection}>
              <Image
                source={require("../../assets/images/bgShape.png")}
                style={{
                  justifyContent: "flex-start",
                  width: 215,
                  height: 165,
                }}
              />
            </View>
            <View style={styles.footer}>
              <Text style={styles.header}>Add Emergency Contacts</Text>
              <View style={{ marginHorizontal: 6 }}>
                <FormInput
                  textColor="#000"
                  borderColor="#000"
                  placeholder="Emergency Contact no.1"
                  activeBorderColor="#000"
                  error={this.renderError(
                    "authInputs",
                    "emergencyContact1",
                    "emergency contact 1"
                  )}
                  returnKeyType={"next"}
                  value={authInputs.emergencyContact1.value}
                  onChangeText={(value) => {
                    this.onInputChange({
                      field: "emergencyContact1",
                      value,
                      obj: "authInputs",
                    });
                  }}
                />
                <FormInput
                  textColor="#000"
                  borderColor="#000"
                  placeholder="Emergency Contact no.2"
                  activeBorderColor="#000"
                  error={this.renderError(
                    "authInputs",
                    "emergencyContact1",
                    "emergency contact 1"
                  )}
                  returnKeyType={"next"}
                  value={authInputs.emergencyContact2.value}
                  onChangeText={(value) => {
                    this.onInputChange({
                      field: "emergencyContact2",
                      value,
                      obj: "authInputs",
                    });
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                      style={[
                        styles.btn,
                        { borderWidth: 1, borderColor: "#32527B" },
                      ]}
                      onPress={() => handlePress(0)}
                    >
                      <Text style={[styles.btnText, { color: "#32527B" }]}>
                        back
                      </Text>
                    </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, { backgroundColor: "#32527B" }]}
                    onPress={() => handlePress(2)}
                  >
                    <Text style={[styles.btnText, { color: "#FFFFFF" }]}>
                      Save & continue
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View key={3}>
            <View style={styles.topSection}>
              <Image
                source={require("../../assets/images/bgShape.png")}
                style={{
                  justifyContent: "flex-start",
                  width: 215,
                  height: 165,
                }}
              />
            </View>
            <View style={styles.footer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Medical Information</Text>

                <View style={{ marginHorizontal: 2 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 4,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <TextInput
                        textColor="#000"
                        borderColor="#000"
                        placeholder="Height"
                        activeBorderColor="#000"
                        returnKeyType={"next"}
                        value={authInputs.height.value}
                        style={{
                          width: "47%",
                          backgroundColor: "#F2F2F2",
                          height: 39,
                          borderRadius: 20,
                          padding: 8,
                        }}
                        onChangeText={(value) => {
                          this.onInputChange({
                            field: "height",
                            value,
                            obj: "authInputs",
                          });
                        }}
                      />
                      <Text
                        style={{
                          textAlign: "center",
                          alignSelf: "center",
                        }}
                      >
                        cm
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <TextInput
                        textColor="#000"
                        borderColor="#000"
                        placeholder="Weight"
                        activeBorderColor="#000"
                        returnKeyType={"next"}
                        style={{
                          width: "47%",
                          backgroundColor: "#F2F2F2",
                          height: 39,
                          borderRadius: 20,
                          padding: 8,
                        }}
                        value={authInputs.weight.value}
                        onChangeText={(value) => {
                          this.onInputChange({
                            field: "weight",
                            value,
                            obj: "authInputs",
                          });
                        }}
                      />
                      <Text
                        style={{
                          textAlign: "center",
                          alignSelf: "center",
                        }}
                      >
                        kg
                      </Text>
                    </View>
                  </View>

                  <View style={{ width: "100%", marginTop: 5 }}>
                    <Form>
                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          marginTop: 4,
                          fontSize: 14,
                        }}
                      >
                        Rate you health status?
                      </Text>
                      <Item picker>
                        <Picker
                          mode="dropdown"
                          style={{ width: 250, fontWeight: "bold" }}
                          placeholderStyle={{ color: "#bfc6ea" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.status}
                          onValueChange={(itemValue) => {
                            this.setState({ status: itemValue });
                          }}
                        >
                          <Picker.Item label="Select an option" value="" />
                          <Picker.Item label="Bad" value="Bad" />
                          <Picker.Item label="Good" value="Good" />
                          <Picker.Item
                            label="Very Good"
                            value="Very Good"
                          />
                          <Picker.Item label="Awesome" value="Awesome" />
                        </Picker>
                      </Item>

                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          marginTop: 4,
                          fontSize: 14,
                        }}
                      >
                        Chronic Medical Condition
                      </Text>
                      <Item picker>
                        <Picker
                          mode="dropdown"
                          style={{ width: 250, fontWeight: "bold" }}
                          placeholderIconColor="#007aff"
                          selectedValue={this.state.chronic}
                          onValueChange={(itemValue) => {
                            this.setState({ chronic: itemValue });
                          }}
                        >
                          <Picker.Item label="Select an option" value="" />
                          <Picker.Item label="None" value="None" />
                          <Picker.Item label="Epilesy" value="Epilesy" />
                          <Picker.Item
                            label="Diabetes"
                            value="Diabetes"
                          />
                          <Picker.Item
                            label="Heart Disease"
                            value="Heart Disease"
                          />
                          <Picker.Item label="Cancer" value="Cancer" />
                          <Picker.Item label="Stroke" value="Stroke" />
                          <Picker.Item
                            label="Kidney Disease"
                            value="Kidney Disease"
                          />
                          <Picker.Item
                            label="Alzheimer's"
                            value="Alzheimer's"
                          />
                        </Picker>
                      </Item>

                      <Text
                        style={{
                          fontFamily: "Poppins-Regular",
                          marginTop: 4,
                          fontSize: 14,
                          marginTop: 12,
                          marginBottom: 10,
                        }}
                      >
                        Briefly describe your health condition ?
                      </Text>

                      <Textarea
                        rowSpan={4}
                        bordered
                        placeholder="description should be brief..."
                        value={this.state.healthDesc}
                        onChangeText={(itemValue) => {
                          this.setState({ healthDesc: itemValue });
                        }}
                      />
                    </Form>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      marginBottom: 10,
                      justifyContent: "space-around",
                    }}
                  >
                    <TouchableOpacity
                      style={[
                        styles.btn,
                        { borderWidth: 1, borderColor: "#32527B" },
                      ]}
                      onPress={() => handlePress(1)}
                    >
                      <Text
                        style={[styles.btnText, { color: "#32527B" }]}
                      >
                        Back
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.btn, { backgroundColor: "#32527B" }]}
                      onPress={handleDone}
                    >
                      <Text
                        style={[styles.btnText, { color: "#FFFFFF" }]}
                      >
                        Save changes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </PagerView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#32527B",
  },
  topSection: {
    flex: 1.2,
  },
  header: {
    fontSize: 25,
    color: "#32527B",
    fontWeight: "500",
    marginVertical: 5,
    fontFamily: "Poppins-Regular",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 25,
    flex: 2.9,
  },
  btn: {
    padding: 10,
    width: "45%",
    borderRadius: 20,
    marginTop: 15,
  },
  btnText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },
  pagerView: {
    flex: 1,
    margin: 0,
  },
});
