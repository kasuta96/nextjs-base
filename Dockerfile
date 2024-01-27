# ベースイメージを指定
FROM node:18-alpine

# 必要なパッケージをインストール
RUN apk update && \
    apk add --no-cache git && \
    apk add --no-cache --virtual .build-deps build-base python3 && \
    rm -rf /var/cache/apk/*
RUN npm install -g pnpm

# アプリケーションのフォルダを作成とソースコードをコピー
RUN mkdir -p /app
WORKDIR /app
COPY . .

# アプリケーションを起動
CMD ["/bin/sh", "-c", "pnpm install --production --ignore-scripts && pnpm build:prod && npm start"]
