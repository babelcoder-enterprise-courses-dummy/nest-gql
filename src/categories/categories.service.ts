import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/core/services/prisma.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { slugify } from 'src/core/utils/slugify';
import { omit } from 'lodash';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  findById(categoryId: number) {
    return this.prisma.category.findUnique({ where: { id: categoryId } });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  async create(form: CreateCategoryInput) {
    return await this.prisma.category.create({
      data: {
        ...form,
        slug: slugify(form.name),
      },
    });
  }

  async update(form: UpdateCategoryInput) {
    return await this.prisma.category.update({
      where: { id: form.id },
      data: {
        ...omit(form, 'id'),
        slug: form.name ? slugify(form.name) : undefined,
      },
    });
  }

  async destroy(categoryId: number) {
    return await this.prisma.category.delete({ where: { id: categoryId } });
  }
}
