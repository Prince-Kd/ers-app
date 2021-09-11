import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import TipModal from './Modal/TipModal';


const TipItem = ({ item }) => {
    const [visible, setVisible] = useState(false);

  return (
    <TouchableOpacity style={styles.container} onPress={() => {
        setVisible(true)
        }}>
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
              fontWeight: "700"
            }}
          >
            {item.title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "#444444",
                fontSize: 13,
                fontFamily: "Poppins-Light",
              }}
            >
              {item.type}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 11 }}>{item.timeStamp}</Text>
        </View>
    </View>
    <Modal
    isVisible={visible}
    onBackdropPress={() => setVisible(false)}
    onBackButtonPress={() => setVisible(false)}
    >
        <TipModal tip={item} visible={setVisible} />
    </Modal>
    </TouchableOpacity>
  );
};

export default TipItem;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
});
