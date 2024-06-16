import { Injectable } from '@nestjs/common';
import { Connection } from '../connection/connection';

export class PznUserRepository {
    connection: Connection

    save(){
        console.info(`save user with connection ${this.connection.getName()} on PznUserRepository`)
    }
}

export function createPznUserRepository(connection: Connection): PznUserRepository{
    const repository = new PznUserRepository()
    repository.connection = connection
    return repository
}
