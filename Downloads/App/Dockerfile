# Use official Node.js LTS image as base
FROM node:20-alpine
 
# Set the working directory in the container
WORKDIR /app
 
# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./
COPY .npmrc ./
 
# Install dependencies
RUN npm install --production
 
# Copy the rest of the application code to the working directory
COPY . .
COPY .env .env
 
# Build the Next.js application
RUN npm run build
 
# Expose the port Next.js is running on (usually 3000)
EXPOSE 3000
 
# Define the command to run the Next.js application
CMD ["npm", "start"]