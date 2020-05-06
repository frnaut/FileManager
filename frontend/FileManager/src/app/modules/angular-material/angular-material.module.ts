import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, MatButtonModule
  ],
  exports: [
    MatButtonModule
  ]
})
export class AngularMaterialModule { }
