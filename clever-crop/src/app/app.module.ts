import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { MatCardModule } from '@angular/material/card';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { WelcomeComponent } from './welcome/welcome.component';
import { MyCropsComponent } from './my-crops/my-crops.component';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule} from '@angular/material/dialog';

import { AppServicesService } from './app-services.service';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { MeasureSoilComponent } from './measure-soil/measure-soil.component';
import { GrowthStageComponent } from './growth-stage/growth-stage.component';
import { SettingsComponent } from './settings/settings.component';
import { AdviceComponent } from './advice/advice.component';
import { WaterAdviceComponent } from './water-advice/water-advice.component';
import { ConnectingDialogComponent } from './measure-soil/connecting-dialog/connecting-dialog.component';
import {MatMenuModule} from "@angular/material/menu";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    MyCropsComponent,
    MeasureSoilComponent,
    GrowthStageComponent,
    SettingsComponent,
    AdviceComponent,
    WaterAdviceComponent,
    ConnectingDialogComponent],
    imports: [
        BrowserModule,
        MaterialModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        BrowserAnimationsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatInputModule,
        MatTableModule,
        MatTabsModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatCardModule,
        SwiperModule,
        FlexLayoutModule,
        MatGridListModule,
        MatToolbarModule,
        MatDialogModule,
        MatMenuModule
    ],
  providers: [
    AppServicesService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
