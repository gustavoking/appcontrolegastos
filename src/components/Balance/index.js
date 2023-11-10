import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Balance({ saldo, gastos }) {
  const textStyle = saldo < 0 ? styles.negativo : styles.positivo;
  const formatador = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const [mostrarGastos, setMostrarGastos] = useState(false);

  const saldoFormatado = formatador.format(saldo);
  const gastosFormatado = formatador.format(gastos);

  const toggleSaldo = () => {
    setMostrarSaldo(!mostrarSaldo);
  };

  const toggleGastos = () => {
    setMostrarGastos(!mostrarGastos);
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Saldo</Text>
        <TouchableOpacity onPress={toggleSaldo}>
          <Icon
            name={mostrarSaldo ? "eye" : "eye-slash"}
            size={18}
            color="grey"
          />
        </TouchableOpacity>
        {mostrarSaldo && (
          <View style={styles.content}>
            <Text style={styles.currencySymbol}>R$</Text>
            <Text style={textStyle}>{saldoFormatado}</Text>
          </View>
        )}
      </View>
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Total de Gastos</Text>
        <TouchableOpacity onPress={toggleGastos}>
          <Icon
            name={mostrarGastos ? "eye" : "eye-slash"}
            size={18}
            color="grey"
          />
        </TouchableOpacity>
        {mostrarGastos && (
          <View style={styles.content}>
            <Text style={styles.currencySymbol}>R$</Text>
            <Text style={styles.expenses}>{gastosFormatado}</Text>
          </View>
        )}
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
    fontSize: 18,
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
    fontSize: 18,
    color: "#e74c3c",
  },
  positivo: {
    fontSize: 18,
    color: "#2ecc71",
  },
  expenses: {
    fontSize: 18,
    color: "#e74c3c",
  },
});
