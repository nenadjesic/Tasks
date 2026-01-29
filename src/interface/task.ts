//INTERFACE TASK
export interface Task {
  id: string | null
  title: string;
  date: string;
  status: string | null;
  completed: false;
}