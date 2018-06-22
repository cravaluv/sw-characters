import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './ui/data-grid/data-grid.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DataGridComponent
  ],
  exports: [
    DataGridComponent
  ]
})
export class SharedModule { }
