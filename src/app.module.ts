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



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    PrismaModule,
    UserModule,
    BarangModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
