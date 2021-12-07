# MetaMillions
---

## Technology Used

- Next.js
- Prisma ORM
- Postgres
- Docker

## Quickstart

Using docker compose. This can be deployed directly into AWS

	$ touch .env
	$ cat .env.example > .env
	$ docker compose up

This will build the docker environment, and install all the necessary dependencies.

## Environment variables

	# Postgres
	POSTGRES_HOST=localhost
	POSTGRES_USERNAME=postgres
	POSTGRES_PASSWORD=root
	POSTGRES_DATABASE=metamillions
	POSTGRES_PORT=5432
	POSTGRES_SSL_MODE=false
	POSTGRES_TIMEZONE=Europe/London

	# PGAdmin
	PGADMIN_DEFAULT_EMAIL=test@example.com
	PGADMIN_DEFAULT_PASSWORD=test

	# Internal app
	ADMIN_PASSWORD=test
	ADMIN_WALLET=0xb

	# JWT key
	TOKEN_KEY=0xb

JWT_TOKEN can be any random string, ADMIN_WALLET should be a valid wallet address.
