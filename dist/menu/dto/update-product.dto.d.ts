import { ProductType } from './create-product.dto';
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    categoryName?: string;
    imageUrl?: string;
    isAvailable?: boolean;
    type?: ProductType;
}
