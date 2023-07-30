import { Module } from '@nestjs/common';
import { MailInfoService } from './mail-info.service';
import { MailInfoController } from './mail-info.controller';

@Module({
  controllers: [MailInfoController],
  providers: [MailInfoService],
})
export class MailInfoModule {}
