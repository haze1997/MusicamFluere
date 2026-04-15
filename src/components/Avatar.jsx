import './Avatar.css';

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getColor(name) {
  if (!name) return '#888';
  // Gera uma cor determinística baseada no nome
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 45%)`;
}

function Avatar({ name }) {
  const initials = getInitials(name);
  const color = getColor(name);

  return (
    <div
      className="avatar"
      style={{ backgroundColor: color }}
      title={name}
    >
      {initials}
    </div>
  );
}

export default Avatar;
