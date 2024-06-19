import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UserService } from './user/user.service';
import { UserService } from './user/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserRepository } from './user/user-repository/user-repository';
import { UserModule } from './user/user.module';
import { Connection, MySqlConnection, MongoDbConnection } from './user/connection/connection';
import { BarangModule } from './barang/barang.module';
import { WinstonModule } from 'nest-winston';
import { json } from 'stream/consumers';
import { ValidationModule } from './validation/validation.module';
import * as winston from "winston";



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    UserModule,
    BarangModule,
    WinstonModule.forRoot({
      format: winston.format.json(),
      level: 'debug',
      transports: [new winston.transports.Console()]
    }),
    ValidationModule.forRoot(true)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
