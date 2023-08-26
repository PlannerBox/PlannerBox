import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEmail, IsNotEmpty, IsString, IsUUID, Matches, MaxLength } from "class-validator";
import Role from "../../../domain/models/enums/role.enum";
import FormationMode from "../../../domain/models/enums/formationMode.enum";

export class UserAccountWithoutPasswordDto {
  @ApiProperty({ required: false })
  @IsUUID(4, { message: 'Id is not a valid UUID' })
  readonly id?: string;

  @IsNotEmpty({ message: 'User name cannot be empty' })
  @IsEmail()
  @IsString()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'First name cannot be empty' })
  @MaxLength(50, { message: 'First name too long' })
  @IsString()
  readonly firstname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Last name cannot be empty' })
  @MaxLength(50, { message: 'Last name too long' })
  @IsString()
  readonly lastname: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Birth date cannot be empty' })
  @IsDateString()
  readonly birthDate: Date;

  @ApiProperty({ required: true })
  @IsString()
  @MaxLength(50, { message: 'Birth place too long' })
  @IsNotEmpty({ message: 'Birth place can not be empty' })
  readonly birthPlace: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Active cannot be empty' })
  readonly active: boolean;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Role cannot be empty' })
  readonly role: Role;
}

export class UserAccountDto extends UserAccountWithoutPasswordDto {
  @ApiProperty({ required: true })
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})(?!.*(.)\1{2,})/, {message: 'password too weak'})
  readonly password: string;
}

export class GenericUserAccountDto extends UserAccountWithoutPasswordDto {
  @ApiProperty({ required: false })
  readonly studentId?: string;
  @ApiProperty({ required: false })
  readonly formationMode?: FormationMode;

  @ApiProperty({ required: false })
  readonly teacherId?: string;
  @ApiProperty({ required: false })
  readonly intern?: boolean;

  @ApiProperty({ required: false })
  readonly adminId?: string;
}