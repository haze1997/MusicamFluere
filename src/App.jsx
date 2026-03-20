import { useState, useEffect } from 'react';
import Board from './components/Board';
import CardForm from './components/CardForm';
import { getCards, createCard, moveCard, deleteCard } from './services/api';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca os cards da API quando o componente monta
  const fetchCards = async () => {
    try {
      setError(null);
      const data = await getCards();
      setCards(data);
    } catch (err) {
      setError('Erro ao carregar cards. Verifique se o backend está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Cria um novo card
  const handleCreate = async (cardData) => {
    try {
      const created = await createCard(cardData);
      setCards((prev) => [...prev, created]);
    } catch (err) {
      console.error(err);
      alert('Erro ao criar card.');
    }
  };

  // Move card para outra coluna
  const handleMove = async (id, newStatus) => {
    try {
      const updated = await moveCard(id, newStatus);
      setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    } catch (err) {
      console.error(err);
      alert('Erro ao mover card.');
    }
  };

  // Deleta um card
  const handleDelete = async (id) => {
    try {
      await deleteCard(id);
      setCards((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar card.');
    }
  };

  if (loading) {
    return (
      <div className="app">
        <div className="app__loading">Carregando board...</div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Scrum Board</h1>
        <p>Gerencie suas tarefas com agilidade</p>
      </header>

      {error && <div className="app__error">{error}</div>}

      <CardForm onSubmit={handleCreate} />

      <Board
        cards={cards}
        onMove={handleMove}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
