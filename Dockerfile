FROM node
LABEL maintainer="contact@lefuturiste.fr"
ADD . /app
WORKDIR /app
RUN npm install
CMD npm run start
