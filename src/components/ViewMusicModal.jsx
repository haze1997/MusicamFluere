import Modal from './Modal';
import Avatar from './Avatar';
import './ViewMusicModal.css';

function extractYoutubeId(url = '') {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function ViewMusicModal({ isOpen, onClose, music, onEdit }) {
  if (!music) return null;

  const videoId = extractYoutubeId(music.linkYoutube);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

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

        <div className="view-music__body">
          {/* Coluna esquerda — vídeo */}
          <div className="view-music__left">
            {music.linkYoutube && embedUrl ? (
              <div className="view-music__video">
                <div className="view-music__iframe-wrap">
                  <iframe
                    src={embedUrl}
                    title={`Player de ${music.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <div className="view-music__no-video">
                <span>♪</span>
                <p>Sem vídeo disponível</p>
              </div>
            )}
          </div>

          {/* Coluna direita — letra */}
          <div className="view-music__right">
            <h4>Letra:</h4>
            <div className="view-music__lyrics-container">
              <pre className="view-music__lyrics">{music.lyrics || 'Sem letra cadastrada.'}</pre>
            </div>
          </div>
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
