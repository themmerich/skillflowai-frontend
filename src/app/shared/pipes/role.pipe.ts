import { Pipe, PipeTransform } from '@angular/core';
import { Role } from '../../domains/admin/model/role';

@Pipe({
  name: 'roleNames',
})
export class RoleNamesPipe implements PipeTransform {
  transform(roles: Role[]): string {
    return roles.map((role) => role.name).join(', ');
  }
}
