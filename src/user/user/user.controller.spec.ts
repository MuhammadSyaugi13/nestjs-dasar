import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMocks from 'node-mocks-http'
import { UserService } from './user/user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be say hello', async () => {
    const response = await controller.getAsync('Ogi')
    expect(response).toBe('hello Ogi, anda sedang mencoba async method');
  });

  //test view template
  it('should can view template', () => {
    const response = httpMocks.createResponse()
    controller.viewHello('Ogi', response)

    expect(response._getRenderView()).toBe('index.html')
    expect(response._getRenderData()).toEqual({
            title: "Template engine",
            name: 'Ogi'
        })

  })


});
