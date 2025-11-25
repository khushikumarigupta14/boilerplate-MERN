# Scalable Backend Boilerplate

A production-ready Node.js + Express backend boilerplate with support for MongoDB, PostgreSQL, and MySQL.

## Features

- **Multi-Database Support**: Switch between MongoDB (Mongoose), PostgreSQL (Prisma), and MySQL/PostgreSQL (Sequelize) via `.env`.
- **Authentication**: JWT-based auth with Access & Refresh tokens.
- **Clean Architecture**: Modular structure with Controllers, Services, and Repositories.
- **Type Safety**: Built with TypeScript.
- **Validation**: Request validation using Zod.
- **Logging**: Centralized logging with Winston.
- **Code Generator**: CLI to scaffold new modules.

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Copy `.env.example` to `.env` and update the values.
   ```bash
   cp .env.example .env
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## Switching Databases

Update `DB_TYPE` in `.env`:
- `mongodb`: Uses Mongoose.
- `postgres-prisma`: Uses Prisma.
- `postgres-sequelize`: Uses Sequelize with PostgreSQL.
- `mysql-sequelize`: Uses Sequelize with MySQL.

**Note**: For Prisma, ensure you run `npx prisma generate` and `npx prisma db push` (or migrate) after updating the schema.

## Generating Modules

To create a new module (Controller, Service, Repository, Routes, Model):
```bash
npm run generate:module <module-name>
```
Example:
```bash
npm run generate:module products
```

## API Endpoints

- **Health Check**: `GET /health`
- **Auth**:
  - `POST /api/v1/auth/register`
  - `POST /api/v1/auth/login`
  - `POST /api/v1/auth/refresh`
- **Users**:
  - `GET /api/v1/users`
  - `GET /api/v1/users/:id`
  - `POST /api/v1/users`

## Documentation

Swagger API documentation is available at:
`http://localhost:5000/api-docs`

## Testing

Run the test suite:
```bash
npm test
```


## License
ISC
