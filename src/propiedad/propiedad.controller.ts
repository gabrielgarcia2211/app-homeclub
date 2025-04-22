import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { successResponse } from 'src/common/helpers/response';
import { PropiedadService } from './propiedad.service';
import { CreatePropiedadDto } from './dto/create-propiedad.dto';
import { UpdatePropiedadDto } from './dto/update-propiedad.dto';

@ApiTags('propiedades')
@Controller('propiedades')
export class PropiedadController {
  constructor(private readonly propiedadService: PropiedadService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo apartamento' })
  @ApiResponse({
    status: 201,
    description: 'Propiedad creado correctamente.',
  })
  create(@Body() createPropiedadDto: CreatePropiedadDto) {
    return this.propiedadService
      .create(createPropiedadDto)
      .then((data) =>
        successResponse('Propiedad creado correctamente', data),
      );
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePropiedadDto: UpdatePropiedadDto,
  ) {
    return this.propiedadService
      .update(id, updatePropiedadDto)
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
