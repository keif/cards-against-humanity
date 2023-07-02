# To Create a new image
# docker build -t cardigame/cah:<version_num> .

# To Push a new image
# docker push cardigame/cah:<version num here optional>
####-------####-------####-------####-------####-------####-------####-------
FROM node:18-alpine

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add g++ make py3-pip
RUN apk add --no-cache libc6-compat

# Create app directory for express server
WORKDIR /app
# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Step 2. Production image, copy all the files and run next
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/.env ./.env
COPY . .

ENV NODE_ENV production

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 reactjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

USER reactjs

ENV PORT 8080
EXPOSE 8080

CMD ["yarn", "run", "server"]
