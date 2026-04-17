const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function getArtists() {
  const res = await fetch(`${API_URL}/api/artists`);
  if (!res.ok) throw new Error('Erro ao buscar artistas');
  return res.json();
}

export async function getMusics() {
  const res = await fetch(`${API_URL}/api/artists/musics`);
  if (!res.ok) throw new Error('Erro ao buscar músicas');
  return res.json();
}

export async function createArtist(artist) {
  const res = await fetch(`${API_URL}/api/artists`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(artist),
  });
  if (!res.ok) throw new Error('Erro ao criar artista');
  return res.json();
}

export async function createMusic(artistId, music) {
  const res = await fetch(`${API_URL}/api/artists/${artistId}/music`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(music),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.aviso || 'Erro ao criar música');
  }
  return res.json();
}

export async function updateMusic(music) {
  const res = await fetch(`${API_URL}/api/artists/music`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(music),
  });
  if (!res.ok) throw new Error('Erro ao atualizar música');
  return res.json();
}

export async function moveMusic(id, genre) {
  // Chamada fictícia para o endpoint que moveria a música (sugestão no backend)
  const res = await fetch(`${API_URL}/api/artists/music/${id}/move`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ genre }),
  });
  if (!res.ok) throw new Error('Erro ao mover música');
  return res.json();
}

export async function deleteMusic(id) {
  const res = await fetch(`${API_URL}/api/artists/music/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Erro ao deletar música');
}
