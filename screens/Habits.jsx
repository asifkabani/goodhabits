import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { FAB, Snackbar, Text } from "react-native-paper";
import Layout from "../components/Layout";
import HabitCard from "../components/HabitCard";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { getHabitsFromStorage, removeHabitFromStorage } from '../util';

const Habits = ({ navigation }) => {
  const [habits, setHabits] = useState([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { getItem, setItem } = useAsyncStorage('habits');

  useEffect(() => {
    navigation.addListener('focus', () => getHabitsFromStorage(getItem, setHabits))
  });

  const onDelete = async (id) => {
    const habitRemoved = habits.filter(h => h.id !== id)
    removeHabitFromStorage(setItem, setHabits, habitRemoved).then(() => setIsSnackbarOpen(!isSnackbarOpen))
  };

  const onEdit = (id) => {
    navigation.navigate("AddEdit", { id, action: 'Edit' });
  };

  return (
    <Layout title="Habits">
      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard
            key={item.id}
            title={item.name}
            time={item.time}
            frequency={item.frequency}
            onEdit={() => onEdit(item.id)}
            onDelete={() => onDelete(item.id)}
          />
        )}
      />
      <Snackbar
        visible={isSnackbarOpen}
        onDismiss={() => setIsSnackbarOpen(!isSnackbarOpen)}
        duration={3000}
      >
        <Text>Habit has been removed successfully.</Text>
      </Snackbar>
      <FAB icon="plus" onPress={() => navigation.navigate("AddEdit")} />
    </Layout>
  );
};

export default Habits;
