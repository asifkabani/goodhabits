import React, { useState, useEffect, useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Text,
  Button,
  Modal,
  Portal,
  HelperText,
  Snackbar,
} from "react-native-paper";
import Layout from "../components/Layout";
import "react-native-get-random-values";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from "uuid";

const AddEdit = ({ route, navigation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [habitName, setHabitName] = useState("");
  const [habitFrequency, setHabitFrequency] = useState("Daily");
  const [habits, setHabits] = useState([]);
  const [action, setAction] = useState('')
  const { getItem, setItem, mergeItem } = useAsyncStorage('habits');
  
  useEffect(() => {
    navigation.addListener('focus', () => readItemFromStorage())
    if (!route.params) return setAction('Add')
    setAction('Edit')
  }, [route]);

  useEffect(() => {
    if (habits.length > 0 && route?.params?.action === 'Edit') {
      const habit = habits.find(h => h.id === route.params.id)
      setHabitName(habit.name)
      setHabitFrequency(habit.frequency)
    }
  }, [habits, route])

  const readItemFromStorage = async () => {
    const habits = await getItem();
    if (!habits) return

    const parseArr = JSON.parse(habits)
    setHabits(parseArr)
  };

  const saveHabit = async () => {
    let newHabit = {
      id: uuidv4(),
      name: habitName,
      frequency: habitFrequency,
    };

    let newArr = [...habits, newHabit];
    let stringifyArr = JSON.stringify(newArr);

    try {
      await setItem(stringifyArr)
    } catch (error) {
      console.log(error);
    }

    setIsSnackbarOpen(!isSnackbarOpen);
    setHabitName("");
  };

  const handleHabit = (name) => {
    if (error) {
      setError(false);
    }

    setHabitName(name);
  };

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

  return (
    <Layout title={`${action} Habit`}>
      <View style={styles.spacing}>
        <TextInput
          required={true}
          mode="outlined"
          label="Name *"
          value={habitName}
          onChangeText={handleHabit}
          error={error}
          style={styles.spacing}
        />
        {error && <HelperText type="error">{errorText}</HelperText>}
      </View>
      <TextInput
        mode="outlined"
        label="Frequency"
        value={habitFrequency}
        // onFocus={() => setIsModalOpen(!isModalOpen)}
        caretHidden={true}
        style={styles.spacing}
      />
      <Button mode="contained" onPress={addHabit} style={styles.button}>
        Add
      </Button>
      <Portal>
        <Modal
          visible={isModalOpen}
          onDismiss={() => setIsModalOpen(!isModalOpen)}
        >
          <Picker
            selectedValue={habitFrequency}
            onValueChange={(f) => setFrequency(f)}
            style={{
              backgroundColor: "white",
              padding: 20,
              margin: 10,
            }}
            onDismiss={() => setIsModalOpen(!isModalOpen)}
          >
            <Picker.Item label="Daily" value="Daily" />
            <Picker.Item label="Weekly" value="Weekly" />
            <Picker.Item label="Monthly" value="Monthly" />
            <Picker.Item label="Yearly" value="Yearly" />
          </Picker>
        </Modal>
      </Portal>
      <Snackbar
        visible={isSnackbarOpen}
        onDismiss={() => setIsSnackbarOpen(!isSnackbarOpen)}
        duration={3000}
      >
        <Text>Habit has been added successfully.</Text>
      </Snackbar>
    </Layout>
  );
};

const styles = StyleSheet.create({
  spacing: {
    paddingBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default AddEdit;
