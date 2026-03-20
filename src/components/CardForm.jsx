import { useState } from 'react';
import './CardForm.css';

function CardForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Backlog');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Título é obrigatório!');
      return;
    }

    onSubmit({ title, description, assignee, priority, status });

    // Limpa o formulário
    setTitle('');
    setDescription('');
    setAssignee('');
    setPriority('Medium');
    setStatus('Backlog');
  };

  return (
    <form className="card-form" onSubmit={handleSubmit}>
      <h3 className="card-form__title">Novo Card</h3>

      <div className="card-form__fields">
        <input
          type="text"
          placeholder="Título *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="card-form__input"
        />

        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="card-form__input"
        />

        <input
          type="text"
          placeholder="Responsável"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="card-form__input"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="card-form__select"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="card-form__select"
        >
          <option value="Backlog">Backlog</option>
          <option value="ToDo">ToDo</option>
          <option value="Doing">Doing</option>
          <option value="Testing">Testing</option>
          <option value="Done">Done</option>
        </select>

        <button type="submit" className="card-form__button">
          Criar Card
        </button>
      </div>
    </form>
  );
}

export default CardForm;
