import { Injectable } from "@nestjs/common"


/* class povider */ 
export class Connection {
    getName(): string {
        return null
    }
}

@Injectable()
export class MySqlConnection extends Connection {
    getName(): string {
        return 'MySql'
    }
}

@Injectable()
export class MongoDbConnection extends Connection {
    getName(): string {
        return 'MongoDb'
    }
}