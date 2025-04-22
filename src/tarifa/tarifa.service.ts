import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarifa } from './entities/tarifa.entity';
import { CreateTarifaDto } from './dto/create-tarifa.dto';
import { UpdateTarifaDto } from './dto/update-tarifa.dto';
import { ApartamentoService } from 'src/apartamento/apartamento.service';
import { TipoTarifaService } from 'src/tipo-tarifa/tipo-tarifa.service';

@Injectable()
export class TarifaService {
  constructor(
    @InjectRepository(Tarifa)
    private readonly tarifaRepository: Repository<Tarifa>,
    private readonly apartamentoService: ApartamentoService,
    private readonly tipoTarifaService: TipoTarifaService,
  ) {}

  async create(createTarifaDto: CreateTarifaDto): Promise<Tarifa> {
    const apartamento = await this.apartamentoService.findOne(
      createTarifaDto.id_apartamento,
    );
    if (!apartamento) {
      throw new Error('Apartamento no encontrado');
    }

    const tipoTarifa = await this.tipoTarifaService.findOne(
      createTarifaDto.id_tipo_tarifa,
    );
    if (!tipoTarifa) {
      throw new Error('Tipo de tarifa no encontrado');
    }

    const tarifa = this.tarifaRepository.create({
      idApartamento: { id: createTarifaDto.id_apartamento },
      fechaInicio: createTarifaDto.fecha_inicio,
      fechaFin: createTarifaDto.fecha_fin,
      precio: createTarifaDto.precio,
      tipoTarifa: { id: createTarifaDto.id_tipo_tarifa },
    });

    return this.tarifaRepository.save(tarifa);
  }

  async findAll(): Promise<Tarifa[]> {
    return this.tarifaRepository.find({
      relations: ['tipoTarifa', 'idApartamento'],
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

    const apartamento = await this.apartamentoService.findOne(
      updateTarifaDto.id_apartamento,
    );
    if (!apartamento) {
      throw new Error('Apartamento no encontrado');
    }

    const tipoTarifa = await this.tipoTarifaService.findOne(
      updateTarifaDto.id_tipo_tarifa,
    );
    if (!tipoTarifa) {
      throw new Error('Tipo de tarifa no encontrado');
    }

    const updatedData = {
      idApartamento: { id: updateTarifaDto.id_apartamento },
      fechaInicio: updateTarifaDto.fecha_inicio,
      fechaFin: updateTarifaDto.fecha_fin,
      precio: updateTarifaDto.precio,
      tipoTarifa: { id: updateTarifaDto.id_tipo_tarifa },
    };

    const merged = this.tarifaRepository.merge(tarifa, updatedData);
    return this.tarifaRepository.save(merged);
  }

  async remove(id: number): Promise<void> {
    const tarifa = await this.findOne(id);
    await this.tarifaRepository.remove(tarifa);
  }
}
