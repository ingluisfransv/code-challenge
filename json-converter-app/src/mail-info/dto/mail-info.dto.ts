import { PartialType } from '@nestjs/mapped-types';
import { MailInfo } from '../entities/mail-info.entity';

export class MailInfoDto extends PartialType(MailInfo) {}
