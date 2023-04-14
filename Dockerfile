FROM node:19.5.0-alpine
ARG REACT_APP_API_URL
ARG REACT_APP_GOOGLE_CLIENT_ID
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn cache clean && yarn --update-checksums
COPY . ./
EXPOSE 3000
CMD ["yarn", "start"]
