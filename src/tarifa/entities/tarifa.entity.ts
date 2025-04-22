import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Apartamento } from 'src/apartamento/entities/apartamento.entity';
import { TipoTarifa } from 'src/tipo-tarifa/entities/tipo-tarifa.entity';

@Entity('tarifa')
export class Tarifa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column({ type: 'date', name: 'fecha_fin' })
  fechaFin: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'precio' })
  precio: number;

  @ManyToOne(() => Apartamento)
  @JoinColumn({ name: 'id_apartamento' })
  idApartamento: Apartamento;

  @ManyToOne(() => TipoTarifa)
  @JoinColumn({ name: 'id_tipo_tarifa' })
  tipoTarifa: TipoTarifa;
}
