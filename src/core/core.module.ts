import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { DataLoadersModule } from 'src/data-loaders/data-loaders.module';

@Global()
@Module({
  imports: [DataLoadersModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CoreModule {}
