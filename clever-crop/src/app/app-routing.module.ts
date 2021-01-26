import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MyCropsComponent } from './my-crops/my-crops.component';
import { MeasureSoilComponent } from './measure-soil/measure-soil.component';
import { GrowthStageComponent } from './growth-stage/growth-stage.component';
import { SettingsComponent } from './settings/settings.component';
import { AdviceComponent } from './advice/advice.component';
import { WaterAdviceComponent } from './water-advice/water-advice.component';

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
  {
    path: 'measure-soil',
    component: MeasureSoilComponent
  },
  {
    path: 'select-growth/:id',
    component: GrowthStageComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'advice',
    component: AdviceComponent
  },
  {
    path: 'water-advice/:id',
    component: WaterAdviceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
