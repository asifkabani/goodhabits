import React from "react";
import "react-native-gesture-handler";
// Screens
import Habits from "./screens/Habits";
import AddHabit from "./screens/AddHabit";
// Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
// Paper
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
// Images
import bG1 from "./assets/bg1.png";
const bg1 = { uri: bG1.toString() };

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
  },
};

const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    onSurface: "green",
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <NavigationContainer theme={CombinedDarkTheme}>
        <Stack.Navigator
          initialRouteName="Habits"
          screenOptions={{ title: false }}
        >
          {/* <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen name="Habits" component={Habits} />
          <Stack.Screen name="Add Habit" component={AddHabit} />
        </Stack.Navigator>
        {/* <Tab.Navigator initialRouteName="Add Habit">
          <Tab.Screen name="Habits" component={Habits} />
          <Tab.Screen name="Add Habit" component={AddHabit} />
        </Tab.Navigator> */}
      </NavigationContainer>
    </PaperProvider>
  );
}
