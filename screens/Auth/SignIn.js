import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import FormInput from "../../components/FormInput";
import { validationService } from "../../util/validation";
import { signUserIn, facebookSignIn } from "../../api/auth";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authInputs: {
        email: {
          type: "email",
          value: "",
        },
        password: {
          type: "password",
          value: "",
        },
      },
      validForm: true,
      loading: false,
      token: "",
      // token: this.props.route.params.route,
    };

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.renderError = validationService.renderError.bind(this);
    this.signin = this.signin.bind(this);
  }

  componentDidMount() {}

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }
    // Get the token that uniquely identifies this device
    let tokenVar = await Notifications.getExpoPushTokenAsync();
    console.log("PushNotificationToken:" + tokenVar);
    this.setState({ token: tokenVar }); 
    
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
    
  }
    
  signin() {
    this.setState({ loading: true });
    this.getFormValidation({ obj: "authInputs" });
    if (this.state.validForm) {
      Keyboard.dismiss();
      const { authInputs } = this.state;
      const user = {
        email: authInputs.email.value,
        password: authInputs.password.value,
      };

      signUserIn(user.email, user.password, this);
      this.resetUserInputs();
    }
  }

  signInWithFacebook() {
    this.setState({ loading: true });
    facebookSignIn(this);
  }

  resetUserInputs() {
    this.setState({
      authInputs: {
        email: { type: "email", value: "" },
        password: { type: "password", value: "" },
      },
    });
  }

  render() {
    const { authInputs } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.container}>
            <View style={styles.topSection}>
              <Image
                source={require("../../assets/images/bgShape.png")}
                style={{
                  justifyContent: "flex-start",
                  width: 215,
                  height: 165,
                }}
              />
              <View style={{ marginTop: 40 }}>
                <Image
                  source={require("../../assets/images/app_logo1.png")}
                  style={{
                    width: 150,
                    height: 80,
                  }}
                />
                <Text
                  style={{
                    fontWeight: "800",
                    textAlign: "center",
                    color: "#FFFFFF",
                    fontFamily: "Poppins-Regular",
                    fontSize: 18,
                  }}
                >
                  ALERT GHANA
                </Text>
              </View>
            </View>
            <View style={styles.footer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.header}>Login into Your Account</Text>
                <View style={{ marginHorizontal: 6 }}>
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
                  <KeyboardAvoidingView style={{ flex: 0 }} behavior="padding">
                    <FormInput
                      textColor="#000"
                      borderColor="#000"
                      secureTextEntry={true}
                      placeholder="Password"
                      activeBorderColor="#000"
                      error={this.renderError(
                        "authInputs",
                        "password",
                        "password"
                      )}
                      returnKeyType={"next"}
                      value={authInputs.password.value}
                      onChangeText={(value) => {
                        this.onInputChange({
                          field: "password",
                          value,
                          obj: "authInputs",
                        });
                      }}
                    />
                    <TouchableOpacity
                      style={[styles.btn, { backgroundColor: "#32527B" }]}
                      onPress={() => this.signin()}
                    >
                      {this.state.loading === false ? (
                        <Text style={[styles.btnText, { color: "#FFFFFF" }]}>
                          Login
                        </Text>
                      ) : (
                        <Text style={[styles.btnText, { color: "#FFFFFF" }]}>
                          Please wait...
                        </Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("forgotpassword")
                      }
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          textAlign: "right",
                          marginBottom: 10,
                          marginTop: 10,
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        Forgot Password ?
                      </Text>
                    </TouchableOpacity>
                  </KeyboardAvoidingView>
                  <View
                    style={{
                      width: "85%",
                      alignSelf: "center",
                      flexDirection: "row",
                      margin: 5,
                    }}
                  >
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: "#c0c0c0",
                        flex: 2,
                        marginBottom: 7,
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          marginHorizontal: 2,
                          fontSize: 14,
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        or continue with
                      </Text>
                    </View>
                    <View
                      style={{
                        borderBottomWidth: 1,
                        borderColor: "#c0c0c0",
                        flex: 2,
                        marginBottom: 7,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      margin: 10,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity style={{ width: 38, height: 38, marginHorizontal: 10 }}>
                      <Image
                        source={require("../../assets/images/auth/google.png")}
                        style={{ width: 38, height: 38}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{ width: 38, height: 38, marginHorizontal: 10 }}
                    onPress={() => this.signInWithFacebook()}
                    >
                      <Image
                        source={require("../../assets/images/auth/facebook.png")}
                        style={{ width: 38, height: 38}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{ width: 38, height: 38, marginHorizontal: 10 }}

                    >
                      <Image
                        source={require("../../assets/images/auth/apple.png")}
                        style={{ width: 38, height: 38, }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
    marginTop: 40,
    marginBottom: 5,
    fontFamily: "Poppins-Regular",
  },
  footer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 25,
    flex: 2.8,
  },
  btn: {
    padding: 9,
    width: "100%",
    borderRadius: 25,
    paddingVertical: 12,
    marginTop: 28,
  },
  btnText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
    color: "#FFFFFF",
    fontFamily: "Poppins-Regular",
  },
});
