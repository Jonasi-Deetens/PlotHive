# Use the official Node.js 20.10 image as the base image
FROM node:20

# Set the working directory in the container
WORKDIR ./app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . ./app

# Expose the port that your app runs on
EXPOSE 3050/tcp

# Command to run your application
CMD ["node", "server.js"]