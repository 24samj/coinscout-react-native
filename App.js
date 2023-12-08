import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./pages/HomeScreen";
import CoinDetailsScreen from "./pages/CoinDetailsScreen";
import axios from "axios";

const Stack = createStackNavigator();

const App = () => {
    // Define your props

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={CoinDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
