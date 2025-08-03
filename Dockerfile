FROM registry.access.redhat.com/ubi9/nodejs-20:1-24 AS builder
WORKDIR /opt/app-root/src
COPY --chown=1001:0 package.json package-lock.json* ./
RUN npm install
COPY --chown=1001:0 . .
RUN npm run build

FROM registry.access.redhat.com/ubi9/nodejs-20:1-24
WORKDIR /app
COPY --from=builder /opt/app-root/src/dist ./dist
COPY --from=builder /opt/app-root/src/node_modules ./node_modules
EXPOSE 3335
CMD ["node", "dist/server.js"]