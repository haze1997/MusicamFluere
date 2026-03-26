import { useState, useEffect } from 'react';
import Modal from './Modal';
import './CardModal.css';

function CardModal({ isOpen, onClose, onSave, editingCard }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Backlog');

  // Quando o modal abre, preenche os campos (edição) ou limpa (criação)
  useEffect(() => {
    if (isOpen) {
      if (editingCard) {
        setTitle(editingCard.title);
        setDescription(editingCard.description);
        setAssignee(editingCard.assignee);
        setPriority(editingCard.priority);
        setStatus(editingCard.status);
      } else {
        setTitle('');
        setDescription('');
        setAssignee('');
        setPriority('Medium');
        setStatus('Backlog');
      }
    }
  }, [isOpen, editingCard]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Titulo e obrigatorio!');
      return;
    }

    onSave({ title, description, assignee, priority, status });
    onClose();
  };

  const isEditing = !!editingCard;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Card' : 'Novo Card'}
    >
      <form className="card-modal-form" onSubmit={handleSubmit}>
        <label className="card-modal-form__label">
          Titulo *
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="card-modal-form__input"
            autoFocus
          />
        </label>

        <label className="card-modal-form__label">
          Descricao
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="card-modal-form__textarea"
            rows={3}
          />
        </label>

        <label className="card-modal-form__label">
          Responsavel
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="card-modal-form__input"
          />
        </label>

        <div className="card-modal-form__row">
          <label className="card-modal-form__label">
            Prioridade
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="card-modal-form__select"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </label>

          <label className="card-modal-form__label">
            Status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="card-modal-form__select"
            >
              <option value="Backlog">Backlog</option>
              <option value="ToDo">ToDo</option>
              <option value="Doing">Doing</option>
              <option value="Testing">Testing</option>
              <option value="Done">Done</option>
            </select>
          </label>
        </div>

        <button type="submit" className="card-modal-form__button">
          {isEditing ? 'Salvar Alteracoes' : 'Criar Card'}
        </button>
      </form>
    </Modal>
  );
}

export default CardModal;
