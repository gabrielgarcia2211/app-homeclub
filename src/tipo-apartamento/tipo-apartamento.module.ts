import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoApartamento } from './entities/tipo-apartamento.entity';
import { TipoApartamentoService } from './tipo-apartamento.service';

@Module({
  imports: [TypeOrmModule.forFeature([TipoApartamento])],
  providers: [TipoApartamentoService],
  exports: [TipoApartamentoService],
})
export class TipoApartamentoModule {}