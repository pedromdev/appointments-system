FROM node:8.16-jessie

RUN apt-get update

RUN apt-get install build-essential

#RUN apk add --update alpine-sdk
#
#RUN apk add --no-cache \
#    autoconf \
#    automake \
#    bash \
#    g++ \
#    libc6-compat \
#    libjpeg-turbo-dev \
#    libpng-dev \
#    make \
#    nasm

COPY docker/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

RUN mkdir /app

WORKDIR /app