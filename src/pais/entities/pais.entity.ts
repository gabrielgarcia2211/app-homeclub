import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pais')
export class Pais {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;
}
