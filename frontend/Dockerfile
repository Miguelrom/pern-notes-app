FROM node:20.10.0

# Create app directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

# Install dependecies
RUN yarn

# Get all the code needed to run the app
COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 5173
  
# Serve the app
CMD ["yarn", "dev"]