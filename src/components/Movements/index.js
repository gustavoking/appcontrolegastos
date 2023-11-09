import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Movements({ data }) {
  const [show, setShow] = useState(false);

  // console.log("datt", data.data.getDate().toString().padStart(2, "0"));
  // console.log("datt2", data.data);

  // function formatDate(d) {
  //   const day = d.getDate().toString().padStart(2, "0"); // Obtém o dia e preenche com zero à esquerda se necessário
  //   const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Obtém o mês (lembrando que janeiro é 0) e preenche com zero à esquerda se necessário
  //   const year = d.getFullYear();

  //   return `${day}/${month}/${year}`;
  // }

  // const dataFormatada = formatDate(data.data); // Chame a função formatDate para obter a data formatada

  // console.log(dataFormatada); // Saída: "08/11/2023" (para a data atual)

  return (
    <TouchableOpacity style={styles.container} onPress={() => setShow(!show)}>
      <Text style={styles.date}>{data.data}</Text>
      <Text style={styles.label}>{data.descricao}</Text>
      <View style={styles.content}>
        <Text style={styles.label}></Text>

        {show ? (
          <Text style={data.type === 1 ? styles.value : styles.expenses}>
            {data.type === 1 ? `R$ ${data.movement}` : `R$ -${data.movement}`}
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
