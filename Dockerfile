FROM node:12.13.0-alpine
COPY ./flower-shop-app/app /app
COPY ./flower-shop-api/api /api
COPY ./start-servers.sh ./start-servers.sh
CMD ["./start-servers.sh"]