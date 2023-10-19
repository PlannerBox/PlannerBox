import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Room } from "../../entities/Room.entity";

export class PlaceDto {
  @ApiProperty({ required: true })
  readonly id?: string;

  @IsNotEmpty({ message: 'City can not be empty' })
  @IsString()
  readonly city: string;

  @IsNotEmpty({ message: 'Street can not be empty' })
  @IsString()
  readonly street: string;

  @IsNotEmpty({ message: 'Street number can not be empty' })
  @IsString()
  readonly streetNumber: string;

  readonly room?: Room[];
}