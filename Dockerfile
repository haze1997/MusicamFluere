# ESTÁGIO 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# 1. Puxa a variável que o Render está enviando no momento do build
ARG VITE_API_URL
ARG PORT

# 2. Transforma o ARG em ENV para que o Vite consiga ler durante o comando abaixo
ENV VITE_API_URL=$VITE_API_URL
ENV PORT=$PORT

RUN npm run build

# ESTÁGIO 2: Produção
FROM nginx:alpine
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
# O Nginx Docker image substitui automaticamente ${PORT} no template
# A variável PORT é definida pelo Render
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
