import { useState } from "react"

function Todo(props) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between",
         border: "1px solid black", margin: 10, padding: 10 }}>
            {props.title}
            <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                <button type="button" onClick={() => props.editTodo(props.index)}> Edit </button>
                <button type="button" onClick={() => props.deleteTodo(props.index)}> Delete </button>
            </div>
        </div>
    )
}

export default function Todos() {
    const [input, setInput] = useState("")
    const [todos, setTodos] = useState([])
    const [editingIndex, setEditingIndex] = useState(null)

    function addTodo(e) {
        e.preventDefault();
        if (!input?.trim()) {
            return;
        }
        if(editingIndex !== null) {
            const updatedTodos = [...todos];
            updatedTodos[editingIndex] = input
            setTodos(updatedTodos)
            setEditingIndex(null)
        }
        else {
            setTodos([...todos, input]);
        }
        
        setInput("");
    }

    function editTodo(index) {
        setInput(todos[index]);
        setEditingIndex(index);
    }

    function deleteTodo(index) {
        const filteredTodos = todos.filter((t, i) => i !== index)
        setTodos(filteredTodos);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <div style={{ fontSize: 30, margin: 20 }}>
                <b>todo app.</b>
            </div>
            <form onSubmit={addTodo}>
                <div style={{ margin: 20, display: "flex", gap: 5 }}>
                    <input style={{ fontSize: 15, padding: 5 }} type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="enter a task." />
                    <button type="submit"> add todo </button>
                </div>
                {todos.length > 0 ? (
                    <div style={{ border: "2px solid black", margin: 10, alignItems: "center" }}>
                        {todos.map((t, index) => (<Todo key={index} title={t} index={index}
                                                        deleteTodo={deleteTodo}
                                                        editTodo={editTodo} />))}
                    </div>
                ) : (<div style={{ padding: 20, textAlign: "center" }}>
                    <p>No tasks added</p>
                </div>)}

            </form>
        </div>
    )
}

