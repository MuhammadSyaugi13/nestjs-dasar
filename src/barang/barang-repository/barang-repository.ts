import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class BarangRepository {
    constructor(private prismaService: PrismaService){}

    async save(dataBarang:object[]) : Promise<string> {
        for (const barang of dataBarang) {
            
            await this.prismaService.barang.create({
                data: {
                    name: barang["name"],
                    price: barang["price"]
                }
            })
        }

        return 'success'
    }
}
