import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../../user/shared/role';

@Pipe({
  name: 'roleNames',
})
export class RoleNamesPipe implements PipeTransform {
  transform(roles: Role[]): string {
    return roles.map((role) => role.name).join(', ');
  }
}
