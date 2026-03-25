import './Card.css';

const STATUSES = ['Backlog', 'ToDo', 'Doing', 'Testing', 'Done'];

function Card({ card, onMove, onDelete }) {
  return (
    <div className="card">
      <div className="card__header">
        <h4 className="card__title">{card.title}</h4>
        <button
          className="card__delete"
          onClick={() => onDelete(card.id)}
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
        <span className={`card__priority card__priority--${card.priority.toLowerCase()}`}>
          {card.priority}
        </span>
      </div>

      <select
        className="card__move"
        value={card.status}
        onChange={(e) => onMove(card.id, e.target.value)}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}

export default Card;
