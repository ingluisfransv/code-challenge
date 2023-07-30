import { IsBoolean, IsString, IsArray } from 'class-validator';
export class MailInfo {
  @IsBoolean()
  spam: boolean;

  @IsBoolean()
  virus: boolean;

  @IsBoolean()
  dns: boolean;

  @IsString()
  mes: string;

  @IsBoolean()
  retrasado: boolean;

  @IsString()
  emisor: string;

  @IsArray()
  receptor: string[];
}
