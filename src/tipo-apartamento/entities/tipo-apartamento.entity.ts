import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipo_apartamento')
export class TipoApartamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;
}
