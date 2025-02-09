import { Module, OnModuleInit } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements OnModuleInit {
  constructor(
    private prismaService: PrismaService,
    private productService: ProductsService,
  ) {}

  //! Apenas no ambiente de teste
  async onModuleInit() {
    const products = new Array(10).fill(0).map((_, index) => index + 1);

    await this.prismaService.product.deleteMany();

    for (const productIndex of products) {
      await this.productService.create({
        name: `Product ${productIndex}`,
        slug: `product-${productIndex}`,
        description: `Description for product ${productIndex}`,
        price: productIndex * 100,
      });
    }
  }
}
