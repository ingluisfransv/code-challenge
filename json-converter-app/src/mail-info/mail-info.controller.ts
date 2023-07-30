import { Controller, Post, Body } from '@nestjs/common';
import { MailInfoService } from './mail-info.service';
import { EmailRecordDto } from './dto/email-record.dto';
import { EmailRecordsDto } from './dto/email-records.dto';

@Controller('mail-info')
export class MailInfoController {
  constructor(private readonly mailInfoService: MailInfoService) {}

  @Post()
  jsonConvert(@Body() data: EmailRecordsDto) {
    return this.mailInfoService.convertJson(data);
  }
}
