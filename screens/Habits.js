import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import {
  Text,
  Card,
  Checkbox,
  Caption,
  FAB,
  Appbar,
  Headline,
} from "react-native-paper";
import HabitCard from "../components/HabitCard";

const Habits = ({ navigation }) => {
  const [habits, setHabits] = useState([]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("habits");
      if (value !== null) {
        const result = JSON.parse(value);
        setHabits([...result]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Get habits from storage and clean up after.
    const unsubsribe = navigation.addListener("focus", () => getData());
    return unsubsribe;
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

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>My Habits</Headline>
      <FlatList
        data={habits}
        renderItem={({ item, index }) => (
          // <Card style={{ margin: 5 }} key={item.id}>
          //   <Checkbox.Item
          //     label={
          //       <TodoLabel
          //         text={item.name}
          //         time={item.time}
          //         frequency={item.frequency}
          //       />
          //     }
          //     status={item.complete ? "checked" : "unchecked"}
          //     // onPress={() => editHabit(item.id)}
          //     style={{ padding: 15 }}
          //   />
          // </Card>
          <HabitCard
            id={item.id}
            title={item.name}
            time={item.time}
            frequency={item.frequency}
          />
        )}
      />
      <FAB icon="plus" onPress={() => navigation.navigate("Add Habit")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 35,
    paddingLeft: 35,
    paddingBottom: 0,
    flex: 1,
    alignItems: "center",
  },
  headline: {
    fontWeight: "bold",
    paddingBottom: 10,
  },
  spacing: {
    paddingBottom: 10,
  },
});

export default Habits;
