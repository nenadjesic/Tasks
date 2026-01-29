import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../interface/task";


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
        id: task.id || (tasks.length > 0 ? Math.max(...tasks.map((t: any) => Number(t.id) || 0)) + 1 : 1)
      };
      updatedTasks = [...tasks, newTask];
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTasks));
    return { ok: true, data: updatedTasks };
  } catch (e) {
    return { ok: false };
  }
};


//BRISE IZBRANI ZAPIS
export const removeTask = async (id: number): Promise<void> => {
  const tasks = await getTasks();
  const filteredTasks = tasks.filter(t => t.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTasks));
};