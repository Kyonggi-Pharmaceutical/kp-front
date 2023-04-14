FROM node:19.5.0-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . ./
ENV REACT_APP_GOOGLE_CLIENT_ID=${REACT_APP_GOOGLE_CLIENT_ID}
ENV REACT_APP_API_URL=${REACT_APP_API_URL}
RUN yarn build
EXPOSE 3000
CMD ["yarn", "prod"]
