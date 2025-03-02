import { Pipe, PipeTransform } from '@angular/core';

interface Option {
  id: number;
  name: string;
}

@Pipe({
  name: 'optionNames',
})
export class OptionNamesPipe implements PipeTransform {
  transform(options: Option[]): string {
    if (!options || options.length === 0) {
      return '';
    }
    return options.map((option) => option.name).join(', ');
  }
}
