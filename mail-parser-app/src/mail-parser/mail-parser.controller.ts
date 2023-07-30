import { Controller, Post, Body } from '@nestjs/common';
import { MailParserService } from './mail-parser.service';

@Controller('mail-parser')
export class MailParserController {
  constructor(private readonly mailParserService: MailParserService) {}
  @Post()
  async parseMail(@Body('url') url: string): Promise<any> {
    //validar si es un url o una ruta de archivo

    return await this.mailParserService.parseMail(url);
  }
}
