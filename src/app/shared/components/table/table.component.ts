import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SortMeta } from 'primeng/api';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

interface Column {
  field: string;
  header: string;
  type: string;
}

@Component({
  selector: 'sf-table',
  imports: [TableModule, TranslatePipe, DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() emptyMsg: string = 'No items found';
  @Input() searchPlaceholder: string = 'Search keyword';
  @Input() data!: any;
  @Input() columns!: Column[];
  @Output() rowSelect = new EventEmitter<any>();
  selectedData: any;

  loading: boolean = true;
  multiSortMeta: SortMeta[] = [
    {
      field: 'name',
      order: 1,
    },
  ];

  onRowSelect(event: any) {
    this.selectedData = event.data;
    this.rowSelect.emit(event.data);
  }
}
