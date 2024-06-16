import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    sayHello(name: string) {
        return `hello ${name}, anda sedang mencoba async method`
    }
}
