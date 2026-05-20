import Column from './Column';
import './Board.css';

const GENRES = ['Rock', 'Pop', 'Reggae', 'Eletronica', 'Rap'];

function Board({ musics, onView, onDelete, onMove }) {
  return (
    <div className="board">
      {GENRES.map((genre) => (
        <Column
          key={genre}
          title={genre}
          musics={musics.filter((music) => music.genre === genre)}
          onView={onView}
          onDelete={onDelete}
          onMove={onMove}
        />
      ))}
    </div>
  );
}

export default Board;
