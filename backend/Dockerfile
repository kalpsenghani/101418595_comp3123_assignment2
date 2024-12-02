# Use the official Node.js image as a base
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the entire src directory to the container
COPY . .

# Expose the port the backend will run on
EXPOSE 5000

# Command to run the backend server
CMD ["node", "index.js"]

COPY .env .env

