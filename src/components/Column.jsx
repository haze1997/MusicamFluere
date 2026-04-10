import { useState } from 'react';
import Card from './Card';
import './Column.css';

const STATUS_COLORS = {
  Backlog: 'var(--color-backlog)',
  ToDo: 'var(--color-todo)',
  Doing: 'var(--color-doing)',
  Testing: 'var(--color-testing)',
  Done: 'var(--color-done)',
};

function Column({ title, cards, onEdit, onDelete, onMove }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const color = STATUS_COLORS[title] || '#888';

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    // Só desativa se saiu da coluna (não de um filho)
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const cardId = e.dataTransfer.getData('text/plain');
    if (cardId) {
      onMove(cardId, title);
    }
  };

  return (
    <div
      className={`column ${isDragOver ? 'column--drag-over' : ''}`}
      style={{ borderTopColor: color }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column__header">
        <h3 className="column__title" style={{ color }}>
          {title}
        </h3>
        <span className="column__count">{cards.length}</span>
      </div>

      <div className="column__cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {cards.length === 0 && (
          <p className="column__empty">
            {isDragOver ? 'Solte aqui!' : 'Nenhum card'}
          </p>
        )}
      </div>
    </div>
  );
}

export default Column;
