import { IsString, IsInt, IsIn, IsNumber, Max, Min, IsDefined } from 'class-validator';

export class OutputLocatinoPointDto {

    @IsDefined() @IsNumber()
    readonly latitude: number;

    @IsDefined() @IsNumber()
    readonly longitude: number;

}

export class OutputGetShopFlavorsDto extends OutputLocatinoPointDto {

}
