import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { TimePickerModal } from "react-native-paper-dates";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Text,
  Button,
  Caption,
  Appbar,
  Headline,
  Modal,
  Portal,
  Switch,
  Subheading,
  HelperText,
  Snackbar,
} from "react-native-paper";

const AddHabit = ({ route, navigation }) => {
  // view states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  // value states
  const [errorText, setErrorText] = useState("");
  const [habitCount, setHabitCount] = useState(0);
  const [habitName, setHabitName] = useState("");
  const [habitFrequency, setHabitFrequency] = useState("Daily");
  const [habits, setHabits] = useState([]);
  // const [name, setName] = useState("");
  // const [frequency, setFrequency] = useState("Daily");
  // const [time, setTime] = useState({ hours: 0, minutes: 0, meridiem: "AM" });

  // useEffect(() => {
  //   navigation.addListener("focus", async () => {
  //     const existingData = await AsyncStorage.getItem("habits");
  //     console.log(existingData);
  //     if (existingData) {
  //       setHabit(JSON.parse(existingData));
  //     }
  //   });
  // });

  // const getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("habits");
  //     if (value !== null) {
  //       console.log(value);
  //       const result = JSON.parse(value);
  //       setHabit([result]);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  // Get habits from storage and clean up after.
  //   const unsubsribe = navigation.addListener("focus", () => getData());
  //   return unsubsribe;
  // });

  const saveHabit = async () => {
    try {
      let newHabit = {
        id: habitCount,
        name: habitName,
        frequency: habitFrequency,
      };

      let habitArray = [...habits, newHabit];

      let stringifyHabitArray = JSON.stringify(habitArray);
      await AsyncStorage.setItem("habits", stringifyHabitArray);
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
    <>
      <View style={styles.container}>
        <Headline style={styles.headline}>Add Habit</Headline>
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
      </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 35,
    paddingLeft: 35,
    paddingBottom: 0,
  },
  headline: {
    fontWeight: "bold",
    paddingBottom: 10,
  },
  spacing: {
    paddingBottom: 10,
  },
  button: {
    marginTop: 10,
  },
});

export default AddHabit;
