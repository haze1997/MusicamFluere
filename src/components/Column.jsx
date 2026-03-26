import Card from './Card';
import './Column.css';

const STATUS_COLORS = {
  Backlog: '#9e9e9e',
  ToDo: '#2196f3',
  Doing: '#ff9800',
  Testing: '#9c27b0',
  Done: '#4caf50',
};

function Column({ title, cards, onEdit, onDelete }) {
  const color = STATUS_COLORS[title] || '#888';

  return (
    <div className="column" style={{ borderTopColor: color }}>
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
          <p className="column__empty">Nenhum card</p>
        )}
      </div>
    </div>
  );
}

export default Column;
