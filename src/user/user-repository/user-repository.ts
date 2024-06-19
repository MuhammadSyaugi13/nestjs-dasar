import { Inject, Injectable } from '@nestjs/common';
import { Injector } from '@nestjs/core/injector/injector';
import { User, Barang } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import {Logger} from 'winston'

@Injectable()
export class UserRepository {
    constructor(
        private PrismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger
        ) {
        this.logger.info('create user repository')
    }
    // connection: Connection

    async save(firstName:string, lastName: string): Promise<User> {
        this.logger.info(`create user with ${firstName} - ${lastName}}`)
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
