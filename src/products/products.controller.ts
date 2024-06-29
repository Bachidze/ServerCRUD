import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO } from './product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService:ProductsService){}
    @Get()
    getAllProducts(){
        return this.productsService.getAllProducts()
    }
    @Get("/:id")
    getProductById(@Param("id",ParseIntPipe) id){
        return this.productsService.getProductById(id)
    }

    @Post()
    createProducts(@Body() body:ProductDTO){
        return this.productsService.createProduct(body)
    }

    @Delete("/:id")
    deleteProduct(@Param("id",ParseIntPipe)id){
        return this.productsService.deleteProduct(id)
    }

    @Put("/:id")
    updateProduct(@Param("id",ParseIntPipe)id,@Body() body:ProductDTO){
        return this.productsService.updateProduct(id,body)
    }
}
