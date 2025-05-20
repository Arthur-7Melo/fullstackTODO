import { useState } from "react";
import { deleteTodo } from "../api/todos";
import EditTodoModal from "./editTodoModal";
import './css/todoItem.css';

export default function TodoItem({ todo, onUpdated, onDeleted }) {
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    const idKey = todo.id ?? todo._id;
    if (confirm('Deseja excluir este Todo?')) {
      await deleteTodo(idKey);
      onDeleted(idKey);
      window.location.reload();
    }
  };

  return (
    <>
      <div className="todo-item" onClick={() => setShowEdit(true)}>
        <button className="delete-btn" onClick={handleDelete}>X</button>
        <h3>{todo.title}</h3>
        <p>{todo.description || 'Sem descrição.'}</p>
        <div className={`priority-badge ${todo.priority}`}>{todo.priority}</div>
      </div>

      {showEdit && (
        <EditTodoModal
          todo={todo}
          onClose={() => setShowEdit(false)}
          onUpdated={(updated) => {
            onUpdated(updated);
            setShowEdit(false);
            window.location.reload()
          }}
        />
      )}
    </>
  );
}
