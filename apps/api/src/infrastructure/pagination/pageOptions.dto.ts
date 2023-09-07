import { ApiPropertyOptional } from "@nestjs/swagger";
import { Order } from "../../domain/models/enums/order.enum";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class PageOptionsDto {
    
    @ApiPropertyOptional({ enum: Order, default: Order.ASC })
    @IsEnum(Order)
    @IsOptional()
    readonly order? : Order = Order.ASC;

    @ApiPropertyOptional({ default: 1, minimum: 1 })
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    readonly page? : number = 1;

    @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 100 })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    readonly take? : number = 10;

    get skip(): number {
        return (this.page - 1) * this.take;
    }
}