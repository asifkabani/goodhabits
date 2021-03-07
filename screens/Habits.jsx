import React, { useState, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { FAB, Snackbar, Text, Headline, Button } from "react-native-paper";
import AddHabit from "../components/AddHabit";
import HabitCard from "../components/HabitCard";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { getHabitsFromStorage, removeHabitFromStorage } from "../util";

const Habits = ({ navigation }) => {
  const [habits, setHabits] = useState([]);
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const { getItem, setItem } = useAsyncStorage("habits");

  useEffect(() => {
    navigation.addListener("focus", () =>
      getHabitsFromStorage(getItem, setHabits)
    );
  });

  const addHabit = () => {
    if (habitName.length <= 0) {
      setErrorText("Name is required");
      setError(true);
      return;
    }

    if (habitName.length <= 3) {
      setErrorText("Name must be more than 3 characters");
      setError(true);
      return;
    }

    saveHabit();
  };

  const onDelete = async (id) => {
    const habitRemoved = habits.filter((h) => h.id !== id);
    removeHabitFromStorage(setItem, setHabits, habitRemoved).then(() =>
      setIsSnackbarOpen(!isSnackbarOpen)
    );
  };

  const onEdit = (id) => {
    navigation.navigate("AddEdit", { id, action: "Edit" });
  };

  const handleTextChange = (name) => setHabitName(name);
  const handleCancel = () => setIsAddOpen(false);
  const handleOK = () => console.log("handle OK called");

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Headline style={styles.headline}>My Habits</Headline>
        <FAB
          small={true}
          icon="plus"
          onPress={() => setIsAddOpen(true)}
          style={styles.button}
        />
      </View>
      {isAddOpen && (
        <AddHabit
          habitName={habitName}
          error={error}
          errorText={errorText}
          handleCancel={handleCancel}
          handleOK={addHabit}
          frequency={frequency}
          onChangeText={handleTextChange}
        />
      )}
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
      {/* <Snackbar
        visible={isSnackbarOpen}
        onDismiss={() => setIsSnackbarOpen(!isSnackbarOpen)}
        duration={3000}
      >
        <Text>Habit has been removed successfully.</Text>
      </Snackbar> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 0,
    flex: 1,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  headline: {
    fontWeight: "bold",
  },
  spacing: {
    paddingBottom: 10,
  },
  button: {
    borderColor: "white",
    backgroundColor: "transparent",
    borderWidth: "thin",
  },
});

export default Habits;
