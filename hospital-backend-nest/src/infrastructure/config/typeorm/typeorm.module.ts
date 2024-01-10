import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

export const getTypeOrmModulOptions = (config: EnvironmentConfigService): TypeOrmModule => ({
    
})
@Module({})
export class TypeormModule {}
