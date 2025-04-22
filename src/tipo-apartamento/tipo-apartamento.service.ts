import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoApartamento } from './entities/tipo-apartamento.entity';

@Injectable()
export class TipoApartamentoService {
  constructor(
    @InjectRepository(TipoApartamento)
    private readonly tipoApartamentoRepository: Repository<TipoApartamento>,
  ) {}

  async findOne(id: number): Promise<TipoApartamento> {
    const tipoApartamento = await this.tipoApartamentoRepository.findOne({
      where: { id },
    });

    if (!tipoApartamento) {
      throw new NotFoundException(`Tipo apartamento con id ${id} no encontrado`);
    }
    return tipoApartamento;
  }
}
