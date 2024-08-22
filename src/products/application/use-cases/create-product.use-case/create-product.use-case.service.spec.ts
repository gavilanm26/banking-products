import { Test, TestingModule } from '@nestjs/testing';
import { CreateProductUseCaseService } from './create-product.use-case.service';

describe('CreateProductUseCaseService', () => {
  let service: CreateProductUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateProductUseCaseService],
    }).compile();

    service = module.get<CreateProductUseCaseService>(CreateProductUseCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
