# Copyright 2024 Pelayo Vieites Pérez
#
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at https://mozilla.org/MPL/2.0/.
#

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
