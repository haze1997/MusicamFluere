import './PriorityBadge.css';

const PRIORITY_CONFIG = {
  Low:    { color: 'var(--color-low)',    emoji: '🟢' },
  Medium: { color: 'var(--color-medium)', emoji: '🟡' },
  High:   { color: 'var(--color-high)',   emoji: '🔴' },
  Urgent: { color: 'var(--color-urgent)', emoji: '🔥' },
};

function PriorityBadge({ priority }) {
  const config = PRIORITY_CONFIG[priority] || { color: '#888', emoji: '' };

  return (
    <span
      className="priority-badge"
      style={{
        backgroundColor: `color-mix(in srgb, ${config.color} 20%, transparent)`,
        color: config.color,
      }}
    >
      {config.emoji} {priority}
    </span>
  );
}

export default PriorityBadge;
