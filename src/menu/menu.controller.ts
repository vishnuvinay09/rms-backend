import { Body, Controller, Get, NotFoundException, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @UsePipes(new ValidationPipe())
  @Post('products/create')
  async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.menuService.createProductWithCategoryName(createProductDto);
  }

  @UsePipes(new ValidationPipe())
  @Post('products/update/:id')
  async updateProduct(@Param('id') id: string,@Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.menuService.updateProduct(+id, updateProductDto);
  }

  @Get('products')
  async findAllProducts(): Promise<Product[]> {
    return this.menuService.findAllProducts();
  }

  @Post('categories/create')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.menuService.createCategory(createCategoryDto.name);
  }

  @Get('categories')
  async findAllCategories() {
    return this.menuService.findAllCategories();
  }

  @Get('categories/:id')
  async findCategoryById(@Param('id') id: string): Promise<Category> {
    const category = await this.menuService.findCategoryById(+id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }
}
