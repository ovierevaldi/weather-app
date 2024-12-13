import { Module } from '@nestjs/common';
import { DatabaseLogger } from './logger.service';
import { PrismaService } from 'src/prisma.service';

@Module({})
export class LoggerModule {
    providers: [DatabaseLogger, PrismaService]
}
