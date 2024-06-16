import { Body, Controller, Get, HttpRedirectResponse, Param, Post, Query, Redirect, Res, Req, Inject } from '@nestjs/common';
import { CreateUserDto } from './../dto/create-user.dto';
import { Request, Response, response } from 'express';
import { UserService } from './user.service';
import { UserRepository } from './../user-repository/user-repository';
import { Barang, User } from '@prisma/client';
import { Connection } from './../connection/connection';
import { MailService } from '../mail/mail.service';
import { PznUserRepository } from '../user-repository/pzn-user-repository';
import { MemberService } from '../member/member.service';

@Controller('user')
export class UserController {

    constructor(
        private service: UserService, 
        private userRepository: UserRepository,
        private connection: Connection,
        private mailService: MailService,
        @Inject('EmailService') private emailService: MailService,
        private pznUserRepository: PznUserRepository,
        private memberService: MemberService
    ) {}

    @Get()
    findAll(@Res() response): Record<string, string>{
        return response.status(200).json({
            'data': 'hello'
        })
    }

    @Get('/withQuery')
    getWithQuery(@Query() param, @Res() response){
        return response.status(200).json({
            "method": "get with query",
            name: param.name,
            age: param.age
        })
    }

    @Post()
    createUser(@Body() createUserDTO: CreateUserDto) {
        return createUserDTO
    }

    /* response decorator*/ 

    @Get('/sample-response')
    sampleResponse() : Record<string, string> {
        return {
            "method": "sampleResponse()",
            "response": "hello"
        }
    }

    @Get('/redirect')
    @Redirect()
    testRedirect(): HttpRedirectResponse{
        return {
            url: '/user/sample-response',
            statusCode: 301
        }
    }

    /* ./ response decorator*/ 

    /* async method*/ 

    @Get('/async-method')
    async getAsync(@Query('name') name):Promise<string>  {

        /* dengan menggunakan user servicec*/ 
        return this.service.sayHello('Ogi')

        /* tanpa user service */
        // name = name ? name : 'guys'
        // return `hello ${name}, anda sedang mencoba async method`
    }

    /* ./ async method*/ 

    /* cookie */ 

    @Get('/set-cookie')
    setCookie(@Query('name') name:string, @Res() res:Response){
        res.cookie('name', name)
        res.status(200).send('set cookie success')
    }

    @Get('get-cookie')
    getCookie(@Req() requet: Request): string {
        return requet.cookies['name']

    }

    /* ./ cookie */ 

    /* views mustache */ 

    @Get('/view/hello')
    viewHello(@Query('name') name: string, @Res() response: Response){

        return response.render('index.html', {
            title: "Template engine",
            name: name
        })
    }

    /* ./ views mustache */ 

    /* custom provider */

    // class provider
    @Get('/connection')
    async getConnection():Promise<string>  {

        /* factory provider */ 
        this.pznUserRepository.save()

        /* member service */
        this.memberService.getConnetionName()
        this.memberService.sendEmail()

        /* dengan menggunakan user service*/ 
        return this.connection.getName()
    }

    //value provider    
    @Get('/mail')
    async mail():Promise<string>  {
        // menggunakan alias provider
        this.emailService.send()

        /* dengan menggunakan user service*/ 
        return this.mailService.send()
    }

    /* ./ custom provider */  

    /* database with prisma*/ 
    @Get('/create')
    async create(
        @Query('first_name') name:string, 
        @Query('last_name') lastName:string
        ): Promise<User>
    {
        return this.userRepository.save(name, lastName)

    }

    @Get('/barang')
    async createBarang(
        @Query('name') name:string, 
        @Query('price') price:string
        ): Promise<Barang>
    {
        return this.userRepository.saveBarang(name, parseInt(price))

    }
    /*  ./ database with prisma*/ 


    @Get(':keyword')
    getRouteParam(
         @Param() param:string,
         @Res() response
        ): Record<string, string>{
        return response.status(200).json({
            data: param
        })
    }
}
