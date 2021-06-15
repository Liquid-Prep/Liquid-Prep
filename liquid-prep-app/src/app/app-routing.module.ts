import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MyCropsComponent } from './components/my-crops/my-crops.component';
import { MeasureSoilComponent } from './components/measure-soil/measure-soil.component';
import { SeedDateComponent } from './components/seed-date/seed-date.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdviceComponent } from './components/advice/advice.component';
import { WaterAdviceComponent } from './components/water-advice/water-advice.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'select-crop',
    loadChildren: () => import('./components/select-crop/select-crop.module')
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
    path: 'seed-date/:id',
    component: SeedDateComponent
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
