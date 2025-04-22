import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartamentoController } from './apartamento.controller';
import { ApartamentoService } from './apartamento.service';
import { Apartamento } from './entities/apartamento.entity';
import { CiudadModule } from 'src/ciudad/ciudad.module';
import { TipoApartamentoModule } from 'src/tipo-apartamento/tipo-apartamento.module';

@Module({
  imports: [TypeOrmModule.forFeature([Apartamento]), CiudadModule, TipoApartamentoModule],
  controllers: [ApartamentoController],
  providers: [ApartamentoService],
  exports: [ApartamentoService],
})
export class ApartamentoModule {}
