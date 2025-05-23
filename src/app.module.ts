import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaisModule } from './pais/pais.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { TipoApartamentoModule } from './tipo-apartamento/tipo-apartamento.module';
import { ApartamentoModule } from './apartamento/apartamento.module';
import { TipoApartamento } from './tipo-apartamento/entities/tipo-apartamento.entity';
import { Pais } from './pais/entities/pais.entity';
import { Ciudad } from './ciudad/entities/ciudad.entity';
import { Apartamento } from './apartamento/entities/apartamento.entity';
import { TarifaModule } from './tarifa/tarifa.module';
import { TipoTarifaModule } from './tipo-tarifa/tipo-tarifa.module';
import { Propiedad } from './propiedad/entities/propiedad.entity';
import { PropiedadModule } from './propiedad/propiedad.module';
import { Tarifa } from './tarifa/entities/tarifa.entity';
import { TipoTarifa } from './tipo-tarifa/entities/tipo-tarifa.entity';
import { FilesModule } from './common/file/files.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        synchronize: false,
        entities: [TipoApartamento, Pais, Ciudad, Apartamento, Tarifa, TipoTarifa],
      }),
    }),
    TypeOrmModule.forRootAsync({
      name: 'secondDB',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB2_HOST'),
        port: config.get<number>('DB2_PORT'),
        username: config.get('DB2_USERNAME'),
        password: config.get('DB2_PASSWORD'),
        database: config.get('DB2_NAME'),
        synchronize: true,
        entities: [Propiedad],
      }),
    }),
    PaisModule,
    CiudadModule,
    TipoApartamentoModule,
    ApartamentoModule,
    TarifaModule,
    TipoTarifaModule,
    PropiedadModule,
    FilesModule,
    ReportModule,
  ],
})
export class AppModule {}
