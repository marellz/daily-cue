# Dockerfile for Express.js API
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your Express.js server will run on
EXPOSE 5000

# Start the Express.js server
CMD ["npm", "run", "start"]