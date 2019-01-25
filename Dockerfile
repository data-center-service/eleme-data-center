FROM keymetrics/pm2:8-alpine as builder
MAINTAINER  zhouyu muyu.zhouyu@gmail.com
RUN npm install
RUN npm run build

FROM keymetrics/pm2:8-alpine
MAINTAINER zhouyu muyu.zhouyu@gmail.com 
COPY --from=builder /dist /
COPY --from=builder /config /
COPY --from=builder /node_modules /
COPY --from=builder /package-lock.json /
ENTRYPOINT pm2-runtime /dist/main.js