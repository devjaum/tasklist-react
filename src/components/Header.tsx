interface HeaderProps {
    title: string;
}

export default function Header({title} : HeaderProps){
    return (
        <header style={{  
            display: "flex",
            flexDirection: "column",
            margin: "2rem auto",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fafafa",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            width: "20rem"
            }}>
                <h1>{title}</h1>
                <p>Organize suas tarefas do dia!</p>
        </header>
    );
}