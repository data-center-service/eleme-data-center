import { IsString, IsInt, IsIn, IsNumber, Max, Min, IsDefined, IsNumberString } from 'class-validator';

export class OutputLocatinoPointQueryDto {

    @IsDefined() @IsNumberString()
    readonly latitude: string;

    @IsDefined() @IsNumberString()
    readonly longitude: string;

}

export class OutputGetShopFlavorsQueryDto extends OutputLocatinoPointQueryDto {

}
