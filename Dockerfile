FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy all.json dependensies and sending to container
COPY package*.json .

#Install dependencies to production only
RUN npm ci 
RUN npm install -g serve

COPY . .

#Create build version
RUN npm run build

#Exclude dependecies to development
RUN npm prune --production

EXPOSE 3000

#Principal prosses
CMD ["serve", "-s", "dist", "-l", "3000", "--no-clipboard"]

