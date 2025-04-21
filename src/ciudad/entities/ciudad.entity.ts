import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pais } from 'src/pais/entities/pais.entity';

@Entity('ciudad')
export class Ciudad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @ManyToOne(() => Pais, (pais) => pais.id)
  @JoinColumn({ name: 'id_pais' })
  pais: Pais;
}
