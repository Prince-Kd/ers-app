import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, ScrollView } from 'react-native';
import TipItem from '../../components/TipItem';

const EmergencyTipsScreen = ({route}) => {
    const [tips, setTips] = useState([]);

    useEffect(() => {
        setTips(route.params.tips)
    })

    return(
        <>
            {
                !tips ? (
                    <View style={styles.container}>
                        <Image
                        source={require("../../assets/images/main/alarm.png")}
                        style={{ height: 200, width: 210 }}
                        />
                        <Text style={{ fontFamily: "Poppins-Regular", fontSize: 20 }}>
                        No tips received(0)
                        </Text>
                    </View>
                ) : (
                    <SafeAreaView>
                        <ScrollView showsVerticalScrollIndicator={false}>
                        {/* <View style={{ marginVertical: 6 }}>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>Today</Text>
                        </View> */}
                            <View>
                                <FlatList
                                showsHorizontalScrollIndicator={false}
                                data={tips}
                                renderItem={({ item }) => <TipItem item={item} />}
                                keyExtractor={(item) => String(item.index)}
                                />
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                )
            }
        </>
    )
}

export default EmergencyTipsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });