import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import DataLoader from 'dataloader';
import { CategoriesService } from 'src/categories/categories.service';
import { DataLoaders } from './data-loaders.model';

@Injectable()
export class DataLoadersService {
  constructor(private readonly categoriesService: CategoriesService) {}

  getLoaders(): DataLoaders {
    return {
      categoriesLoader: this.createCategoriesLoader(),
    };
  }

  private createCategoriesLoader() {
    return new DataLoader<number, Category[]>((keys: number[]) =>
      this.categoriesService.findAllByProductIdsWithLoader(keys),
    );
  }
}
