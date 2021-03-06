import React, {useEffect, useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FabTabBar } from "../components/BottomTab/FabTabBar";
import HomeScreen from "../screens/MainApp/HomeScreen";
import AccountScreen from "../screens/MainApp/AccountScreen/AccountScreen";
import AuthNavigator from "./AuthNavigator";
import EditProfile from "../screens/MainApp/EditProfile";
import ChangePassword from "../screens/MainApp/ChangePassword";
import NotificationScreen from "../screens/MainApp/NotificationScreen";
import EmergencyTipsScreen from "../screens/MainApp/EmergencyTipsScreen";
import PostEmergencyMap from "../screens/MainApp/PostEmergency/PostEmergencyMap";
import PostEmergencyScreen from "../screens/MainApp/PostEmergency/PostEmergencyScreen";
import PostEmergencyInfo from "../screens/MainApp/PostEmergency/PostEmergencyInfo";
import PostEmergencySubmit from "../screens/MainApp/PostEmergency/PostEmergencySubmit.js";
import NewsFeed from "../screens/MainApp/NewsFeed";
import Tips from "../screens/MainApp/TipsScreen";
import TrackRespondents from "../screens/MainApp/TrackRespondents";
import firebase from "firebase";

const tabBarIcon = (name) => ({ focused, color, size }) => (
  <MaterialCommunityIcons
    name={name}
    size={28}
    color={focused ? "white" : "white"}
  />
);
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AccountStack = ({route}) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="account" component={AccountScreen} />
      <Stack.Screen name="edit_profile" component={EditProfile} initialParams={{token: route.params ? route.params.token : ""}}/>
      <Stack.Screen name="change_password" component={ChangePassword} initialParams={{token: route.params ? route.params.token : ""}} />
      <Stack.Screen name="notification" component={NotificationScreen} />
      <Stack.Screen name="progress" component={TrackRespondents} />
      <Stack.Screen name="tips" component={Tips} />
    </Stack.Navigator>
  );
};
const PostEmergencyStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="post" component={PostEmergencyScreen} />
      <Stack.Screen name="info" component={PostEmergencyInfo} />
      <Stack.Screen name="map" component={PostEmergencyMap} />
      <Stack.Screen name="submit" component={PostEmergencySubmit} />
    </Stack.Navigator>
  );
};

const MainAppNavigator = ({route}) => {

  return (
    <Tab.Navigator
      initialRouteName="Post"
      tabBarOptions={{
        activeTintColor: "#5D88BB",
      }}
      tabBar={(props) => <FabTabBar color="#32527B" {...props} />}
    >
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon("home"),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon("newspaper-variant-multiple-outline"),
        }}
        name="News"
        component={NewsFeed}
      />
      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon("alert-box"),
        }}
        name="Post"
        component={PostEmergencyStack}
      />

      <Tab.Screen
        options={{
          tabBarIcon: tabBarIcon("account"),
        }}
        name="Account"
        component={AccountStack}
        initialParams={{token: route.params ? route.params.token : ""}}
      />
    </Tab.Navigator>
  );
};

const AppStack = () => {
  const [initial, setInitial] = useState("auth")

  const switchStack = () => {
    if(firebase.auth().currentUser){
      setInitial("main")
    }
  }
  useEffect(() => {
    switchStack
  }, )
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initial}>
      <Stack.Screen name="auth" component={AuthNavigator} />
      <Stack.Screen name="main" component={MainAppNavigator} />
    </Stack.Navigator>
  );
};
export default AppStack;
