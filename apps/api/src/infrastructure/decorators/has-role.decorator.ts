import { SetMetadata } from '@nestjs/common';
import { Role } from '../../domain/models/role.enum';

export const HasRoles = (...roles: Role[]) => SetMetadata('roles', roles);