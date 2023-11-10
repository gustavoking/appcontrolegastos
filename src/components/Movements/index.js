import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Movements({ data }) {
  const [show, setShow] = useState(false);

  const formatador = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const saldoFormatado = formatador.format(data.movement);

  return (
    <TouchableOpacity style={styles.container} onPress={() => setShow(!show)}>
      <Text style={styles.date}>{data.data}</Text>
      <Text style={styles.label}>{data.descricao}</Text>
      <View style={styles.content}>
        <Text style={styles.label}></Text>

        {show ? (
          <Text style={data.type === 1 ? styles.value : styles.expenses}>
            {data.type === 1 ? ` ${saldoFormatado}` : ` -${saldoFormatado}`}
          </Text>
        ) : (
          <View style={styles.skeleton}></View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 24,
    borderBottomColor: "#dadada",
    borderBottomWidth: 0.5,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 2,
    marginBottom: 8,
  },
  date: {
    color: "grey",
    fontWeight: "bold",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    color: "#2ecc71",
    fontWeight: "bold",
  },
  expenses: {
    fontSize: 16,
    color: "#e74c3c",
    fontWeight: "bold",
  },
  skeleton: {
    marginTop: 6,
    width: 80,
    height: 10,
    backgroundColor: "#dadada",
    borderRadius: 8,
  },
});
