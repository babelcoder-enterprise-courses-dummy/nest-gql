import { Category } from '@prisma/client';
import DataLoader from 'dataloader';

export interface DataLoaders {
  categoriesLoader: DataLoader<number, Category[]>;
}
