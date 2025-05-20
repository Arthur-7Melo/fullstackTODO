import { useState } from "react";
import API from "../api/axiosInstance";
import { createTodo } from "../api/todos";
import './css/createTodoModal.css'

export default function CreateTodoModal({ onCreated, onClose }) {
  const [form, setForm] = useState(
    {
      title: '',
      description: '',
      priority: 'baixa',
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTodo = await createTodo(form);
    onCreated(newTodo);
    onClose();
    window.location.reload();
  }

  return (
    <div className="modal-backdrop">
      <form className="modal" onSubmit={handleSubmit}>
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

        <label htmlFor="priority">Prioridade:</label>
        <select
          id="priority"
          value={form.priority}
          onChange={e => setForm({ ...form, priority: e.target.value })}
          required
        >
          <option value="baixa">Baixa</option>
          <option value="alta">Alta</option>
        </select>

        <div className="modal-action">
          <button type="button" onClick={onClose}>Cancelar</button>
          <button type="submit">Criar</button>
        </div>
      </form>
    </div>
  );
}