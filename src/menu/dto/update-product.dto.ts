import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, Min, MaxLength, IsEnum } from 'class-validator';
import { ProductType } from './create-product.dto'; 

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name?: string;

    @IsOptional()
    @IsString()
    description?: string; 

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsOptional()
    @Min(0)
    price?: number;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(100)
    categoryName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    imageUrl?: string;

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;

    @IsEnum(ProductType)
    @IsOptional()
    type?: ProductType;
}