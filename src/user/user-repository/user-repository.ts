import { Injectable } from '@nestjs/common';
import { User, Barang } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class UserRepository {
    constructor(private PrismaService: PrismaService) {
        console.info('create user repository')
    }
    // connection: Connection

    async save(firstName:string, lastName: string): Promise<User> {
        return await this.PrismaService.user.create({
            data: {
                first_name: firstName,
                last_name: lastName
            }
        })
    }

    async saveBarang(name: string, price: number): Promise<Barang> {
        return await this.PrismaService.barang.create({
            data: {
                name,
                price
            }
        })
    }
}
