import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity
    } from "react-native";

const { width, height } = Dimensions.get("window")

const TipModal = ({tip, visible}) => {
    return(
        <View style={styles.container}>
            <ScrollView>
                <TouchableOpacity style={{
                    height: 40, 
                    width: 40, 
                    borderRadius: 20, 
                    borderWidth: 2, 
                    borderColor: 'red', 
                    position: "absolute", 
                    top: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    }}
                    onPress={() => visible(false)}>
                    <Text style={{fontSize: 24,}}>X</Text>
                </TouchableOpacity>
                <Text style={{fontWeight: "bold", fontSize: 24,textAlign: 'center'}}>{tip.title}</Text>
                <View style={{flexDirection: "row", height: 1, backgroundColor: 'black', width: 250, marginBottom: 10}}></View>
                <Text style={{fontWeight: "500", fontSize: 20, textAlign: 'center'}}>{tip.description}</Text>
            </ScrollView>
        </View>
    )
}

export default TipModal;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: "center",
      alignItems: "center",
      width: width - 50,
      height: 600,
      borderRadius: 50,
      padding: 20,
      margin: 10
    },
  });
  