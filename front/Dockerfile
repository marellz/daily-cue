FROM node:lts-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev", "--","--host" ]

# CMD [ "node", ".output/server/index.mjs" ]
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html
# CMD [ "nginx", "-g", "daemon off;" ]