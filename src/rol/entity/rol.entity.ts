import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolNombre } from '../rol.enum';
import { UsuarioEntity } from '../../usuario/entity/usuario.entity';

@Entity({name:'rol'})
export class RolEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50, nullable: false, unique: true})
    rol_nombre: RolNombre;

    @ManyToMany(() => UsuarioEntity, (usuario) => usuario.roles)
    @JoinTable()
    usuarios: UsuarioEntity[];

}