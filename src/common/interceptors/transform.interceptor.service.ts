import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { EncryptionService } from '../../products/domain/service/encryptation/encryption.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly encryptionService: EncryptionService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body.data) {
      const decryptedBody = this.encryptionService.decrypt(
        JSON.stringify(request.body.data),
      );
      request.body = JSON.parse(decryptedBody);
    }

    return next.handle().pipe(
      map((data) => {
        const responseData = JSON.stringify(data);
        return { data: this.encryptionService.encrypt(responseData) };
      }),
    );
  }
}
