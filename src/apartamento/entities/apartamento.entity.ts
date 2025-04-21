import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Ciudad } from 'src/ciudad/entities/ciudad.entity';
import { TipoApartamento } from 'src/tipo-apartamento/entities/tipo-apartamento.entity';

@Entity('apartamento')
export class Apartamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 255 })
  direccion: string;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  latitud: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: true })
  longitud: number;

  @Column({ type: 'enum', enum: ['activo', 'no activo'], default: 'activo' })
  estado: 'activo' | 'no activo';

  @ManyToOne(() => TipoApartamento)
  @JoinColumn({ name: 'id_tipo_apartamento' })
  tipoApartamento: TipoApartamento;

  @ManyToOne(() => Ciudad)
  @JoinColumn({ name: 'id_ciudad' })
  ciudad: Ciudad;
}
