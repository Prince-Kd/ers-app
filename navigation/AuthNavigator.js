import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "../screens/Auth/Onboarding";
import SignUp from "../screens/Auth/SignUp";
import SignIn from "../screens/Auth/SignIn";
import AuthMain from "../screens/Auth/AuthMain";
import ForgotPassword from "../screens/Auth/ForgotPassword";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const getFirstTimeUser = async () => {
  try{
    const value = await AsyncStorage.getItem('firstTime')
    console.log(value)
    return value
  } catch(e) {
    console.log(e)
  }
}

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={getFirstTimeUser === "no" ? "signin" : "welcome"}>
      <Stack.Screen name="welcome" component={Onboarding} />
      <Stack.Screen name="signup" component={SignUp} />
      <Stack.Screen name="authmain" component={AuthMain} />
      <Stack.Screen name="signin" component={SignIn} />
      <Stack.Screen name="forgotpassword" component={ForgotPassword}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;
