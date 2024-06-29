import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IProducts } from './products.interface';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 1,
      name: 'milk',
      price: 12,
      expiration: false,
      createdAt: '2/16/2024',
    },
    {
      id: 2,
      name: 'bread',
      price: 4,
      expiration: true,
      createdAt: '1/06/2023',
    }
  ];

  getAllProducts(): IProducts[] {
    return this.products;
  }

  getProductById(id: number): IProducts {
    const product = this.products.find((el) => el.id === id);
    if (!product) throw new NotFoundException('Status Not Found');
    return product;
  }

  createProduct(body: ProductDTO): IProducts {
    if (!body.name || !body.price)
      throw new BadRequestException('name,price and expiration is Required');
    const lastId = this.products[this.products.length - 1]?.id || 0;
    const newProduct = {
      ...body,
      id: lastId + 1,
      createdAt: new Date().toISOString(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  deleteProduct(id: number) {
    const index = this.products.findIndex((el) => el.id === id);
    if (index === -1) throw new NotFoundException('Not Found');
    const deletedProduct = this.products.splice(index, 1);
    return deletedProduct;
  }

  updateProduct(id:number, body:ProductDTO):IProducts{
    const index = this.products.findIndex(el => el.id === id)
    if (index === -1) throw new NotFoundException('Not Found');
    const updateProduct = {
        ...this.products[index],
        ...body
    }
    this.products[index] = updateProduct
    return updateProduct
  }
}
