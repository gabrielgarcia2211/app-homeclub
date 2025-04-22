import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum EstadoApartamento {
  ACTIVO = 'activo',
  NO_ACTIVO = 'no activo',
}

export class UpdateApartamentoDto {
  @ApiProperty({
    example: 'Apartamento A-101',
    description: 'Nombre del apartamento',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  nombre: string;

  @ApiProperty({
    example: 'Calle 123 #45-67',
    description: 'Dirección del apartamento',
  })
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  direccion: string;

  @ApiProperty({
    example: 1,
    description: 'ID del tipo de apartamento',
  })
  @IsNumber({}, { message: 'El ID del tipo de apartamento debe ser un número' })
  id_tipo_apartamento: number;

  @ApiProperty({
    example: 5,
    description: 'ID de la ciudad',
  })
  @IsNumber({}, { message: 'El ID de la ciudad debe ser un número' })
  id_ciudad: number;

  @ApiProperty({
    example: 7.12345,
    description: 'Latitud geográfica del apartamento',
  })
  @IsNumber({}, { message: 'La latitud debe ser un número' })
  latitud: number;

  @ApiProperty({
    example: -72.98765,
    description: 'Longitud geográfica del apartamento',
  })
  @IsNumber({}, { message: 'La longitud debe ser un número' })
  longitud: number;

  @ApiProperty({
    example: 'activo',
    description: 'Estado del apartamento',
    enum: EstadoApartamento,
  })
  @IsEnum(EstadoApartamento, {
    message: 'Estado debe ser "activo" o "no activo"',
  })
  estado: EstadoApartamento;
}
