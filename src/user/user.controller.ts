import { Body, Controller, Get, HttpRedirectResponse, Param, Post, Query, Redirect, Res, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response, response } from 'express';

@Controller('user')
export class UserController {
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
        name = name ? name : 'guys'
        return `hello ${name}, anda sedang mencoba async method`
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
