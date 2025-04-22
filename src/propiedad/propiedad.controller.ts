import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Req,
  BadRequestException,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { successResponse, isFilePart } from 'src/common/helpers/response';
import { PropiedadService } from './propiedad.service';
import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { UpdatePropiedadDto } from './dto/update-propiedad.dto';
import { FastifyRequest } from 'fastify';

import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';



@ApiTags('propiedades')
@Controller('propiedades')
export class PropiedadController {

  private readonly allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

  constructor(private readonly propiedadService: PropiedadService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo apartamento' })
  @ApiResponse({
    status: 201,
    description: 'Propiedad creado correctamente.',
  })
  async create(@Req() req: FastifyRequest) {
    const parts = req.parts();
    const dtoPayload: Record<string, any> = {};
    let imageBuffer: Buffer | null = null;
    let imageFilename: string | null = null;

    for await (const part of parts) {
      if (isFilePart(part)) {
        // Validate file type
        if (!this.allowedTypes.includes(part.mimetype)) {
          throw new BadRequestException('El archivo debe ser una imagen (JPEG, PNG, GIF)');
        }
        imageBuffer = await part.toBuffer();
        imageFilename = part.filename;
        dtoPayload['imagen_url'] = [imageBuffer, imageFilename];
      } else {
        if (part.fieldname === 'codigo') {
          dtoPayload[part.fieldname] = Number(part.value);
        } else {
          dtoPayload[part.fieldname] = part.value;
        }
      }
    }

    // Transform & validate
    const dto = plainToInstance(CreatePropiedadDto, dtoPayload);
    const errors = await validate(dto);
    if (errors.length) {
      throw new BadRequestException(
        errors.map((e) => Object.values(e.constraints || {})).flat(),
      );
    }

    return this.propiedadService
      .create(dto)
      .then((data) => successResponse('Propiedad creada correctamente', data));
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los propiedades' })
  @ApiResponse({ status: 200, description: 'Lista de propiedades' })
  findAll() {
    return this.propiedadService
      .findAll()
      .then((data) => successResponse('Lista de propiedades', data));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un apartamento por ID' })
  @ApiResponse({ status: 200, description: 'Propiedad encontrado' })
  @ApiResponse({ status: 404, description: 'Propiedad no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.propiedadService
      .findOne(id)
      .then((data) => successResponse('Propiedad encontrado', data));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un apartamento por ID' })
  @ApiResponse({
    status: 200,
    description: 'Propiedad actualizado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Propiedad no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: FastifyRequest,
  ) {
    const parts = req.parts();
    const dtoPayload: Record<string, any> = {};
    let imageBuffer: Buffer | null = null;
    let imageFilename: string | null = null;

    for await (const part of parts) {
      if (isFilePart(part)) {
        // Validate file type
        if (!this.allowedTypes.includes(part.mimetype)) {
          throw new BadRequestException('El archivo debe ser una imagen (JPEG, PNG, GIF)');
        }
        imageBuffer = await part.toBuffer();
        imageFilename = part.filename;
        dtoPayload['imagen_url'] = [imageBuffer, imageFilename];
      } else {
        if (part.fieldname === 'codigo') {
          dtoPayload[part.fieldname] = Number(part.value);
        } else {
          dtoPayload[part.fieldname] = part.value;
        }
      }
    }

    // Transform & validate
    const dto = plainToInstance(UpdatePropiedadDto, dtoPayload);
    const errors = await validate(dto);
    if (errors.length) {
      throw new BadRequestException(
        errors.map((e) => Object.values(e.constraints || {})).flat(),
      );
    }

    return this.propiedadService
      .update(id, dto)
      .then((data) =>
        successResponse('Propiedad actualizado correctamente', data),
      );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un apartamento por ID' })
  @ApiResponse({
    status: 200,
    description: 'Propiedad eliminado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Propiedad no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.propiedadService
      .remove(id)
      .then(() => successResponse('Propiedad eliminado correctamente'));
  }
}
