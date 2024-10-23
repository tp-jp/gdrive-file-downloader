# Node.js 20 のイメージを使用
FROM node:20

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アクションのコードをコピー
COPY . .

# アクションを実行
CMD ["node", "index.js"]
