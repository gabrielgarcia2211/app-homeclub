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
import { ApartamentoService } from './apartamento.service';
import { CreateApartamentoDto } from './dto/create-apartamento.dto';
import { UpdateApartamentoDto } from './dto/update-apartamento.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { successResponse } from 'src/common/helpers/response';

@ApiTags('apartamentos')
@Controller('apartamentos')
export class ApartamentoController {
  constructor(private readonly apartamentoService: ApartamentoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo apartamento' })
  @ApiResponse({
    status: 201,
    description: 'Apartamento creado correctamente.',
  })
  create(@Body() createApartamentoDto: CreateApartamentoDto) {
    return this.apartamentoService
      .create(createApartamentoDto)
      .then((data) =>
        successResponse('Apartamento creado correctamente', data),
      );
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los apartamentos' })
  @ApiResponse({ status: 200, description: 'Lista de apartamentos' })
  findAll() {
    return this.apartamentoService
      .findAll()
      .then((data) => successResponse('Lista de apartamentos', data));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un apartamento por ID' })
  @ApiResponse({ status: 200, description: 'Apartamento encontrado' })
  @ApiResponse({ status: 404, description: 'Apartamento no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.apartamentoService
      .findOne(id)
      .then((data) => successResponse('Apartamento encontrado', data));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un apartamento por ID' })
  @ApiResponse({
    status: 200,
    description: 'Apartamento actualizado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Apartamento no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateApartamentoDto: UpdateApartamentoDto,
  ) {
    return this.apartamentoService
      .update(id, updateApartamentoDto)
      .then((data) =>
        successResponse('Apartamento actualizado correctamente', data),
      );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un apartamento por ID' })
  @ApiResponse({
    status: 200,
    description: 'Apartamento eliminado correctamente',
  })
  @ApiResponse({ status: 404, description: 'Apartamento no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.apartamentoService
      .remove(id)
      .then(() => successResponse('Apartamento eliminado correctamente'));
  }
}
