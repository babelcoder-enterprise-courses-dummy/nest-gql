import { Module } from '@nestjs/common';
import { DataLoadersService } from './data-loaders.service';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [CategoriesModule],
  providers: [DataLoadersService],
  exports: [DataLoadersService],
})
export class DataLoadersModule {}
