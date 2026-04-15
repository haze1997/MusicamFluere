FROM node:18-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências primeiro (para cache de camadas)
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm ci

# Copia todo o código-fonte
COPY . .

# Compila a aplicação para produção
RUN npm run build

# ============================================
# ESTÁGIO 2: Produção (Servir arquivos)
# ============================================
# Usa Nginx (servidor web leve) para servir os arquivos estáticos
FROM nginx:alpine

# Copia a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos compilados do estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
