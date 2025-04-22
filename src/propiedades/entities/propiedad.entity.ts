import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'propiedades' })
@Unique(['codigo'])
export class Propiedad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigo: string; // debe coincidir con el código del apartamento en BD1

    @Column()
    descripcion: string;

    @Column()
    imagen_url: string;
}
