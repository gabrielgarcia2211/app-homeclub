import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Propiedad } from '../entities/propiedad.entity';

@Injectable()
export class PropiedadRepository {
  constructor( @InjectDataSource('secondDB') private readonly dataSource: DataSource) {}

  get repository() {
    return this.dataSource.getRepository(Propiedad);
  }
}