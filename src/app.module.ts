import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ormconfig from './ormconfig';
import { ProductoModule } from './producto/producto.module';
import { ProductoEntity } from './producto/entity/producto.entity';

@Module({
  imports: [
    ProductoModule,
    ProductoEntity,
    TypeOrmModule.forRoot(ormconfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
