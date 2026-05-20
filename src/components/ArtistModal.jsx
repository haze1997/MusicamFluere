import { useState } from 'react';
import Modal from './Modal';
import './CardModal.css';

function ArtistModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [urlImage, setUrlImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Nome é obrigatório!');
      return;
    }
    onSave({ name, urlImage });
    onClose();
    setName('');
    setUrlImage('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Artista">
      <form className="card-modal-form" onSubmit={handleSubmit}>
        <label className="card-modal-form__label">
          Nome *
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="card-modal-form__input"
            autoFocus
          />
        </label>

        <label className="card-modal-form__label">
          URL da Imagem
          <input
            type="text"
            value={urlImage}
            onChange={(e) => setUrlImage(e.target.value)}
            className="card-modal-form__input"
          />
        </label>

        <button type="submit" className="card-modal-form__button" style={{marginTop: '20px'}}>
          Criar Artista
        </button>
      </form>
    </Modal>
  );
}

export default ArtistModal;
