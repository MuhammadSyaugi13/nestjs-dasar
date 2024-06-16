import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserRepository } from './user-repository/user-repository';
import { UserService } from './user/user.service';
import { Connection, MongoDbConnection, MySqlConnection } from './connection/connection';
import { MailService, mailService } from './mail/mail.service';
import { PznUserRepository, createPznUserRepository } from './user-repository/pzn-user-repository';
import { MemberService } from './member/member.service';

@Module({
    imports: [PrismaModule,],
    controllers: [UserController],
    providers: [
        UserRepository,
        UserService,
        MemberService,
        {
            // class provider
            provide: Connection,
            useClass: process.env.DATABASE === 'mysql' ? MySqlConnection : MongoDbConnection,
        },
        {
            // value provider
            provide: MailService,
            useValue: mailService
        },
        {
            // alias provider
            provide: 'EmailService',
            useExisting: MailService
        },
        {
            provide: PznUserRepository,
            useFactory: createPznUserRepository,
            inject: [Connection]
            
        }
    ]
})
export class UserModule {

}
