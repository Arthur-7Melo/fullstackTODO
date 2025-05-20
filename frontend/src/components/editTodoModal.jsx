import { useState, useEffect } from "react";
import { updateTodo } from "../api/todos";
import './css/editTodoModal.css';

export default function EditTodoModal({ todo, onUpdated, onClose }) {
  const [form, setForm] = useState({ title: '', description: '', priority: 'baixa' });

  useEffect(() => {
    setForm({
      title: todo.title,
      description: todo.description || '',
      priority: todo.priority
    });
  }, [todo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idKey = todo.id ?? todo._id;
    const updated = await updateTodo(idKey, form);
    onUpdated(updated);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={handleSubmit}>
        <h2>Editar TODO</h2>
        <input
          placeholder="Título"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Descrição"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <select
          value={form.priority}
          onChange={e => setForm({ ...form, priority: e.target.value })}
        >
          <option value="baixa">Baixa</option>
          <option value="alta">Alta</option>
        </select>

        <div className="modal-action">
          <button type="button" onClick={onClose}>Cancelar</button>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
}
