import { DataSourceOptions } from 'typeorm';
require('dotenv').config({ path: './env/.env' });

export function getConfig() {
    return {
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        schema: process.env.DATABASE_SCHEMA,
        entities: [__dirname + '/../../src/infrastructure/entities/*.ts'],
        migrations: [__dirname + '/../migrations/*.ts'],
        migrationsTableName: '_MigrationHistory',
        uuidExtension: 'pgcrypto'
    } as DataSourceOptions;
}