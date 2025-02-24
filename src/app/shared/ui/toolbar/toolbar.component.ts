import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';

@Component({
  selector: 'sf-toolbar',
  imports: [Button, Toolbar],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  @Input() showAdd: boolean = false;
  @Input() showPrint: boolean = false;
  @Input() showUpload: boolean = false;
  @Output() addItem = new EventEmitter<void>();

  onAdd() {
    this.addItem.emit();
  }
}
