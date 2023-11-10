import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export default function Actions() {
  const navigation = useNavigation();

  function modalCredit() {
    <View style={styles.containerModal}></View>;
  }
  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("AddCredit")}
      >
        <View style={styles.areaButton}>
          <MaterialIcons name="attach-money" size={26} color="black" />
        </View>
        <Text style={styles.labelButton}>Crédito</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("Debit")}
      >
        <View style={styles.areaButton}>
          <AntDesign name="tagso" size={26} color="black" />
        </View>
        <Text style={styles.labelButton}>Débito</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => navigation.navigate("Carteira")}
      >
        <View style={styles.areaButton}>
          <AntDesign name="creditcard" size={26} color="black" />
        </View>
        <Text style={styles.labelButton}>Carteira</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 84,
    marginBottom: 14,
    marginTop: 18,
    paddingEnd: 14,
    paddingStart: 14,
  },
  actionButton: {
    alignItems: "center",
    marginRight: 32,
  },
  areaButton: {
    backgroundColor: "#ecf0f1",
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  labelButton: {
    marginTop: 4,
    textAlign: "center",
    fontWeight: "bold",
  },
});
