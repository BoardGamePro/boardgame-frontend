FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY empty-module.js ./empty-module.js
COPY next.config.mjs ./next.config.mjs
COPY . .
COPY .env .env.local

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/empty-module.js ./empty-module.js

EXPOSE 3000

CMD ["npm", "start"]