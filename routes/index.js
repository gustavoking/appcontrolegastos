import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../src/pages/Home";
import Actions from "../src/components/Actions";
import Balance from "../src/components/Balance";
import Movements from "../src/components/Movements";
import AddCredit from "../src/pages/AddCredit";
import Debit from "../src/pages/Debit";
import Carteira from "../src/pages/Carteira";

const Stack = createStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Actions" component={Actions} />
      <Stack.Screen name="Balance" component={Balance} />
      <Stack.Screen name="Movements" component={Movements} />
      <Stack.Screen name="AddCredit" component={AddCredit} />
      <Stack.Screen name="Debit" component={Debit} />
      <Stack.Screen name="Carteira" component={Carteira} />
    </Stack.Navigator>
  );
}
