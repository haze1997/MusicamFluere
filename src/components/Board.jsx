import Column from './Column';
import './Board.css';

const STATUSES = ['Backlog', 'ToDo', 'Doing', 'Testing', 'Done'];

function Board({ cards, onMove, onDelete }) {
  return (
    <div className="board">
      {STATUSES.map((status) => (
        <Column
          key={status}
          title={status}
          cards={cards.filter((card) => card.status === status)}
          onMove={onMove}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default Board;
