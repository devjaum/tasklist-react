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

    function removeAll() {
        const remove = confirm("Deseja apagar todos da lista de removidos?\n")
        if(remove === false) return;
        setRemovedTasks([])
    }

    function handleRemove(task: any) {
        removeTask(task.id);
        setRemovedTasks([...removedTasks, task]);
    }

    function remove(task: any) {
        const remove = confirm("Deseja apagar de vez?\n")
        if(remove === false) return;
        setRemovedTasks(removedTasks.filter(t => t.id !== task.id))
    }

    function handleRestore(task: any) {
        addTask(task.text); 
        setRemovedTasks(removedTasks.filter(t => t.id !== task.id));
    }

    return (
        <section className={styles.container}>
            <div className={styles.handleArea}>
                <div className={styles.inputArea}>
                    <input 
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Digite uma nova tarefa"
                        onKeyDown={(e) => {
                            if(e.key === "Enter") {
                                handleAdd();
                            }
                        }}
                    />
                    <button onClick={handleAdd}>Adicionar</button>
                </div>

                <div className={styles.text}>
                    <p style={{color: "#000000"}}>Total: {total}</p>
                    <p style={{color: "#008026"}}>Concluídas: {concluidas}</p>
                </div>
            </div>
            <div className={styles.listArea}>
                <ul className={styles.listsArea}>
                    <h3 style={{borderBottom: "1px solid black", marginBottom: ".5rem"}}>Tarefas</h3>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <input 
                                type="checkbox"
                                checked={task.done}
                                className={styles.checkbox}
                                onChange={() => toggleTask(task.id)}
                            />
                            <span 
                                className={`${styles.tasks} ${task.done ? styles.pintado : styles.desPintado}`} 
                                onClick={() => {
                                    const newText = prompt("Digite a tarefa:");
                                    if(newText === null) return;
                                    editTask(task.id, newText);
                                }}
                            >
                                {task.text}
                            </span>
                            <button onClick={() => handleRemove(task)} className={styles.btnX} >✖</button>
                        </li>
                    ))}
                </ul>

                {
                    removedTasks.length > 0 ? 
                        <>
                            <ul className={styles.removedList}>
                                <h3 style={{borderBottom: "1px solid black", marginBottom: ".5rem"}}>Removidas</h3>
                                {removedTasks.map(task => (
                                    <li key={task.id}>
                                        <span className={styles.tasks}>{task.text}</span>
                                        <button onClick={() => handleRestore(task)} style={{backgroundColor: "#2E86C1"}}>↩</button>
                                        <button onClick={() => remove(task)} style={{backgroundColor: "#C0392B"}}>✖</button>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => removeAll()}>Remover todos</button>
                        </>
                    : <></>
                }
            </div>
        </section>
    );
}



export default TaskList;