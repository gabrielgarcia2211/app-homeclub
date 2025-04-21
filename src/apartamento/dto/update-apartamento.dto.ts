export class UpdateApartamentoDto {
  nombre: string;
  direccion: string;
  id_tipo_apartamento: number;
  id_ciudad: number;
  latitud?: number;
  longitud?: number;
  estado?: 'activo' | 'no activo';
}