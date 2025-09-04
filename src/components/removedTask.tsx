import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import styles from "./Tasklist.module.css"

function TaskList () {
    const {tasks, addTask, toggleTask, removeTask, total, concluidas, editTask} = useTasks();
    const [newTask, setNewTask] = useState("");
    const [removedTasks, setRemovedTasks] = useState<any[]>([]);

    function handleAdd() {
        if (!newTask.trim()) return;
        addTask(newTask);
        setNewTask("");
    }

    function handleRemove(task: any) {
        removeTask(task.id);
        setRemovedTasks([...removedTasks, task]);
    }

    function handleRestore(task: any) {
        addTask(task.text); 
        setRemovedTasks(removedTasks.filter(t => t.id !== task.id));
    }

    return (
        <section className={styles.container}>
            
            <div className={styles.inputArea}>
                <input 
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Digite uma nova tarefa"
                />
                <button onClick={handleAdd}>Adicionar</button>
            </div>

            <p>Total: {total} || Concluídas: {concluidas}</p>

            <div style={{display: "flex", gap: "40px"}}>
                <ul>
                    <h3>Tarefas</h3>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <input 
                                type="checkbox"
                                checked={task.done}
                                onChange={() => toggleTask(task.id)}
                            />
                            <span 
                                style={{ background: task.done ? "#6EFF6E" : ""}} 
                                className={styles.tasks} 
                                onClick={() => {
                                    const newText = prompt("Digite a tarefa:");
                                    if(newText === null) return;
                                    editTask(task.id, newText);
                                }}
                            >
                                {task.text}
                            </span>
                            <button onClick={() => handleRemove(task)} className={styles.btnX}>X</button>
                        </li>
                    ))}
                </ul>

                <ul>
                    <h3>Removidas</h3>
                    {removedTasks.map(task => (
                        <li key={task.id}>
                            <span className={styles.tasks}>{task.text}</span>
                            <button onClick={() => handleRestore(task)}>Restaurar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

export default TaskList;
