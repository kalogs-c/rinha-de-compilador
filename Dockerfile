FROM oven/bun:latest

WORKDIR /var/rinha/

COPY . .

RUN bun install

CMD ["bun", "main.ts"]
