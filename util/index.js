const getHabitsFromStorage = async (get, set) => {
  const habits = await get();
  set(JSON.parse(habits));
};

const removeHabitFromStorage = async (setStorage, setArr, arr) => {
  await setStorage(JSON.stringify(arr));
  setArr(arr);
};

export { getHabitsFromStorage, removeHabitFromStorage };
