import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../config/firebase";
import RNPickerSelect from "react-native-picker-select";

import {
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  addDoc,
} from "firebase/firestore";

export default function AddCredit() {
  const navigation = useNavigation();

  const [debito, setDebito] = useState();
  const [data, setData] = useState(new Date());
  const [descricao, setDescricao] = useState("");
  const [listaCarteira, setListaCarteira] = useState([]);
  const [selectedCarteira, setSelectedCarteira] = useState("");

  const pickerSelectStyles = {
    inputAndroid: {
      fontSize: 16,
      borderWidth: 0.5,
      borderColor: "purple",
      borderRadius: 8,
      color: "black",
      backgroundColor: "white",
      marginLeft: 50,
      marginRight: 50,
    },
    placeholder: {
      color: "black",
    },
    iconContainer: {
      top: 10,
      right: 12,
    },
  };

  const carteiraItems = listaCarteira.map((carteira, index) => ({
    label: carteira.tipoCarteira, // Substitua "nome" pelo nome da propriedade que você deseja exibir
    value: carteira.tipoCarteira, // Substitua "id" pelo nome da propriedade que você deseja usar como valor
  }));

  const handleCreate = async () => {
    const day = data.getDate().toString().padStart(2, "0");
    const month = (data.getMonth() + 1).toString().padStart(2, "0");
    const year = data.getFullYear();

    const a = `${day}/${month}/${year}`;

    if (selectedCarteira !== "" && debito !== "" && descricao !== "") {
      await addDoc(collection(db, "movimentos"), {
        movement: parseFloat(debito),
        data: a,
        descricao: descricao,
        type: 0,
        tipodeCarteira: selectedCarteira,
      });

      let val = await getDoc(doc(db, "saldo", "idsaldo"));

      if (val.exists()) {
        const saldo = val.data().valor;

        await setDoc(doc(db, "saldo", "idsaldo"), {
          valor: -parseFloat(debito) + saldo,
        });

        let deb = await getDoc(doc(db, "debito", "iddebito"));

        if (deb.exists()) {
          const deb2 = deb.data().valor;

          await setDoc(doc(db, "debito", "iddebito"), {
            valor: -parseFloat(debito) + deb2,
          });
        } else {
          console.log("deb nao existe");
        }
      } else {
        console.log("val nao existe");
      }
    } else {
      alert("Preencha todos os campos");
    }
    navigation.goBack();

    //   let val = await getDoc(doc(db, "saldo", "idsaldo"));

    //   if (val.exists()) {
    //     const saldo = val.data().valor;

    //     await setDoc(doc(db, "saldo", "idsaldo"), {
    //       valor: -parseFloat(debito) + saldo,
    //     });
    //   } else {
    //     console.log("val nao existe");
    //   }

    //   let deb = await getDoc(doc(db, "debito", "iddebito"));

    //   if (deb.exists()) {
    //     const deb2 = deb.data().valor;

    //     await setDoc(doc(db, "debito", "iddebito"), {
    //       valor: -parseFloat(debito) + deb2,
    //     });
    //   } else {
    //     console.log("deb nao existe");
    //   }

    //   navigation.goBack();
    // } catch (error) {
    //   console.log("Error creating document: ", error);
    // }
  };

  useEffect(() => {
    const carregaLista = async () => {
      const collectionRef = collection(db, "carteira");
      const querySnapshot = await getDocs(collectionRef);

      const carteiras = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          carteiras.push({ ...doc.data() });
        }
      });
      setListaCarteira(carteiras);
    };
    carregaLista();
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Débito</Text>
        <View style={styles.viewvalor}>
          <Text style={styles.texto}>R$</Text>

          <TextInput
            style={styles.txtinput}
            autoCorrect={false}
            placeholderTextColor="black"
            onChangeText={(t) => setDebito(t)}
            keyboardType="numeric"
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

        <View style={styles.container2}>
          <Text style={styles.txtcarteira}>Forma de Transferência</Text>
          <RNPickerSelect
            items={carteiraItems}
            onValueChange={(value) => setSelectedCarteira(value)}
            value={selectedCarteira}
            style={pickerSelectStyles}
            placeholder={{ label: "Selecione uma carteira..." }}
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
    marginLeft: 50,
    marginRight: 50,
    marginTop: 40,
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
  txtcarteira: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 30,
    fontWeight: "bold",
    color: "white",
  },
});
