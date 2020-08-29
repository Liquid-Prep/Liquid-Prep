import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectCropRoutingModule } from './select-crop-routing.module';
import { SelectCropComponent } from './select-crop.component';



@NgModule({
  declarations: [SelectCropComponent],
  imports: [
    CommonModule,
    SelectCropRoutingModule
  ]
})
export class SelectCropModule { }
