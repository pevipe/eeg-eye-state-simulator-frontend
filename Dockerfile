# Build phase -> Node.js
FROM node:18.20.3-alpine3.20 AS build
WORKDIR /app
COPY ./eeg-eye-state-simulator/package*.json ./
RUN npm install
COPY eeg-eye-state-simulator/ .
COPY ./docker/environment.ts /app/src/environments/environment.ts

RUN npm run build --prod

# Production phase -> Nginx
FROM nginx:stable-alpine3.19-perl
COPY --from=build /app/dist/eeg-eye-state-simulator/ /usr/share/nginx/html
COPY --from=build /app/dist/eeg-eye-state-simulator/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
