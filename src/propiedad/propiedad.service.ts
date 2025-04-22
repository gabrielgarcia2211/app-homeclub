import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Propiedad } from './entities/propiedad.entity';
import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { UpdatePropiedadDto } from './dto/update-propiedad.dto';
import { ApartamentoService } from 'src/apartamento/apartamento.service';
import { FilesService } from 'src/common/file/files.service';

@Injectable()
export class PropiedadService {
  constructor(
    @InjectRepository(Propiedad, 'secondDB')
    private readonly propiedadRepository: Repository<Propiedad>,
    private readonly apartamentoService: ApartamentoService,
    private readonly filesService: FilesService,
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

    // Verificar si ya existe una propiedad con el mismo código
    const existingPropiedad = await this.propiedadRepository.findOne({
      where: { codigo: createPropiedadDto.codigo },
    });
    if (existingPropiedad) {
      throw new NotFoundException(
        `Ya existe una propiedad con el código ${createPropiedadDto.codigo}`,
      );
    }

    let filePath = '';

    // Guardar la imagen en el sistema de archivos
    if (
      createPropiedadDto.imagen_url &&
      createPropiedadDto.imagen_url.length > 0
    ) {
      const file = createPropiedadDto.imagen_url[0];
      const fileName = createPropiedadDto.imagen_url[1];
      filePath = await this.filesService.saveFile(file, fileName);
    }

    const propiedad = this.propiedadRepository.create({
      descripcion: createPropiedadDto.descripcion,
      imagen_url: filePath,
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
    // Verificar si ya existe una propiedad con el mismo código
    const existingPropiedad = await this.propiedadRepository.findOne({
      where: { codigo: updatePropiedadDto.codigo, id: Not(id) },
    });
    if (existingPropiedad) {
      throw new NotFoundException(
        `Ya existe una propiedad con el código ${updatePropiedadDto.codigo}`,
      );
    }

    let filePath = '';

    // Guardar la imagen en el sistema de archivos
    if (
      updatePropiedadDto.imagen_url &&
      updatePropiedadDto.imagen_url.length > 0
    ) {
      // Eliminar la imagen anterior si existe
      if (propiedad.imagen_url) {
        this.filesService.deleteFile(propiedad.imagen_url);
      }
      const file = updatePropiedadDto.imagen_url[0];
      const fileName = updatePropiedadDto.imagen_url[1];
      filePath = await this.filesService.saveFile(file, fileName);
    }

    const updated = this.propiedadRepository.merge(propiedad, {
      descripcion: updatePropiedadDto.descripcion,
      imagen_url: filePath,
      codigo: updatePropiedadDto.codigo,
    });
    return this.propiedadRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const propiedad = await this.findOne(id);
    await this.propiedadRepository.remove(propiedad);
  }
}
