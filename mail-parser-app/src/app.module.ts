import { Module } from '@nestjs/common';
import { MailParserModule } from './mail-parser/mail-parser.module';

@Module({
  imports: [MailParserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
