FROM node:14.17-alpine
ENV TZ Asia/Seoul
RUN	apk update && \
	apk upgrade && \
	apk add --update tzdata && \
	cp /usr/share/zoneinfo/${TZ} /etc/localtime && \
	echo "${TZ}" > /etc/timezone
RUN npm install -g pm2
ADD . /usr/src/app
WORKDIR /usr/src/app
RUN yarn
RUN npx lerna bootstrap --scope=@recruit/interface --scope=@recruit/api
RUN npx lerna run build --scope=@recruit/interface --scope=@recruit/api
WORKDIR /usr/src/app/packages/api
RUN rm -rf .env
ENV NODE_ENV production

EXPOSE 80
