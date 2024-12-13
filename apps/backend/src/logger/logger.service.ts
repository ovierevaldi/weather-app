import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DatabaseLogger {
    constructor(private prisma: PrismaService){}

    async log(code: number, message: string) {
        await this.prisma.logger.create({
            data: {
                code: code,
                message: message
            }
        });
    }
}
