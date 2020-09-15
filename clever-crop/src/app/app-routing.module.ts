import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MyCropsComponent } from './my-crops/my-crops.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'select-crop',
    loadChildren: () => import('./select-crop/select-crop.module')
      .then(m => m.SelectCropModule)
  },
  {
    path: 'my-crops',
    component: MyCropsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
