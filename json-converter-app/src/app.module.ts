import { Module } from '@nestjs/common';
import { MailInfoModule } from './mail-info/mail-info.module';

@Module({
  imports: [MailInfoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
