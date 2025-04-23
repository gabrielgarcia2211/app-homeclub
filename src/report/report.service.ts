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
    query = this.getFilterPrice(query, precioMinimo, precioMaximo, tiposArray);
    query = this.pagination(query, pagina, limite);
    const propiedadesDb1 = await query.getRawMany();

    // logica final para obtener los codigos de las propiedades
    if (!propiedadesDb1 || propiedadesDb1.length === 0) {
      return {
        pagina,
        limite,
        total: 0,
        propiedades: [],
      };
    }

    const codigos = propiedadesDb1.map((p) => p.apto_id);
    const propiedadesDb2 = await this.getPropiedadesDb2(codigos);
    const mapDb2 = Object.fromEntries(propiedadesDb2.map((p) => [p.codigo, p]));

    const propiedadesFinal = propiedadesDb1.map((p) => ({
      ...p,
      descripcion: mapDb2[p.apto_id]?.descripcion || null,
      imagen_url: mapDb2[p.apto_id]?.imagen_url || null,
    }));

    return {
      pagina,
      limite,
      total: propiedadesFinal.length,
      propiedades: propiedadesFinal,
    };
  }

  listAll(latitud?: number, longitud?: number) {
    const query = this.db1
      .createQueryBuilder()
      .select([
        'apto.id',
        'apto.nombre',
        'apto.direccion',
        'apto.latitud',
        'apto.longitud',
        'apto.estado',
        'tipo.nombre AS tipo_apartamento',
        'tipoTarifa.nombre AS tipo_tarifa',
        'tarifa.precio',
        latitud != null && longitud != null
          ? `(
          6371 * ACOS(
            COS(RADIANS(:latitud)) 
            * COS(RADIANS(apto.latitud)) 
            * COS(RADIANS(apto.longitud) - RADIANS(:longitud)) 
            + SIN(RADIANS(:latitud)) 
            * SIN(RADIANS(apto.latitud))
          )
        ) AS distancia`
          : 'NULL AS distancia',
      ])
      .from('apartamento', 'apto')
      .innerJoin(
        'tipo_apartamento',
        'tipo',
        'apto.id_tipo_apartamento = tipo.id',
      )
      .innerJoin('tarifa', 'tarifa', 'apto.id = tarifa.id_apartamento')
      .innerJoin(
        'tipo_tarifa',
        'tipoTarifa',
        'tarifa.id_tipo_tarifa = tipoTarifa.id',
      )
      .where('apto.estado = :estado', { estado: 'activo' });

    if (latitud != null && longitud != null) {
      query.setParameters({ latitud, longitud }).orderBy('distancia', 'ASC');
    }

    return query;
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

  getFilterPrice(
    query: any,
    precioMinimo: number,
    precioMaximo: number,
    tiposArray: string[],
  ) {
    if (tiposArray.includes('turistico')) {
      query.andWhere('tipoTarifa.nombre = :tipoTarifaTur', {
        tipoTarifaTur: 'diaria',
      });
      if (precioMinimo != null) {
        query.andWhere('tarifa.precio >= :precioMin', {
          precioMin: precioMinimo,
        });
      }
      if (precioMaximo != null) {
        query.andWhere('tarifa.precio <= :precioMax', {
          precioMax: precioMaximo,
        });
      }
    } else if (tiposArray.includes('corporativo')) {
      query.andWhere('tipoTarifa.nombre = :tipoTarifaCorp', {
        tipoTarifaCorp: 'mensual',
      });

      if (precioMinimo != null) {
        query.andWhere('tarifa.precio >= :precioMin', {
          precioMin: precioMinimo,
        });
      }
      if (precioMaximo != null) {
        query.andWhere('tarifa.precio <= :precioMax', {
          precioMax: precioMaximo,
        });
      }
    }

    return query;
  }

  async getPropiedadesDb2(codigos: string[]) {
    return await this.db2
      .createQueryBuilder()
      .select(['codigo', 'descripcion', 'imagen_url'])
      .from('propiedades', 'p')
      .where('p.codigo IN (:...codigos)', { codigos })
      .getRawMany();
  }
}
