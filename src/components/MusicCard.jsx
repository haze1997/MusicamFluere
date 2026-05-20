import { useState } from 'react';
import './Card.css';

function MusicCard({ music, onView, onDelete }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', music.id);
    e.dataTransfer.effectAllowed = 'move';
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };
  
  const truncateLyrics = (text) => {
    if (!text) return '';
    return text.length > 70 ? text.substring(0, 70) + '...' : text;
  };

  return (
    <div
      className={`card ${isDragging ? 'card--dragging' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onView(music)}
    >
      <div className="card__header">
        <h4 className="card__title">{music.title}</h4>
        <button
          className="card__delete"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(music.id);
          }}
          title="Deletar música"
        >
          ×
        </button>
      </div>

      <p className="card__description">{truncateLyrics(music.lyrics)}</p>

      <div className="card__footer">
        <div className="card__assignee-info">
          {music.artists && music.artists.map(artist => (
             <span key={artist.id} className="card__artist-chip">
               {artist.name ? artist.name.charAt(0).toUpperCase() : '?'}
             </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MusicCard;
