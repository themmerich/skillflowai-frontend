import { Pipe, PipeTransform } from '@angular/core';

interface Option {
  id: number;
  name: string;
}

@Pipe({
  name: 'optionName',
})
export class OptionNamePipe implements PipeTransform {
  transform(option: Option): string {
    if (!option) {
      return '';
    }
    return option.name;
  }
}
