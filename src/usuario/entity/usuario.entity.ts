import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolEntity } from '../../rol/entity/rol.entity';

@Entity({name:'usuario'})
export class UsuarioEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 50, nullable: true})
    name: string;

    @Column({type: 'varchar', length: 50, nullable: false, unique: true})
    username: string;

    @Column({type: 'varchar', length: 50, nullable: false, unique: true})
    email: string;

    @Column({type: 'varchar', length: 100, nullable: false})
    password: number;

    @ManyToMany(() => RolEntity, (rol) => rol.usuarios, {eager: true})
    @JoinTable({
        name: 'usuario_rol',
        joinColumn:{name: 'usuario_id'},
        inverseJoinColumn:{name: 'rol_id'}
    })
    roles: RolEntity[];

}