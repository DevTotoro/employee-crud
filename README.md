# employee-crud

## Running the project

### Requirements

- Node: >=22.5.1
- Docker

### Setup

After cloning the repository, run the following commands to setup the dev environment

```sh
pnpm i

# Setup database
docker compose up -d
cp packages/database/.env.example packages/database/.env
pnpm --filter @repo/database prisma migrate dev

cp apps/workforce-management/.env.example apps/workforce-management/.env
```

### Run

To run the project simply execute the following command at the root of the repository.

```sh
pnpm dev
```
