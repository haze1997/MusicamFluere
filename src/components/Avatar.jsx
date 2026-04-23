import './Avatar.css';

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getColor(name) {
  if (!name) return '#888';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 45%)`;
}

function Avatar({ name, urlImage }) {
  const initials = getInitials(name);
  const color = getColor(name);
  
  const isValidUrl = urlImage && (urlImage.startsWith('http') || urlImage.startsWith('data:image'));

  return (
    <div
      className="avatar"
      style={{ backgroundColor: color }}
      title={name}
    >
      {isValidUrl ? (
        <img src={urlImage} alt={name} className="avatar__img" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

export default Avatar;
