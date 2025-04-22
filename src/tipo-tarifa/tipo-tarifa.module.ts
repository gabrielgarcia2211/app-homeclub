import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoTarifa } from './entities/tipo-tarifa.entity';
import { TipoTarifaService } from './tipo-tarifa.service';

@Module({
     imports: [TypeOrmModule.forFeature([TipoTarifa])],
     providers: [TipoTarifaService],
     exports: [TipoTarifaService],
})
export class TipoTarifaModule {}
