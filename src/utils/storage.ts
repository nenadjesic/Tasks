import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../interface/task";
import { GuidGenerator } from "./generator";


const STORAGE_KEY = 'tasks';

//POKLICE VSE, ZAKOMENTIRAN DEL JE ZA CLEAR STORAGE
export const getTasks = async (): Promise<Task[]> => {
  try {
    //await AsyncStorage.clear();
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Reading error", e);
    return [];
  }
};

//SHRANI ALI NAREDI UPDATE
export const saveTask = async (task: Task): Promise<{ ok: boolean; data?: Task[] }> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    const tasks: Task[] = jsonValue != null ? JSON.parse(jsonValue) : [];
    
    let updatedTasks: Task[];
    const existingIndex = tasks.findIndex((item: Task) => item.id === task.id);

    if (existingIndex > -1) {
      updatedTasks = [...tasks];
      updatedTasks[existingIndex] = {
        ...tasks[existingIndex],
        ...task
      };
    } else {
      const newTask = {
        ...task,
        id: task.id || GuidGenerator.short()
      };
      updatedTasks = [...tasks, newTask];
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    return { ok: true, data: updatedTasks };
  } catch (e) {
    return { ok: false };
  }
};
