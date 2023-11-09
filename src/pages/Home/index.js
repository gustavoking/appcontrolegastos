import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";

import Header from "../../components/Header";
import Balance from "../../components/Balance";
import Movements from "../../components/Movements";
import Actions from "../../components/Actions";
import { db } from "../../../config/firebase";
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  updateDoc,
  getDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";

const list = [
  {
    id: 1,
    label: "boleto conta de luz",
    value: "300,00",
    date: "07/11/2023",
    type: 0, // debitos
  },
  {
    id: 2,
    label: "pix",
    value: "335,00",
    date: "11/11/2023",
    type: 1, // creditos
  },
];

export function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const [saldo, setSaldo] = useState("");
  const [debit, setDebit] = useState("");
  const [moviments, setMoviments] = useState([]);

  console.log("movementsss", moviments);

  useEffect(() => {
    const somarCamposDoDocumento = async () => {
      let val = await getDoc(doc(db, "saldo", "idsaldo"));

      if (val.exists()) {
        const v = val.data().valor;
        setSaldo(v);
      }

      let deb = await getDoc(doc(db, "debito", "iddebito"));

      if (deb.exists()) {
        const v2 = deb.data().valor;
        setDebit(v2);
      }

      const collectionRef = collection(db, "movimentos"); // Substitua 'sua-colecao' pelo nome da coleção
      const querySnapshot = await getDocs(collectionRef);

      const documents = [];
      querySnapshot.forEach((doc) => {
        console.log("docc", doc.data());
        if (doc.exists()) {
          documents.push({ ...doc.data() });
        }
      });

      setMoviments(documents);
      console.log("moviments", moviments);
    };

    somarCamposDoDocumento();
  }, []);

  return (
    <View>
      <Header name="Gustavo" />
      <Balance saldo={saldo} gastos={debit} />
      <Actions />
      <Text style={styles.title}>Ultimas movimentações</Text>

      <FlatList
        style={styles.list}
        data={moviments}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Movements data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 14,
    marginRight: 14,
    marginTop: 14,
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },
});
