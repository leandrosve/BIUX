# You have to have a .env file with the following attributes
* DB_HOST=localhost
* DB_PORT=5432
* DB_USER=root
* DB_PASSWORD=1234
* DB_DATABASE=db_biux

### Auth
* HASH_SALT=15
* JWT_SECRET=HOLA_mundo123

# para generar migraciones:
 en los archivos mode.entity.ts => cambiar en los imports a la ruta de src a ../../
 npm run m:gen  -- ./src/migrations/name-migration
 npm run m:gen  -- ubicacion-de-los-archivos/name-migration

 # Para correr las migraciones
 npm run m:run


[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
