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
        autoLoadEntities: true,
        synchronize: false,
        entities: [TipoApartamento, Pais, Ciudad, Apartamento],
      }),
    }),
    PaisModule,
    CiudadModule,
    TipoApartamentoModule,
    ApartamentoModule,
    TarifaModule,
    TipoTarifaModule,
  ],
})
export class AppModule {}
