import { Test, TestingModule } from '@nestjs/testing';
import { FillAllProductUseCaseService } from './fill-all-product.use-case.service';

describe('FillAllProductUseCaseService', () => {
  let service: FillAllProductUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FillAllProductUseCaseService],
    }).compile();

    service = module.get<FillAllProductUseCaseService>(FillAllProductUseCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
