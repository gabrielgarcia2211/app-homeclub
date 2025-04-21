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

@Controller('apartamentos')
export class ApartamentoController {
  constructor(private readonly apartamentoService: ApartamentoService) {}

  @Post()
  create(@Body() createApartamentoDto: CreateApartamentoDto) {
    return this.apartamentoService.create(createApartamentoDto);
  }

  @Get()
  findAll() {
    return this.apartamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.apartamentoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateApartamentoDto: UpdateApartamentoDto,
  ) {
    return this.apartamentoService.update(id, updateApartamentoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.apartamentoService.remove(id);
  }
}
