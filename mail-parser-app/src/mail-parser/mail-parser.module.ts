import { Module } from '@nestjs/common';
import { MailParserService } from './mail-parser.service';
import { MailParserController } from './mail-parser.controller';

@Module({
  controllers: [MailParserController],
  providers: [MailParserService],
})
export class MailParserModule {}
