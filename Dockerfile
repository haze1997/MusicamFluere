# ESTÁGIO 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ESTÁGIO 2: Produção
FROM nginx:alpine
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
# O Nginx Docker image substitui automaticamente ${PORT} no template
# A variável PORT é definida pelo Render
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
