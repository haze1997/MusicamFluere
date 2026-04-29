# MusicamFluere

## Descrição
O **MusicamFluere** é uma aplicação web imersiva para o gerenciamento de sua biblioteca musical. Com um design moderno em *Dark Mode* inspirado em grandes plataformas de streaming, o sistema permite que você cadastre suas músicas favoritas, assista aos videoclipes embutidos, acompanhe as letras e organize tudo por gêneros e artistas de forma altamente visual e intuitiva.

## Funcionalidades
- **Biblioteca Musical (Dashboard):** Visualização em grade de todas as músicas cadastradas, com imagens, títulos e tags das músicas. Permitindo interação com as mesmas.
- **Gerenciamento de Músicas (CRUD):** 
  - Adição e edição completa de músicas (título, letra, link do YouTube, gênero e artista).
  - Categorização especial com tag de "Cover".
- **Reprodutor e Detalhes da Música:** Modal imersivo contendo o player de vídeo do YouTube embutido lado a lado com a letra da música.
- **Gerenciamento de Artistas:** Barra lateral dedicada para adicionar, listar, editar (nome e foto de perfil) e deletar artistas, com integração direta ao catálogo de músicas.
- **Navegação e Filtros:** Filtragem rápida de músicas por gêneros musicais através do menu lateral.
- **Estatísticas Rápidas:** Contador no painel principal exibindo o total de músicas, artistas, faixas com vídeo e covers.
- **Feedback Visual:** Alertas dinâmicos de sucesso ao criar, atualizar ou remover itens (músicas e artistas).

## Tecnologias Utilizadas
- **React (v19):** Biblioteca principal para a construção da interface de usuário.
- **Vite:** Ferramenta de build rápida e moderna para desenvolvimento.
- **JavaScript (ES6+):** Lógica da aplicação.
- **CSS3 Vanilla:** Estilização componentizada para garantir o visual sombrio (Dark Mode) e elegante.
- **Docker & Nginx:** Preparação estrutural para conteinerização e deploy do frontend.
- **ESLint:** Ferramenta de linting para garantir a padronização e qualidade do código.

## Como instalar e executar o projeto

### Pré-requisitos
- Node.js (versão recomendada v18+) ou Docker instalados na sua máquina.

### Opção 1: Rodando via NPM (Desenvolvimento local)

Abra o terminal e execute os comandos abaixo sequencialmente:

```bash
# 1. Clone o repositório
git clone https://github.com/haze1997/MusicamFluere.git

# 2. Acesse a pasta do projeto
cd MusicamFluere

# 3. Mude para a branch correta
git checkout v2-frontend-projeto-final

# 4. Instale as dependências
npm install

# 5. Inicie o servidor de desenvolvimento
npm run dev
```
Após iniciar o servidor, acesse o projeto no navegador em `http://localhost:5173`.

### Opção 2: Rodando via Docker (Produção)

Certifique-se de estar na pasta do projeto e na branch correta (`v2-frontend-projeto-final`). E estar rodando o backend do projeto que pode ser baixado em https://github.com/haze1997/MusicamFluereAPI

```bash
# 1. Construa a imagem Docker - comando de exemplo, certifique-se de especificar os args VITE_API_URL (URL para acessar o backend) e PORT (porta do frontend) corretamente
docker build --build-arg VITE_API_URL=http://localhost:5059 --build-arg PORT=80 -t musicamfluere-frontend .

# 2. Rode o container
docker run -p 8080:80 musicamfluere-frontend
```
Após o container iniciar, acesse no seu navegador através da porta mapeada, geralmente `http://localhost:8080`.

## Licença
Este projeto está licenciado sob os termos da **Apache License 2.0**. Consulte o arquivo `LICENSE` no repositório para mais detalhes.
`
