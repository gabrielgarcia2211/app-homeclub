import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartamentoController } from './apartamento.controller';
import { ApartamentoService } from './apartamento.service';
import { Apartamento } from './entities/apartamento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Apartamento])],
  controllers: [ApartamentoController],
  providers: [ApartamentoService],
})
export class ApartamentoModule {}
