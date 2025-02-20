import { Component } from '@angular/core';
import { Divider } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'sf-dashboard',
  imports: [Divider, FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
