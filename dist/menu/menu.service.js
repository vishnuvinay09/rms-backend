"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
const product_entity_1 = require("./entities/product.entity");
let MenuService = class MenuService {
    categoryRepository;
    productRepository;
    constructor(categoryRepository, productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }
    async createCategory(name) {
        let category = await this.categoryRepository.findOneBy({ name });
        if (category) {
            throw new common_1.ConflictException(`Category already exist`);
        }
        const newCategory = this.categoryRepository.create({ name });
        return this.categoryRepository.save(newCategory);
    }
    async createProductWithCategoryName(productData) {
        const category = await this.categoryRepository.findOneBy({ name: productData.categoryName });
        if (!category) {
            throw new common_1.NotFoundException(`Category '${productData.categoryName}' not found. Please create the category first or use an existing one.`);
        }
        const existingProduct = await this.productRepository.findOneBy({ name: productData.name });
        if (existingProduct) {
            throw new common_1.ConflictException(`A product with the name '${productData.name}' already exists.`);
        }
        const newProduct = this.productRepository.create({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            imageUrl: productData.imageUrl,
            isAvailable: productData.isAvailable,
            type: productData.type,
            categoryId: category.id,
        });
        return this.productRepository.save(newProduct);
    }
    async findAllCategories() {
        return this.categoryRepository.find({});
    }
    async findCategoryById(id) {
        return this.categoryRepository.findOne({ where: { id } });
    }
    async findAllProducts() {
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
    async updateProduct(id, updateProductDto) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${id} not found.`);
        }
        if (updateProductDto.categoryName) {
            const newCategory = await this.categoryRepository.findOneBy({ name: updateProductDto.categoryName });
            if (!newCategory) {
                throw new common_1.NotFoundException(`Category '${updateProductDto.categoryName}' not found. Cannot update product category.`);
            }
            product.categoryId = newCategory.id;
        }
        const updatedProduct = this.productRepository.merge(product, updateProductDto);
        return await this.productRepository.save(updatedProduct);
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MenuService);
//# sourceMappingURL=menu.service.js.map