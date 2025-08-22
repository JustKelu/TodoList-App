import { useState } from 'react';
import TodosCards from './TodosCards';
import '../styles/todos.css';

export default function Todos() {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [refreshTodos, setRefreshTodos] = useState(0);
    const [filter, setFilter] = useState('TUTTE');
    const [totalTodos, setTotalTodos] = useState(0);
    const [inProgress, setInProgress] = useState(0);
    const [completed, setCompleted] = useState(0);

    const handleCreate = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch(`http://localhost:8000/users/${userId}/todos`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title,
                    text: text
                })
            });

            if (response.ok) {
                setTitle('');
                setText('');
                setRefreshTodos(prev => prev + 1);
            }
        } catch (err) {
            console.error(`Failed to create a new to-do: ${err}`);
        }
    }

    const triggerRefresh = () => {
        setRefreshTodos(prev => prev + 1);
    };

    return (
        <main>
            {/* Header Section */}
            <section className="todos-header">
                <header>
                    <h1>Le mie attività</h1>
                    <p>Organizza e gestisci le tue attività quotidiane</p>
                </header>
                <div className="todos-stats">
                    <div className="stat">
                        <strong>{totalTodos}</strong>
                        <span>Totali</span>
                    </div>
                    <div className="stat">
                        <strong>{completed}</strong>
                        <span>Completate</span>
                    </div>
                    <div className="stat">
                        <strong>{inProgress}</strong>
                        <span>Da fare</span>
                    </div>
                </div>
            </section>

            {/* Add Todo Section */}
            <section className="add-todo">
                <header>
                    <h2>Aggiungi nuova attività</h2>
                </header>
                <form className="todo-form" onSubmit={handleCreate}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Cosa vuoi fare oggi?"
                            className="todo-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Descrivi brevemente il tuo piano"
                            className="todo-input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button type="submit" className="btn-primary">
                            Aggiungi
                        </button>
                    </div>
                </form>
            </section>

            {/* Todos List Section */}
            <section className="todos-list">
                <header>
                    <h2>Le tue attività</h2>
                    <div className="list-filters">
                        <button 
                            className={filter === 'TUTTE' ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setFilter('TUTTE')}
                        >
                            TUTTE
                        </button>
                        <button 
                            className={filter === 'DA_FARE' ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setFilter('DA_FARE')}
                        >
                            DA FARE
                        </button>
                        <button 
                            className={filter === 'COMPLETATE' ? 'filter-btn active' : 'filter-btn'}
                            onClick={() => setFilter('COMPLETATE')}
                        >
                            COMPLETATE
                        </button>
                    </div>
                </header>
                
                <div className="todos-grid">
                    <TodosCards 
                        refreshTrigger={refreshTodos}
                        onTodoChange={triggerRefresh}
                        filter={filter}
                        setTotalTodos={setTotalTodos}
                        setInProgress={setInProgress}
                        setCompleted={setCompleted}
                    />  
                </div>
            </section>

            {/* Empty State (da mostrare quando non ci sono todos) */}
            <section className="empty-state" style={{display: 'none'}}>
                <div className="empty-content">
                    <div className="empty-icon">📝</div>
                    <h2>Nessuna attività</h2>
                    <p>Inizia aggiungendo la tua prima attività!</p>
                    <button className="btn-primary">Aggiungi attività</button>
                </div>
            </section>
        </main>
    );
}