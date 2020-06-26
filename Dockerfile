FROM node:12.13.0-alpine
COPY ./flower-shop-app/dist /app
COPY ./flower-shop-api/dist /api
COPY ./flower-shop-api/documentation /api
COPY ./start-servers.sh ./start-servers.sh
CMD ["./start-servers.sh"]