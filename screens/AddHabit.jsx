import React, { useState, useEffect, useRef } from "react";
import { Picker } from "@react-native-picker/picker";
import { TimePickerModal } from "react-native-paper-dates";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Text,
  Button,
  Modal,
  Portal,
  Switch,
  Subheading,
  HelperText,
  Snackbar,
} from "react-native-paper";
import Layout from "../components/Layout";
import "react-native-get-random-values";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from "uuid";

const AddHabit = ({ route, navigation }) => {
  // view states
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isSwitchOn, setIsSwitchOn] = useState(false);
  // const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  // value states
  const [errorText, setErrorText] = useState("");
  const [habitName, setHabitName] = useState("");
  const [habitFrequency, setHabitFrequency] = useState("Daily");
  const [habits, setHabits] = useState([]);
  // effects
  const { getItem, setItem } = useAsyncStorage('habits');
  
  useEffect(() => {
    if (!route?.params?.id) return
    navigation.addListener('focus', () => readItemFromStorage())
  }, [route?.params?.id]);

  const readItemFromStorage = async () => {
    const habits = await getItem();
    
    if (!habits) return

    const parseArr = JSON.parse(habits)
    const habit = parseArr.find(h => h.id === route.params.id)
    setHabitName(habit.name)
    setHabitFrequency(habit.frequency)
    setHabits(...habits, parseArr)
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

  const dismissSnackbar = () => setIsSnackbarOpen(!isSnackbarOpen);

  // Time Picker
  // const onDismiss = useCallback(() => {
  //   setIsTimePickerOpen(false);
  // }, [setIsTimePickerOpen]);

  // const onConfirm = useCallback(
  //   ({ hours, minutes }) => {
  //     convertToMeridiem(hours);
  //     setTime({ hours, minutes });
  //     setIsTimePickerOpen(false);
  //   },
  //   [setIsTimePickerOpen, setTime]
  // );

  // const convertToMeridiem = (hours) => {
  //   console.log(hours);
  //   if (hours >= 12) {
  //     setTime({ meridiem: "AM" });
  //   }

  //   setTime({ meridiem: "PM" });
  // };

  // const showTime = useCallback(() => {
  //   const { hours, minutes, meridiem } = time;
  //   return `${hours}:${minutes} ${meridiem}`;
  // });

  // const toggleFrequency = () => openModal(true);
  // const [searchQuery, setSearchQuery] = useState("");
  // const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <Layout title="Add Habit">
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
        onFocus={() => setIsModalOpen(!isModalOpen)}
        // error={error}
        caretHidden={true}
        style={styles.spacing}
      />
      {/* <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "space-between",
            },
            styles.spacing,
          ]}
        >
          <Subheading>Set Time</Subheading>
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            disabled={true}
          />
        </View> */}
      {/* {isSwitchOn && (
          <TextInput
            mode="outlined"
            label="Time"
            value={showTime()}
            onFocus={() => setIsTimePickerOpen(!isTimePickerOpen)}
            error={error}
            dense={true}
            caretHidden={true}
            style={styles.spacing}
          />
        )} */}
      <Button mode="contained" onPress={addHabit} style={styles.button}>
        Add
      </Button>
      {/* <FlatList
          data={todos}
          renderItem={({ item }) => (
            <Card style={{ margin: 5 }}>
              <Checkbox.Item
                label={
                  <TodoLabel
                    text={item.name}
                    time={item.time}
                    frequency={item.frequency}
                  />
                }
                status={item.complete ? "checked" : "unchecked"}
                onPress={() => markTodo(item.id)}
                style={{ padding: 15 }}
              />
            </Card>
          )}
        /> */}

      {/* <TimePickerModal
        visible={isTimePickerOpen}
        onDismiss={() => setIsTimePickerOpen(!setIsTimePickerOpen)}
        onConfirm={onConfirm}
        label="Select time"
        cancelLabel="Cancel"
        confirmLabel="Ok"
      /> */}
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
        onDismiss={dismissSnackbar}
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

export default AddHabit;
