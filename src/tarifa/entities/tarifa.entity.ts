import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { TipoApartamento } from 'src/tipo-apartamento/entities/tipo-apartamento.entity';
import { TipoTarifa } from 'src/tipo-tarifa/entities/tipo-tarifa.entity';

@Entity('tarifa')
export class Tarifa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', name: 'id_apartamento' })
  idApartamento: number;

  @Column({ type: 'date', name: 'fecha_inicio' })
  fechaInicio: Date;

  @Column({ type: 'date', name: 'fecha_fin' })
  fechaFin: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'precio' })
  precio: number;

  @Column({ type: 'int', name: 'id_tipo_tarifa' })
  idTipoTarifa: number;

  @ManyToOne(() => TipoApartamento)
  @JoinColumn({ name: 'id_apartamento' })
  tipoApartamento: TipoApartamento;

  @ManyToOne(() => Ciudad)
  @JoinColumn({ name: 'id_ciudad' })
  ciudad: Ciudad;

  @ManyToOne(() => TipoTarifa)
  @JoinColumn({ name: 'id_tipo_tarifa' })
  tipoTarifa: TipoTarifa;
}
