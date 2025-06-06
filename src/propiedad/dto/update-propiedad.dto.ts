import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePropiedadDto {
  @ApiProperty({
    example: 'Propiedad con vista al mar',
    description: 'Descripción del propiedad',
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  descripcion: string;

  @ApiProperty({
    example: 'https://example.com/imagen.jpg',
    description: 'URL de la imagen del propiedad',
  })
  imagen_url: string;

  @ApiProperty({
    example: 101,
    description: 'Código del propiedad',
  })
  @IsNumber({}, { message: 'El código debe ser un número' })
  codigo: number;
}
