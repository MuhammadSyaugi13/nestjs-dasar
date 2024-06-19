import { Module } from '@nestjs/common';
import { BarangController } from './barang/barang.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BarangRepository } from './barang-repository/barang-repository';

@Module({
    // imports: [PrismaModule],
    controllers: [BarangController],
    providers: [BarangRepository]

})
export class BarangModule {

}
