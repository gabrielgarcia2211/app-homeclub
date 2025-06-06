import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Propiedad } from './entities/propiedad.entity';
import { PropiedadController } from './propiedad.controller';
import { PropiedadService } from './propiedad.service';
import { ApartamentoModule } from 'src/apartamento/apartamento.module';
import { FilesModule } from 'src/common/file/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Propiedad], 'secondDB'), ApartamentoModule, FilesModule],
  controllers: [PropiedadController],
  providers: [PropiedadService],
  exports: [PropiedadService],
})
export class PropiedadModule {}
