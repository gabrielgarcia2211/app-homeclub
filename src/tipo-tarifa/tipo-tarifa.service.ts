import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoTarifa } from './entities/tipo-tarifa.entity';

@Injectable()
export class TipoTarifaService {
  constructor(
    @InjectRepository(TipoTarifa)
    private readonly tipoTarifaRepository: Repository<TipoTarifa>,
  ) {}

  async findOne(id: number): Promise<TipoTarifa> {
    const tipoTarifa = await this.tipoTarifaRepository.findOne({
      where: { id },
    });

    if (!tipoTarifa) {
      throw new NotFoundException(`Tipo tarifa con id ${id} no encontrado`);
    }
    return tipoTarifa;
  }
}
