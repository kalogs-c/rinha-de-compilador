FROM oven/bun:latest

WORKDIR /app

COPY . .

COPY ./rinha/bool.json /var/rinha/source.rinha.json

RUN bun install

CMD ["bun", "main.ts"]
