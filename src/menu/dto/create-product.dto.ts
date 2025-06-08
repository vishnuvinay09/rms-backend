import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, Min, MaxLength, IsEnum } from 'class-validator';
export enum ProductType {
  VEG = 'veg',
  NON_VEG = 'non-veg',
  EGG = 'egg',
}

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  categoryName: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean = true;

  @IsEnum(ProductType)
  @IsNotEmpty()
  type: ProductType;

}