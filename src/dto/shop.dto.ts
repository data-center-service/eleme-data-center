import { IsString, IsInt, IsIn, IsNumber, Max, Min, IsDefined, IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ShopCreateDto {

    @IsDefined() @IsNumber()
    readonly latitude: number;

    @IsDefined() @IsNumber()
    readonly longitude: number;

    @IsNumber() @Max(10) @Min(1)
    readonly deep?: number;

}

export class ShopLocatinoPointQueryDto {

    @ApiModelProperty({ description: '纬度' })
    @IsDefined() @IsNumberString()
    readonly latitude: string;

    @ApiModelProperty({ description: '经度' })
    @IsDefined() @IsNumberString()
    readonly longitude: string;

}

export class ShopFlavorsQueryDto extends ShopLocatinoPointQueryDto {

}

export class ShopFlavorsResDto {

    @ApiModelProperty({ description: '种类名称' })
    readonly flavorName: string;

    @ApiModelProperty({ description: '数量' })
    readonly count: number;

}