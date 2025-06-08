export declare enum ProductType {
    VEG = "veg",
    NON_VEG = "non-veg",
    EGG = "egg"
}
export declare class CreateProductDto {
    name: string;
    description?: string;
    price: number;
    categoryName: string;
    imageUrl?: string;
    isAvailable?: boolean;
    type: ProductType;
}
