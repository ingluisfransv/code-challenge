import { PartialType } from '@nestjs/mapped-types';
import { EmailRecord } from '../entities/email-record.entity';

export class EmailRecordDto extends PartialType(EmailRecord) {}
