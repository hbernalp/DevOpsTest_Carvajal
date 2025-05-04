# 🌤️ Clima App - Dockerizada

Aplicación web de consulta del clima con tres ciudades al mismo tiempo, esta construida con React, utilizando framework Vite.
Se ha Llevando a Docker y desplegando en un contenedor.

![Docker](https://img.shields.io/badge/Docker-✓-blue?logo=docker)
![Vite](https://img.shields.io/badge/Vite-✓-yellow?logo=vite)

## 📦 Prerrequisitos

- Docker 20.10+
- Cuenta en Docker Hub (solo para despliegue)

## 🚀 Despliegue Rápido


docker run -d -p 3000:3000 --name clima-app tu_usuario/clima:latest
Accede en: http://localhost:3000


## 🔧 Configuración
Se cuenta con un archivo de Variables de Entorno, .env el cual administra los datos de autenticacion al consumo de la API
puede configurar sus datos despues de hacer el registro en la pagina del fabricante https://openweathermap.org

DOCKER_USERNAME=hbernalp
DOCKER_PASSWORD=xxxxxxxxxxxxx








