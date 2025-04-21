import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoApartamento } from './entities/tipo-apartamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoApartamento])],
})
export class TipoApartamentoModule {}