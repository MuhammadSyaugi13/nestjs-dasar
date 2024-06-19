import { Test, TestingModule } from '@nestjs/testing';
import { BarangRepository } from './barang-repository';

describe('BarangRepository', () => {
  let provider: BarangRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BarangRepository],
    }).compile();

    provider = module.get<BarangRepository>(BarangRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
