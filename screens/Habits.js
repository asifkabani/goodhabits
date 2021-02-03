import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, Alert } from "react-native";
import { FAB } from "react-native-paper";
import Layout from "../components/Layout";
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
  const onEdit = (id) => {
    navigation.navigate("Add Habit", { id });
  };

  return (
    <Layout title="My Habits">
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HabitCard
            key={item.id}
            title={item.name}
            time={item.time}
            frequency={item.frequency}
            onEdit={() => onEdit(item.id)}
          />
        )}
      />
      <FAB icon="plus" onPress={() => navigation.navigate("Add Habit")} />
    </Layout>
  );
};

export default Habits;
