import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenValidationService {
  private readonly logger = new Logger(TokenValidationService.name);

  constructor(private readonly jwtService: JwtService) {}

  async getUserFromToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWTSECRET,
      });

      // Verificar que el token contenga la información necesaria
      if (!decoded || !decoded.type || !decoded.documentNumber) {
        throw new UnauthorizedException('Invalid token');
      }

      // Construir el customerKey a partir del token decodificado
      const customerKey = `${decoded.type}${decoded.documentNumber}`;

      // Devolver el token decodificado completo con el customerKey
      return {
        ...decoded,
        customerKey: customerKey,
      };
    } catch (error) {
      this.logger.error(`(TOKEN VALIDATION FAILED) Invalid token`, error.stack);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
