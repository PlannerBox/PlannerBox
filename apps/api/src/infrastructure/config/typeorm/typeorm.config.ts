import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
/*
if (process.env.NODE_ENV === 'local') {
    dotenv.config({ path: './env/local.env' });
}*/

const config = (configService: ConfigService): PostgresConnectionOptions => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: [__dirname + './../../**/*.entity{.ts,.js}'],
    synchronize: configService.get('DATABASE_SYNCHRONIZE'),
    schema: process.env.DATABASE_SCHEMA,
    migrationsRun: true,
    migrationsTableName: '_migrations',
    migrations: ['database/migrations/**/*{.ts,.js}'],
});

export default config;