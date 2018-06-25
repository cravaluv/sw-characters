import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './ui/data-grid/data-grid.component';
import { PaginationComponent } from './ui/pagination/pagination.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DataGridComponent,
    PaginationComponent
  ],
  exports: [
    DataGridComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
