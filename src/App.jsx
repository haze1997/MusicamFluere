import { useState, useEffect } from 'react';
import EditMusicModal from './components/EditMusicModal';
import ArtistModal from './components/ArtistModal';
import ViewMusicModal from './components/ViewMusicModal';
import Avatar from './components/Avatar';
import { getMusics, getArtists, createMusic, updateMusic, deleteMusic, createArtist, updateArtist, deleteArtist } from './services/api';
import './App.css';

const GENRES = ['Todos', 'Rock', 'Pop', 'Reggae', 'Eletronica', 'Rap'];

const GENRE_COLORS = {
  Rock: 'var(--color-rock)',
  Pop: 'var(--color-pop)',
  Reggae: 'var(--color-reggae)',
  Eletronica: 'var(--color-eletronica)',
  Rap: 'var(--color-rap)',
};

function extractYoutubeThumb(url = '') {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
}

function App() {
  const [musics, setMusics] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [artistModalOpen, setArtistModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [editingMusic, setEditingMusic] = useState(null);
  const [viewingMusic, setViewingMusic] = useState(null);
  const [editingArtist, setEditingArtist] = useState(null);
  const [message, setMessage] = useState('');

  const [activeGenre, setActiveGenre] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const showMessage = (msg, isError = false) => {
    if (isError) setError(msg);
    else setMessage(msg);
    setTimeout(() => {
      setError(null);
      setMessage('');
    }, 4000);
  };

  const fetchData = async () => {
    try {
      setError(null);
      const [musicsData, artistsData] = await Promise.all([getMusics(), getArtists()]);
      setMusics(musicsData);
      setArtists(artistsData);
    } catch (err) {
      showMessage('Erro ao carregar dados. Verifique se o backend está rodando.', true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreateMusic = () => {
    setEditingMusic(null);
    setEditModalOpen(true);
  };

  const handleOpenCreateArtist = () => {
    setEditingArtist(null);
    setArtistModalOpen(true);
  };

  const handleEditArtist = (artist) => {
    setEditingArtist(artist);
    setArtistModalOpen(true);
  };

  const handleDeleteArtist = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar este artista?')) return;
    try {
      await deleteArtist(id);
      //setArtists((prev) => prev.filter((a) => a.id !== id));
      showMessage('Artista deletado com sucesso!');
      fetchData();
    } catch (err) {
      console.error(err);
      showMessage('Erro ao deletar artista.', true);
    }
  };

  const handleViewMusic = (music) => {
    setViewingMusic(music);
    setViewModalOpen(true);
  };

  const handleEditClick = (music) => {
    setViewModalOpen(false);
    setEditingMusic(music);
    setEditModalOpen(true);
  };

  const handleSaveMusic = async (musicData, selectedArtistId, addToAnotherArtist) => {
    try {
      if (editingMusic) {
        await updateMusic(musicData);
        if (addToAnotherArtist && selectedArtistId) {
          await createMusic(selectedArtistId, musicData);
        }
        showMessage('Música atualizada com sucesso!');
        fetchData();
      } else {
        await createMusic(selectedArtistId, musicData);
        showMessage('Música criada com sucesso!');
        fetchData();
      }
    } catch (err) {
      console.error(err);
      showMessage(err.message || 'Erro ao salvar música.', true);
    }
  };

  const handleSaveArtist = async (artistData) => {
    try {
      if (artistData.id) {
        await updateArtist(artistData);
        showMessage('Artista atualizado com sucesso!');
      } else {
        await createArtist(artistData);
        showMessage('Artista criado com sucesso!');
      }
      fetchData();
    } catch (err) {
      console.error(err);
      showMessage(err.message || 'Erro ao salvar artista.', true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMusic(id);
      setMusics((prev) => prev.filter((m) => m.id !== id));
      showMessage('Música deletada com sucesso!');
    } catch (err) {
      console.error(err);
      showMessage('Erro ao deletar música.', true);
    }
  };

  const filtered = musics.filter((m) => {
    const matchGenre = activeGenre === 'Todos' || m.genre === activeGenre;
    const matchSearch = !searchTerm || m.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchGenre && matchSearch;
  });

  if (loading) {
    return (
      <div className="app">
        <div className="app__loading">
          <div className="spinner" />
          <span>Carregando músicas...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* ── Sidebar ────────────────────────── */}
      <aside className="sidebar">
        <div className="sidebar__brand">
          <span className="sidebar__logo">♪</span>
          <h1 className="sidebar__title">Musicam Fluere</h1>
        </div>

        <nav className="sidebar__nav">
          <span className="sidebar__section-title">Gêneros</span>
          {GENRES.map((g) => (
            <button
              key={g}
              className={`sidebar__link ${activeGenre === g ? 'sidebar__link--active' : ''}`}
              onClick={() => setActiveGenre(g)}
            >
              {g !== 'Todos' && (
                <span className="sidebar__dot" style={{ background: GENRE_COLORS[g] }} />
              )}
              {g}
              {g !== 'Todos' && (
                <span className="sidebar__badge">
                  {musics.filter((m) => m.genre === g).length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar__artists">
          <div className="sidebar__artists-header">
            <span className="sidebar__section-title">Artistas</span>
            <button className="sidebar__add-btn" onClick={handleOpenCreateArtist} title="Novo Artista">+</button>
          </div>
          <div className="sidebar__artists-list">
            {artists.map((a) => (
              <div key={a.id} className="sidebar__artist-item">
                <Avatar name={a.name} urlImage={a.urlImage} />
                <span className="sidebar__artist-name">{a.name}</span>
                <div className="sidebar__artist-actions">
                  <button
                    className="sidebar__artist-btn"
                    onClick={() => handleEditArtist(a)}
                    title="Editar artista"
                  >
                    ✎
                  </button>
                  <button
                    className="sidebar__artist-btn sidebar__artist-btn--delete"
                    onClick={() => handleDeleteArtist(a.id)}
                    title="Deletar artista"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            {artists.length === 0 && (
              <p className="sidebar__empty">Nenhum artista</p>
            )}
          </div>
        </div>
      </aside>

      {/* ── Main content ──────────────────── */}
      <main className="main">
        {/* Top bar */}
        <header className="topbar">
          <div className="topbar__search">
            <svg className="topbar__search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              className="topbar__input"
              type="text"
              placeholder="Buscar músicas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="topbar__btn" onClick={handleOpenCreateMusic}>
            + Nova Música
          </button>
        </header>

        {/* Notifications */}
        {error && <div className="toast toast--error">{error}</div>}
        {message && <div className="toast toast--success">{message}</div>}

        {/* Stats row */}
        <div className="stats-row">
          <div className="stats-row__item"><strong>{musics.length}</strong><span>Músicas</span></div>
          <div className="stats-row__item"><strong>{artists.length}</strong><span>Artistas</span></div>
          <div className="stats-row__item"><strong>{musics.filter((m) => m.linkYoutube).length}</strong><span>Com vídeo</span></div>
          <div className="stats-row__item"><strong>{musics.filter((m) => m.cover).length}</strong><span>Covers</span></div>
        </div>

        {/* Section title */}
        <h2 className="section-title">
          {activeGenre === 'Todos' ? 'Todas as músicas' : activeGenre}
          <span className="section-title__count">{filtered.length}</span>
        </h2>

        {/* Music grid */}
        <div className="music-grid">
          {filtered.map((music) => {
            const thumb = extractYoutubeThumb(music.linkYoutube);
            const genreColor = GENRE_COLORS[music.genre] || '#888';
            return (
              <article
                key={music.id}
                className="music-card"
                onClick={() => handleViewMusic(music)}
              >
                <div className="music-card__cover">
                  {thumb ? (
                    <img src={thumb} alt={music.title} />
                  ) : (
                    <div className="music-card__placeholder">♪</div>
                  )}
                  <button
                    className="music-card__play"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewMusic(music);
                    }}
                    title="Ver detalhes"
                  >
                    ▶
                  </button>
                </div>
                <div className="music-card__info">
                  <h3 className="music-card__title">{music.title}</h3>
                  <p className="music-card__meta">
                    {music.artists && music.artists.map((a) => a.name).join(', ')}
                  </p>
                  <div className="music-card__tags">
                    <span className="music-card__genre" style={{ color: genreColor }}>{music.genre}</span>
                    {music.cover && <span className="music-card__badge">Cover</span>}
                  </div>
                </div>
                <button
                  className="music-card__delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(music.id);
                  }}
                  title="Deletar"
                >
                  ×
                </button>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="music-grid__empty">
              <p>Nenhuma música encontrada</p>
            </div>
          )}
        </div>
      </main>

      {/* ── Modais ─────────────────────────── */}
      <EditMusicModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveMusic}
        editingMusic={editingMusic}
        artists={artists}
      />

      <ArtistModal
        isOpen={artistModalOpen}
        onClose={() => { setArtistModalOpen(false); setEditingArtist(null); }}
        onSave={handleSaveArtist}
        editingArtist={editingArtist}
      />

      <ViewMusicModal
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        music={viewingMusic}
        onEdit={() => handleEditClick(viewingMusic)}
      />
    </div>
  );
}

export default App;
