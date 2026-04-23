import { useState } from 'react';
import MusicCard from './MusicCard';
import './Column.css';

const GENRE_COLORS = {
  Rock: 'var(--color-rock)',
  Pop: 'var(--color-pop)',
  Reggae: 'var(--color-reggae)',
  Eletronica: 'var(--color-eletronica)',
  Rap: 'var(--color-rap)',
};

function Column({ title, musics, onView, onDelete, onMove }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const color = GENRE_COLORS[title] || '#888';

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const musicId = e.dataTransfer.getData('text/plain');
    if (musicId) {
      onMove(musicId, title);
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
        <span className="column__count">{musics.length}</span>
      </div>

      <div className="column__cards">
        {musics.map((music) => (
          <MusicCard
            key={music.id}
            music={music}
            onView={onView}
            onDelete={onDelete}
          />
        ))}
        {musics.length === 0 && (
          <p className="column__empty">
            {isDragOver ? 'Solte aqui!' : 'Nenhuma música'}
          </p>
        )}
      </div>
    </div>
  );
}

export default Column;
