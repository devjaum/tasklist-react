import Header from "../components/Header";
import TaskList from "../components/TaskList";
import styles from "./Home.module.css"
export default function Home() {
    return(
        <section className={styles.header}>
            <header>
                <Header title="Lista de Tarefas" />
            </header>
            <main>
                <TaskList />
            </main>
        </section>
    );
}