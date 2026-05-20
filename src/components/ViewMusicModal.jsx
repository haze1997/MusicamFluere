import Modal from './Modal';
import Avatar from './Avatar';
import './ViewMusicModal.css';

function ViewMusicModal({ isOpen, onClose, music, onEdit }) {
  if (!music) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalhes da Música">
      <div className="view-music">
        <div className="view-music__header">
          <h2 className="view-music__title">{music.title}</h2>
          <div className="view-music__artists">
            {music.artists && music.artists.map((artist) => (
              <div key={artist.id} className="view-music__artist-item">
                <Avatar name={artist.name} urlImage={artist.urlImage} />
                <span className="view-music__artist-name">{artist.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="view-music__content">
          <h4>Letra:</h4>
          <div className="view-music__lyrics-container">
            <pre className="view-music__lyrics">{music.lyrics}</pre>
          </div>
          
          {music.linkYoutube && (
            <div className="view-music__link">
              <a href={music.linkYoutube} target="_blank" rel="noreferrer">
                Assistir no YouTube
              </a>
            </div>
          )}
        </div>

        <div className="view-music__actions">
          <button className="view-music__edit-btn" onClick={onEdit}>
            Editar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ViewMusicModal;
