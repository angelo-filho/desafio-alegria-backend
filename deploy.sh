#!/usr/bin/env bash

set -e

# Run migrations

npm run migration:up

# Run seeds
npm run seed:run

# Run server
npm run start:prod

exec "$@"