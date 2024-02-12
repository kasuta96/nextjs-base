# ベースイメージを指定
FROM node:18-alpine

# アプリケーションのフォルダを作成とソースコードをコピー
WORKDIR /app

# 必要なパッケージをインストール
RUN apk update && \
    apk add --no-cache git && \
    apk add --no-cache --virtual .build-deps build-base python3 && \
    rm -rf /var/cache/apk/*
RUN npm install -g pnpm

# アプリケーションを起動
# CMD ["/bin/sh", "-c", "pnpm install && pnpm dev"]
CMD ["/bin/sh", "-c", "pnpm install --production --ignore-scripts && pnpm build:prod && npm start"]
