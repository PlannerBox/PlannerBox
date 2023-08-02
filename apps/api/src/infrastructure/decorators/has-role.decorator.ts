import { SetMetadata } from '@nestjs/common';
import Permission from '../../domain/models/enums/permission.type';

export const HasRoles = (...permissions: Permission[]) => SetMetadata('permissions', permissions);