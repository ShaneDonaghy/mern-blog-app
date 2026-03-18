FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# we copy application code last so as that when code changes,
# it is just this layer that gets re-executed  - reduces rebuild time
COPY . .

# not part of the build, but rather the entry point for the new container
CMD ["npm", "start"]