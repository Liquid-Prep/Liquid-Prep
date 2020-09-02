import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectCropComponent } from './select-crop.component';

const routes: Routes = [
  {
    path: '',
    component: SelectCropComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectCropRoutingModule { }
