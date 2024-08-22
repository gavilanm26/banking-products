import { Test, TestingModule } from '@nestjs/testing';
import { TokenValidationService } from './token-validation.service';

describe('TokenValidationService', () => {
  let service: TokenValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenValidationService],
    }).compile();

    service = module.get<TokenValidationService>(TokenValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
