import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProductUseCaseService } from './delete-product.use-case.service';

describe('DeleteProductUseCaseService', () => {
  let service: DeleteProductUseCaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteProductUseCaseService],
    }).compile();

    service = module.get<DeleteProductUseCaseService>(DeleteProductUseCaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
