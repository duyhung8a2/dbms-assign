### Prerequisites

Node 20.0.0

### Installation

```bash
npm i
```

Fill up the .env

### Dev

```bash
docker-compose up -d
```

```bash
npm run dev
```

After done

```bash
docker-compose down
```

Wipe out data in database

```bash
docker-compose down -v
```

### Migration

First install knex global

```bash
npm i -g knex
```

Create migration

```bash
knex migrate:make <name>
```

Up migration

```bash
knex migrate:up
```

Latest migration

```bash
knex migration:latest
```
