import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Room } from "../../entities/Room.entity";
import { Material } from "../../entities/Material.entity";
import { IntegerType } from "typeorm";

export class UseMaterialRoomDto {
  @ApiProperty({ required: true })
  readonly id?: string;

  @IsNotEmpty({ message: 'Name can not be empty' })
  readonly number: IntegerType;

  @ApiProperty({ required: true })
  readonly room: Room;

  @ApiProperty({ required: true })
  readonly material: Material;

}