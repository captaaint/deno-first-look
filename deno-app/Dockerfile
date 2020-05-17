FROM debian:buster-slim

WORKDIR /home/deno-app

RUN apt-get update && apt-get install curl unzip -y

RUN curl -fsSL https://deno.land/x/install/install.sh | sh

ENV DENO_INSTALL="/root/.deno"
ENV PATH="$DENO_INSTALL/bin:$PATH"

COPY . /home/deno-app

EXPOSE 4000

CMD ["deno", "run", "--allow-all", "--unstable", "server.ts"]
