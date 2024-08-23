import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from '../../domain/service/encryptation/encryption.service';

@Injectable()
export class TokenValidationService {
  private readonly logger = new Logger(TokenValidationService.name);
  private readonly jwtSecret = process.env.JWTSECRET;

  constructor(
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
  ) {}

  getUserFromToken(token: string): any {
    try {
      const decoded = this.jwtService.verify(token, { secret: this.jwtSecret });

      const decryptedCustomerKey = this.encryptionService.decrypt(
        decoded.customerKey,
      );

      if (!decryptedCustomerKey) {
        throw new UnauthorizedException('Invalid token');
      }

      this.logger.log('(TOKEN VALIDATION) Token successfully validated');
      return {
        ...decoded,
        customerKey: decryptedCustomerKey, // Retorna el customerKey desencriptado
      };
    } catch (error) {
      this.logger.error('(TOKEN VALIDATION FAILED) Invalid token', error.stack);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
