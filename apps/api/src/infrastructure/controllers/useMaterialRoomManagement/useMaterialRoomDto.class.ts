import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Room } from "../../entities/Room.entity";
import { Material } from "../../entities/Material.entity";
import { IntegerType } from "typeorm";
import { RoomDto } from "../roomManagement/roomDto.class";
import { MaterialDto } from "../MaterialManagement/materialDto.class";

export class UseMaterialRoomDto {
  @ApiProperty()
  readonly id?: string;

  @IsNotEmpty({ message: 'Number can not be empty' })
  @ApiProperty({ required: true })
  readonly number: IntegerType;

  @ApiProperty({ required: true })
  readonly room: RoomDto;

  @ApiProperty({ required: true })
  readonly material: MaterialDto;

}