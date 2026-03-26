import './PriorityBadge.css';

const PRIORITY_COLORS = {
  Low: '#4caf50',
  Medium: '#ff9800',
  High: '#f44336',
  Urgent: '#9c27b0',
};

function PriorityBadge({ priority }) {
  const color = PRIORITY_COLORS[priority] || '#888';

  return (
    <span
      className="priority-badge"
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      {priority}
    </span>
  );
}

export default PriorityBadge;
