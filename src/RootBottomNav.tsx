import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { ReactElement } from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import CashOut from "./screens/CashOut";
import Tables from "./screens/Tables";
import User from "./screens/User";
import Expenses from "./screens/Expenses";

export type BottomTabParamList = {
  default: undefined;
};

export type BottomTabNavigationProps<
  T extends keyof BottomTabParamList = "default"
> = BottomTabNavigationProp<BottomTabParamList, T>;

// const Tab = createBottomTabNavigator<BottomTabParamList>();
const Tab = createMaterialBottomTabNavigator();

function MaterialBottomTabNavigator(): ReactElement {
  return (
    <NavigationContainer>
      <Tab.Navigator
       activeColor="#fff"
       inactiveColor="#C6C6C6"
       barStyle={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen
          name="Tables"
          component={Tables}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="table-chart" color={color} size={24} />
            ),
          }}
        />
        <Tab.Screen
          name="CashOut"
          component={CashOut}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-cash-outline"
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Expenses"
          component={Expenses}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="money-bill-alt" size={20} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="User" 
          component={User}
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="logout" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MaterialBottomTabNavigator;
