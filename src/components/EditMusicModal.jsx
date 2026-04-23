import { useState, useEffect } from 'react';
import Modal from './Modal';
import './CardModal.css';

function EditMusicModal({ isOpen, onClose, onSave, editingMusic, artists }) {
  const [title, setTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [linkYoutube, setLinkYoutube] = useState('');
  const [genre, setGenre] = useState('Rock');
  const [cover, setCover] = useState(false);
  
  const [artistId, setArtistId] = useState('');
  const [addAnotherArtist, setAddAnotherArtist] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editingMusic) {
        setTitle(editingMusic.title || '');
        setLyrics(editingMusic.lyrics || '');
        setLinkYoutube(editingMusic.linkYoutube || '');
        setGenre(editingMusic.genre || 'Rock');
        setCover(editingMusic.cover || false);
        setArtistId('');
        setAddAnotherArtist(false);
      } else {
        setTitle('');
        setLyrics('');
        setLinkYoutube('');
        setGenre('Rock');
        setCover(false);
        setArtistId(artists && artists.length > 0 ? artists[0].id : '');
        setAddAnotherArtist(false);
      }
    }
  }, [isOpen, editingMusic, artists]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Título é obrigatório!');
      return;
    }

    if (!editingMusic && !artistId) {
      alert('Selecione um artista ao criar a música!');
      return;
    }

    const musicData = {
      id: editingMusic ? editingMusic.id : undefined,
      title,
      lyrics,
      linkYoutube,
      genre,
      cover
    };

    onSave(musicData, artistId, addAnotherArtist);
    onClose();
  };

  const isEditing = !!editingMusic;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Editar Música' : 'Nova Música'}
    >
      <form className="card-modal-form" onSubmit={handleSubmit}>
        <label className="card-modal-form__label">
          Título *
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="card-modal-form__input"
            autoFocus
          />
        </label>

        <label className="card-modal-form__label">
          Letra
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="card-modal-form__textarea"
            rows={4}
          />
        </label>

        <label className="card-modal-form__label">
          Link YouTube
          <input
            type="text"
            value={linkYoutube}
            onChange={(e) => setLinkYoutube(e.target.value)}
            className="card-modal-form__input"
          />
        </label>

        <div className="card-modal-form__row">
          <label className="card-modal-form__label">
            Gênero
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="card-modal-form__select"
            >
              <option value="Rock">Rock</option>
              <option value="Pop">Pop</option>
              <option value="Reggae">Reggae</option>
              <option value="Eletronica">Eletronica</option>
              <option value="Rap">Rap</option>
            </select>
          </label>
        </div>
        
        <label className="card-modal-form__label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type="checkbox"
            checked={cover}
            onChange={(e) => setCover(e.target.checked)}
          />
          É Cover?
        </label>

        {(!isEditing || addAnotherArtist) && (
          <label className="card-modal-form__label" style={{marginTop: '10px'}}>
            Artista *
            <select
              value={artistId}
              onChange={(e) => setArtistId(e.target.value)}
              className="card-modal-form__select"
              required={!isEditing || addAnotherArtist}
            >
              <option value="">Selecione um artista</option>
              {artists.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </label>
        )}

        {isEditing && (
          <label className="card-modal-form__label" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
            <input
              type="checkbox"
              checked={addAnotherArtist}
              onChange={(e) => setAddAnotherArtist(e.target.checked)}
            />
            Adicionar música ao artista
          </label>
        )}

        <button type="submit" className="card-modal-form__button" style={{marginTop: '20px'}}>
          {isEditing ? 'Salvar Alterações' : 'Criar Música'}
        </button>
      </form>
    </Modal>
  );
}

export default EditMusicModal;
