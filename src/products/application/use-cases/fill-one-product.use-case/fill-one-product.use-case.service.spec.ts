import { Test, TestingModule } from '@nestjs/testing';
import { FillOneProductUseCaseService } from './fill-one-product.use-case.service';

describe('FillOneProductUseCaseService', () => {
  let service: FillOneProductUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FillOneProductUseCaseService],
    }).compile();

    service = module.get<FillOneProductUseCaseService>(FillOneProductUseCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
