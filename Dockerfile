FROM node:12.13.0-alpine
COPY ./flower-shop-app/app /app
COPY ./flower-shop-api/api /api
COPY ./flower-shop-api/documentation /api/documentation
COPY ./start-servers.sh ./start-servers.sh
CMD ["./start-servers.sh"]