# Use the official Node.js 20.10 image as the base image
FROM node:20.10

# Set the working directory in the container
WORKDIR /server/

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

COPY Certificates/ /server/Certificates/

# Expose the port that your app runs on
EXPOSE 8443

# Command to run your application
CMD ["npm", "start"]