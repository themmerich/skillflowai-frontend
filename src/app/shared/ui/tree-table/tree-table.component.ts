import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { DatePipe, NgClass } from '@angular/common';
import { OptionNamePipe } from '@ui/pipes/option.pipe';
import { OptionNamesPipe } from '@ui/pipes/options.pipe';
import { TableModule } from 'primeng/table';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, SortMeta } from 'primeng/api';
import { TreeTableModule } from 'primeng/treetable';

interface Column {
  field: string;
  header: string;
  type: string;
  sort?: boolean;
  headerStyle: string;
}

@Component({
  selector: 'sf-tree-table',
  imports: [
    ButtonDirective,
    ConfirmDialog,
    DatePipe,
    OptionNamePipe,
    OptionNamesPipe,
    TableModule,
    TranslatePipe,
    TreeTableModule,
    NgClass,
  ],
  templateUrl: './tree-table.component.html',
  styleUrl: './tree-table.component.scss',
})
export class TreeTableComponent implements OnInit {
  @Input() data!: any;
  @Input() columns!: Column[];
  @Input() showEdit: boolean = false;
  @Input() showDelete: boolean = false;
  @Input() prefix: string = '';
  @Input() customClass: string = '';

  @Output() rowSelect = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();

  translateService = inject(TranslateService);
  confirmationService = inject(ConfirmationService);
  selectedData: any;
  currentPageReportTemplate = '';
  key = 'key';

  private currentPageReport = 'shared.table.currentPageReport';
  private searchPlaceholder = 'shared.table.searchPlaceholder';
  emptyMsg = 'shared.table.emptyMessage';

  loading: boolean = true;
  multiSortMeta: SortMeta[] = [
    {
      field: 'name',
      order: 1,
    },
  ];

  constructor() {
    this.translateService.get(this.currentPageReport).subscribe((translatedText) => {
      this.currentPageReportTemplate = translatedText;
    });

    // Update translation when language changes
    this.translateService.onLangChange.subscribe(() => {
      this.translateService.get(this.currentPageReport).subscribe((translatedText) => {
        this.currentPageReportTemplate = translatedText;
      });
    });
  }

  ngOnInit(): void {
    this.key = this.prefix + '.key';
  }

  onRowSelect(event: any) {
    this.selectedData = event.data;
    this.rowSelect.emit(event.data);
  }

  confirmDelete(event: any) {
    this.translateService
      .get([this.prefix + '.delete.title', this.prefix + '.delete.message', this.prefix + '.delete.ok', this.prefix + '.delete.cancel'])
      .subscribe((translations) => {
        this.confirmationService.confirm({
          message: translations[this.prefix + '.delete.message'],
          header: translations[this.prefix + '.delete.title'],
          icon: 'pi pi-exclamation-triangle',
          acceptLabel: translations[this.prefix + '.delete.ok'],
          acceptIcon: 'pi pi-check',
          rejectLabel: translations[this.prefix + '.delete.cancel'],
          rejectIcon: 'pi pi-times',
          accept: () => this.onDelete(event),
          key: this.prefix + '.key',
        });
      });
  }

  onDelete(event: any) {
    this.delete.emit(event);
  }

  onEdit(event: any) {
    this.edit.emit(event);
  }

  getIcon(value: string): string {
    switch (value) {
      case 'youtube':
        return 'pi pi-youtube text-primary';
      case 'pdf':
        return 'pi pi-file-pdf text-primary';
      case 'word':
        return 'pi pi-file-word text-primary';
      case 'excel':
        return 'pi pi-file-excel text-primary';
      case 'jpg':
        return 'pi pi-image text-primary';
      case 'avi':
        return 'pi pi-video text-primary';
      case 'yes':
        return 'pi pi-check text-emerald-500';
      case 'no':
        return 'pi pi-times text-red-500';
      default:
        return '';
    }
  }
}
