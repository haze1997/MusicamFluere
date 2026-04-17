import { useState, useEffect } from 'react';
import Board from './components/Board';
import EditMusicModal from './components/EditMusicModal';
import ArtistModal from './components/ArtistModal';
import ViewMusicModal from './components/ViewMusicModal';
import { getMusics, getArtists, createMusic, updateMusic, moveMusic, deleteMusic, createArtist } from './services/api';
import './App.css';

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
  const [message, setMessage] = useState('');

  const showMessage = (msg, isError = false) => {
    if (isError) setError(msg);
    else setMessage(msg);
    setTimeout(() => {
      setError(null);
      setMessage('');
    }, 5000);
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
    setArtistModalOpen(true);
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
        const updated = await updateMusic(musicData);
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
      await createArtist(artistData);
      showMessage('Artista criado com sucesso!');
      fetchData();
    } catch (err) {
      console.error(err);
      showMessage('Erro ao criar artista.', true);
    }
  };

  const handleMove = async (id, newGenre) => {
    try {
      setMusics(prev => prev.map(m => m.id === id ? { ...m, genre: newGenre } : m));
      await moveMusic(id, newGenre);
      fetchData();
    } catch (err) {
      console.error(err);
      showMessage('Erro ao mover música. A API pode não ter o endpoint implementado.', true);
      fetchData();
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

  if (loading) {
    return (
      <div className="app">
        <div className="app__loading">Carregando músicas...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="logo">Musicam Fluere</h1>
        <p>Gerencie suas músicas por estilo</p>
      </header>

      {error && <div className="app__error">{error}</div>}
      {message && <div className="app__message">{message}</div>}

      <Board
        musics={musics}
        onView={handleViewMusic}
        onDelete={handleDelete}
        onMove={handleMove}
      />

      <div className="fab-container">
        <button className="fab fab--artist" onClick={handleOpenCreateArtist} title="Novo Artista">
          +
        </button>
        <button className="fab" onClick={handleOpenCreateMusic} title="Nova Música">
          🎵
        </button>
      </div>

      <EditMusicModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveMusic}
        editingMusic={editingMusic}
        artists={artists}
      />

      <ArtistModal
        isOpen={artistModalOpen}
        onClose={() => setArtistModalOpen(false)}
        onSave={handleSaveArtist}
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
