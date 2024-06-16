import { Test, TestingModule } from '@nestjs/testing';
import { PznUserRepository } from './pzn-user-repository';

describe('PznUserRepository', () => {
  let provider: PznUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PznUserRepository],
    }).compile();

    provider = module.get<PznUserRepository>(PznUserRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
