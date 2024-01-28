# Use an official Node.js runtime as the base image
FROM node:19

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code into the container
COPY . .

# Expose the port your Express.js server listens on (replace 3000 with your port)
EXPOSE 3000

# Define the command to start your Express.js server
CMD ["node", "server.js"]
