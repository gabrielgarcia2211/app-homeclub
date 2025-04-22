import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsDateString,
  IsPositive,
} from 'class-validator';

export class UpdateTarifaDto {
  @ApiProperty({
    example: 1,
    description: 'ID del apartamento al que pertenece la tarifa',
  })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id_apartamento: number;

  @ApiProperty({
    example: '2025-04-21',
    description: 'Fecha de inicio de la tarifa (YYYY-MM-DD)',
  })
  @IsNotEmpty()
  @IsDateString()
  fecha_inicio: string;

  @ApiProperty({
    example: '2025-04-30',
    description: 'Fecha de finalización de la tarifa (YYYY-MM-DD)',
  })
  @IsNotEmpty()
  @IsDateString()
  fecha_fin: string;

  @ApiProperty({ example: 150000, description: 'Precio asignado a la tarifa' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  precio: number;

  @ApiProperty({ example: 2, description: 'ID del tipo de tarifa' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id_tipo_tarifa: number;
}
