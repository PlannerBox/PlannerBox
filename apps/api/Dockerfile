###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS base

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=api --docker

FROM base AS development
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY --chown=node:node pnpm-lock.yaml ./

RUN pnpm fetch --prod

COPY --chown=node:node . .
RUN pnpm install

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM base AS build
RUN curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm

WORKDIR /app

COPY --chown=node:node pnpm-lock.yaml ./

COPY --chown=node:node --from=development /app/node_modules ./node_modules

COPY --chown=node:node . .

RUN pnpm build

ENV NODE_ENV production

RUN pnpm install --prod

USER node

###################
# PRODUCTION
###################

FROM base AS production

COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

CMD [ "node", "dist/main.js" ]
