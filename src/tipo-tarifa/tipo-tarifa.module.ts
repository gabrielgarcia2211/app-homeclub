import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoTarifa } from './entities/tipo-tarifa.entity';

@Module({
     imports: [TypeOrmModule.forFeature([TipoTarifa])],
})
export class TipoTarifaModule {}
