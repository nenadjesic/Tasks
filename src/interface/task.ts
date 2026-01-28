export interface Task {
  id: number | null
  title: string;
  date: string;
  status: string | null;
  completed: false;
}