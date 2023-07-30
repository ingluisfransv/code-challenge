import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as MailParser from 'mailparser';
import * as cheerio from 'cheerio';
import fs = require('fs');
@Injectable()
export class MailParserService {
  //---------------------------------------------------------------------------
  async parseMail(url: string): Promise<any> {
    try {
      const typeUrl = url.includes('http');
      let mailData: any = null;
      if (typeUrl) {
        const response = await axios.get(url);
        mailData = response.data;
      } else {
        const existFile = fs.existsSync(url);
        if (!existFile) {
          throw new NotFoundException('File not found');
        }
        mailData = fs.readFileSync(url);
      }

      //crear un buffer a partir de los datos del correo
      const buffer = Buffer.from(mailData);

      const mail = await MailParser.simpleParser(buffer);

      if (mail.attachments.length > 0) {
        for (let i = 0; i < mail.attachments.length; i++) {
          const attachment = mail.attachments[i];
          console.log(attachment.contentType);
        }
        // Si hay archivos adjuntos en el correo, busca el JSON y responde con él.
        const jsonAttachment = mail.attachments.find(
          (attachment) => attachment.contentType === 'application/json',
        );
        if (jsonAttachment) {
          return JSON.parse(jsonAttachment.content.toString());
        }
      }

      // Si no se encuentra el JSON en los archivos adjuntos, busca dentro del cuerpo del correo.
      const jsonInBody = this.findJsonInMailBody(mail.text);

      if (jsonInBody) {
        return JSON.parse(jsonInBody);
      }

      // Si no se encuentra el JSON en el cuerpo del correo, busca enlaces y sigue el flujo.
      const jsonInLinks = await this.findJsonInLinks(mail.html);

      if (jsonInLinks) {
        return JSON.parse(jsonInLinks);
      }
      // Si no se encuentra el JSON en ninguna parte, devuelve un mensaje de error.
      throw new NotFoundException('JSON not found');
    } catch (error) {
      return error;
    }
  }

  private findJsonInMailBody(text: string): string | null {
    ///buscar un json en el cuerpo del correo
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    if (jsonStart >= 0 && jsonEnd >= 0) {
      return text.substring(jsonStart, jsonEnd + 1);
    }

    return null; // No se encontró el JSON en el cuerpo del correo.
  }

  private async findJsonInLinks(html: any): Promise<string | null> {
    const $ = cheerio.load(html);
    // Buscar todos los enlaces.
    const links = $('a');

    // Recorrer los enlaces.
    for (let i = 0; i < links.length; i++) {
      const link = links[i];

      // Obtener el valor del atributo href.
      const href = link.attribs.href;

      // Si el enlace es un archivo JSON, descargarlo y devolverlo.
      const response = await axios.get(href);
      //validar si la respuesta es un json
      const data = response.data;

      if (typeof data === 'object') {
        return JSON.stringify(data);
      }
    }

    return null; // No se encontró el JSON en los enlaces del correo.
  }
}
