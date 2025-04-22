import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ciudad } from './entities/ciudad.entity';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  async findOne(id: number): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { id },
    });

    if (!ciudad) {
      throw new NotFoundException(`Ciudad con id ${id} no encontrado`);
    }
    return ciudad;
  }
}
