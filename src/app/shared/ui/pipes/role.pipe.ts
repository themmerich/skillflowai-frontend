import { Pipe, PipeTransform } from '@angular/core';

interface Role {
  id: number;
  name: string;
}

@Pipe({
  name: 'roleNames',
})
export class RoleNamesPipe implements PipeTransform {
  transform(roles: Role[]): string {
    return roles.map((role) => role.name).join(', ');
  }
}
