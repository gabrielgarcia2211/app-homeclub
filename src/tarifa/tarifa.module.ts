import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarifaService } from './tarifa.service';
import { TarifaController } from './tarifa.controller';
import { Tarifa } from './entities/tarifa.entity';
import { ApartamentoModule } from 'src/apartamento/apartamento.module';
import { TipoTarifaModule } from 'src/tipo-tarifa/tipo-tarifa.module';

@Module({
    imports: [TypeOrmModule.forFeature([Tarifa]), ApartamentoModule, TipoTarifaModule],
    controllers: [TarifaController],
    providers: [TarifaService],
  })
export class TarifaModule {}





