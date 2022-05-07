import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/producto.dto';

@Controller('productos')
export class ProductoController {

    constructor(private readonly productoService: ProductoService){}

    @Get()
    async getAll(){
        return await this.productoService.getAll();
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe)id: number){
        return await this.productoService.findById(id);
    }

    @Post()
    async create(@Body() dto: ProductoDto){
        return await this.productoService.create(dto);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe)id: number,@Body() dto: ProductoDto){
        let nuevoProducto = dto;
        return await this.productoService.update(id,nuevoProducto);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe)id: number){
        return await this.productoService.delete(id) ;
    }



}
