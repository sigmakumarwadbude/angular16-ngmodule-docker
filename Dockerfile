FROM node:18-alpine

WORKDIR /app

RUN npm install -g @angular/cli@16

EXPOSE 4200

CMD ["sh"]