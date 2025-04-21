import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_tarifa')
export class TipoTarifa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;
}
