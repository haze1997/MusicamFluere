import Column from './Column';
import './Board.css';

const STATUSES = ['Backlog', 'ToDo', 'Doing', 'Testing', 'Done'];

function Board({ cards, onEdit, onDelete }) {
  return (
    <div className="board">
      {STATUSES.map((status) => (
        <Column
          key={status}
          title={status}
          cards={cards.filter((card) => card.status === status)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default Board;
