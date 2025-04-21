import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Apartamento } from '../entities/apartamento.entity';

@Injectable()
export class ApartamentoRepository {
  constructor(private readonly dataSource: DataSource) {}

  get repository() {
    return this.dataSource.getRepository(Apartamento);
  }
}