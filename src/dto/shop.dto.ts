import { IsString, IsInt, IsIn, IsNumber, Max, Min, IsDefined } from 'class-validator';

export class ShopCreateDto {

    @IsDefined() @IsNumber()
    readonly latitude: number;

    @IsDefined() @IsNumber()
    readonly longitude: number;

    @IsNumber() @Max(10) @Min(1)
    readonly deep?: number;

}