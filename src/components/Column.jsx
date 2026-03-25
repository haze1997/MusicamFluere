import Card from './Card';
import './Column.css';

function Column({ title, cards, onMove, onDelete }) {
  return (
    <div className="column">
      <h3 className="column__title">{title}</h3>
      <div className="column__cards">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onMove={onMove}
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
