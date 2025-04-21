import { ApiProperty } from '@nestjs/swagger';

export class UpdateTarifaDto {
  @ApiProperty({ example: 1, description: 'ID del apartamento al que pertenece la tarifa' })
  id_apartamento: number;

  @ApiProperty({ example: '2025-04-21', description: 'Fecha de inicio de la tarifa (YYYY-MM-DD)' })
  fecha_inicio: string;

  @ApiProperty({ example: '2025-04-30', description: 'Fecha de finalización de la tarifa (YYYY-MM-DD)' })
  fecha_fin: string;

  @ApiProperty({ example: 150000, description: 'Precio asignado a la tarifa' })
  precio: number;

  @ApiProperty({ example: 2, description: 'ID del tipo de tarifa' })
  id_tipo_tarifa: number;
}
