import { IsString, IsInt, IsIn, IsNumber, Max, Min, IsDefined, IsNumberString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class OutputLocatinoPointQueryDto {

    @ApiModelProperty({ description: '纬度' })
    @IsDefined() @IsNumberString()
    readonly latitude: string;

    @ApiModelProperty({ description: '经度' })
    @IsDefined() @IsNumberString()
    readonly longitude: string;

}

export class OutputGetShopFlavorsQueryDto extends OutputLocatinoPointQueryDto {

}

export class OutputGetShopFlavorsResDto {

    @ApiModelProperty({ description: '种类名称' })
    readonly flavorName: string;

    @ApiModelProperty({ description: '数量' })
    readonly count: number;

}
