import { useState } from 'react';
import PriorityBadge from './PriorityBadge';
import Avatar from './Avatar';
import './Card.css';

function Card({ card, onEdit, onDelete }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`card ${isDragging ? 'card--dragging' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onEdit(card)}
    >
      <div className="card__header">
        <h4 className="card__title">{card.title}</h4>
        <button
          className="card__delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
          title="Deletar card"
        >
          ×
        </button>
      </div>

      {card.description && (
        <p className="card__description">{card.description}</p>
      )}

      <div className="card__footer">
        <div className="card__assignee-info">
          <Avatar name={card.assignee} />
          <span className="card__assignee">{card.assignee}</span>
        </div>
        <PriorityBadge priority={card.priority} />
      </div>
    </div>
  );
}

export default Card;
