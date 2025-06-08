import { MenuService } from './menu.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    findAllProducts(): Promise<Product[]>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    findAllCategories(): Promise<Category[]>;
    findCategoryById(id: string): Promise<Category>;
}
