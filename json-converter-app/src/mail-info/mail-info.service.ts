import { Injectable } from '@nestjs/common';
import { EmailRecordDto } from './dto/email-record.dto';
import { MailInfo } from './entities/mail-info.entity';
import { EmailRecordsDto } from './dto/email-records.dto';

@Injectable()
export class MailInfoService {
  convertJson(data: EmailRecordsDto) {
    const arrayMailInfo: MailInfo[] = [];
    for (const record of data.Records) {
      const mailInfo = new MailInfo();
      mailInfo.spam = this.valitePASS(record.ses.receipt.spamVerdict.status);
      mailInfo.virus = this.valitePASS(record.ses.receipt.virusVerdict.status);
      mailInfo.dns = this.validateDNS(
        record.ses.receipt.spfVerdict.status,
        record.ses.receipt.dkimVerdict.status,
        record.ses.receipt.dmarcVerdict.status,
      );
      mailInfo.mes = this.getMonth(record.ses.mail.timestamp);
      mailInfo.retrasado =
        record.ses.receipt.processingTimeMillis > 1000 ? true : false;
      mailInfo.emisor = this.getName(record.ses.mail.source);
      mailInfo.receptor = this.getArrayName(record.ses.mail.destination);
      arrayMailInfo.push(mailInfo);
    }
    return arrayMailInfo;
  }

  getName(text: string) {
    const array = text.split('@');
    return array[0];
  }

  getArrayName(text: string[]) {
    const array = [];
    text.forEach((element) => {
      array.push(this.getName(element));
    });
    return array;
  }

  valitePASS(text: string) {
    return text === 'PASS' ? true : false;
  }

  validateDNS(textOne: string, textTwo: string, textThree: string) {
    if (
      this.valitePASS(textOne) &&
      this.valitePASS(textTwo) &&
      this.valitePASS(textThree)
    ) {
      return true;
    }
    return false;
  }
  getMonth(timestamp: string) {
    const englishMonths = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const date = new Date(timestamp);
    const monthIndex = date.getMonth(); // Returns a value between 0 and 11

    return englishMonths[monthIndex];
  }
}
