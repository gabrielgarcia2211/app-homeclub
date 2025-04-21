import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarifa } from './entities/tarifa.entity';
import { CreateTarifaDto } from './dto/create-tarifa.dto';
import { UpdateTarifaDto } from './dto/update-tarifa.dto';

@Injectable()
export class TarifaService {
  constructor(
    @InjectRepository(Tarifa)
    private readonly tarifaRepository: Repository<Tarifa>,
  ) {}

  async create(createTarifaDto: CreateTarifaDto): Promise<Tarifa> {
    const tarifa = this.tarifaRepository.create(createTarifaDto);
    return this.tarifaRepository.save(tarifa);
  }

  async findAll(): Promise<Tarifa[]> {
    return this.tarifaRepository.find({
      relations: ['tipoTarifa'],
    });
  }

  async findOne(id: number): Promise<Tarifa> {
    const tarifa = await this.tarifaRepository.findOne({
      where: { id },
      relations: ['tipoTarifa'],
    });

    if (!tarifa) {
      throw new NotFoundException(`Tarifa con id ${id} no encontrada`);
    }

    return tarifa;
  }

  async update(id: number, updateTarifaDto: UpdateTarifaDto): Promise<Tarifa> {
    const tarifa = await this.findOne(id);
    const updated = Object.assign(tarifa, updateTarifaDto);
    return this.tarifaRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const tarifa = await this.findOne(id);
    await this.tarifaRepository.remove(tarifa);
  }
}
