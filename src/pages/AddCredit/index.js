import React, { useState } from "react";
import { TextInputMask } from "react-native-masked-text";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../config/firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  updateDoc,
  getDoc,
  addDoc,
  FieldValue,
} from "firebase/firestore";

export default function AddCredit() {
  const navigation = useNavigation();

  const [credito, setCredito] = useState();
  const [data, setData] = useState(new Date());
  const [descricao, setDescricao] = useState("");
  const handleCreate = async () => {
    try {
      const day = data.getDate().toString().padStart(2, "0");
      const month = (data.getMonth() + 1).toString().padStart(2, "0");
      const year = data.getFullYear();

      const a = `${day}/${month}/${year}`;
      await addDoc(collection(db, "movimentos"), {
        movement: parseFloat(credito),
        data: a,
        descricao: descricao,
        type: 1,
      });

      let val = await getDoc(doc(db, "saldo", "idsaldo"));

      if (val.exists()) {
        const saldo = val.data().valor;

        await setDoc(doc(db, "saldo", "idsaldo"), {
          valor: parseFloat(credito) + saldo,
        });
      } else {
        console.log("val nao existe");
      }
    } catch (error) {
      console.log("Error creating document: ", error);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crédito</Text>
      <View style={styles.viewvalor}>
        <Text style={styles.texto}>R$</Text>

        <TextInput
          style={styles.txtinput}
          autoCorrect={false}
          placeholderTextColor="black"
          onChangeText={(t) => setCredito(t)}
        />
      </View>
      <View style={styles.viewvalor}>
        <Text style={styles.texto2}>Descrição</Text>
        <TextInput
          style={styles.txtinput2}
          autoCorrect={false}
          placeholderTextColor="black"
          onChangeText={(t) => setDescricao(t)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleCreate()}>
        <Text style={styles.salva}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.salva}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8000ff",
  },
  title: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: 80,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 40,
  },
  txtinput: {
    backgroundColor: "#FFF",
    fontSize: 16,
    marginLeft: 40,

    color: "black",
    borderRadius: 0,
    padding: 10,
  },
  viewvalor: {
    flexDirection: "row",
  },
  texto: {
    marginLeft: 100,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 25,
  },
  texto2: {
    marginLeft: 50,
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#ecf0f1",
    borderRadius: 90,
    marginTop: 40,
    marginLeft: 50,
    marginRight: 50,
  },
  salva: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
  },
  txtinput2: {
    backgroundColor: "#FFF",
    fontSize: 16,
    marginLeft: 10,

    marginTop: 20,
    color: "black",
    borderRadius: 0,
    padding: 10,
  },
});
