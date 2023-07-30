import { PartialType } from '@nestjs/mapped-types';
import { EmailRecords } from '../entities/email-records.entity';

export class EmailRecordsDto extends PartialType(EmailRecords) {}
