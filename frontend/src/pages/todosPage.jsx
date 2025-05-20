import { useEffect, useState } from "react";
import Navbar from '../components/navbar';
import TodoITem from "../components/todoItem";
import CreateTodoModal from "../components/createTodoModal";
import { fetchTodos } from "../api/todos";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);

  const handleFilter = async (filter) => {
    setLoading(true);
    const data = await fetchTodos(filter);
    console.log('fetchTodos retornou →', data);

    const list = Array.isArray(data)
      ? data
      : Array.isArray(data.todos)
        ? data.todos
        : [];

    setTodos(list);
    setLoading(false);
  }

  useEffect(() => {
    handleFilter('all');
  }, [])

  return (
    <div className="todos-page">
      <Navbar onFilter={handleFilter} />

      <main className="todos-container">
        <div className="todos-header">
          <h2>Seus TODOS</h2>
          <button onClick={() => setShowCreate(true)}>+ Novo</button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          todos.length === 0 ? (
            <p>Você ainda não possui nenhum Todo</p>
          ) : (
            <div className="todos-grid">
              {todos.map(todo => (
                <TodoITem
                  key={todo.id}
                  todo={todo}
                  onUpdated={updated =>
                    setTodos(prev => prev.map(t => t.id === updated.id ? updated : t))
                  }
                  onDeleted={id =>
                    setTodos(prev => prev.filter(t => t.id !== id))
                  }
                />
              ))}
            </div>
          )
        )
        }

        {showCreate &&
          (
            <CreateTodoModal
              onClose={() => setShowCreate(false)}
              onCreated={newTodo =>
                setTodos(prev => [newTodo, ...prev])
              }
            />
          )
        }
      </main>
    </div>
  );
}