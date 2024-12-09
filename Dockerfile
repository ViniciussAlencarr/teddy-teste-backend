FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate

# development step
FROM node:20 AS development

WORKDIR /app

COPY --from=build /app /app

ENV NODE_ENV=development

EXPOSE 3131

CMD ["npm", "run", "dev"]


# production step
FROM node:20 AS production

WORKDIR /app

COPY --from=build /app /app

COPY ecosystem.config.yml .

COPY start.sh .

ENV NODE_ENV=production

RUN chmod +x /app/start.sh

RUN npm ci --only=production

RUN npm install pm2 -g --only=production

COPY --from=build /app/build ./build

EXPOSE 3131

CMD ["/app/start.sh"]
