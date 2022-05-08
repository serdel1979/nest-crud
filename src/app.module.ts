import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormconfig from './ormconfig';
import { ProductoModule } from './producto/producto.module';
import { ProductoEntity } from './producto/entity/producto.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [
    ProductoModule,
    ProductoEntity,
    TypeOrmModule.forRoot(ormconfig),
    UsuarioModule,
    RolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
