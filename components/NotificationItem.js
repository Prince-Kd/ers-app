import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";



const NotificationItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Poppins-Regular",
            }}
          >
            {item.title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "#444444",
                fontSize: 14,
                fontFamily: "Poppins-Regular",
              }}
            >
              {item.category}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 12 }}>{item.timestamp}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
  },
});
