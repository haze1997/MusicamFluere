import { useState, useEffect } from 'react';
import Modal from './Modal';
import './CardModal.css';

function ArtistModal({ isOpen, onClose, onSave, editingArtist }) {
  const [name, setName] = useState('');
  const [urlImage, setUrlImage] = useState('');

  const isEditing = !!editingArtist;

  useEffect(() => {
    if (isOpen) {
      if (editingArtist) {
        setName(editingArtist.name || '');
        setUrlImage(editingArtist.urlImage || '');
      } else {
        setName('');
        setUrlImage('');
      }
    }
  }, [isOpen, editingArtist]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Nome é obrigatório!');
      return;
    }
    const data = isEditing
      ? { id: editingArtist.id, name, urlImage }
      : { name, urlImage };
    onSave(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Editar Artista' : 'Novo Artista'}>
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
          {isEditing ? 'Salvar Alterações' : 'Criar Artista'}
        </button>
      </form>
    </Modal>
  );
}

export default ArtistModal;
