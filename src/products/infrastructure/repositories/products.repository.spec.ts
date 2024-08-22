import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from './products.repository';

describe('ProductsRepositoryService', () => {
  let service: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsRepository],
    }).compile();

    service = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
