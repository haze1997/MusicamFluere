import { useState, useEffect } from 'react';
import Board from './components/Board';
import CardModal from './components/CardModal';
import { getCards, createCard, updateCard, moveCard, deleteCard } from './services/api';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado do modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const fetchCards = async () => {
    try {
      setError(null);
      const data = await getCards();
      setCards(data);
    } catch (err) {
      setError('Erro ao carregar cards. Verifique se o backend esta rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Abre modal para criar
  const handleOpenCreate = () => {
    setEditingCard(null);
    setModalOpen(true);
  };

  // Abre modal para editar
  const handleEdit = (card) => {
    setEditingCard(card);
    setModalOpen(true);
  };

  // Salva (criar ou editar)
  const handleSave = async (cardData) => {
    try {
      if (editingCard) {
        // Editar — usa PUT
        const updated = await updateCard(editingCard.id, cardData);
        setCards((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      } else {
        // Criar — usa POST
        const created = await createCard(cardData);
        setCards((prev) => [...prev, created]);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar card.');
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

      <Board
        cards={cards}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <button className="fab" onClick={handleOpenCreate} title="Novo Card">
        +
      </button>

      <CardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingCard={editingCard}
      />
    </div>
  );
}

export default App;
