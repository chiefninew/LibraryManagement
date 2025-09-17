FROM node:20-alpine

WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./

# Install all dependencies (include nodemon)
RUN npm install --only=production

# Copy source code
COPY . .

# Expose the port (change if needed)
EXPOSE 3000

# Start with nodemon (watch for file changes)
CMD ["npm", "start"]
