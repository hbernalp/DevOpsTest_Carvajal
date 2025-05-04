# Construcción utilizando framework vite
FROM node:alpine AS builder

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build  # Vite genera los archivos en /app/dist

# Enviando a produccion
FROM node:alpine

WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package*.json .
RUN npm install -g serve  # Instalar 'serve' globalmente

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000", "--no-clipboard"]

