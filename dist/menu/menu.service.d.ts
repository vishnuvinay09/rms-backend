import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class MenuService {
    private categoryRepository;
    private productRepository;
    constructor(categoryRepository: Repository<Category>, productRepository: Repository<Product>);
    createCategory(name: string): Promise<Category>;
    createProductWithCategoryName(productData: CreateProductDto): Promise<Product>;
    findAllCategories(): Promise<Category[]>;
    findCategoryById(id: number): Promise<Category | null>;
    findAllProducts(): Promise<Product[]>;
    updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product>;
}
