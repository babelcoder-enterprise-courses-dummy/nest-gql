import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';

import { PrismaService } from 'src/core/services/prisma.service';
import { slugify } from 'src/core/utils/slugify';
import { GetProductsArgs } from './dto/get-products.args';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findById(productId: number) {
    return this.prisma.product.findUnique({
      where: { id: productId },
    });
  }

  findBySlug(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
    });
  }

  findByIdOrSlug(idOrSlug: string) {
    if (isNaN(+idOrSlug)) return this.findBySlug(idOrSlug);
    return this.findById(+idOrSlug);
  }

  async findAll(options: GetProductsArgs) {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const totalCount = await this.prisma.product.count();
    const products = await this.prisma.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      meta: {
        page,
        limit,
        previousPage: page === 1 ? undefined : page - 1,
        nextPage: Math.ceil(totalCount / limit) > page ? page + 1 : undefined,
        totalCount,
      },
      items: products,
    };
  }

  async create(form: CreateProductInput) {
    return await this.prisma.product.create({
      data: {
        ...omit(form, 'categoryIds'),
        slug: form.name ? slugify(form.name) : undefined,
        categories: { connect: form.categoryIds.map((id) => ({ id })) },
      },
    });
  }

  async update(form: UpdateProductInput) {
    return await this.prisma.product.update({
      where: { id: form.id },
      data: {
        ...omit(form, ['id', 'categoryIds']),
        slug: form.name ? slugify(form.name) : undefined,
        categories: form.categoryIds
          ? { connect: form.categoryIds.map((id) => ({ id })) }
          : undefined,
      },
    });
  }

  async destroy(productId: number) {
    return await this.prisma.product.delete({ where: { id: productId } });
  }
}
