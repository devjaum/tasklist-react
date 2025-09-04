import  {useEffect, useState} from "react";

export interface Task {
    id: number;
    text: string;
    done: boolean;
}

export function useTasks () {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [concluidas, setConcluidas] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if(saved) {
      const parsed: Task[] = JSON.parse(saved);
      setTasks(parsed);
      setTotal(parsed.length);
      setConcluidas(parsed.filter(t => t.done).length)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(text: string) {
    if (text.trim() === "") return;
    const task: Task = {
      id: Date.now(),
      text, 
      done: false
    };
    setTasks(prev => [...prev, task]);
    setTotal(total + 1);
  }

  function toggleTask(id: number) {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
    );
    tasks.map(t => {
      if(t.id === id && t.done) setConcluidas(concluidas - 1);
      else if (!t.done && t.id === id) setConcluidas(concluidas + 1);
    })
  }

  function removeTask(id: number){
    setTasks(prev => prev.filter(t => t.id !== id));
    setTotal(total - 1);
    tasks.map(t => {
      if(t.id === id && t.done) setConcluidas(concluidas - 1);
    })
  }

  function editTask(id: number, newText: string){
    setTasks(prev => 
        prev.map(t => t.id === id ? {...t, text: newText} : t)
    )
    
}

  return { tasks, addTask, toggleTask, removeTask, total, concluidas, editTask };
}
