import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class UpdateApartamentoDto {
  @ApiProperty({
    example: 'Apartamento A-101',
    description: 'Nombre del apartamento',
  })
  nombre: string;

  @ApiProperty({
    example: 'Calle 123 #45-67',
    description: 'Dirección del apartamento',
  })
  direccion: string;

  @ApiProperty({ example: 1, description: 'ID del tipo de apartamento' })
  id_tipo_apartamento: number;

  @ApiProperty({ example: 5, description: 'ID de la ciudad' })
  id_ciudad: number;

  @ApiPropertyOptional({
    example: 7.12345,
    description: 'Latitud geográfica del apartamento',
  })
  latitud?: number;

  @ApiPropertyOptional({
    example: -72.98765,
    description: 'Longitud geográfica del apartamento',
  })
  longitud?: number;

  @ApiPropertyOptional({
    example: 'activo',
    description: 'Estado del apartamento',
    enum: ['activo', 'no activo'],
  })
  estado?: 'activo' | 'no activo';
}
