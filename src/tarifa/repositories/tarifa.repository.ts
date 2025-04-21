import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Tarifa } from '../entities/tarifa.entity';

@Injectable()
export class TarifaRepository {
  constructor(private readonly dataSource: DataSource) {}

  get repository() {
    return this.dataSource.getRepository(Tarifa);
  }
}