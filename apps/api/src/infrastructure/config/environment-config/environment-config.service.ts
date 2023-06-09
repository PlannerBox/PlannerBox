import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DatabaseConfig } from "src/domain/config/database.interface";

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig {
    constructor(private configService: ConfigService) {}
    
    getDatabaseHost(): string {
        return this.configService.get('POSTGRES_HOST');
    }
    getDatabasePort(): number {
        return this.configService.get('POSTGRES_PORT');
    }
    getDatabaseUser(): string {
        return this.configService.get('POSTGRES_USER');
    }
    getDatabasePassword(): string {
        return this.configService.get('POSTGRES_PASSWORD');
    }
    getDatabaseName(): string {
        return this.configService.get('POSTGRES_DB');
    }
    getDatabaseSchema(): string {
        return this.configService.get('POSTGRES_SCHEMA');
    }
    getDatabaseSync(): boolean {
        return this.configService.get('POSTGRES_SYNCHRONIZE');
    }

}