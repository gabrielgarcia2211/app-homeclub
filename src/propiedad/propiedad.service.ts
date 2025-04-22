import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Propiedad } from './entities/propiedad.entity';
import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { UpdatePropiedadDto } from './dto/update-propiedad.dto';
import { ApartamentoService } from 'src/apartamento/apartamento.service';

@Injectable()
export class PropiedadService {
  constructor(
    @InjectRepository(Propiedad, 'secondDB')
    private readonly propiedadRepository: Repository<Propiedad>,
    private readonly apartamentoService: ApartamentoService,
  ) {}

  async create(createPropiedadDto: CreatePropiedadDto): Promise<Propiedad> {
    // Verificar si el apartamento existe
    const apartamento = await this.apartamentoService.findOne(
      createPropiedadDto.codigo,
    );
    if (!apartamento) {
      throw new NotFoundException(
        `Apartamento con id ${createPropiedadDto.codigo} no encontrado`,
      );
    }

    const propiedad = this.propiedadRepository.create({
      descripcion: createPropiedadDto.descripcion,
      imagen_url: createPropiedadDto.imagen_url,
      codigo: createPropiedadDto.codigo,
    });
    return this.propiedadRepository.save(propiedad);
  }

  async findAll(): Promise<Propiedad[]> {
    return this.propiedadRepository.find();
  }

  async findOne(id: number): Promise<Propiedad> {
    const propiedad = await this.propiedadRepository.findOne({
      where: { id },
    });
    if (!propiedad) {
      throw new NotFoundException(`Propiedad con id ${id} no encontrado`);
    }
    return propiedad;
  }

  async update(
    id: number,
    updatePropiedadDto: UpdatePropiedadDto,
  ): Promise<Propiedad> {
    const propiedad = await this.findOne(id);
    // Verificar si el apartamento existe
    const apartamento = await this.apartamentoService.findOne(
      updatePropiedadDto.codigo,
    );
    if (!apartamento) {
      throw new NotFoundException(
        `Apartamento con id ${updatePropiedadDto.codigo} no encontrado`,
      );
    }
    const updated = this.propiedadRepository.merge(propiedad, {
      descripcion: updatePropiedadDto.descripcion,
      imagen_url: updatePropiedadDto.imagen_url,
      codigo: updatePropiedadDto.codigo,
    });
    return this.propiedadRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const propiedad = await this.findOne(id);
    await this.propiedadRepository.remove(propiedad);
  }
}
