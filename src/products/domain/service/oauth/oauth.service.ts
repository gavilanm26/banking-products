import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OauthService {
  private readonly logger = new Logger(OauthService.name);
  private readonly oauthUrl = process.env.OAUTHURL;

  async getToken(
    type: string,
    documentNumber: string,
    password: string,
  ): Promise<string> {
    try {
      const response = await axios.post(this.oauthUrl, {
        type,
        documentNumber,
        password,
      });

      this.logger.log(
        `(OAUTH) Token received successfully for ${type}${documentNumber}`,
      );
      return response.data.token;
    } catch (error) {
      this.logger.error(
        `(OAUTH) Failed to get token for ${type}${documentNumber}`,
        error.stack,
      );
      throw error;
    }
  }
}
