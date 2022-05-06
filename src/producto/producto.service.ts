import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoRepository } from './producto.repository';
import { ProductoDto } from './dto/producto.dto';
import { ProductoEntity } from './entity/producto.entity';

@Injectable()
export class ProductoService {

    constructor(@InjectRepository(ProductoEntity) private productoRepository: ProductoRepository) { }


    async getAll():Promise<ProductoEntity[]>{
       const list = await this.productoRepository.find();
       if (list.length){
            throw new NotFoundException({message: 'La lista está vacía'});
       }
       return list;  
    }

    async findById(id: number):Promise<ProductoEntity>{
        const producto = await this.productoRepository.findOne(id);
        if (!producto){
             throw new NotFoundException({message: 'No existe el producto'});
        }
        return producto;  
     }

     async findByNombre(nombre: string):Promise<ProductoEntity>{
        const producto = await this.productoRepository.findOne(nombre);
        return producto;  
     }

     async create(dto: ProductoDto):Promise<any>{
        const producto = this.productoRepository.create(dto);
        await this.productoRepository.save(producto);
        return {message : `Producto ${producto.name} creado`};
     }

     async update(id: number, dto: ProductoDto):Promise<any>{
        const producto = await this.findById(id);
        dto.nombre? producto.name = dto.nombre : producto.name = producto.name;
        dto.precio? producto.precio = dto.precio : producto.precio = producto.precio;
        await this.productoRepository.save(producto);
        return {message : `Producto ${producto.name} actualizado`};
     }

     async delete(id: number):Promise<any>{
        const producto = await this.findById(id);
        await this.productoRepository.delete(producto);
        return {message : `Producto ${producto.name} eliminado`};
     }





}
