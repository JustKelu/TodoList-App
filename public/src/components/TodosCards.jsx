import { useState, useEffect } from "react";

export default function TodosCards({ refreshTrigger, filter, setTotalTodos, setCompleted, setInProgress}) {
    const [myTodos, setMyTodos] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [cancelId, setCancelId] = useState(null);
    const [editForm, setEditForm] = useState({title: '', text: ''});

    useEffect(() => {
        async function allTodos() {
            const token = localStorage.getItem("token")
            const userId = localStorage.getItem('userId');

            const response = await fetch(`http://localhost:8000/users/${userId}/todos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json();
            setMyTodos(data);
        }
        allTodos();
    }, [refreshTrigger]);

    useEffect(() => {
        setTotalTodos(myTodos.length);
        setInProgress(myTodos.filter(todo => !todo.completed).length);
        setCompleted(myTodos.filter(todo => todo.completed).length);
    }, [myTodos, setTotalTodos, setInProgress, setCompleted]);

    const getFilteredTodos = () => {
        switch (filter) {
            case 'DA_FARE':
                return myTodos.filter(todo => !todo.completed);
            case 'COMPLETATE':
                return myTodos.filter(todo => todo.completed);
            case 'TUTTE':
                default:
                return myTodos;
        }
    };

    const filteredTodos = getFilteredTodos();

    const handleComplete = async (todoId) => {  
        
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem('userId');

        const currentTodo = myTodos.find(todo => todo.id === todoId);
        const currentCompleted = currentTodo.completed;  
        
        const newCompleted = !currentCompleted;
        
        try {
            await fetch(`http://localhost:8000/users/${userId}/todos/${todoId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    completed: newCompleted
                })
            });
        } catch (err) {
            return err;
        }

        setMyTodos(prevTodos => 
            prevTodos.map(todo => 
                todo.id === todoId 
                    ? { ...todo, completed: !todo.completed }  
                    : todo  
            )
        );
    }

    const startDelete = (todo) => {
        setCancelId(todo.id);
    };

    const cancelDelete = () => {
        setCancelId(null);
    };
    
    const handleDelete = async (todoId) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch(`http://localhost:8000/users/${userId}/todos/${todoId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setMyTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
                cancelDelete();
            }
        } catch (err) {
            console.log("Something goes wrong: " + err);
        }
    }

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditForm({title: todo.title, text: todo.text});
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({title: '', text: ''});
    };    

    const saveEdit = async (todoId) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem('userId');


        try {
            const response = await fetch(`http://localhost:8000/users/${userId}/todos/${todoId}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: editForm.title,
                    text: editForm.text
                })
            });
            
            if (response.ok) {
                setMyTodos(prevTodos => 
                    prevTodos.map(todo => 
                        todo.id === todoId 
                            ? { ...todo, title: editForm.title, text: editForm.text }
                            : todo
                    )
                );
            }

            cancelEdit();            
        } catch (err) {
            console.log("Something goes wrong: " + err);
        }

    }

    return (
        <div id="mytodos">
            {filteredTodos.map(todos => {
                return (
                    <article className="todo-item" key={todos.id}>
                        <div className="todo-content">
                            { todos.id === editingId ? (
                                <div className="edit-form">
                                    <input 
                                        type="text"
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                        placeholder="Titolo"
                                    />
                                    <textarea 
                                        value={editForm.text}
                                        onChange={(e) => setEditForm({...editForm, text: e.target.value})}
                                        placeholder="Descrizione"
                                    />
                                    <div className="edit-buttons">
                                        <button onClick={() => saveEdit(todos.id)}>💾</button>
                                        <button onClick={cancelEdit}>❌</button>
                                    </div>
                                </div>
                            ) : todos.id === cancelId ? (
                                <div className="cancel-form">
                                    <h1>Sei sicuro di voler cancellare questa task?</h1>
                                    <div className="cancel-buttons">
                                        <button className="confirm-cancel-btn" onClick={() => handleDelete(todos.id)}>✅</button>
                                        <button className="abort-cancel-btn" onClick={cancelDelete}>❌</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <button 
                                        className={todos.completed ? "todo-checkbox" : "todo-checkbox-false"}
                                        title="Check" 
                                        onClick={() => handleComplete(todos.id)}
                                    >
                                        {todos.completed ? "✅" : "❌"}
                                    </button>
                                    <div className="todo-details">
                                        <h3>{todos.title}</h3>
                                        <p>{todos.text}</p>
                                    </div>
                                </>
                            )}
                        </div>
                        { todos.id === editingId || todos.id === cancelId ? null : (
                            <div className="todo-actions">
                                <button className="edit-btn" title="Modifica" onClick={() => startEdit(todos)}>✏️</button>
                                <button className="delete-btn" title="Elimina" onClick={() => startDelete(todos)}>🗑️</button>
                            </div>
                        )}
                    </article>
                )
            })}
        </div>
    )
}

                    