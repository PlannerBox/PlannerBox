import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Place } from "../../entities/Place.entity";
import { UseMaterialRoom } from "../../entities/UseMaterialRoom.entity";
import { Room } from "../../entities/Room.entity";

export class RoomDto {
  @ApiProperty()
  readonly id?: string;

  @IsNotEmpty({ message: 'Name can not be empty' })
  @ApiProperty({ required: true })
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  readonly place: Place;

  @ApiProperty({ required: true })
  readonly useMaterialRoom?: UseMaterialRoom[];

}
export class InsertRoomDTO{
  @ApiProperty()
  readonly room: Room;
  @ApiProperty()
  readonly useMaterialRooms: UseMaterialRoom[];

}