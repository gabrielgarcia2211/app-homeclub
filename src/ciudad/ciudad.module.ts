import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ciudad } from './entities/ciudad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ciudad])],
})
export class CiudadModule {}
