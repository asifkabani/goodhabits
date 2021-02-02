import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Alert,
  VirtualizedList,
} from "react-native";
import {
  TextInput,
  Text,
  Button,
  Card,
  Checkbox,
  Caption,
  FAB,
  Appbar,
  Headline,
} from "react-native-paper";

const Habits = ({ navigation }) => {
  const [habits, setHabits] = useState([]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("habits");
      if (value !== null) {
        const result = JSON.parse(value);
        setHabits([result]);
      }
    } catch (e) {
      console.log(e);
    }

    console.log(habits);
  };

  useEffect(() => {
    navigation.addListener("focus", () => getData());
  });

  // const addHabit = (name, frequency) => {
  //   setHabits([...habits, { id: habits.length++, name, frequency }]);
  // };

  // const editHabit = (id) => {
  //   navigation.navigate("Add Habit", { id: id });
  // };
  // const removeAll = async () => {
  //   try {
  //     await AsyncStorage.removeItem("habits");
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   console.log("all removed");
  // };

  const TodoLabel = ({ text, time, frequency }) => (
    <>
      <Text>{text}</Text>
      {"\n"}
      {"\n"}
      <Caption>TIME</Caption>
      {"\n"}
      <Text>{time}</Text>
      {"\n"}
      {"\n"}
      <Caption>FREQUENCY</Caption>
      {"\n"}
      <Text>{frequency}</Text>
    </>
  );

  return (
    <View style={styles.container}>
      <Headline>Test</Headline>
      <FlatList
        data={habits}
        renderItem={({ item }) => (
          <Card style={{ margin: 5 }} key={item.id}>
            <Checkbox.Item
              label={
                <TodoLabel
                  text={item.name}
                  time={item.time}
                  frequency={item.frequency}
                />
              }
              status={item.complete ? "checked" : "unchecked"}
              // onPress={() => editHabit(item.id)}
              style={{ padding: 15 }}
            />
          </Card>
        )}
      />
      <FAB icon="plus" onPress={() => navigation.navigate("Add Habit")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2345FF",
    flex: 1,
    alignItems: "center",
  },
});

export default Habits;
