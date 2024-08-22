import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProductUseCaseService } from './update-product.use-case.service';

describe('UpdateProductUseCaseService', () => {
  let service: UpdateProductUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateProductUseCaseService],
    }).compile();

    service = module.get<UpdateProductUseCaseService>(UpdateProductUseCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
