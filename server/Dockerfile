# Use an official Node.js runtime as base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy application source code
COPY . .

ARG BASE_URL
ENV BASE_URL=$BASE_URL
ENV TZ=Asia/Manila

# Expose the port your app listens on
EXPOSE 5000

# Start the app
CMD ["node", "index.js"]
