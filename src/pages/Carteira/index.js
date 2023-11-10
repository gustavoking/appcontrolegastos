import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddCredit() {
  const navigation = useNavigation();

  const [carteira, setCarteira] = useState("");
  const handleCreate = async () => {
    await addDoc(collection(db, "carteira"), {
      tipoCarteira: carteira,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tipo de Carteira</Text>
      <View style={styles.viewvalor}>
        <Text style={styles.texto}></Text>

        <TextInput
          style={styles.txtinput}
          autoCorrect={false}
          placeholderTextColor="black"
          onChangeText={(t) => setCarteira(t.toUpperCase())}
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
    marginRight: 40,
    marginBottom: 20,
    marginTop: -20,
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
});
