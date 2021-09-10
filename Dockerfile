FROM node:16.9.0
RUN apt-get update && apt-get install -y nodejs
WORKDIR /app
COPY . .
RUN npm install --production
# RUN node "src/deploy-commands.js"
CMD ["node","src/app.js"]