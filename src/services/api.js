const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function getCards() {
  const res = await fetch(`${API_URL}/api/cards`);
  if (!res.ok) throw new Error('Erro ao buscar cards');
  return res.json();
}

export async function createCard(card) {
  const res = await fetch(`${API_URL}/api/cards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  });
  if (!res.ok) throw new Error('Erro ao criar card');
  return res.json();
}

export async function updateCard(id, card) {
  const res = await fetch(`${API_URL}/api/cards/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(card),
  });
  if (!res.ok) throw new Error('Erro ao atualizar card');
  return res.json();
}

export async function moveCard(id, status) {
  const res = await fetch(`${API_URL}/api/cards/${id}/move`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Erro ao mover card');
  return res.json();
}

export async function deleteCard(id) {
  const res = await fetch(`${API_URL}/api/cards/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao deletar card');
}
