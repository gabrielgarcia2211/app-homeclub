import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Apartamento } from './entities/apartamento.entity';
import { CreateApartamentoDto } from './dto/create-apartamento.dto';
import { UpdateApartamentoDto } from './dto/update-apartamento.dto';

@Injectable()
export class ApartamentoService {
  constructor(
    @InjectRepository(Apartamento)
    private readonly apartamentoRepository: Repository<Apartamento>,
  ) {}

  async create(
    createApartamentoDto: CreateApartamentoDto,
  ): Promise<Apartamento> {
    const apartamento = this.apartamentoRepository.create(createApartamentoDto);
    return this.apartamentoRepository.save(apartamento);
  }

  async findAll(): Promise<Apartamento[]> {
    return this.apartamentoRepository.find({
      relations: ['tipoApartamento', 'ciudad'], 
    });
  }

  async findOne(id: number): Promise<Apartamento> {
    const apartamento = await this.apartamentoRepository.findOne({
      where: { id },
      relations: ['tipoApartamento', 'ciudad'],
    });

    if (!apartamento) {
      throw new NotFoundException(`Apartamento con id ${id} no encontrado`);
    }

    return apartamento;
  }

  async update(
    id: number,
    updateApartamentoDto: UpdateApartamentoDto,
  ): Promise<Apartamento> {
    const apartamento = await this.findOne(id);
    const updated = Object.assign(apartamento, updateApartamentoDto);
    return this.apartamentoRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const apartamento = await this.findOne(id);
    await this.apartamentoRepository.remove(apartamento);
  }
}
