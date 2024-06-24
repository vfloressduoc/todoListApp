export interface Task {
  id?: number;
  name: string;
  description: string;
  is_completed: boolean;
  created_at: Date;
  deadline: Date | null;
}