FROM node:20-alpine

WORKDIR /app

# Copy package.json and lockfile
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
