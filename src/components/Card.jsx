import PriorityBadge from './PriorityBadge';
import './Card.css';

function Card({ card, onEdit, onDelete }) {
  return (
    <div className="card" onClick={() => onEdit(card)}>
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
        <span className="card__assignee">{card.assignee}</span>
        <PriorityBadge priority={card.priority} />
      </div>
    </div>
  );
}

export default Card;
