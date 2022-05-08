import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoRepository } from './producto.repository';
import { ProductoDto } from './dto/producto.dto';
import { ProductoEntity } from './entity/producto.entity';
import { Producto } from './producto.class';
import { MessageDto } from '../common/message.dto';

@Injectable()
export class ProductoService {

   constructor(@InjectRepository(ProductoEntity) private productoRepository: ProductoRepository) { }


   async getAll(): Promise<ProductoEntity[]> {
      const list = await this.productoRepository.find();
      return list;
   }

   async findById(id: number): Promise<ProductoEntity> {
      const producto = await this.productoRepository.findOne(id);
      if (!producto) {
         throw new NotFoundException({ message: 'no existe el producto' });
      }
      return producto;
   }

   async create(dto: ProductoDto): Promise<any> {
      let existe = await this.productoRepository.findOne({ where: {name: dto.name}});
      if (existe) throw new BadRequestException({ message: "ese nombre ya existe" });
      const producto = this.productoRepository.create(dto);
      await this.productoRepository.save(producto);
      return new MessageDto(`producto ${dto.name} creado`);
   }

   async update(id: number, dto: ProductoDto): Promise<any>{
      let toUpdate = await this.productoRepository.findOne({ where: {id: id}});
      let existe = await this.productoRepository.findOne({ where: {name: dto.name}});
      console.log("existe y dto -->",existe,dto.name);
      if (existe && existe.id !== id) {
         throw new BadRequestException({ message: "ese nombre ya existe" });
      }
      let updated = Object.assign(toUpdate, dto);
      this.productoRepository.save(updated);
      return new MessageDto(`Producto ${dto.name} actualizado`);
   }

   async delete(id: number): Promise<any> {
      const producto = await this.findById(id);
      await this.productoRepository.delete(producto);
      return new MessageDto('Producto eliminado');;
   }




}
