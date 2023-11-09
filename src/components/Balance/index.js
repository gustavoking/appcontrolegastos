import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Balance({ saldo, gastos }) {
  const textStyle = saldo < 0 ? styles.negativo : styles.positivo;

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Saldo</Text>
        <View style={styles.content}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={textStyle}>{saldo}</Text>
        </View>
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Total de Débitos</Text>
        <View style={styles.content}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.expenses}>{gastos}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingStart: 18,
    paddingEnd: 18,
    marginTop: -24,
    marginStart: 14,
    marginEnd: 14,
    borderRadius: 4,
    paddingTop: 22,
    paddingBottom: 22,
    zIndex: 99,
  },
  itemTitle: {
    fontSize: 20,
    color: "grey",
  },
  content: {
    flexDirection: "row",
  },
  currencySymbol: {
    color: "grey",
    marginRight: 6,
  },
  negativo: {
    fontSize: 22,
    color: "#e74c3c",
  },
  positivo: {
    fontSize: 22,
    color: "#2ecc71",
  },
  expenses: {
    fontSize: 22,
    color: "#e74c3c",
  },
});
