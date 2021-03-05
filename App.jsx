import React from "react";
import "react-native-gesture-handler";
// Screens
import Habits from "./screens/Habits";
import AddEdit from "./screens/AddEdit";
// Navigation
import { createStackNavigator } from "@react-navigation/stack";
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
  Appbar
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
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={() => console.log("action")} />
        <Appbar.Content title="Good Habits" />
      </Appbar.Header>
        <Stack.Navigator
          initialRouteName="Habits"
          screenOptions={{ title: false }}
        >
          <Stack.Screen name="Habits" component={Habits} />
          <Stack.Screen name="AddEdit" component={AddEdit} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
