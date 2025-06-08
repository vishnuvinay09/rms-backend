import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class MenuService {
  constructor(
      @InjectRepository(Category)
      private categoryRepository: Repository<Category>,
      @InjectRepository(Product)
      private productRepository: Repository<Product>,
  ){}

  async createCategory(name: string): Promise<Category> {
      let category = await this.categoryRepository.findOneBy({ name });
      if (category) {
        throw new ConflictException(
          `Category already exist`,
        );
      }
      const newCategory = this.categoryRepository.create({ name });
      return this.categoryRepository.save(newCategory);
  }

  async createProductWithCategoryName(productData: CreateProductDto): Promise<Product> {
      const category = await this.categoryRepository.findOneBy({ name: productData.categoryName });

      if (!category) {
        throw new NotFoundException(
          `Category '${productData.categoryName}' not found. Please create the category first or use an existing one.`,
        );
      }
      const existingProduct = await this.productRepository.findOneBy({ name: productData.name });
      if (existingProduct) {
        throw new ConflictException(`A product with the name '${productData.name}' already exists.`);
      }

      const newProduct = this.productRepository.create({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        imageUrl: productData.imageUrl,
        isAvailable: productData.isAvailable,
        type: productData.type,
        // category: category,
        categoryId: category.id,
      });

      return this.productRepository.save(newProduct);
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.find({});
  }

  async findCategoryById(id: number){
    return this.categoryRepository.findOne({ where: { id }});
  }

  async findAllProducts(): Promise<Product[]> {
    return this.productRepository.find({
      select: [
        'id',
        'name',
        'description',
        'type',
        'price',
        'imageUrl',
        'isAvailable',
        'categoryId',
      ],
      order: {
        categoryId: 'ASC',
        name: 'ASC',
      },
    });
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found.`);
    }

    if (updateProductDto.categoryName) {
      const newCategory = await this.categoryRepository.findOneBy({ name: updateProductDto.categoryName });
      if (!newCategory) {
        throw new NotFoundException(
          `Category '${updateProductDto.categoryName}' not found. Cannot update product category.`,
        );
      }
      product.categoryId = newCategory.id;
    }
    const updatedProduct = this.productRepository.merge(product, updateProductDto);
    return await this.productRepository.save(updatedProduct);
    
  }
}
