# Base image with Node.js
FROM node:22-slim

# Install system dependencies: g++, python, java
RUN apt-get update && apt-get install -y \
    g++ \
    python3 \
    python3-pip \
    openjdk-17-jdk \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables for Java
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package.json package-lock.json ./

# Install Node.js dependencies
RUN npm ci

# Copy the rest of the project
COPY . .

# Build Next.js app
RUN npm run build

# Expose port (default: 3000)
EXPOSE 3000

# Run in production mode
CMD ["npm", "start"]
