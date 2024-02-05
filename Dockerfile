FROM node:21-alpine AS build
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine AS prod-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/
EXPOSE 5003
CMD ["nginx","-g","daemon off;"]