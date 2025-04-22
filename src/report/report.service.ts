import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectDataSource('default') private readonly db1: DataSource,
    @InjectDataSource('secondDB') private readonly db2: DataSource,
  ) {}

  async generateReport(data: any) {
    const {
      latitud,
      longitud,
      tipos,
      precioMinimo,
      precioMaximo,
      pagina = 1,
      limite = 10,
    } = data;

    let tiposArray = [];
    if (tipos && tipos.length > 0) {
      tiposArray = tipos.split(',').map((tipo) => tipo.trim());
    }

    let query = this.listAll(latitud, longitud);
    query = this.getTypes(query, tiposArray);
    query = this.pagination(query, pagina, limite);

    const propiedadesDb1 = await query.getRawMany();

    console.log('propiedadesDb1', propiedadesDb1);
  }

  listAll(latitud: number, longitud: number) {
    return this.db1
      .createQueryBuilder()
      .select([
        'apto.id',
        'apto.nombre',
        'apto.direccion',
        'apto.latitud',
        'apto.longitud',
        'apto.estado',
        'tipo.nombre AS tipo',
        // Calcula la distancia con la fórmula de Haversine
        `(
        6371 * ACOS(
          COS(RADIANS(:latitud)) 
          * COS(RADIANS(apto.latitud)) 
          * COS(RADIANS(apto.longitud) - RADIANS(:longitud)) 
          + SIN(RADIANS(:latitud)) 
          * SIN(RADIANS(apto.latitud))
        )
      ) AS distancia`,
      ])
      .from('apartamento', 'apto')
      .leftJoin(
        'tipo_apartamento',
        'tipo',
        'apto.id_tipo_apartamento = tipo.id',
      )
      .setParameters({ latitud, longitud })
      .where('apto.estado = :estado', { estado: 'activo' })
      .orderBy('distancia', 'ASC');
  }

  pagination(query: any, pagina: number, limite: number) {
    return query.offset((pagina - 1) * limite).limit(limite);
  }

  getTypes(query: any, tipos: string[]) {
    if (tipos && tipos.length > 0) {
      return query.andWhere('tipo.nombre IN (:...tipos)', { tipos: tipos });
    }
    return query;
  }
}
