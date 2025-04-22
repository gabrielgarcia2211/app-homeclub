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
import { TarifaService } from './tarifa.service';
import { CreateTarifaDto } from './dto/create-tarifa.dto';
import { UpdateTarifaDto } from './dto/update-tarifa.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { successResponse } from 'src/common/helpers/response';

@ApiTags('tarifas')
@Controller('tarifas')
export class TarifaController {
  constructor(private readonly tarifaService: TarifaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva tarifa' })
  @ApiResponse({ status: 201, description: 'Tarifa creada exitosamente.' })
  create(@Body() createTarifaDto: CreateTarifaDto) {
    return this.tarifaService
      .create(createTarifaDto)
      .then((data) => successResponse('Tarifa creada exitosamente', data));
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las tarifas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de tarifas obtenida correctamente.',
  })
  findAll() {
    return this.tarifaService
      .findAll()
      .then((data) =>
        successResponse('Lista de tarifas obtenida correctamente', data),
      );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una tarifa por ID' })
  @ApiResponse({ status: 200, description: 'Tarifa encontrada correctamente.' })
  @ApiResponse({ status: 404, description: 'Tarifa no encontrada.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tarifaService
      .findOne(id)
      .then((data) => successResponse('Tarifa encontrada correctamente', data));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una tarifa por ID' })
  @ApiResponse({ status: 200, description: 'Tarifa actualizada exitosamente.' })
  @ApiResponse({ status: 404, description: 'Tarifa no encontrada.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTarifaDto: UpdateTarifaDto,
  ) {
    return this.tarifaService
      .update(id, updateTarifaDto)
      .then((data) => successResponse('Tarifa actualizada exitosamente', data));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarifa por ID' })
  @ApiResponse({ status: 200, description: 'Tarifa eliminada correctamente.' })
  @ApiResponse({ status: 404, description: 'Tarifa no encontrada.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tarifaService
      .remove(id)
      .then(() => successResponse('Tarifa eliminada correctamente'));
  }
}
