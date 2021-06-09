**Passo 1** - criar banco postgres com o docker



```dockerfile
version: "3.9"

services:
  database:
    image: postgres
    container_name: database_m3d1
    restart: always
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=queries_challenge
    volumes:
      - pgdata:/data/postgres

volumes:
  pgdata:
    driver: local
```

**Passo 2** - criar entrada no package.json para o script typeorm

```
"typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js",
```

```
yarn typeorm migration:run
```

