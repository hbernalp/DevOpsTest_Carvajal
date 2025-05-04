#!/bin/bash
source .env

# DOCKER_USERNAME="hbernalp"  
IMAGE_NAME="clima"                      
TAG="latest"                            

# Primero se construye la imagen de Docker
echo "Construyendo la imagen Docker..."
docker build -t $DOCKER_USERNAME/$IMAGE_NAME:$TAG .

# Segundo se Inicia la sesión en Docker Hub
echo " Iniciando sesión en Docker Hub..."
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

# Tercero de sube la imagen
echo " Subiendo imagen a Docker Hub..."
docker push $DOCKER_USERNAME/$IMAGE_NAME:$TAG

# Cuarto se cierra la sesion de Docker
docker logout
echo "¡Imagen subida correctamente a Docker Hub!"